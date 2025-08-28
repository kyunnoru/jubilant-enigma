// src/pages/neurvia/step-1B.tsx

import { useRouter } from 'next/router';
import { useNeurviaStore } from '../../store/neurviaStore';
import FlowLayout, { STEP_TITLES } from '../../components/FlowLayout';
import { FormEvent, useState } from 'react';
import { useSession } from 'next-auth/react';
import QuestionLikert from '../../components/QuestionLikert';
import SubProgressBar from '../../components/SubProgressBar';

// --- Pertanyaan untuk Bagian 1B: Sifat Kepribadian (OCEAN) ---
const oceanQuestions = [
  { id: 'o_1', text: 'Saya senang mencoba hal-hal baru.' },
  { id: 'o_2', text: 'Saya menikmati karya seni dan pameran kreatif.' },
  { id: 'o_3', text: 'Saya sering merenung dan berpikir secara mendalam.' },
  { id: 'o_4', text: 'Saya suka menjelajahi ide-ide filosofis.' },
  { id: 'o_5', text: 'Saya terbuka terhadap pandangan yang berbeda dari saya.' },
  { id: 'o_6', text: 'Saya merasa bosan dengan rutinitas yang sama setiap hari.' },
  { id: 'o_7', text: 'Saya lebih suka hal-hal tradisional daripada eksperimental.' },
  { id: 'o_8', text: 'Saya merasa tidak nyaman dengan perubahan besar dalam hidup.' },
  { id: 'o_9', text: 'Saya merasa seni atau puisi membuang waktu.' },
  { id: 'o_10', text: 'Saya tidak tertarik mengeksplorasi hal-hal yang tidak familiar.' },
  { id: 'c_11', text: 'Saya menyelesaikan tugas tepat waktu.' },
  { id: 'c_12', text: 'Saya merencanakan kegiatan saya jauh-jauh hari.' },
  { id: 'c_13', text: 'Saya menjaga kebersihan dan kerapihan ruang kerja.' },
  { id: 'c_14', text: 'Saya memperhatikan detail dalam pekerjaan saya.' },
  { id: 'c_15', text: 'Saya merasa bertanggung jawab atas tugas yang diberikan.' },
  { id: 'c_16', text: 'Saya sering menunda-nunda pekerjaan.' },
  { id: 'c_17', text: 'Saya tidak masalah bekerja secara spontan tanpa rencana.' },
  { id: 'c_18', text: 'Saya sulit memprioritaskan tugas.' },
  { id: 'c_19', text: 'Saya sering melupakan hal-hal penting.' },
  { id: 'c_20', text: 'Saya tidak merasa penting memiliki jadwal yang teratur.' },
  { id: 'e_21', text: 'Saya merasa bersemangat saat berada di tengah banyak orang.' },
  { id: 'e_22', text: 'Saya mudah berbicara dengan orang baru.' },
  { id: 'e_23', text: 'Saya suka menjadi pusat perhatian.' },
  { id: 'e_24', text: 'Saya merasa nyaman saat berada dalam kelompok besar.' },
  { id: 'e_25', text: 'Saya sering memulai percakapan dengan orang asing.' },
  { id: 'e_26', text: 'Saya lebih suka menghabiskan waktu sendiri daripada bersosialisasi.' },
  { id: 'e_27', text: 'Saya cenderung diam dalam situasi sosial.' },
  { id: 'e_28', text: 'Saya merasa lelah setelah bersosialisasi.' },
  { id: 'e_29', text: 'Saya jarang menghadiri acara sosial.' },
  { id: 'e_30', text: 'Saya tidak suka menjadi pusat perhatian.' },
  { id: 'a_31', text: 'Saya peduli terhadap perasaan orang lain.' },
  { id: 'a_32', text: 'Saya mencoba memahami sudut pandang orang lain.' },
  { id: 'a_33', text: 'Saya mudah memaafkan orang lain.' },
  { id: 'a_34', text: 'Saya suka membantu orang tanpa pamrih.' },
  { id: 'a_35', text: 'Saya merasa bersalah jika menyakiti orang lain.' },
  { id: 'a_36', text: 'Saya lebih suka memenangkan argumen daripada menjaga hubungan baik.' },
  { id: 'a_37', text: 'Saya cenderung curiga pada orang yang baru saya kenal.' },
  { id: 'a_38', text: 'Saya tidak terlalu peduli apakah orang lain merasa tersinggung.' },
  { id: 'a_39', text: 'Saya jarang memikirkan perasaan orang lain.' },
  { id: 'a_40', text: 'Saya merasa orang lain seharusnya bisa menjaga dirinya sendiri.' },
  { id: 'n_41', text: 'Saya sering merasa cemas tanpa alasan jelas.' },
  { id: 'n_42', text: 'Saya mudah tersinggung oleh komentar kecil.' },
  { id: 'n_43', text: 'Saya merasa gugup dalam banyak situasi.' },
  { id: 'n_44', text: 'Saya sering memikirkan kesalahan masa lalu.' },
  { id: 'n_45', text: 'Saya mudah merasa sedih atau tertekan.' },
  { id: 'n_46', text: 'Saya tetap tenang dalam situasi stres.' },
  { id: 'n_47', text: 'Saya jarang merasa cemas.' },
  { id: 'n_48', text: 'Saya dapat mengendalikan emosi saya dengan baik.' },
  { id: 'n_49', text: 'Saya merasa aman dan percaya diri dengan hidup saya.' },
  { id: 'n_50', text: 'Saya tidak membiarkan emosi negatif menguasai saya.' }
];

export default function Step1BPage() {
  const router = useRouter();
  const { data: session, status } = useSession({ required: true, onUnauthenticated: () => router.push('/auth/signin') });

  const { psychometric, setPsychometricData } = useNeurviaStore();
  const [answers, setAnswers] = useState<Record<string, number>>(() => psychometric.ocean || {});

  const handleSelectAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const allQuestionsAnswered = oceanQuestions.every(q => answers[q.id] !== undefined);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!allQuestionsAnswered) return;
    
    // Simpan data OCEAN
    setPsychometricData({ ocean: answers });
    
    // Arahkan ke bagian TERAKHIR dari Step 1
    router.push('/neurvia/step-1C');
  };

  if (status === 'loading' || !session) return <div>Loading...</div>;

  return (
    <FlowLayout pageTitle="Step 1: Psychometric Assessment" currentStep={1} stepTitles={STEP_TITLES}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          {/* ... Header yang sama seperti step-1 ... */}
        </div>
        <form onSubmit={handleSubmit}>
          <SubProgressBar currentPart={2} totalParts={3} partTitle="Sifat Kepribadian" />
          <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-lg border border-slate-100">
            <div className="space-y-4">
              {oceanQuestions.map((question) => (
                <QuestionLikert
                  key={question.id}
                  questionId={question.id}
                  questionText={question.text}
                  selectedValue={answers[question.id] ?? null}
                  onSelect={handleSelectAnswer}
                />
              ))}
            </div>
          </div>
          <div className="text-center mt-10">
            <button type="submit" disabled={!allQuestionsAnswered} className="px-8 py-4 bg-slate-900 ... disabled:opacity-50 ...">
              Lanjutkan ke Bagian Berikutnya
            </button>
          </div>
        </form>
      </div>
    </FlowLayout>
  );
}