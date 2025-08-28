'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FlowLayout from '../../../../components/FlowLayout';

interface ReportResult {
  report_id: string;
  pdf_download_url?: string;
}

export default function ResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [reportData, setReportData] = useState<ReportResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const reportId = searchParams.get('id');
    const pdfUrl = searchParams.get('pdf');

    if (reportId) {
      setReportData({
        report_id: reportId,
        pdf_download_url: pdfUrl || undefined
      });
    } else {
      setError('ID laporan tidak ditemukan');
    }

    setIsLoading(false);
  }, [searchParams]);

  const handleDownloadPDF = () => {
    if (reportData?.pdf_download_url) {
      window.open(reportData.pdf_download_url, '_blank');
    }
  };

  const handleBackToStart = () => {
    router.push('/neurvia');
  };

  if (isLoading) {
    return (
      <FlowLayout pageTitle="Memproses Laporan" currentStep={5} stepTitles={['Memahami Minat Anda', 'Latar Belakang Akademik', 'Wawasan Diri', 'Pengalaman & Minat', 'Selesai']}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800">Memproses laporan Anda...</h2>
            <p className="text-gray-600 mt-2">Mohon tunggu beberapa saat</p>
          </div>
        </div>
      </FlowLayout>
    );
  }

  if (error || !reportData) {
    return (
      <FlowLayout pageTitle="Error" currentStep={5} stepTitles={['Memahami Minat Anda', 'Latar Belakang Akademik', 'Wawasan Diri', 'Pengalaman & Minat', 'Selesai']}>
        <div className="text-center py-12">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Terjadi Kesalahan</h2>
          <p className="text-gray-600 mb-6">{error || 'Data laporan tidak ditemukan'}</p>
          <button
            onClick={handleBackToStart}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Kembali ke Awal
          </button>
        </div>
      </FlowLayout>
    );
  }

  return (
    <FlowLayout pageTitle="Laporan Analisis Neurvia" currentStep={5} stepTitles={['Memahami Minat Anda', 'Latar Belakang Akademik', 'Wawasan Diri', 'Pengalaman & Minat', 'Selesai']}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-green-600 text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Laporan Analisis Anda Siap!</h1>
          <p className="text-gray-600">
            Berdasarkan jawaban Anda, AI kami telah menganalisis profil minat dan bakat Anda
          </p>
        </div>

        {/* Report Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">ID Laporan</h2>
              <p className="text-gray-600 text-sm">Simpan ID ini untuk referensi</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-lg font-semibold text-green-600">{reportData.report_id}</p>
              <p className="text-gray-500 text-xs">Dibuat pada {new Date().toLocaleString('id-ID')}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={handleDownloadPDF}
            disabled={!reportData.pdf_download_url}
            className={`p-4 rounded-lg text-center font-semibold transition-colors ${
              reportData.pdf_download_url
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <div className="text-2xl mb-2">📄</div>
            <div>Download PDF Laporan</div>
            {!reportData.pdf_download_url && (
              <div className="text-xs mt-1">Sedang diproses...</div>
            )}
          </button>

          <button
            onClick={handleBackToStart}
            className="p-4 rounded-lg text-center font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <div className="text-2xl mb-2">🔄</div>
            <div>Buat Laporan Baru</div>
          </button>
        </div>

        {/* Additional Info */}
        <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
          <h3 className="font-semibold mb-2">Tips:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Simpan PDF laporan Anda untuk referensi di masa depan</li>
            <li>Bagikan laporan dengan orang tua atau konselor untuk diskusi lebih lanjut</li>
            <li>Gunakan hasil analisis untuk merencanakan pengembangan diri Anda</li>
          </ul>
        </div>
      </div>
    </FlowLayout>
  );
}