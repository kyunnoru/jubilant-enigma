// pages/api/payments/create-invoice.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { userId, planType = 'premium', amount = 199000 } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Verify user exists in our database
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError || !profile) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create Xendit invoice
    const xenditResponse = await fetch('https://api.xendit.co/v2/invoices', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(process.env.XENDIT_SECRET_KEY + ':').toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        external_id: `premium_subscription_${userId}`,
        amount: amount,
        payer_email: profile.email || `user_${userId}@example.com`,
        description: `Premium Subscription - Career Guidance Platform`,
        invoice_duration: 86400, // 24 hours
        success_redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success`,
        failure_redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?payment=failed`,
        currency: 'IDR',
        items: [
          {
            name: 'Premium Subscription',
            quantity: 1,
            price: amount,
            category: 'Digital Service'
          }
        ],
        customer: {
          given_names: profile.name || 'User',
          email: profile.email || `user_${userId}@example.com`,
        },
        customer_notification_preference: {
          invoice_created: ['email', 'sms'],
          invoice_reminder: ['email', 'sms'],
          invoice_paid: ['email', 'sms']
        },
        fees: [{
          type: 'ADMIN',
          value: 5000 // Admin fee in IDR
        }]
      }),
    });

    if (!xenditResponse.ok) {
      const error = await xenditResponse.text();
      console.error('Xendit API error:', error);
      return res.status(500).json({ message: 'Failed to create invoice' });
    }

    const invoice = await xenditResponse.json();

    // Store pending payment in database
    const { error: paymentError } = await supabase
      .from('subscriptions')
      .insert({
        user_id: userId,
        xendit_invoice_id: invoice.id,
        status: 'pending',
        amount: amount,
        external_id: invoice.external_id,
        created_at: new Date().toISOString()
      });

    if (paymentError) {
      console.error('Error storing payment:', paymentError);
    }

    res.status(200).json({
      invoice_id: invoice.id,
      invoice_url: invoice.invoice_url,
      amount: invoice.amount,
      status: invoice.status
    });

  } catch (error) {
    console.error('Payment creation error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}