// src/pages/payment/success.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const PaymentSuccessPage: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<'success' | 'failed' | 'pending'>('pending');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const orderId = router.query.order_id || router.query.external_id;
        
        if (!orderId) {
          setVerificationStatus('failed');
          setIsVerifying(false);
          return;
        }

        // Verify payment status with your backend
        const response = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderId }),
        });

        const result = await response.json();
        
        if (result.success && result.status === 'paid') {
          setVerificationStatus('success');
          
          // Update local session or state if needed
          // You might want to call a function to refresh user's premium status
          
        } else {
          setVerificationStatus('failed');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setVerificationStatus('failed');
      } finally {
        setIsVerifying(false);
      }
    };

    if (router.isReady) {
      verifyPayment();
    }
  }, [router.isReady, router.query]);

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <div className="animate-spin w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Memverifikasi Pembayaran</h2>
          <p className="text-gray-600">Mohon tunggu sebentar...</p>
        </div>
      </div>
    );
  }

  if (verificationStatus === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-2xl w-full">
          <div className="w-20 h-20 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Pembayaran Berhasil! 🎉
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            Selamat! Anda sekarang memiliki akses premium ke fitur Panduan Karier & Asesmen.
          </p>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Yang Sudah Anda Dapatkan:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Tes Asesmen Karier Lengkap</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Panduan Karier Personal</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Analisis Kepribadian Mendalam</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Rekomendasi Jalur Karier</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/career-guidance">
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
                Mulai Asesmen Karier
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="border-2 border-gray-300 hover:border-indigo-500 text-gray-700 hover:text-indigo-600 font-medium py-3 px-6 rounded-xl transition-all duration-300">
                Kembali ke Dashboard
              </button>
            </Link>
          </div>
          
          <div className="mt-8 text-sm text-gray-500">
            <p>Bukti pembayaran telah dikirim ke email Anda.</p>
            <p>Jika ada pertanyaan, hubungi customer support kami.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
        <div className="w-20 h-20 mx-auto mb-6 bg-red-500 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Verifikasi Gagal
        </h1>
        
        <p className="text-gray-600 mb-6">
          Maaf, kami tidak dapat memverifikasi pembayaran Anda. Silakan hubungi customer support jika Anda yakin pembayaran telah berhasil.
        </p>
        
        <div className="flex flex-col gap-4">
          <Link href="/career-guidance">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-xl transition-colors">
              Coba Lagi
            </button>
          </Link>
          <Link href="/">
            <button className="w-full border-2 border-gray-300 hover:border-indigo-500 text-gray-700 hover:text-indigo-600 font-medium py-3 px-6 rounded-xl transition-colors">
              Kembali ke Beranda
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;