// src/components/XenditPaymentButton.tsx
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface XenditPaymentButtonProps {
  userId?: string;
  amount?: number;
  planName?: string;
  className?: string;
}

const XenditPaymentButton: React.FC<XenditPaymentButtonProps> = ({
  userId,
  amount = 199000,
  planName = "Premium Monthly",
  className = ""
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    if (!userId) {
      setError('User not authenticated');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Create invoice via your API
      const response = await fetch('/api/payments/create-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          amount,
          planType: 'premium'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create invoice');
      }

      const { invoice_url } = await response.json();
      
      // Redirect to Xendit payment page
      window.location.href = invoice_url;

    } catch (error) {
      console.error('Payment error:', error);
      setError('Failed to create payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handlePayment}
        disabled={isLoading}
        className={`relative ${className} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
            Creating Payment...
          </div>
        ) : (
          <>
            Upgrade ke Premium - Rp {amount.toLocaleString('id-ID')}
          </>
        )}
      </button>
      
      {error && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
          <button 
            onClick={() => setError(null)}
            className="text-red-600 text-sm underline mt-1 hover:no-underline"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};

export default XenditPaymentButton;