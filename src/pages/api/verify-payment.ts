// pages/api/verify-payment.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Check if user is authenticated
    const session = await getSession({ req });
    if (!session || !session.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ message: 'Order ID is required' });
    }

    // Verify payment with Midtrans
    const midtrans = require('midtrans-client');
    
    const snap = new midtrans.Snap({
      isProduction: process.env.NODE_ENV === 'production',
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    try {
      // Check transaction status from Midtrans
      const transactionStatus = await snap.transaction.status(orderId);
      
      let paymentStatus = 'pending';
      let isSuccess = false;

      // Map Midtrans status to our internal status
      switch (transactionStatus.transaction_status) {
        case 'capture':
          if (transactionStatus.fraud_status === 'accept') {
            paymentStatus = 'paid';
            isSuccess = true;
          }
          break;
        case 'settlement':
          paymentStatus = 'paid';
          isSuccess = true;
          break;
        case 'pending':
          paymentStatus = 'pending';
          break;
        case 'deny':
        case 'cancel':
        case 'expire':
        case 'failure':
          paymentStatus = 'failed';
          break;
        default:
          paymentStatus = 'pending';
      }

      // If payment is successful, update user's premium status
      if (isSuccess) {
        // Here you would update your database to grant premium access
        // Example:
        // await updateUserPremiumStatus(session.user.id, true);
        
        console.log(`Premium access granted to user: ${session.user.id} for order: ${orderId}`);
        
        // You might want to store the successful payment record
        // await saveSuccessfulPayment({
        //   userId: session.user.id,
        //   orderId: orderId,
        //   amount: transactionStatus.gross_amount,
        //   paidAt: new Date(transactionStatus.settlement_time || transactionStatus.transaction_time),
        // });
      }

      return res.status(200).json({
        success: isSuccess,
        status: paymentStatus,
        transactionId: transactionStatus.transaction_id,
        orderId: transactionStatus.order_id,
        amount: transactionStatus.gross_amount,
        paymentType: transactionStatus.payment_type,
        transactionTime: transactionStatus.transaction_time,
        settlementTime: transactionStatus.settlement_time,
      });

    } catch (midtransError: any) {
      console.error('Midtrans verification error:', midtransError);
      
      // If transaction not found in Midtrans, it might be from another payment gateway
      if (midtransError.message?.includes('Transaction doesn\'t exist')) {
        // Try Xendit verification if you're using multiple gateways
        return await verifyXenditPayment(orderId, res, session.user.id);
      }
      
      throw midtransError;
    }

  } catch (error) {
    console.error('Payment verification error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to verify payment',
    });
  }
}

// Alternative verification for Xendit
async function verifyXenditPayment(orderId: string, res: NextApiResponse, userId: string) {
  try {
    const xendit = require('xendit-node');
    const x = new xendit({
      secretKey: process.env.XENDIT_SECRET_KEY,
    });

    const { Invoice } = x;
    
    // Get invoice by external_id (which should be our orderId)
    const invoices = await Invoice.getInvoices({
      external_id: orderId,
    });

    if (invoices.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found',
      });
    }

    const invoice = invoices[0];
    let paymentStatus = 'pending';
    let isSuccess = false;

    switch (invoice.status) {
      case 'PAID':
        paymentStatus = 'paid';
        isSuccess = true;
        break;
      case 'PENDING':
        paymentStatus = 'pending';
        break;
      case 'EXPIRED':
        paymentStatus = 'failed';
        break;
      default:
        paymentStatus = 'pending';
    }

    if (isSuccess) {
      // Grant premium access
      console.log(`Premium access granted to user: ${userId} for Xendit invoice: ${invoice.id}`);
      
      // Update database here
      // await updateUserPremiumStatus(userId, true);
    }

    return res.status(200).json({
      success: isSuccess,
      status: paymentStatus,
      transactionId: invoice.id,
      orderId: invoice.external_id,
      amount: invoice.amount,
      paymentType: 'xendit',
      transactionTime: invoice.created,
      paidAt: invoice.paid_at,
    });

  } catch (xenditError) {
    console.error('Xendit verification error:', xenditError);
    return res.status(500).json({
      success: false,
      message: 'Failed to verify Xendit payment',
    });
  }
}

// Webhook handler for automatic status updates (optional separate endpoint)
// You can create this as pages/api/webhook/payment.ts
export async function handlePaymentWebhook(req: NextApiRequest, res: NextApiResponse) {
  try {
    const notification = req.body;
    
    // Verify webhook signature (important for security)
    // const isValidSignature = verifyWebhookSignature(req);
    // if (!isValidSignature) {
    //   return res.status(401).json({ error: 'Invalid signature' });
    // }

    const orderId = notification.order_id || notification.external_id;
    const transactionStatus = notification.transaction_status || notification.status;
    
    // Extract user ID from order ID
    const userId = extractUserIdFromOrderId(orderId);
    
    if (transactionStatus === 'settlement' || transactionStatus === 'PAID') {
      // Payment successful - grant premium access automatically
      console.log(`Webhook: Premium access granted to user: ${userId}`);
      
      // Update user's premium status in database
      // await updateUserPremiumStatus(userId, true);
      
      // Log successful payment
      // await logPaymentSuccess(userId, orderId, notification);
    }

    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
}

function extractUserIdFromOrderId(orderId: string): string {
  // Extract user ID from order ID format: neurvia-premium-{timestamp}-{userId}
  return orderId.split('-').pop() || '';
}

// Helper function to verify webhook signatures (implement based on your payment gateway)
function verifyWebhookSignature(req: NextApiRequest): boolean {
  // For Midtrans
  const signature = req.headers['x-signature'] as string;
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  
  // Implement signature verification logic here
  // This is just a placeholder - check your payment gateway docs
  
  return true; // Replace with actual verification
}