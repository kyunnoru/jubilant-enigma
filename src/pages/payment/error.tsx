// src/pages/payment/error.tsx
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const PaymentErrorPage: React.FC = () => {
  const router = useRouter();
  const { error_message, order_id } = router.query;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-lg w-full">
        <div className="w-20 h-20 mx-auto mb-6 bg-red-500 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Pembayaran Gagal
        </h1>
        
        <p className="text-lg text-gray-600 mb-6">
          Maaf, pembayaran Anda tidak dapat diproses.
        </p>

        {error_message && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700 text-sm">
              <strong>Detail Error:</strong> {error_message}
            </p>
          </div>
        )}

        {order_id && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <p className="text-gray-600 text-sm">
              <strong>Order ID:</strong> {order_id}
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Simpan ID ini untuk referensi jika menghubungi customer support
            </p>
          </div>
        )}
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Kemungkinan Penyebab:</h3>
          <div className="text-left space-y-2">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-600 text-sm">Saldo kartu kredit/debit tidak mencukupi</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-600 text-sm">Kartu ditolak oleh bank</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-600 text-sm">Koneksi internet terputus saat proses pembayaran</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-600 text-sm">Waktu pembayaran sudah habis</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Link href="/career-guidance">
            <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
              Coba Lagi
            </button>
          </Link>
          
          <Link href="/contact-support">
            <button className="w-full border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50 font-medium py-3 px-6 rounded-xl transition-all duration-200">
              Hubungi Customer Support
            </button>
          </Link>
          
          <Link href="/">
            <button className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-700 font-medium py-3 px-6 rounded-xl transition-all duration-200">
              Kembali ke Beranda
            </button>
          </Link>
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">💡 Tips untuk Pembayaran Berhasil:</h4>
          <div className="text-blue-800 text-xs text-left space-y-1">
            <p>• Pastikan saldo kartu mencukupi (Rp 1.999.000)</p>
            <p>• Gunakan koneksi internet yang stabil</p>
            <p>• Selesaikan pembayaran dalam batas waktu yang diberikan</p>
            <p>• Pastikan kartu Anda aktif untuk transaksi online</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentErrorPage;