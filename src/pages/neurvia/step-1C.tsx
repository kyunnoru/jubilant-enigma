// src/pages/neurvia/step-1C.tsx

import { useRouter } from 'next/router';
import { useNeurviaStore } from '../../store/neurviaStore';
import FlowLayout, { STEP_TITLES } from '../../components/FlowLayout';
import { FormEvent, useState } from 'react';
import { useSession } from 'next-auth/react';
import QuestionMultipleChoice from '../../components/QuestionMultipleChoice';
import SubProgressBar from '../../components/SubProgressBar';

// --- Pertanyaan untuk Bagian 1C: Gaya Belajar (VAK) ---
const vakQuestions = [
  { id: 'v_1', text: 'Saya lebih mudah mengingat sesuatu jika saya melihatnya dalam bentuk diagram atau gambar.' },
  { id: 'a_1', text: 'Saya sering berbicara pada diri sendiri saat mencoba memecahkan masalah.' },
  { id: 'k_1', text: 'Saya belajar paling baik dengan langsung mencoba dan melakukan sesuatu.' },
  // ... Tambahkan pertanyaan VAK lainnya
];

export default function Step1CPage() {
  const router = useRouter();
  const { data: session, status } = useSession({ required: true, onUnauthenticated: () => router.push('/auth/signin') });

  const { psychometric, setPsychometricData } = useNeurviaStore();
  const [answers, setAnswers] = useState<Record<string, 'v' | 'a' | 'k'>>(() => psychometric.vak || {});

  const handleSelectAnswer = (questionId: number, value: 'v' | 'a' | 'k') => {
    setAnswers(prev => ({ ...prev, [questionId.toString()]: value }));
  };

  const allQuestionsAnswered = vakQuestions.every(q => answers[q.id] !== undefined);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!allQuestionsAnswered) return;
    
    // Simpan data VAK
    setPsychometricData({ vak: answers });
    
    // Selesai dengan Step 1, sekarang arahkan ke Step 2
    router.push('/neurvia/step-2');
  };

  if (status === 'loading' || !session) return <div>Loading...</div>;

  return (
    <FlowLayout pageTitle="Step 1: Psychometric Assessment" currentStep={1} stepTitles={STEP_TITLES}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          {/* ... Header yang sama seperti step-1 ... */}
        </div>
        <form onSubmit={handleSubmit}>
          <SubProgressBar currentPart={3} totalParts={3} partTitle="Gaya Belajar" />
          <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-lg border border-slate-100">
            <div className="space-y-4">
              {vakQuestions.map((question) => (
                <QuestionMultipleChoice
                  key={question.id}
                  questionId={parseInt(question.id.split('_')[1])}
                  questionText={question.text}
                  options={{
                    v: 'Visual - Saya belajar dengan melihat dan membaca',
                    a: 'Auditori - Saya belajar dengan mendengar dan berdiskusi',
                    k: 'Kinestetik - Saya belajar dengan melakukan dan merasakan'
                  }}
                  selectedValue={answers[question.id] ?? null}
                  onSelect={handleSelectAnswer}
                />
              ))}
            </div>
          </div>
          <div className="text-center mt-10">
            <button type="submit" disabled={!allQuestionsAnswered} className="px-8 py-4 bg-slate-900 ... disabled:opacity-50 ...">
              Continue to Next Step
            </button>
          </div>
        </form>
      </div>
    </FlowLayout>
  );
}