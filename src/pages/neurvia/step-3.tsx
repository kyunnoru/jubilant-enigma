// src/pages/neurvia/step-3.tsx

import { useRouter } from 'next/router';
import Head from 'next/head';
import { useNeurviaStore } from '@/store/neurviaStore';
import ProgressBar from '@/components/ProgressBar';
import LoadingSpinner from '@/components/LoadingSpinner';
import { FormEvent, useState, useEffect } from 'react';
import axios from 'axios';
import FlowLayout from '@/components/FlowLayout';


export default function Step3Page() {
  const router = useRouter();

  // Route guard completely removed to fix infinite loop
  // We'll add it back later with a better approach

  // 1. Ambil SEMUA data dan aksi yang dibutuhkan dari Zustand
  const { 
    qualitative: initialQualitativeData, 
    setQualitativeData,
    psychometric,
    academic
  } = useNeurviaStore();

  // State lokal khusus untuk halaman ini
  const [formData, setFormData] = useState(initialQualitativeData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // 2. Simpan data kualitatif terakhir ke store sesaat sebelum mengirim
    setQualitativeData(formData);

    // 3. Gabungkan semua data dari store menjadi satu payload JSON
    const finalPayload = {
      psychometric,
      academic,
      qualitative: { ...formData }, // Pastikan menggunakan data form terbaru
    };

    try {
      // 4. Kirim request POST ke API generate-report (proxy)
      const response = await axios.post('/api/generate-report', finalPayload);

      // 5. Jika sukses, arahkan ke halaman hasil dengan ID dari backend
      const { report_id, pdf_download_url } = response.data as { report_id: string; pdf_download_url: string };
      if (report_id) {
        const query = pdf_download_url ? `?pdf=${encodeURIComponent(pdf_download_url)}` : '';
        router.push(`/neurvia/result/${report_id}${query}`);
      } else {
        throw new Error("Respons dari server tidak valid.");
      }

    } catch (err: any) {
      // 6. Jika gagal, tampilkan pesan error
      const errorMessage = err.response?.data?.message || err.message || "Terjadi kesalahan yang tidak diketahui.";
      setError(`Gagal membuat laporan: ${errorMessage}`);
      setIsLoading(false); // Hentikan loading agar pengguna bisa mencoba lagi
    }
  };

  // 7. Tampilkan komponen LoadingSpinner jika sedang loading
  if (isLoading) {
    return (
      <LoadingSpinner
        title="AI kami sedang menganalisis profil Anda..."
        message="Ini mungkin membutuhkan waktu sekitar 1-2 menit. Mohon jangan menutup halaman ini."
      />
    );
  }

  return (
    <FlowLayout
      pageTitle="Langkah 3: Wawasan Diri"
      currentStep={3}
      stepTitles={['Memahami Minat Anda', 'Latar Belakang Akademik', 'Wawasan Diri', 'Selesai']}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Sedikit Tentang Anda</h2>
      <p className="text-gray-600 mb-6">
        Jawabanmu di sini memberikan "sentuhan manusia" pada laporan AI kami.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="penasaran_mapel" className="block text-sm font-medium leading-6 text-gray-900">
            Apa mata pelajaran yang paling membuatmu penasaran, dan mengapa?
          </label>
          <textarea
            name="penasaran_mapel" id="penasaran_mapel" rows={4}
            value={formData.penasaran_mapel} onChange={handleChange}
            className="mt-2 block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
            required minLength={20}
          />
          <p className="mt-1 text-xs text-gray-500">Jelaskan secara singkat (minimal 20 karakter).</p>
        </div>

        <div>
          <label htmlFor="kegiatan_luar_sekolah" className="block text-sm font-medium leading-6 text-gray-900">
            Di luar sekolah, kegiatan apa yang paling kamu nikmati dan membuatmu lupa waktu?
          </label>
          <textarea
            name="kegiatan_luar_sekolah" id="kegiatan_luar_sekolah" rows={4}
            value={formData.kegiatan_luar_sekolah} onChange={handleChange}
            className="mt-2 block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
            required minLength={20}
          />
        </div>
        
        <div>
          <label htmlFor="ide_ciptaan" className="block text-sm font-medium leading-6 text-gray-900">
            Jika kamu bisa menciptakan atau memperbaiki apa pun di dunia, apa yang akan kamu buat?
          </label>
          <textarea
            name="ide_ciptaan" id="ide_ciptaan" rows={4}
            value={formData.ide_ciptaan} onChange={handleChange}
            className="mt-2 block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
            required minLength={20}
          />
        </div>
        
        {/* Tampilkan pesan error jika ada */}
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        )}
        
        <button
          type="submit"
          disabled={isLoading}
          className="!mt-8 w-full rounded-md bg-green-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Selesaikan & Buat Laporan Saya
        </button>
      </form>
    </FlowLayout>
  );
}