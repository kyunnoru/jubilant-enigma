// src/pages/neurvia/step-2.tsx

import { useRouter } from 'next/router';
import { useNeurviaStore } from '@/store/neurviaStore';
import { FormEvent, useState, useEffect, useRef } from 'react';
import FlowLayout from '@/components/FlowLayout';

export default function Step2Page() {
  const router = useRouter();
  
  // Fix: Use separate selectors to prevent infinite loops
  const initialAcademicData = useNeurviaStore((state) => state.academic);
  const setAcademicData = useNeurviaStore((state) => state.setAcademicData);
  
  const [formData, setFormData] = useState(initialAcademicData);

  // Route guard completely removed to fix infinite loop
  // We'll add it back later with a better approach

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Untuk input angka, konversi ke number jika tidak kosong
    const finalValue = e.target.type === 'number' && value !== '' ? parseFloat(value) : value;
    setFormData({ ...formData, [name]: finalValue });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setAcademicData(formData);
    router.push('/neurvia/step-3');
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
            className="mt-2 block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
            placeholder="Contoh: 85.5" required
          />
        </div>

        {/* Nilai IPS */}
        <div>
          <label htmlFor="nilai_rata2_ips" className="block text-sm font-medium leading-6 text-gray-900">Nilai Rata-rata IPS</label>
          <input
            type="number" step="0.1" min="0" max="100"
            name="nilai_rata2_ips" id="nilai_rata2_ips"
            value={formData.nilai_rata2_ips} onChange={handleChange}
            className="mt-2 block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
            placeholder="Contoh: 82.0" required
          />
        </div>
        
        {/* Ekstrakurikuler */}
        <div>
          <label htmlFor="ekstrakurikuler_utama_id" className="block text-sm font-medium leading-6 text-gray-900">Ekstrakurikuler Utama</label>
          <select
            name="ekstrakurikuler_utama_id"
            id="ekstrakurikuler_utama_id"
            value={formData.ekstrakurikuler_utama_id} onChange={handleChange}
            className="mt-2 block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
            required
          >
            <option value="" disabled>Pilih salah satu...</option>
            <option value="1">Organisasi (OSIS, MPK)</option>
            <option value="2">Olahraga (Basket, Futsal, dll)</option>
            <option value="3">Seni (Musik, Tari, Teater)</option>
            <option value="4">Akademik (KIR, Olimpiade)</option>
            <option value="5">Keagamaan (Rohis, Rokris)</option>
            <option value="6">Lainnya</option>
          </select>
        </div>
        
        {/* Tipe Sekolah */}
        <div>
          <label htmlFor="tipe_sekolah_id" className="block text-sm font-medium leading-6 text-gray-900">Tipe Sekolah</label>
          <select
            name="tipe_sekolah_id" id="tipe_sekolah_id"
            value={formData.tipe_sekolah_id} onChange={handleChange}
            className="mt-2 block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
            required
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