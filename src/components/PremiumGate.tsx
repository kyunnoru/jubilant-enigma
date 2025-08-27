// src/components/PremiumGate.tsx
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

interface PremiumGateProps {
  children: React.ReactNode;
  featureName: string;
  description?: string;
}

const PremiumGate: React.FC<PremiumGateProps> = ({ 
  children, 
  featureName, 
  description = "Dapatkan akses ke fitur premium dan tingkatkan pengalaman Anda." 
}) => {
  const { data: session, status } = useSession();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  
  // Debug logging
  console.log('🔍 PremiumGate Debug:', {
    status,
    session: session ? {
      id: session.user?.id,
      email: session.user?.email,
      isPremium: session.user?.isPremium,
    } : null,
  });
  
  // STRICT premium check - only allow if explicitly true
  const hasPremiumAccess = session?.user?.isPremium === true;
  
  console.log('🔒 Premium Access:', hasPremiumAccess ? '✅ GRANTED' : '❌ BLOCKED');
  
  // If still loading session, show loading
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  const handlePremiumUpgrade = async () => {
    setIsProcessingPayment(true);
    
    try {
      // Create payment session with Xendit
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 1999000, // 1.999.000 IDR
          currency: 'IDR',
          feature: featureName,
          userId: session?.user?.id,
        }),
      });
      
      const paymentData = await response.json();
      
      if (paymentData.success && paymentData.paymentUrl) {
        // Redirect to Xendit payment page
        window.location.href = paymentData.paymentUrl;
      } else {
        throw new Error(paymentData.message || 'Failed to create payment session');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // If user has premium access, show the content
  if (hasPremiumAccess) {
    return <>{children}</>;
  }

  // Show premium gate
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-8 text-center text-white">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">Fitur Premium</h1>
            <p className="text-indigo-100">{featureName}</p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Upgrade ke Premium
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {description}
              </p>
            </div>

            {/* Features list */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Yang Anda dapatkan:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Tes Penilaian Karier Lengkap</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Panduan Karier Personal</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Analisis Kepribadian Mendalam</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Rekomendasi Jalur Karier</span>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  Rp 1.999.000
                </div>
                <div className="text-gray-600">Akses seumur hidup</div>
                <div className="text-sm text-green-600 font-medium mt-2">
                  ⚡ Penawaran terbatas!
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handlePremiumUpgrade}
              disabled={isProcessingPayment || !session}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg mb-4"
            >
              {isProcessingPayment ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Memproses...</span>
                </div>
              ) : !session ? (
                'Silakan Login Terlebih Dahulu'
              ) : (
                'Upgrade ke Premium Sekarang'
              )}
            </button>

            {/* Test Button for Development */}
            {session && process.env.NODE_ENV === 'development' && (
              <button
                onClick={() => window.open('/test-premium', '_blank')}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg text-sm mb-4"
              >
                Test Premium Toggle (Dev Only)
              </button>
            )}

            {!session && (
              <p className="text-center text-gray-500 text-sm mt-4">
                Anda perlu login untuk melakukan upgrade ke premium
              </p>
            )}

            {/* Security badges */}
            <div className="flex justify-center items-center space-x-4 mt-6 text-gray-500 text-sm">
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Pembayaran Aman</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Garansi 30 Hari</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumGate;