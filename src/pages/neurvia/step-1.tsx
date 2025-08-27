// src/pages/neurvia/step-1.tsx

import { useRouter } from 'next/router';
import { useNeurviaStore } from '../../store/neurviaStore';
import FlowLayout, { STEP_TITLES } from '../../components/FlowLayout';
import { FormEvent, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import QuestionLikert from '../../components/QuestionLikert';
import SubProgressBar from '../../components/SubProgressBar';


const riasecQuestions = [
  { id: 'r_1', text: 'Saya suka memperbaiki barang yang rusak.' },
  { id: 'r_2', text: 'Saya senang bekerja menggunakan tangan, seperti membangun atau memperbaiki sesuatu.' },
  { id: 'r_3', text: 'Saya menikmati kegiatan di luar ruangan seperti berkebun atau berkemah.' },
  { id: 'r_4', text: 'Saya merasa nyaman menggunakan alat dan mesin.' },
  { id: 'r_5', text: 'Saya lebih suka pekerjaan fisik dibanding duduk di depan komputer seharian.' },
  { id: 'r_6', text: 'Saya tertarik menjadi teknisi atau mekanik.' },
  { id: 'r_7', text: 'Saya senang bekerja dengan binatang atau tumbuhan.' },
  { id: 'r_8', text: 'Saya menikmati menggunakan alat berat atau kendaraan besar.' },
  { id: 'r_9', text: 'Saya lebih suka mengikuti instruksi praktis dibanding menulis laporan.' },
  { id: 'r_10', text: 'Saya menyukai pekerjaan dengan hasil nyata yang bisa saya lihat atau sentuh.' },
  { id: 'i_11', text: 'Saya senang memecahkan teka-teki logika atau masalah rumit.' },
  { id: 'i_12', text: 'Saya penasaran terhadap bagaimana sesuatu bekerja.' },
  { id: 'i_13', text: 'Saya tertarik membaca artikel sains atau teknologi.' },
  { id: 'i_14', text: 'Saya suka melakukan eksperimen atau percobaan.' },
  { id: 'i_15', text: 'Saya menikmati menganalisis data dan grafik.' },
  { id: 'i_16', text: 'Saya senang melakukan riset atau penelitian.' },
  { id: 'i_17', text: 'Saya suka menjawab soal matematika atau sains.' },
  { id: 'i_18', text: 'Saya tertarik pada pertanyaan "mengapa" dan "bagaimana".' },
  { id: 'i_19', text: 'Saya ingin bekerja sebagai ilmuwan atau peneliti.' },
  { id: 'i_20', text: 'Saya lebih suka berpikir mendalam daripada melakukan aktivitas fisik.' },
  { id: 'a_21', text: 'Saya senang menulis puisi, cerita, atau lagu.' },
  { id: 'a_22', text: 'Saya merasa kreatif dan suka mengekspresikan diri.' },
  { id: 'a_23', text: 'Saya menikmati menggambar, melukis, atau mendesain.' },
  { id: 'a_24', text: 'Saya tertarik pada teater, film, atau pertunjukan.' },
  { id: 'a_25', text: 'Saya suka musik dan mungkin ingin menciptakannya.' },
  { id: 'a_26', text: 'Saya lebih suka tugas yang bebas dan tidak terlalu terstruktur.' },
  { id: 'a_27', text: 'Saya sering memiliki ide-ide orisinal.' },
  { id: 'a_28', text: 'Saya merasa nyaman di lingkungan yang kreatif dan fleksibel.' },
  { id: 'a_29', text: 'Saya senang membuat kerajinan tangan atau seni visual.' },
  { id: 'a_30', text: 'Saya tertarik pada profesi seperti desainer, seniman, atau penulis.' },
  { id: 's_31', text: 'Saya peduli terhadap kesejahteraan orang lain.' },
  { id: 's_32', text: 'Saya merasa puas saat bisa membantu seseorang.' },
  { id: 's_33', text: 'Saya senang mendengarkan masalah orang dan memberi saran.' },
  { id: 's_34', text: 'Saya tertarik menjadi guru, perawat, atau konselor.' },
  { id: 's_35', text: 'Saya merasa nyaman dalam pekerjaan sosial atau pelayanan masyarakat.' },
  { id: 's_36', text: 'Saya ingin bekerja di bidang pendidikan atau kesehatan.' },
  { id: 's_37', text: 'Saya cenderung sabar dan empatik.' },
  { id: 's_38', text: 'Saya lebih suka bekerja dengan orang daripada dengan data atau mesin.' },
  { id: 's_39', text: 'Saya senang terlibat dalam kegiatan amal atau sukarela.' },
  { id: 's_40', text: 'Saya merasa berenergi saat bisa membantu orang lain berkembang.' },
  { id: 'e_41', text: 'Saya suka memimpin orang lain dalam sebuah proyek.' },
  { id: 'e_42', text: 'Saya tertarik pada bisnis dan kewirausahaan.' },
  { id: 'e_43', text: 'Saya percaya diri dalam menyampaikan pendapat di depan umum.' },
  { id: 'e_44', text: 'Saya menikmati mengambil keputusan penting.' },
  { id: 'e_45', text: 'Saya termotivasi oleh target dan hasil.' },
  { id: 'e_46', text: 'Saya suka menjual ide atau produk.' },
  { id: 'e_47', text: 'Saya tertarik menjadi manajer, pengacara, atau politikus.' },
  { id: 'e_48', text: 'Saya bisa meyakinkan orang untuk mengikuti ide saya.' },
  { id: 'e_49', text: 'Saya merasa nyaman mengambil risiko demi kemajuan.' },
  { id: 'e_50', text: 'Saya percaya saya bisa menjadi pemimpin yang baik.' },
  { id: 'c_51', text: 'Saya menyukai pekerjaan yang memiliki struktur jelas.' },
  { id: 'c_52', text: 'Saya senang mengatur dan merapikan dokumen atau barang.' },
  { id: 'c_53', text: 'Saya tertarik dengan data, angka, dan statistik.' },
  { id: 'c_54', text: 'Saya menikmati membuat laporan atau tabel.' },
  { id: 'c_55', text: 'Saya merasa puas saat mengikuti prosedur atau aturan.' },
  { id: 'c_56', text: 'Saya menyukai pekerjaan administratif atau pengarsipan.' },
  { id: 'c_57', text: 'Saya percaya bahwa ketepatan dan ketelitian sangat penting.' },
  { id: 'c_58', text: 'Saya tertarik bekerja di kantor dengan jadwal tetap.' },
  { id: 'c_59', text: 'Saya merasa nyaman dalam sistem yang rapi dan terorganisir.' },
  { id: 'c_60', text: 'Saya ingin menjadi akuntan, sekretaris, atau analis data.' }
];

export default function Step1APage() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/auth/signin');
    },
  });
  
  const { psychometric, setPsychometricData } = useNeurviaStore();
  const [answers, setAnswers] = useState<Record<string, number>>(() => psychometric.riasec || {});

  const handleSelectAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const allQuestionsAnswered = riasecQuestions.every(q => answers[q.id] !== undefined);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!allQuestionsAnswered) return;
    
    // Simpan data RIASEC, tanpa menghapus data psikometrik lainnya
    setPsychometricData({ riasec: answers });
    
    // Arahkan ke bagian BERIKUTNYA dari Step 1
    router.push('/neurvia/step-1B');
  };

  if (status === 'loading' || !session) {
    return <div>Loading...</div>; // Tampilkan loading state Anda yang sudah ada
  }

  return (
    <FlowLayout pageTitle="Step 1: Psychometric Assessment" currentStep={1} stepTitles={STEP_TITLES}>
      <Head>
        <title>Step 1: Psychometric Assessment - Neurvia</title>
      </Head>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light ...">
            Understanding Your <br />
            <span className="font-semibold ...">Interests & Personality</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Progress bar untuk di dalam Step 1 */}
          <SubProgressBar currentPart={1} totalParts={3} partTitle="Minat Karir" />
          
          <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-lg border border-slate-100">
            <div className="space-y-4">
              {riasecQuestions.map((question) => (
                <div key={question.id}>
                  <label htmlFor={question.id} className="sr-only">{question.text}</label>
                  <QuestionLikert
                    questionId={question.id}
                    questionText={question.text}
                    selectedValue={answers[question.id] ?? null}
                    onSelect={handleSelectAnswer}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-10">
            <button
              type="submit"
              disabled={!allQuestionsAnswered}
              className="px-8 py-4 bg-slate-900 ... disabled:opacity-50 ..."
              aria-label={allQuestionsAnswered ? "Lanjutkan ke bagian berikutnya" : "Silakan jawab semua pertanyaan terlebih dahulu"}
            >
              Lanjutkan ke Bagian Berikutnya
            </button>
          </div>
        </form>
      </div>
    </FlowLayout>
  );
}