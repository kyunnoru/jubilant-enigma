// src/pages/neurvia/step-3.tsx

import { useRouter } from 'next/router';
import Head from 'next/head';
import { useNeurviaStore } from '../../store/neurviaStore';
import ProgressBar from '../../components/ProgressBar';
import { FormEvent, useState, useEffect } from 'react';
import FlowLayout from '../../components/FlowLayout';


export default function Step3Page() {
  const router = useRouter();

  const {
    qualitative: initialQualitativeData,
    setQualitativeData,
    psychometric,
    academic,
    experiential
  } = useNeurviaStore();

  // State lokal khusus untuk halaman ini
  const [formData, setFormData] = useState(initialQualitativeData);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Hapus error saat user mulai mengetik
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Validasi pikiran waktu luang
    if (!formData.pikiran_waktu_luang || formData.pikiran_waktu_luang.trim().length < 20) {
      newErrors.pikiran_waktu_luang = 'Mohon jelaskan pikiran atau topik yang sering kamu pikirkan (minimal 20 karakter)';
    }
    
    // Validasi kegiatan yang nikmat
    if (!formData.kegiatan_nikmat || formData.kegiatan_nikmat.trim().length < 20) {
      newErrors.kegiatan_nikmat = 'Mohon jelaskan kegiatan yang kamu nikmati (minimal 20 karakter)';
    }
    
    // Validasi ciptaan bangga
    if (!formData.ciptaan_bangga || formData.ciptaan_bangga.trim().length < 20) {
      newErrors.ciptaan_bangga = 'Mohon ceritakan ciptaan atau perbaikan yang membuatmu bangga (minimal 20 karakter)';
    }
    
    // Validasi bagian yang nikmat
    if (!formData.bagian_nikmat || formData.bagian_nikmat.trim().length < 20) {
      newErrors.bagian_nikmat = 'Mohon sebutkan bagian pekerjaan yang paling kamu nikmati (minimal 20 karakter)';
    }
    
    // Validasi keterampilan baru
    if (!formData.keterampilan_baru || formData.keterampilan_baru.trim().length < 20) {
      newErrors.keterampilan_baru = 'Mohon ceritakan pengalaman mempelajari keterampilan baru (minimal 20 karakter)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setQualitativeData(formData);
      router.push('/neurvia/step-4');
    }
  };


  return (
    <FlowLayout
      pageTitle="Langkah 3: Wawasan Diri"
      currentStep={3}
      stepTitles={['Memahami Minat Anda', 'Latar Belakang Akademik', 'Wawasan Diri', 'Pengalaman & Minat', 'Selesai']}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Sedikit Tentang Anda</h2>
      <p className="text-gray-600 mb-6">
        Jawabanmu di sini memberikan &quot;sentuhan manusia&quot; pada laporan AI kami.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="pikiran_waktu_luang" className="block text-sm font-medium leading-6 text-gray-900">
            Lepas dari semua mata pelajaran di sekolah, topik, ide, atau masalah spesifik apa yang paling sering kamu pikirkan atau cari tahu sendiri di waktu luang? Apa yang membuatmu terus penasaran tentang hal itu?
          </label>
          <textarea
            name="pikiran_waktu_luang" id="pikiran_waktu_luang" rows={4}
            value={formData.pikiran_waktu_luang} onChange={handleChange}
            className={`mt-2 block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ${
              errors.pikiran_waktu_luang
                ? 'ring-2 ring-red-500 border-red-500'
                : 'ring-gray-300'
            }`}
            required minLength={20}
          />
          {errors.pikiran_waktu_luang && (
            <p className="mt-1 text-sm text-red-600">{errors.pikiran_waktu_luang}</p>
          )}
          {!errors.pikiran_waktu_luang && (
            <p className="mt-1 text-xs text-gray-500">Jelaskan secara singkat (minimal 20 karakter).</p>
          )}
        </div>

        <div>
          <label htmlFor="kegiatan_nikmat" className="block text-sm font-medium leading-6 text-gray-900">
            Di luar sekolah, kegiatan apa yang paling kamu nikmati dan membuatmu lupa waktu?
          </label>
          <textarea
            name="kegiatan_nikmat" id="kegiatan_nikmat" rows={4}
            value={formData.kegiatan_nikmat} onChange={handleChange}
            className={`mt-2 block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ${
              errors.kegiatan_nikmat
                ? 'ring-2 ring-red-500 border-red-500'
                : 'ring-gray-300'
            }`}
            required minLength={20}
          />
          {errors.kegiatan_nikmat && (
            <p className="mt-1 text-sm text-red-600">{errors.kegiatan_nikmat}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="ciptaan_bangga" className="block text-sm font-medium leading-6 text-gray-900">
            Bayangkan 15 tahun dari sekarang, kamu berhasil menciptakan atau memperbaiki sesuatu yang membuatmu sangat bangga. Jelaskan ciptaan atau perbaikan itu dan dampak spesifik apa yang dihasilkannya bagi orang lain?
          </label>
          <textarea
            name="ciptaan_bangga" id="ciptaan_bangga" rows={4}
            value={formData.ciptaan_bangga} onChange={handleChange}
            className={`mt-2 block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ${
              errors.ciptaan_bangga
                ? 'ring-2 ring-red-500 border-red-500'
                : 'ring-gray-300'
            }`}
            required minLength={20}
          />
          {errors.ciptaan_bangga && (
            <p className="mt-1 text-sm text-red-600">{errors.ciptaan_bangga}</p>
          )}
        </div>

        <div>
          <label htmlFor="bagian_nikmat" className="block text-sm font-medium leading-6 text-gray-900">
            Dalam proses mewujudkan hal dari pertanyaan sebelumnya, bagian mana dari pekerjaan itu yang paling kamu nikmati? Apakah saat menganalisis datanya, merancang konsepnya, membangun produknya, atau saat berkomunikasi dengan orang lain?
          </label>
          <textarea
            name="bagian_nikmat" id="bagian_nikmat" rows={4}
            value={formData.bagian_nikmat} onChange={handleChange}
            className={`mt-2 block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ${
              errors.bagian_nikmat
                ? 'ring-2 ring-red-500 border-red-500'
                : 'ring-gray-300'
            }`}
            required minLength={20}
          />
          {errors.bagian_nikmat && (
            <p className="mt-1 text-sm text-red-600">{errors.bagian_nikmat}</p>
          )}
        </div>

        <div>
          <label htmlFor="keterampilan_baru" className="block text-sm font-medium leading-6 text-gray-900">
            Ceritakan sebuah momen ketika kamu berhasil mempelajari sebuah keterampilan baru yang cukup sulit secara mandiri (misal: coding, alat musik, bahasa baru). Apa saja langkah-langkah yang kamu ambil dari tidak bisa sama sekali hingga akhirnya merapa &lsquo;klik&rsquo;?
          </label>
          <textarea
            name="keterampilan_baru" id="keterampilan_baru" rows={4}
            value={formData.keterampilan_baru} onChange={handleChange}
            className={`mt-2 block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ${
              errors.keterampilan_baru
                ? 'ring-2 ring-red-500 border-red-500'
                : 'ring-gray-300'
            }`}
            required minLength={20}
          />
          {errors.keterampilan_baru && (
            <p className="mt-1 text-sm text-red-600">{errors.keterampilan_baru}</p>
          )}
        </div>
        
        <button
          type="submit"
          className="!mt-8 w-full rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500"
        >
          Lanjut ke Pengalaman & Minat
        </button>
      </form>
    </FlowLayout>
  );
}