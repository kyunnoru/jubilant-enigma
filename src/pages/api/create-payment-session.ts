import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // Check if user is authenticated
    const session = await getSession({ req })
    
    if (!session || !session.user) {
      return res.status(401).json({ 
        message: 'Unauthorized - Please sign in first' 
      })
    }

    // Check for required Xendit environment variables
    if (!process.env.XENDIT_SECRET_KEY) {
      console.error('XENDIT_SECRET_KEY is missing from environment variables')
      return res.status(500).json({ 
        message: 'Payment gateway configuration missing' 
      })
    }

    // Create Xendit invoice
    const xenditResponse = await fetch('https://api.xendit.co/v2/invoices', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(process.env.XENDIT_SECRET_KEY + ':').toString('base64')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        external_id: `premium_upgrade_${session.user.email}_${Date.now()}`,
        amount: 200000, // 200,000 IDR (adjust as needed)
        currency: 'IDR',
        customer: {
          given_names: session.user.name || 'User',
          email: session.user.email
        },
        customer_notification_preference: {
          invoice_created: ['email'],
          invoice_reminder: ['email'],
          invoice_paid: ['email']
        },
        success_redirect_url: `${process.env.NEXTAUTH_URL}/payment/success`,
        failure_redirect_url: `${process.env.NEXTAUTH_URL}/payment/failed`,
        description: 'Premium Subscription Upgrade',
        invoice_duration: 86400, // 24 hours
        items: [
          {
            name: 'Premium Subscription',
            quantity: 1,
            price: 200000,
            category: 'Subscription'
          }
        ]
      })
    })

    if (!xenditResponse.ok) {
      const errorData = await xenditResponse.text()
      console.error('Xendit API error:', errorData)
      return res.status(500).json({ 
        message: 'Failed to create payment session',
        error: 'Payment gateway error'
      })
    }

    const invoice = await xenditResponse.json()

    res.status(200).json({ 
      success: true,
      paymentUrl: invoice.invoice_url,
      invoiceId: invoice.id
    })

  } catch (error) {
    console.error('Payment session creation error:', error)
    res.status(500).json({ 
      message: 'Failed to create payment session',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}