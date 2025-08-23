// src/pages/results.tsx

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';

export default function ResultsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

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

  // Mock data - in a real app, this would come from your database
  const mockResults = [
    {
      id: '1',
      date: '2024-01-15',
      title: 'Career Analysis Report',
      status: 'completed',
      type: 'Comprehensive Analysis'
    },
    {
      id: '2',
      date: '2024-01-10',
      title: 'Personality Assessment',
      status: 'completed',
      type: 'Personality Test'
    }
  ];

  return (
    <>
      <Head>
        <title>Your Results - Neurvia</title>
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
              <span className="text-slate-700" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                Welcome, {session.user?.name || 'User'}
              </span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-light text-slate-900 mb-6" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
              Your Analysis
              <br />
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                Results
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
              Access all your previous career analysis reports and insights. Download comprehensive reports and review your progress over time.
            </p>
          </div>

          {/* Results Grid */}
          {mockResults.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {mockResults.map((result) => (
                <div key={result.id} className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-slate-900 mb-3 text-center" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                    {result.title}
                  </h3>
                  
                  <div className="text-center mb-6">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                      {result.status}
                    </span>
                  </div>
                  
                  <div className="text-center mb-6">
                    <p className="text-slate-600 text-sm" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                      {result.type}
                    </p>
                    <p className="text-slate-500 text-xs mt-1" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                      {new Date(result.date).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <a
                      href={`/api/download-report/${result.id}`}
                      download={`Neurvia_Report_${result.id}.pdf`}
                      className="w-full bg-slate-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-slate-800 transition-all duration-200 text-center block"
                      style={{ fontFamily: 'Red Hat Display, sans-serif' }}
                    >
                      Download Report
                    </a>
                    
                    <Link
                      href={`/neurvia/result/${result.id}`}
                      className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-all duration-200 text-center block"
                      style={{ fontFamily: 'Red Hat Display, sans-serif' }}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                No Results Yet
              </h3>
              <p className="text-slate-600 mb-8 max-w-md mx-auto" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                You haven't completed any career analysis yet. Start your first assessment to get personalized insights and recommendations.
              </p>
              <Link
                href="/neurvia/step-1"
                className="inline-block px-8 py-4 bg-slate-900 text-white rounded-lg text-lg font-medium hover:bg-slate-800 transition-all duration-200"
                style={{ fontFamily: 'Red Hat Display, sans-serif' }}
              >
                Start Your First Analysis
              </Link>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <h2 className="text-3xl font-light text-slate-900 mb-8 text-center" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
              Quick Actions
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link
                href="/neurvia/step-1"
                className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl hover:shadow-lg transition-all duration-200 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                  Start New Analysis
                </h3>
                <p className="text-slate-600" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                  Begin a comprehensive career assessment
                </p>
              </Link>
              
              <Link
                href="\neurvia\chat\[id].tsx"
                className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl hover:shadow-lg transition-all duration-200 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                  Chat with AI
                </h3>
                <p className="text-slate-600" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                  Get answers to your career questions
                </p>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
