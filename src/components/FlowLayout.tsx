// src/components/FlowLayout.tsx (Setelah Diperbaiki)

import Head from 'next/head';
import ProgressBar from './ProgressBar';
import { ReactNode } from 'react';
import Link from 'next/link';

interface FlowLayoutProps {
  children: ReactNode;
  pageTitle: string;
  currentStep: number;
  stepTitles: string[];
}

const TOTAL_STEPS = 4;
export const STEP_TITLES = ['Psychometric Assessment', 'Academic Background', 'Self-Insight', 'Complete'];

const FlowLayout = ({ children, pageTitle, currentStep, stepTitles }: FlowLayoutProps) => {
  return (
    <>
      <Head>
        <title>{`${pageTitle} - Neurvia`}</title>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap');
          `}
        </style>
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Navigation */}
        <nav className="px-6 py-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <span className="text-xl font-semibold text-slate-900" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                  Neurvia
                </span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-slate-700 text-sm" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                Step {currentStep} of {TOTAL_STEPS}
              </span>
            </div>
          </div>
        </nav>

        {/* Progress Bar */}
        <div className="px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <ProgressBar
              currentStep={currentStep}
              totalSteps={TOTAL_STEPS}
              stepTitles={stepTitles}
            />
          </div>
        </div>

        {/* Main Content */}
        <main className="px-6 pb-12">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default FlowLayout;