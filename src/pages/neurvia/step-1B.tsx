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
  { id: 'o_1', text: 'Saya memiliki imajinasi yang hidup dan sering melamun.' },
  { id: 'c_1', text: 'Saya sangat terorganisir dan selalu menyelesaikan tugas tepat waktu.' },
  { id: 'e_1', text: 'Saya suka menjadi pusat perhatian dalam sebuah grup.' },
  // ... Tambahkan pertanyaan OCEAN lainnya
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