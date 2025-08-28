// src/pages/neurvia/step-2.tsx

import { useRouter } from 'next/router';
import { useNeurviaStore } from '../../store/neurviaStore';
import { FormEvent, useState, useEffect, useRef } from 'react';
import FlowLayout from '../../components/FlowLayout';

export default function Step2Page() {
  const router = useRouter();
  
  // Fix: Use separate selectors to prevent infinite loops
  const initialAcademicData = useNeurviaStore((state) => state.academic);
  const setAcademicData = useNeurviaStore((state) => state.setAcademicData);
  
  const [formData, setFormData] = useState(initialAcademicData);

  // Route guard completely removed to fix infinite loop
  // We'll add it back later with a better approach

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Untuk input angka, konversi ke number jika tidak kosong
    const finalValue = e.target.type === 'number' && value !== '' ? parseFloat(value) : value;
    setFormData({ ...formData, [name]: finalValue });
    
    // Hapus error saat user mulai mengetik
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Validasi nilai MIPA
    if (!formData.nilai_rata2_mipa) {
      newErrors.nilai_rata2_mipa = 'Mohon isi nilai rata-rata MIPA Anda';
    } else if (typeof formData.nilai_rata2_mipa === 'number' && (formData.nilai_rata2_mipa < 0 || formData.nilai_rata2_mipa > 100)) {
      newErrors.nilai_rata2_mipa = 'Nilai harus antara 0 dan 100';
    }
    
    // Validasi nilai IPS
    if (!formData.nilai_rata2_ips) {
      newErrors.nilai_rata2_ips = 'Mohon isi nilai rata-rata IPS Anda';
    } else if (typeof formData.nilai_rata2_ips === 'number' && (formData.nilai_rata2_ips < 0 || formData.nilai_rata2_ips > 100)) {
      newErrors.nilai_rata2_ips = 'Nilai harus antara 0 dan 100';
    }
    
    // Validasi ekstrakurikuler
    if (!formData.ekstrakurikuler_utama_id) {
      newErrors.ekstrakurikuler_utama_id = 'Mohon pilih ekstrakurikuler utama Anda';
    }
    
    // Validasi olimpiade
    if (!formData.olimpiade_id) {
      newErrors.olimpiade_id = 'Mohon jawab apakah Anda pernah ikut olimpiade';
    }
    
    // Validasi tipe sekolah
    if (!formData.tipe_sekolah_id) {
      newErrors.tipe_sekolah_id = 'Mohon pilih tipe sekolah Anda';
    }
    
    // Validasi olimpiade detail jika user memilih "Iya"
    if (formData.olimpiade_id === '1') {
      if (!formData.olimpiade_tingkat) {
        newErrors.olimpiade_tingkat = 'Mohon pilih tingkat olimpiade';
      }
      if (!formData.olimpiade_bidang) {
        newErrors.olimpiade_bidang = 'Mohon isi bidang olimpiade Anda';
      }
      if (!formData.olimpiade_deskripsi) {
        newErrors.olimpiade_deskripsi = 'Mohon ceritakan pengalaman olimpiade Anda';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setAcademicData(formData);
      router.push('/neurvia/step-3');
    }
  };

  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  return (
    <FlowLayout pageTitle="Langkah 2: Data Akademik" currentStep={2} stepTitles={['Memahami Minat Anda', 'Latar Belakang Akademik', 'Wawasan Diri', 'Selesai']}>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Latar Belakang Akademik</h2>
      <p className="text-gray-600 mb-8">
        Informasi ini membantu AI kami memahami konteks prestasi dan lingkungan belajarmu.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nilai MIPA */}
        <div>
          <label htmlFor="nilai_rata2_mipa" className="block text-sm font-medium leading-6 text-gray-900">Nilai Rata-rata MIPA</label>
          <input
            type="number" step="0.1" min="0" max="100"
            name="nilai_rata2_mipa" id="nilai_rata2_mipa"
            value={formData.nilai_rata2_mipa} onChange={handleChange}
            className={`mt-2 block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ${
              errors.nilai_rata2_mipa
                ? 'ring-2 ring-red-500 border-red-500'
                : 'ring-gray-300'
            }`}
            placeholder="Contoh: 85.5"
          />
          {errors.nilai_rata2_mipa && (
            <p className="mt-1 text-sm text-red-600">{errors.nilai_rata2_mipa}</p>
          )}
        </div>

        {/* Nilai IPS */}
        <div>
          <label htmlFor="nilai_rata2_ips" className="block text-sm font-medium leading-6 text-gray-900">Nilai Rata-rata IPS</label>
          <input
            type="number" step="0.1" min="0" max="100"
            name="nilai_rata2_ips" id="nilai_rata2_ips"
            value={formData.nilai_rata2_ips} onChange={handleChange}
            className={`mt-2 block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ${
              errors.nilai_rata2_ips
                ? 'ring-2 ring-red-500 border-red-500'
                : 'ring-gray-300'
            }`}
            placeholder="Contoh: 82.0"
          />
          {errors.nilai_rata2_ips && (
            <p className="mt-1 text-sm text-red-600">{errors.nilai_rata2_ips}</p>
          )}
        </div>
        
        {/* Ekstrakurikuler */}
        <div>
          <label htmlFor="ekstrakurikuler_utama_id" className="block text-sm font-medium leading-6 text-gray-900">Ekstrakurikuler Utama</label>
          <select
            name="ekstrakurikuler_utama_id"
            id="ekstrakurikuler_utama_id"
            value={formData.ekstrakurikuler_utama_id} onChange={handleChange}
            className={`mt-2 block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ${
              errors.ekstrakurikuler_utama_id
                ? 'ring-2 ring-red-500 border-red-500'
                : 'ring-gray-300'
            }`}
          >
            <option value="" disabled>Pilih salah satu...</option>
            <option value="1">Organisasi (OSIS, MPK)</option>
            <option value="2">Olahraga (Basket, Futsal, dll)</option>
            <option value="3">Seni (Musik, Tari, Teater)</option>
            <option value="4">Akademik (KIR, Olimpiade)</option>
            <option value="5">Keagamaan</option>
            <option value="6">Lainnya</option>
          </select>
        </div>
        
        {/* Olimpiade*/}
        <div>
          <label htmlFor="olimpiade_id" className="block text-sm font-medium leading-6 text-gray-900">Apakah Kamu Pernah Ikut Olimpiade</label>
          <select
            name="olimpiade_id"
            id="olimpiade_id"
            value={formData.olimpiade_id} onChange={handleChange}
            className={`mt-2 block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ${
              errors.olimpiade_id
                ? 'ring-2 ring-red-500 border-red-500'
                : 'ring-gray-300'
            }`}
          >
            <option value="" disabled>Pilih salah satu...</option>
            <option value="1">Iya</option>
            <option value="2">Tidak</option>
          </select>
        </div>

        {/* Additional Olympiad Fields - Conditionally shown when olimpiade_id is "1" (Iya) */}
        {formData.olimpiade_id === '1' && (
          <div className="space-y-4">
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Detail Olimpiade</h3>
              
              {/* Tingkat Olimpiade */}
              <div className="mb-4">
                <label htmlFor="olimpiade_tingkat" className="block text-sm font-medium leading-6 text-gray-900">
                  Olimpiade Tingkat Apa
                </label>
                <select
                  name="olimpiade_tingkat"
                  id="olimpiade_tingkat"
                  value={formData.olimpiade_tingkat} onChange={handleChange}
                  className={`mt-2 block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                    errors.olimpiade_tingkat
                      ? 'ring-2 ring-red-500 border-red-500'
                      : 'ring-gray-300'
                  }`}
                >
                  <option value="" disabled>Pilih tingkat olimpiade...</option>
                  <option value="1">Sekolah</option>
                  <option value="2">Kecamatan</option>
                  <option value="3">Kabupaten/Kota</option>
                  <option value="4">Provinsi</option>
                  <option value="5">Nasional</option>
                  <option value="6">Internasional</option>
                </select>
              </div>

              {/* Bidang Olimpiade */}
              <div className="mb-4">
                <label htmlFor="olimpiade_bidang" className="block text-sm font-medium leading-6 text-gray-900">
                  Olimpiade Bidang Apa
                </label>
                <input
                  type="text"
                  name="olimpiade_bidang"
                  id="olimpiade_bidang"
                  value={formData.olimpiade_bidang} onChange={handleChange}
                  className={`mt-2 block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                    errors.olimpiade_bidang
                      ? 'ring-2 ring-red-500 border-red-500'
                      : 'ring-gray-300'
                  }`}
                  placeholder="Contoh: Matematika, Fisika, Kimia, Biologi, Komputer, dll"
                />
                {errors.olimpiade_bidang && (
                  <p className="mt-1 text-sm text-red-600">{errors.olimpiade_bidang}</p>
                )}
              </div>

              {/* Deskripsi Olimpiade */}
              <div className="mb-4">
                <label htmlFor="olimpiade_deskripsi" className="block text-sm font-medium leading-6 text-gray-900">
                  Ceritakan Pengalaman Olimpiade Kamu
                </label>
                <textarea
                  name="olimpiade_deskripsi"
                  id="olimpiade_deskripsi"
                  value={formData.olimpiade_deskripsi} onChange={handleChange}
                  rows={4}
                  className={`mt-2 block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                    errors.olimpiade_deskripsi
                      ? 'ring-2 ring-red-500 border-red-500'
                      : 'ring-gray-300'
                  }`}
                  placeholder="Ceritakan pengalaman Anda mengikuti olimpiade, termasuk prestasi yang diraih, tantangan yang dihadapi, dan pelajaran yang didapat..."
                />
                {errors.olimpiade_deskripsi && (
                  <p className="mt-1 text-sm text-red-600">{errors.olimpiade_deskripsi}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tipe Sekolah */}
        <div>
          <label htmlFor="tipe_sekolah_id" className="block text-sm font-medium leading-6 text-gray-900">Tipe Sekolah</label>
          <select
            name="tipe_sekolah_id" id="tipe_sekolah_id"
            value={formData.tipe_sekolah_id} onChange={handleChange}
            className={`mt-2 block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ${
              errors.tipe_sekolah_id
                ? 'ring-2 ring-red-500 border-red-500'
                : 'ring-gray-300'
            }`}
          >
            <option value="" disabled>Pilih tipe sekolah...</option>
            <option value="1">SMA Negeri</option>
            <option value="2">SMA Swasta</option>
            <option value="3">SMK</option>
            <option value="4">Madrasah Aliyah (MA)</option>
          </select>
        </div>
        
        <button
          type="submit"
          className="!mt-8 w-full rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500"
        >
          Hampir Selesai!
        </button>
      </form>
    </FlowLayout>
  );
}