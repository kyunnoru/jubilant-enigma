// src/store/neurviaStore.ts

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// ============================================================================
// 1. DEFINISI TIPE (TYPESCRIPT)
// Mendefinisikan "bentuk" atau "cetakan biru" dari data kita.
// Ini memberikan keamanan tipe dan auto-completion di seluruh aplikasi.
// ============================================================================

interface PsychometricData {
  riasec: Record<string, any>;
  ocean: Record<string, any>;
  vak: Record<string, any>;
}

interface AcademicData {
  nilai_rata2_mipa: number | string;
  nilai_rata2_ips: number | string;
  ekstrakurikuler_utama_id: string;
  tipe_sekolah_id: string;
}

interface QualitativeData {
  penasaran_mapel: string;
  kegiatan_luar_sekolah: string;
  ide_ciptaan: string;
}

interface NeurviaState {
  psychometric: PsychometricData;
  academic: AcademicData;
  qualitative: QualitativeData;
}

interface NeurviaActions {
  setPsychometricData: (data: Partial<PsychometricData>) => void;
  setAcademicData: (data: Partial<AcademicData>) => void;
  setQualitativeData: (data: Partial<QualitativeData>) => void;
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
    tipe_sekolah_id: '',
  },
  qualitative: {
    penasaran_mapel: '',
    kegiatan_luar_sekolah: '',
    ide_ciptaan: '',
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