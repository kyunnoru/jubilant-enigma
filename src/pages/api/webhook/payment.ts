// pages/api/webhook/payment.ts
import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const notification = req.body;
    
    // Verify webhook signature for security
    const isValidSignature = verifyWebhookSignature(req);
    if (!isValidSignature) {
      console.error('Invalid webhook signature');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Determine payment gateway and process accordingly
    if (notification.signature_key || notification.transaction_status) {
      // Midtrans webhook
      await handleMidtransWebhook(notification);
    } else if (notification.external_id && notification.status) {
      // Xendit webhook
      await handleXenditWebhook(notification);
    } else {
      console.error('Unknown webhook format:', notification);
      return res.status(400).json({ error: 'Unknown webhook format' });
    }

    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
}

async function handleMidtransWebhook(notification: any) {
  const {
    transaction_status,
    fraud_status,
    order_id,
    gross_amount,
    payment_type,
    transaction_time,
    settlement_time,
  } = notification;

  console.log('Midtrans webhook received:', {
    order_id,
    transaction_status,
    fraud_status,
  });

  let shouldGrantAccess = false;

  switch (transaction_status) {
    case 'capture':
      if (fraud_status === 'accept') {
        shouldGrantAccess = true;
      }
      break;
    case 'settlement':
      shouldGrantAccess = true;
      break;
    case 'pending':
      console.log(`Payment pending for order: ${order_id}`);
      break;
    case 'deny':
    case 'cancel':
    case 'expire':
    case 'failure':
      console.log(`Payment failed for order: ${order_id}, status: ${transaction_status}`);
      await handleFailedPayment(order_id, transaction_status);
      break;
    default:
      console.log(`Unknown transaction status: ${transaction_status}`);
  }

  if (shouldGrantAccess) {
    await grantPremiumAccess(order_id, {
      transactionId: notification.transaction_id,
      amount: gross_amount,
      paymentType: payment_type,
      paidAt: settlement_time || transaction_time,
      gateway: 'midtrans',
    });
  }
}

async function handleXenditWebhook(notification: any) {
  const {
    status,
    external_id,
    amount,
    paid_amount,
    payment_method,
    paid_at,
    created,
  } = notification;

  console.log('Xendit webhook received:', {
    external_id,
    status,
  });

  switch (status) {
    case 'PAID':
      await grantPremiumAccess(external_id, {
        transactionId: notification.id,
        amount: paid_amount || amount,
        paymentType: payment_method,
        paidAt: paid_at,
        gateway: 'xendit',
      });
      break;
    case 'EXPIRED':
      console.log(`Payment expired for order: ${external_id}`);
      await handleFailedPayment(external_id, 'expired');
      break;
    default:
      console.log(`Xendit webhook status: ${status} for order: ${external_id}`);
  }
}

async function grantPremiumAccess(orderId: string, paymentDetails: any) {
  try {
    const userId = extractUserIdFromOrderId(orderId);
    
    if (!userId) {
      console.error('Could not extract user ID from order ID:', orderId);
      return;
    }

    console.log(`Granting premium access to user: ${userId} for order: ${orderId}`);

    // Update user's premium status in your database
    // Replace this with your actual database update logic
    await updateUserPremiumStatus(userId, true);
    
    // Save payment record
    await savePaymentRecord({
      userId,
      orderId,
      transactionId: paymentDetails.transactionId,
      amount: paymentDetails.amount,
      paymentType: paymentDetails.paymentType,
      gateway: paymentDetails.gateway,
      status: 'completed',
      paidAt: new Date(paymentDetails.paidAt),
      createdAt: new Date(),
    });

    // Optional: Send confirmation email
    await sendPremiumActivationEmail(userId, orderId);

  } catch (error) {
    console.error('Error granting premium access:', error);
  }
}

async function handleFailedPayment(orderId: string, reason: string) {
  try {
    const userId = extractUserIdFromOrderId(orderId);
    
    if (!userId) {
      console.error('Could not extract user ID from order ID:', orderId);
      return;
    }

    // Update payment record status
    await updatePaymentStatus(orderId, 'failed', reason);

    // Optional: Send failure notification email
    await sendPaymentFailureEmail(userId, orderId, reason);

  } catch (error) {
    console.error('Error handling failed payment:', error);
  }
}

function extractUserIdFromOrderId(orderId: string): string {
  // Extract user ID from order ID format: neurvia-premium-{timestamp}-{userId}
  const parts = orderId.split('-');
  return parts[parts.length - 1] || '';
}

function verifyWebhookSignature(req: NextApiRequest): boolean {
  try {
    // For Midtrans
    if (req.body.signature_key) {
      return verifyMidtransSignature(req);
    }
    
    // For Xendit
    if (req.headers['x-callback-token']) {
      return verifyXenditSignature(req);
    }

    return false;
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}

function verifyMidtransSignature(req: NextApiRequest): boolean {
  const {
    order_id,
    status_code,
    gross_amount,
    signature_key,
  } = req.body;

  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) {
    console.error('Midtrans server key not configured');
    return false;
  }

  const payload = order_id + status_code + gross_amount + serverKey;
  const expectedSignature = crypto
    .createHash('sha512')
    .update(payload)
    .digest('hex');

  return signature_key === expectedSignature;
}

function verifyXenditSignature(req: NextApiRequest): boolean {
  const callbackToken = req.headers['x-callback-token'] as string;
  const expectedToken = process.env.XENDIT_CALLBACK_TOKEN;
  
  if (!expectedToken) {
    console.error('Xendit callback token not configured');
    return false;
  }

  return callbackToken === expectedToken;
}

// Database operations - implement these based on your database setup
async function updateUserPremiumStatus(userId: string, isPremium: boolean) {
  try {
    // IMPORTANT: This is where you ACTUALLY grant premium access
    // Replace this with your real database update
    
    // Example with Prisma (recommended):
    /*
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { 
        isPremium: isPremium,
        updatedAt: new Date()
      }
    });
    */
    
    // Example with MongoDB:
    /*
    await db.collection('users').updateOne(
      { _id: userId },
      { 
        $set: { 
          isPremium: isPremium,
          updatedAt: new Date()
        } 
      }
    );
    */
    
    // For now, log the action (REPLACE THIS WITH REAL DATABASE CODE)
    console.log(`🔥 CRITICAL: User ${userId} premium status updated to: ${isPremium}`);
    
    // You can also trigger NextAuth session update here if needed
    // This forces the session to refresh with new premium status
    
    return true;
  } catch (error) {
    console.error('❌ FAILED to update user premium status:', error);
    throw error;
  }
}

async function savePaymentRecord(paymentData: any) {
  console.log('Saving payment record:', paymentData);
  
  // Example implementation - replace with your actual database code
  // await prisma.payment.create({
  //   data: paymentData
  // });
}

async function updatePaymentStatus(orderId: string, status: string, reason: string) {
  console.log(`Updating payment status for order ${orderId}: ${status} - ${reason}`);
  
  // Example implementation - replace with your actual database code
  // await prisma.payment.update({
  //   where: { orderId: orderId },
  //   data: { 
  //     status: status,
  //     failureReason: reason,
  //     updatedAt: new Date()
  //   }
  // });
}

// Email functions - implement these based on your email service
async function sendPremiumActivationEmail(userId: string, orderId: string) {
  console.log(`Sending premium activation email to user: ${userId}`);
  
  // Implement your email sending logic here
  // You could use services like SendGrid, AWS SES, or Nodemailer
}

async function sendPaymentFailureEmail(userId: string, orderId: string, reason: string) {
  console.log(`Sending payment failure email to user: ${userId}, reason: ${reason}`);
  
  // Implement your email sending logic here
}