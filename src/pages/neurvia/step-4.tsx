// src/pages/neurvia/step-4.tsx

import { useRouter } from 'next/router';
import { useNeurviaStore } from '../../store/neurviaStore';
import { FormEvent, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import FlowLayout from '../../components/FlowLayout';

export default function Step4Page() {
  const router = useRouter();
  
  // Fix: Use separate selectors to prevent infinite loops
  const initialExperientialData = useNeurviaStore((state) => state.experiential);
  const setExperientialData = useNeurviaStore((state) => state.setExperientialData);
  const { psychometric, academic, qualitative } = useNeurviaStore();
  
  const [formData, setFormData] = useState(initialExperientialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    
    // Validasi proyek pribadi
    if (!formData.deskripsi_proyek_pribadi || formData.deskripsi_proyek_pribadi.trim().length < 10) {
      newErrors.deskripsi_proyek_pribadi = 'Mohon ceritakan proyek pribadi Anda (minimal 10 karakter)';
    }
    
    // Validasi topik YouTube favorit
    if (!formData.topik_youtube_favorit || formData.topik_youtube_favorit.trim().length < 10) {
      newErrors.topik_youtube_favorit = 'Mohon sebutkan topik YouTube favorit Anda (minimal 10 karakter)';
    }
    
    // Validasi buku non-fiksi terakhir
    if (!formData.jenis_buku_non_fiksi_terakhir || formData.jenis_buku_non_fiksi_terakhir.trim().length < 10) {
      newErrors.jenis_buku_non_fiksi_terakhir = 'Mohon sebutkan buku non-fiksi terakhir yang Anda baca (minimal 10 karakter)';
    }
    
    // Validasi podcast atau artikel
    if (!formData.podcast_atau_artikel_yang_diikuti || formData.podcast_atau_artikel_yang_diikuti.trim().length < 10) {
      newErrors.podcast_atau_artikel_yang_diikuti = 'Mohon sebutkan podcast atau artikel yang Anda ikuti (minimal 10 karakter)';
    }
    
    // Validasi keterampilan otodidak
    if (!formData.keterampilan_otodidak || formData.keterampilan_otodidak.trim().length < 10) {
      newErrors.keterampilan_otodidak = 'Mohon sebutkan keterampilan yang Anda pelajari sendiri (minimal 10 karakter)';
    }
    
    // Validasi peran di organisasi
    if (!formData.peran_di_organisasi || formData.peran_di_organisasi.trim().length < 10) {
      newErrors.peran_di_organisasi = 'Mohon ceritakan pengalaman organisasi Anda (minimal 10 karakter)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setError(null);

    // 2. Simpan data experiential terakhir ke store sesaat sebelum mengirim
    setExperientialData(formData);

    // 3. Gabungkan semua data dari store menjadi satu payload JSON
    const finalPayload = {
      psychometric,
      academic,
      qualitative,
      experiential: { ...formData }, // Pastikan menggunakan data form terbaru
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

    } catch (err: unknown) {
      // 6. Jika gagal, tampilkan pesan error
      let errorMessage = "Terjadi kesalahan yang tidak diketahui.";
      
      if (typeof err === 'object' && err !== null) {
        if ('response' in err) {
          const axiosError = err as { response?: { data?: { message?: string } } };
          errorMessage = axiosError.response?.data?.message || "Terjadi kesalahan pada server";
        } else if ('message' in err) {
          errorMessage = (err as { message: string }).message;
        }
      }
      
      setError(`Gagal membuat laporan: ${errorMessage}`);
      setIsLoading(false); // Hentikan loading agar pengguna bisa mencoba lagi
    }
  };

  const firstInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  return (
    <FlowLayout pageTitle="Langkah 4: Pengalaman & Minat" currentStep={4} stepTitles={['Memahami Minat Anda', 'Latar Belakang Akademik', 'Wawasan Diri', 'Pengalaman & Minat', 'Selesai']}>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Pengalaman & Minat</h2>
      <p className="text-gray-600 mb-8">
        Bagian ini membantu AI kami memahami minat, kreativitas, dan pengalaman Anda di luar kurikulum formal.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Proyek Pribadi */}
        <div>
          <label htmlFor="deskripsi_proyek_pribadi" className="block text-sm font-medium leading-6 text-gray-900">
            Proyek Pribadi (Personal Projects)
          </label>
          <textarea
            name="deskripsi_proyek_pribadi"
            id="deskripsi_proyek_pribadi"
            rows={3}
            value={formData.deskripsi_proyek_pribadi} onChange={handleChange}
            className={`mt-2 block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ${
              errors.deskripsi_proyek_pribadi
                ? 'ring-2 ring-red-500 border-red-500'
                : 'ring-gray-300'
            }`}
            placeholder="Contoh: Saya membuat bot Discord untuk teman-teman gaming saya, Saya menulis cerita fiksi di Wattpad, Saya membongkar radio bekas untuk melihat isinya."
          />
          {errors.deskripsi_proyek_pribadi && (
            <p className="mt-1 text-sm text-red-600">{errors.deskripsi_proyek_pribadi}</p>
          )}
        </div>

        {/* Konsumsi Konten & Informasi */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Konsumsi Konten & Informasi</h3>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="topik_youtube_favorit" className="block text-sm font-medium leading-6 text-gray-900">
                Topik YouTube Favorit
              </label>
              <textarea
                name="topik_youtube_favorit"
                id="topik_youtube_favorit"
                rows={2}
                value={formData.topik_youtube_favorit} onChange={handleChange}
                className={`mt-2 block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                  errors.topik_youtube_favorit
                    ? 'ring-2 ring-red-500 border-red-500'
                    : 'ring-gray-300'
                }`}
                placeholder="Contoh: Fisika Kuantum oleh 'Kurzgesagt', Tutorial coding oleh 'Dea Afrizal', Analisis film oleh 'Cinema Therapy'"
              />
              {errors.topik_youtube_favorit && (
                <p className="mt-1 text-sm text-red-600">{errors.topik_youtube_favorit}</p>
              )}
            </div>

            <div>
              <label htmlFor="jenis_buku_non_fiksi_terakhir" className="block text-sm font-medium leading-6 text-gray-900">
                Jenis Buku Non-Fiksi Terakhir
              </label>
              <textarea
                name="jenis_buku_non_fiksi_terakhir"
                id="jenis_buku_non_fiksi_terakhir"
                rows={2}
                value={formData.jenis_buku_non_fiksi_terakhir} onChange={handleChange}
                className={`mt-2 block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                  errors.jenis_buku_non_fiksi_terakhir
                    ? 'ring-2 ring-red-500 border-red-500'
                    : 'ring-gray-300'
                }`}
                placeholder="Contoh: 'Sapiens' karya Yuval Noah Harari, 'Thinking, Fast and Slow' karya Daniel Kahneman"
              />
              {errors.jenis_buku_non_fiksi_terakhir && (
                <p className="mt-1 text-sm text-red-600">{errors.jenis_buku_non_fiksi_terakhir}</p>
              )}
            </div>

            <div>
              <label htmlFor="podcast_atau_artikel_yang_diikuti" className="block text-sm font-medium leading-6 text-gray-900">
                Podcast atau Artikel yang Diikuti
              </label>
              <textarea
                name="podcast_atau_artikel_yang_diikuti"
                id="podcast_atau_artikel_yang_diikuti"
                rows={2}
                value={formData.podcast_atau_artikel_yang_diikuti} onChange={handleChange}
                className={`mt-2 block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                  errors.podcast_atau_artikel_yang_diikuti
                    ? 'ring-2 ring-red-500 border-red-500'
                    : 'ring-gray-300'
                }`}
                placeholder="Menunjukkan rasa ingin tahu intelektual di luar sekolah"
              />
              {errors.podcast_atau_artikel_yang_diikuti && (
                <p className="mt-1 text-sm text-red-600">{errors.podcast_atau_artikel_yang_diikuti}</p>
              )}
            </div>
          </div>
        </div>

        {/* Keterampilan yang Dipelajari Sendiri */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Keterampilan yang Dipelajari Sendiri (Self-Taught Skills)</h3>
          <div>
            <label htmlFor="keterampilan_otodidak" className="block text-sm font-medium leading-6 text-gray-900">
              Keterampilan Otodidak
            </label>
            <textarea
              name="keterampilan_otodidak"
              id="keterampilan_otodidak"
              rows={2}
              value={formData.keterampilan_otodidak} onChange={handleChange}
              className={`mt-2 block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                errors.keterampilan_otodidak
                  ? 'ring-2 ring-red-500 border-red-500'
                  : 'ring-gray-300'
              }`}
              placeholder="Contoh: Python dasar, Editing video dengan CapCut, Desain grafis dengan Canva, Bermain gitar"
            />
            {errors.keterampilan_otodidak && (
              <p className="mt-1 text-sm text-red-600">{errors.keterampilan_otodidak}</p>
            )}
          </div>
        </div>

        {/* Pengalaman Organisasi & Relawan */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Pengalaman Organisasi & Relawan</h3>
          <div>
            <label htmlFor="peran_di_organisasi" className="block text-sm font-medium leading-6 text-gray-900">
              Peran di Organisasi
            </label>
            <textarea
              name="peran_di_organisasi"
              id="peran_di_organisasi"
              rows={2}
              value={formData.peran_di_organisasi} onChange={handleChange}
              className={`mt-2 block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                errors.peran_di_organisasi
                  ? 'ring-2 ring-red-500 border-red-500'
                  : 'ring-gray-300'
              }`}
              placeholder="Contoh: Bendahara OSIS, Anggota klub robotik, Relawan di panti asuhan. Ini menunjukkan kemampuan interpersonal dan tanggung jawab."
            />
            {errors.peran_di_organisasi && (
              <p className="mt-1 text-sm text-red-600">{errors.peran_di_organisasi}</p>
            )}
          </div>
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
          {isLoading ? 'Membuat Laporan...' : 'Selesaikan & Buat Laporan Saya'}
        </button>
      </form>
    </FlowLayout>
  );
}