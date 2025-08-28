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
];

export default function Step1APage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
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

  if (status === 'loading') {
    return <div>Loading...</div>; // Tampilkan loading state Anda yang sudah ada
  }

  return (
    <FlowLayout pageTitle="Step 1: Psychometric Assessment" currentStep={1} stepTitles={STEP_TITLES}>
      <Head>
        <title>Step 1: Psychometric Assessment - Neurvia</title>
      </Head>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-slate-800 leading-tight">
            Understanding Your <br />
            <span className="font-semibold text-slate-900">Interests & Personality</span>
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
              className="px-8 py-4 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Lanjutkan ke Bagian Berikutnya
            </button>
          </div>
        </form>
      </div>
    </FlowLayout>
  );
}