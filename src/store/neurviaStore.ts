// src/store/neurviaStore.ts

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// ============================================================================
// 1. DEFINISI TIPE (TYPESCRIPT)
// Mendefinisikan "bentuk" atau "cetakan biru" dari data kita.
// Ini memberikan keamanan tipe dan auto-completion di seluruh aplikasi.
// ============================================================================

interface PsychometricData {
  riasec: Record<string, number>;
  ocean: Record<string, number>;
  vak: Record<string, 'v' | 'a' | 'k'>;
}

interface AcademicData {
  nilai_rata2_mipa: number | string;
  nilai_rata2_ips: number | string;
  ekstrakurikuler_utama_id: string;
  olimpiade_id: string;
  olimpiade_tingkat: string;
  olimpiade_bidang: string;
  olimpiade_deskripsi: string;
  tipe_sekolah_id: string;
}

interface QualitativeData {
  pikiran_waktu_luang: string;
  kegiatan_nikmat: string;
  ciptaan_bangga: string;
  bagian_nikmat: string;
  keterampilan_baru: string;
}

interface ExperientialData {
  deskripsi_proyek_pribadi: string;
  topik_youtube_favorit: string;
  jenis_buku_non_fiksi_terakhir: string;
  podcast_atau_artikel_yang_diikuti: string;
  keterampilan_otodidak: string;
  peran_di_organisasi: string;
}

interface NeurviaState {
  psychometric: PsychometricData;
  academic: AcademicData;
  qualitative: QualitativeData;
  experiential: ExperientialData;
}

interface NeurviaActions {
  setPsychometricData: (data: Partial<PsychometricData>) => void;
  setAcademicData: (data: Partial<AcademicData>) => void;
  setQualitativeData: (data: Partial<QualitativeData>) => void;
  setExperientialData: (data: Partial<ExperientialData>) => void;
  reset: () => void;
}

// ============================================================================
// 2. INITIAL STATE
// Nilai awal dari state saat aplikasi pertama kali dimuat atau saat di-reset.
// ============================================================================

const initialState: NeurviaState = {
  psychometric: {
    riasec: {},
    ocean: {},
    vak: {},
  },
  academic: {
    nilai_rata2_mipa: '',
    nilai_rata2_ips: '',
    ekstrakurikuler_utama_id: '',
    olimpiade_id:'',
    olimpiade_tingkat: '',
    olimpiade_bidang: '',
    olimpiade_deskripsi: '',
    tipe_sekolah_id: '',
  },
  qualitative: {
    pikiran_waktu_luang: '',
    kegiatan_nikmat: '',
    ciptaan_bangga: '',
    bagian_nikmat: '',
    keterampilan_baru: '',
  },
  experiential: {
    deskripsi_proyek_pribadi: '',
    topik_youtube_favorit: '',
    jenis_buku_non_fiksi_terakhir: '',
    podcast_atau_artikel_yang_diikuti: '',
    keterampilan_otodidak: '',
    peran_di_organisasi: '',
  },
};

// ============================================================================
// 3. STORE CREATION
// ============================================================================

export const useNeurviaStore = create<NeurviaState & NeurviaActions>()(
  persist(
    (set) => ({
      ...initialState,

      // Implementasi Aksi
      setPsychometricData: (data) =>
        set((state) => ({
          psychometric: { ...state.psychometric, ...data },
        })),

      setAcademicData: (data) =>
        set((state) => ({
          academic: { ...state.academic, ...data },
        })),

      setQualitativeData: (data) =>
        set((state) => ({
          qualitative: { ...state.qualitative, ...data },
        })),

      setExperientialData: (data) =>
        set((state) => ({
          experiential: { ...state.experiential, ...data },
        })),
      
      // Penting: Modifikasi 'reset' untuk juga membersihkan storage
      reset: () => {
        set(initialState);
        // Opsi: Jika Anda ingin membersihkan localStorage sepenuhnya saat reset.
        // useNeurviaStore.persist.clearStorage(); 
      },
    }),
    {
      // Konfigurasi untuk persist middleware
      name: 'neurvia-user-storage', // Nama key di localStorage
      storage: createJSONStorage(() => localStorage), // Tentukan storage yang digunakan
    }
  )
);