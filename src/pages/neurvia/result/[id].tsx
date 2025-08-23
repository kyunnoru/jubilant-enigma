// src/pages/neurvia/result/[id].tsx

import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import { useNeurviaStore } from '@/src/store/neurviaStore';
import { useSession } from 'next-auth/react';

// 1. Mengimpor komponen-komponen bersih yang sudah kita siapkan
import LoadingSpinner from '@/src/components/LoadingSpinner';
import AppNavbar from '@/src/components/landing/Navbar';

export default function ResultHubPage() {
  const router = useRouter();
  const { id } = router.query;
  const { status } = useSession({
    // Cara modern untuk menangani autentikasi:
    // Jika pengguna tidak terautentikasi, secara otomatis arahkan ke halaman signin.
    required: true,
    onUnauthenticated() {
      router.push('/auth/signin');
    },
  });
  const resetStore = useNeurviaStore((state) => state.reset);

  useEffect(() => {
    // Logika ini tetap sama, membersihkan state saat halaman dimuat.
    if (id) {
      resetStore();
    }
  }, [id, resetStore]);

  // 2. Menggunakan komponen LoadingSpinner yang sudah direvisi.
  // Kondisi ini akan menangani dua kasus: saat sesi sedang diverifikasi,
  // atau saat ID dari URL belum siap.
  if (status === 'loading' || !id) {
    return (
      <LoadingSpinner 
        title="Loading Your Results" 
        message="Please wait while we prepare your personalized analysis." 
      />
    );
  }

  return (
    <>
      <Head>
        <title>Analysis Results - Neurvia</title>
        {/* Tidak ada lagi impor font di sini! Jauh lebih cepat. */}
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* 3. Menggunakan Navbar khusus aplikasi yang konsisten. */}
        <AppNavbar />

        <main className="flex flex-col items-center justify-center p-4 pt-16 sm:pt-24">
          <div className="w-full max-w-2xl text-center">

            <div className="mb-12">
              <h1 className="text-4xl lg:text-5xl font-light text-slate-900 mb-2">
                Your Analysis is
                <br />
                <span className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                  Complete!
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-xl mx-auto">
                Congratulations! Your comprehensive career analysis is ready. Download your detailed report and explore your results.
              </p>
            </div>
            
            <div className="space-y-6">
              <a
                href={`/api/download-report/${id}`}
                download={`Neurvia_Analysis_Report_${id}.pdf`}
                className="group flex w-full items-center justify-center space-x-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 py-5 px-8 text-center text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1"
              >
                <svg className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>DOWNLOAD COMPLETE REPORT</span>
              </a>

              <Link
                href={`/neurvia/chat/${id}`}
                className="group flex w-full items-center justify-center space-x-3 rounded-2xl bg-white border-2 border-slate-300 py-5 px-8 text-center text-lg font-semibold text-slate-700 shadow-md transition-all duration-300 hover:border-slate-400 hover:text-slate-800 hover:shadow-xl transform hover:-translate-y-1"
              >
                <svg className="w-7 h-7 text-slate-500 transition-colors duration-300 group-hover:text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>ASK QUESTIONS ABOUT YOUR RESULTS</span>
              </Link>
            </div>

            <div className="mt-8">
              <p className="text-slate-500 text-sm leading-relaxed max-w-md mx-auto">
                Get personalized insights and answers to any questions you have. Our AI assistant is here to help you understand your unique profile and career opportunities.
              </p>
            </div>

            <div className="text-center pt-10">
              <Link
                href="/dashboard"
                className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to Dashboard</span>
              </Link>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}