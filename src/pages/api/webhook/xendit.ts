// pages/api/webhooks/xendit.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Verify Xendit webhook signature
function verifyXenditSignature(payload: string, signature: string, webhookToken: string): boolean {
  const hash = crypto
    .createHmac('sha256', webhookToken)
    .update(payload)
    .digest('hex');
  
  return hash === signature;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const signature = req.headers['x-callback-token'] as string;
    const payload = JSON.stringify(req.body);
    
    // Verify the webhook signature
    if (!verifyXenditSignature(payload, signature, process.env.XENDIT_WEBHOOK_TOKEN!)) {
      console.log('Invalid Xendit signature');
      return res.status(400).json({ message: 'Invalid signature' });
    }

    const event = req.body;
    
    // Handle different Xendit webhook events
    switch (event.event) {
      case 'invoice.paid':
        await handleInvoicePaid(event);
        break;
      
      case 'invoice.expired':
        await handleInvoiceExpired(event);
        break;
      
      case 'recurring.created':
        await handleRecurringCreated(event);
        break;
        
      case 'recurring.succeeded':
        await handleRecurringSucceeded(event);
        break;
        
      case 'recurring.failed':
        await handleRecurringFailed(event);
        break;
        
      default:
        console.log(`Unhandled Xendit event: ${event.event}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ message: 'Webhook error' });
  }
}

async function handleInvoicePaid(event: any) {
  const { external_id, amount, paid_amount, status } = event;
  
  // Extract user ID from external_id (format: "premium_subscription_userId")
  const userId = external_id.replace('premium_subscription_', '');
  
  if (status === 'PAID' && paid_amount >= amount) {
    // Calculate subscription period (1 month from now)
    const currentPeriodStart = new Date();
    const currentPeriodEnd = new Date();
    currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1);

    // Create or update subscription record
    const { error: subscriptionError } = await supabase
      .from('subscriptions')
      .upsert({
        user_id: userId,
        xendit_invoice_id: event.id,
        status: 'active',
        amount: amount,
        current_period_start: currentPeriodStart.toISOString(),
        current_period_end: currentPeriodEnd.toISOString(),
        updated_at: new Date().toISOString()
      });

    if (subscriptionError) {
      console.error('Error updating subscription:', subscriptionError);
      return;
    }

    // Update user premium status
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        is_premium: true,
        premium_expires_at: currentPeriodEnd.toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (profileError) {
      console.error('Error updating profile:', profileError);
      return;
    }

    console.log(`Premium activated for user: ${userId}`);
    
    // Optional: Send welcome email or notification
    // await sendPremiumWelcomeEmail(userId);
  }
}

async function handleInvoiceExpired(event: any) {
  const { external_id } = event;
  const userId = external_id.replace('premium_subscription_', '');
  
  // Update subscription status to expired
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'expired',
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId)
    .eq('xendit_invoice_id', event.id);

  if (!error) {
    console.log(`Subscription expired for user: ${userId}`);
  }
}

async function handleRecurringSucceeded(event: any) {
  // Handle successful recurring payment
  await handleInvoicePaid(event);
}

async function handleRecurringFailed(event: any) {
  const { external_id } = event;
  const userId = external_id.replace('premium_subscription_', '');
  
  // Update subscription status to failed
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'payment_failed',
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId);

  if (!error) {
    console.log(`Payment failed for user: ${userId}`);
    
    // Optional: Send payment failure notification
    // await sendPaymentFailedEmail(userId);
  }
}

async function handleRecurringCreated(event: any) {
  const { external_id, amount } = event;
  const userId = external_id.replace('premium_subscription_', '');
  
  // Create initial subscription record
  const { error } = await supabase
    .from('subscriptions')
    .insert({
      user_id: userId,
      xendit_recurring_id: event.id,
      status: 'pending',
      amount: amount,
      created_at: new Date().toISOString()
    });

  if (!error) {
    console.log(`Recurring subscription created for user: ${userId}`);
  }
}