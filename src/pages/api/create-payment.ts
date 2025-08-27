// pages/api/create-payment.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

interface PaymentRequest {
  amount: number;
  currency: string;
  feature: string;
  userId?: string;
}

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

    const { amount, currency, feature }: PaymentRequest = req.body;

    // Validate request data
    if (!amount || !currency || !feature) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Ensure amount is exactly 1,999,000 IDR for career guidance
    if (amount !== 1999000 || currency !== 'IDR') {
      return res.status(400).json({ message: 'Invalid payment amount or currency' });
    }

    // Here you would integrate with your preferred payment gateway
    // Examples: Midtrans, Xendit, DOKU, or any other Indonesian payment provider
    
    // Example with Midtrans (you'll need to install midtrans-client)
    const midtrans = require('midtrans-client');
    
    const snap = new midtrans.Snap({
      isProduction: process.env.NODE_ENV === 'production',
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    const parameter = {
      transaction_details: {
        order_id: `neurvia-premium-${Date.now()}-${session.user.id}`,
        gross_amount: amount,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: session.user.name?.split(' ')[0] || 'User',
        last_name: session.user.name?.split(' ').slice(1).join(' ') || '',
        email: session.user.email || '',
      },
      item_details: [
        {
          id: 'career-guidance-premium',
          price: amount,
          quantity: 1,
          name: 'Premium Career Guidance & Assessment',
          category: 'Premium Features',
        },
      ],
      callbacks: {
        finish: `${process.env.NEXTAUTH_URL}/payment/success`,
        error: `${process.env.NEXTAUTH_URL}/payment/error`,
        pending: `${process.env.NEXTAUTH_URL}/payment/pending`,
      },
      expiry: {
        start_time: new Date().toISOString(),
        unit: 'minutes',
        duration: 60, // 1 hour expiry
      },
    };

    const transaction = await snap.createTransaction(parameter);
    
    // Store payment record in your database
    // await savePaymentRecord({
    //   userId: session.user.id,
    //   orderId: parameter.transaction_details.order_id,
    //   amount: amount,
    //   currency: currency,
    //   feature: feature,
    //   status: 'pending',
    //   paymentUrl: transaction.redirect_url,
    //   createdAt: new Date(),
    // });

    return res.status(200).json({
      success: true,
      paymentUrl: transaction.redirect_url,
      orderId: parameter.transaction_details.order_id,
    });

  } catch (error) {
    console.error('Payment creation error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create payment session',
    });
  }
}

// Alternative implementation for Xendit
export async function createXenditPayment(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  
  try {
    const xendit = require('xendit-node');
    const x = new xendit({
      secretKey: process.env.XENDIT_SECRET_KEY,
    });

    const { Invoice } = x;
    const invoiceSpecification = {
      external_id: `neurvia-premium-${Date.now()}-${session?.user?.id}`,
      amount: 1999000,
      description: 'Premium Career Guidance & Assessment',
      invoice_duration: 86400, // 24 hours
      customer: {
        given_names: session?.user?.name?.split(' ')[0] || 'User',
        surname: session?.user?.name?.split(' ').slice(1).join(' ') || '',
        email: session?.user?.email || '',
      },
      customer_notification_preference: {
        invoice_created: ['email'],
        invoice_reminder: ['email'],
        invoice_paid: ['email'],
        invoice_expired: ['email'],
      },
      success_redirect_url: `${process.env.NEXTAUTH_URL}/payment/success`,
      failure_redirect_url: `${process.env.NEXTAUTH_URL}/payment/error`,
    };

    const invoice = await Invoice.createInvoice(invoiceSpecification);
    
    return res.status(200).json({
      success: true,
      paymentUrl: invoice.invoice_url,
      invoiceId: invoice.id,
    });

  } catch (error) {
    console.error('Xendit payment error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create Xendit invoice',
    });
  }
}

// Webhook handler for payment notifications
export async function handlePaymentWebhook(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Verify webhook signature here (important for security)
    const paymentData = req.body;
    
    if (paymentData.transaction_status === 'settlement' || paymentData.status === 'PAID') {
      // Payment successful - grant premium access
      const userId = extractUserIdFromOrderId(paymentData.order_id || paymentData.external_id);
      
      // Update user's premium status in database
      // await updateUserPremiumStatus(userId, true);
      
      // Log successful payment
      console.log(`Premium access granted to user: ${userId}`);
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