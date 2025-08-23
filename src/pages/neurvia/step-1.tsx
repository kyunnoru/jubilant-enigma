// src/pages/neurvia/step-1.tsx

import { useRouter } from 'next/router';
import { useNeurviaStore } from '@/store/neurviaStore';
import FlowLayout, { STEP_TITLES } from '@/components/FlowLayout';
import { FormEvent, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';

// Ini adalah data dummy untuk simulasi.
// Di aplikasi nyata, ini akan dirender dari state atau props.
const dummyPsychometricData = {
  riasec: { score_r: 5, score_i: 7 },
  ocean: { score_o: 8, score_c: 6 },
  vak: { visual: 10, auditory: 5, kinesthetic: 8 },
};

export default function Step1Page() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const setPsychometricData = useNeurviaStore((state) => state.setPsychometricData);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // 1. Simpan data ke state management Zustand
    setPsychometricData(dummyPsychometricData);
    
    // 2. Arahkan ke langkah berikutnya
    router.push('/neurvia/step-2');
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Step 1: Psychometric Test - Neurvia</title>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap');
          `}
        </style>
      </Head>
      
      <FlowLayout
        pageTitle="Step 1: Psychometric Assessment"
        currentStep={1}
        stepTitles={STEP_TITLES}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-slate-900 mb-4" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
              Understanding Your
              <br />
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                Interests & Personality
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
              Answer the following questions as honestly as possible. There are no right or wrong answers. 
              This assessment will help us understand your unique profile and guide you to the perfect career path.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* 
              PENTING: Di aplikasi nyata, di sinilah Anda akan merender
              komponen kuesioner interaktif Anda (misal: <RiasecForm />, <OceanForm />).
              Untuk saat ini, kita simulasikan dengan sebuah placeholder.
            */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-8 rounded-2xl my-8 text-center shadow-lg">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                Interactive Assessment Components
              </h3>
              <p className="text-blue-800 text-lg leading-relaxed" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                This section will contain your interactive psychometric test components including:
                <br />
                • RIASEC Career Interest Assessment
                <br />
                • OCEAN Personality Traits Analysis
                <br />
                • VAK Learning Style Evaluation
              </p>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-4 bg-slate-900 text-white rounded-lg text-lg font-medium hover:bg-slate-800 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl"
                style={{ fontFamily: 'Red Hat Display, sans-serif' }}
              >
                Continue to Next Step
              </button>
            </div>
          </form>
        </div>
      </FlowLayout>
    </>
  );
}