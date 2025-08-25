// src/pages/neurvia/step-1.tsx

import { useRouter } from 'next/router';
import { useNeurviaStore } from '../../store/neurviaStore';
import FlowLayout, { STEP_TITLES } from '../../components/FlowLayout';
import { FormEvent, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import QuestionLikert from '../../components/QuestionLikert';
import SubProgressBar from '../../components/SubProgressBar'; // <-- Impor SubProgressBar

// --- Pertanyaan untuk Bagian 1A: Minat Karir (RIASEC) ---
const riasecQuestions = [
  { id: 'r_1', text: 'Saya menikmati pekerjaan yang melibatkan perbaikan atau pembuatan barang.' },
  { id: 'i_1', text: 'Saya suka memecahkan masalah yang rumit dengan berpikir dan menganalisis.' },
  { id: 'a_1', text: 'Saya senang mengekspresikan ide-ide kreatif melalui tulisan, musik, atau seni.' },
  // ... Tambahkan pertanyaan RIASEC lainnya
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
        <title>Step 1: Psychometric Assessment</title>
        {/* ... Head content Anda ... */}
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
            <button
              type="submit"
              disabled={!allQuestionsAnswered}
              className="px-8 py-4 bg-slate-900 ... disabled:opacity-50 ..."
            >
              Lanjutkan ke Bagian Berikutnya
            </button>
          </div>
        </form>
      </div>
    </FlowLayout>
  );
}