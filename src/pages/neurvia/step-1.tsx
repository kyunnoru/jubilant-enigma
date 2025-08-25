// src/pages/neurvia/step-1C.tsx

import { useRouter } from 'next/router';
import { useNeurviaStore } from '../../store/neurviaStore';
import FlowLayout, { STEP_TITLES } from '../../components/FlowLayout';
import { FormEvent, useState } from 'react';
import { useSession } from 'next-auth/react';
import SubProgressBar from '../../components/SubProgressBar';
import QuestionMultipleChoice from '../../components/QuestionMultipleChoice'; // <-- Impor komponen baru

// --- Data Pertanyaan VAK yang Anda berikan ---
const vakQuestions = [
  {
    id: 1,
    question: 'Saat mempelajari sesuatu yang baru, kamu lebih suka...',
    options: {
      v: 'Melihat diagram atau video',
      a: 'Mendengarkan penjelasan',
      k: 'Langsung mencoba sendiri'
    }
  },
  {
    id: 2,
    question: 'Saat membaca buku, kamu lebih suka...',
    options: {
      v: 'Membayangkan visualisasinya',
      a: 'Membaca keras-keras',
      k: 'Membuat catatan sambil membaca'
    }
  },
  {
    id: 3,
    question: 'Kamu lebih mudah mengingat...',
    options: {
      v: 'Gambar atau warna',
      a: 'Suara atau musik',
      k: 'Aktivitas yang kamu lakukan'
    }
  },
  {
    id: 4,
    question: 'Dalam kelas, kamu lebih fokus saat...',
    options: {
      v: 'Ada presentasi visual',
      a: 'Guru berbicara jelas',
      k: 'Ada praktik langsung'
    }
  },
  {
    id: 5,
    question: 'Kamu lebih suka belajar dengan...',
    options: {
      v: 'Melihat slide atau grafik',
      a: 'Mendengarkan rekaman',
      k: 'Mengerjakan langsung atau simulasi'
    }
  },
  {
    id: 6,
    question: 'Ketika orang menjelaskan arah jalan, kamu lebih suka...',
    options: {
      v: 'Melihat peta',
      a: 'Mendengarnya dijelaskan',
      k: 'Menelusurinya sendiri'
    }
  },
  {
    id: 7,
    question: 'Kamu merasa paling nyaman saat belajar...',
    options: {
      v: 'Di tempat terang dan tenang',
      a: 'Saat ada musik lembut',
      k: 'Dengan bergerak bebas'
    }
  },
  {
    id: 8,
    question: 'Ketika marah atau stres, kamu cenderung...',
    options: {
      v: 'Membayangkan solusi',
      a: 'Bicara dengan seseorang',
      k: 'Melakukan sesuatu (jalan, nulis)'
    }
  },
  {
    id: 9,
    question: 'Gaya mencatatmu...',
    options: {
      v: 'Skema, warna-warni',
      a: 'Singkat dan berupa kata-kata',
      k: 'Jarang mencatat, lebih fokus mencoba'
    }
  },
  {
    id: 10,
    question: 'Kamu menyukai guru yang...',
    options: {
      v: 'Menggunakan media visual',
      a: 'Jelas dan ekspresif saat bicara',
      k: 'Mengajak praktik dan aktif'
    }
  },
  {
    id: 11,
    question: 'Saat menonton film, kamu paling menikmati...',
    options: {
      v: 'Visual dan sinematografi',
      a: 'Dialog dan suara karakter',
      k: 'Adegan aksi atau emosional'
    }
  },
  {
    id: 12,
    question: 'Kamu mengingat wajah orang lebih baik daripada...',
    options: {
      v: 'Nama mereka',
      a: 'Suara mereka',
      k: 'Perasaan saat bersamanya'
    }
  },
  {
    id: 13,
    question: 'Dalam diskusi kelompok, kamu biasanya...',
    options: {
      v: 'Membuat mind map atau catatan',
      a: 'Aktif berbicara',
      k: 'Mengerjakan atau menyusun alat'
    }
  },
  {
    id: 14,
    question: 'Saat belajar bahasa asing, kamu lebih suka...',
    options: {
      v: 'Menonton film dengan subtitle',
      a: 'Mendengarkan lagu atau podcast',
      k: 'Bermain peran atau game'
    }
  },
  {
    id: 15,
    question: 'Kamu lebih cepat mengerti...',
    options: {
      v: 'Gambar atau infografis',
      a: 'Penjelasan verbal',
      k: 'Demonstrasi fisik'
    }
  },
  {
    id: 16,
    question: 'Kamu merasa kesulitan belajar jika...',
    options: {
      v: 'Tidak ada visual pendukung',
      a: 'Tidak ada suara atau penjelasan',
      k: 'Harus duduk diam terlalu lama'
    }
  },
  {
    id: 17,
    question: 'Saat presentasi, kamu biasanya...',
    options: {
      v: 'Menyiapkan slide menarik',
      a: 'Latihan berbicara',
      k: 'Berjalan atau gerak di depan'
    }
  },
  {
    id: 18,
    question: 'Di waktu luang, kamu suka...',
    options: {
      v: 'Menggambar atau melihat foto',
      a: 'Mendengarkan musik atau podcast',
      k: 'Olahraga atau crafting'
    }
  },
  {
    id: 19,
    question: 'Kamu lebih suka mengingat sesuatu dengan...',
    options: {
      v: 'Melihat catatan atau gambar',
      a: 'Mengucapkannya keras-keras',
      k: 'Melakukan aktivitas terkait'
    }
  },
  {
    id: 20,
    question: 'Saat ujian, kamu mengingat materi dari...',
    options: {
      v: 'Gambar di buku atau papan tulis',
      a: 'Suara guru saat menjelaskan',
      k: 'Saat latihan soal atau praktik'
    }
  },
  {
    id: 21,
    question: 'Hal yang paling menarik perhatianmu...',
    options: {
      v: 'Warna dan bentuk',
      a: 'Suara atau nada',
      k: 'Tekstur atau gerakan'
    }
  },
  {
    id: 22,
    question: 'Kamu menyukai acara seperti...',
    options: {
      v: 'Pameran seni atau visual',
      a: 'Talkshow atau podcast',
      k: 'Workshop atau demo langsung'
    }
  },
  {
    id: 23,
    question: 'Ketika menghadapi masalah, kamu cenderung...',
    options: {
      v: 'Menganalisis dengan grafik/visual',
      a: 'Berdiskusi',
      k: 'Mencoba berbagai solusi langsung'
    }
  },
  {
    id: 24,
    question: 'Kamu cenderung menyukai...',
    options: {
      v: 'Desain dan tampilan',
      a: 'Lagu dan suara',
      k: 'Aktivitas fisik atau gerakan'
    }
  },
  {
    id: 25,
    question: 'Kamu belajar paling efektif saat...',
    options: {
      v: 'Menonton tutorial',
      a: 'Mendengarkan penjelasan',
      k: 'Ikut dalam simulasi atau eksperimen'
    }
  },
  {
    id: 26,
    question: 'Saat membaca novel, kamu fokus pada...',
    options: {
      v: 'Deskripsi visual tempat/karakter',
      a: 'Percakapan antar tokoh',
      k: 'Aksi dan kejadian dramatis'
    }
  },
  {
    id: 27,
    question: 'Kamu memilih catatan yang...',
    options: {
      v: 'Bergambar dan berwarna',
      a: 'Hanya berisi poin penting',
      k: 'Disertai coretan hasil percobaan'
    }
  },
  {
    id: 28,
    question: 'Kamu menyukai musik karena...',
    options: {
      v: 'Video klip dan gaya visual',
      a: 'Lirik dan suara penyanyi',
      k: 'Irama dan gerakan saat mendengarnya'
    }
  },
  {
    id: 29,
    question: 'Jika kamu menghadapi tugas kelompok...',
    options: {
      v: 'Mendesain slide/presentasi',
      a: 'Menjadi pembicara',
      k: 'Menyiapkan bahan atau alat'
    }
  },
  {
    id: 30,
    question: 'Saat menulis, kamu lebih suka...',
    options: {
      v: 'Menghias tulisanmu dengan warna',
      a: 'Membaca keras-keras tulisannya',
      k: 'Menulis sambil bergerak atau berdiri'
    }
  }
];

export default function Step1CPage() {
  const router = useRouter();
  const { data: session, status } = useSession({ required: true, onUnauthenticated: () => router.push('/auth/signin') });

  const { psychometric, setPsychometricData } = useNeurviaStore();
  // State akan menyimpan jawaban seperti: { 1: 'v', 2: 'k', 3: 'a', ... }
  const [answers, setAnswers] = useState<Record<number, 'v' | 'a' | 'k'>>(() => psychometric.vak || {});

  const handleSelectAnswer = (questionId: number, value: 'v' | 'a' | 'k') => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const allQuestionsAnswered = vakQuestions.every(q => answers[q.id] !== undefined);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!allQuestionsAnswered) return;
    
    // Simpan data mentah VAK. Scoring (menghitung jumlah v, a, k) akan dilakukan di backend.
    setPsychometricData({ vak: answers });
    
    // Selesai dengan Step 1, sekarang arahkan ke Step 2
    router.push('/neurvia/step-2');
  };

  if (status === 'loading' || !session) return <div>Loading...</div>; // Ganti dengan loading state Anda

  return (
    <FlowLayout pageTitle="Step 1: Psychometric Assessment" currentStep={1} stepTitles={STEP_TITLES}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          {/* ... Header yang sama seperti step-1 ... */}
        </div>
        <form onSubmit={handleSubmit}>
          <SubProgressBar currentPart={3} totalParts={3} partTitle="Gaya Belajar (VAK)" />
          <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-lg border border-slate-100">
            {vakQuestions.map((q) => (
              <QuestionMultipleChoice
                key={q.id}
                questionId={q.id}
                questionText={q.question}
                options={q.options}
                selectedValue={answers[q.id] ?? null}
                onSelect={handleSelectAnswer}
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              type="submit"
              disabled={!allQuestionsAnswered}
              className="px-8 py-4 bg-slate-900 text-white ... disabled:opacity-50 ..."
            >
              Continue to Next Step
            </button>
          </div>
        </form>
      </div>
    </FlowLayout>
  );
}