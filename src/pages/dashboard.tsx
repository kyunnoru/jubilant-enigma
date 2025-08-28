// src/pages/dashboard.tsx

import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AppNavbar from '../components/landing/Navbar';

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Simple auth check - in real app you'd check actual auth state
  useEffect(() => {
    // For demo purposes, we'll assume user is authenticated
    // In real app, redirect to signin if not authenticated
  }, [router]);

  if (isLoading) {
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

  return (
    <>
      <Head>
        <title>Dashboard - Neurvia</title>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap');
          `}
        </style>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Use the main AppNavbar */}
        <AppNavbar />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-light text-slate-900 mb-6" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
              Welcome to Your
              <br />
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                Career Discovery Hub
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
              Ready to discover your true potential? Choose your path and let Neurvia guide you through the journey of self-discovery.
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Start New Analysis */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4 text-center" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                Start New Analysis
              </h3>
              <p className="text-slate-600 text-center mb-6" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                Begin a comprehensive career analysis to discover your perfect academic and career path.
              </p>
              <Link
                href="/neurvia/step-1"
                className="w-full bg-slate-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-slate-800 transition-all duration-200 text-center block"
                style={{ fontFamily: 'Red Hat Display, sans-serif' }}
              >
                Begin Analysis
              </Link>
            </div>

            {/* Career Guidance */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-teal-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4 text-center" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                Career Guidance
              </h3>
              <p className="text-slate-600 text-center mb-6" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                Explore career paths, take quizzes, and get personalized guidance for your future.
              </p>
              <Link
                href="/career-guidance"
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-all duration-200 text-center block"
                style={{ fontFamily: 'Red Hat Display, sans-serif' }}
              >
                Explore Careers
              </Link>
            </div>

            {/* Assessments */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4 text-center" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                Take Assessments
              </h3>
              <p className="text-slate-600 text-center mb-6" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                Discover your strengths and personality with comprehensive career assessments.
              </p>
              <Link
                href="/assessments"
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-all duration-200 text-center block"
                style={{ fontFamily: 'Red Hat Display, sans-serif' }}
              >
                Start Assessment
              </Link>
            </div>

            {/* View Previous Results */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4 text-center" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                View Results
              </h3>
              <p className="text-slate-600 text-center mb-6" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                Access your previous analysis results and download comprehensive reports.
              </p>
              <Link
                href="/results"
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-all duration-200 text-center block"
                style={{ fontFamily: 'Red Hat Display, sans-serif' }}
              >
                View Results
              </Link>
            </div>

            {/* Chat with AI */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4 text-center" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                Chat with AI
              </h3>
              <p className="text-slate-600 text-center mb-6" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                Get personalized answers to your career questions from our AI assistant.
              </p>
              <Link
                href="/chat"
                className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-700 transition-all duration-200 text-center block"
                style={{ fontFamily: 'Red Hat Display, sans-serif' }}
              >
                Start Chat
              </Link>
            </div>

            {/* Profile Settings */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4 text-center" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                Profile Settings
              </h3>
              <p className="text-slate-600 text-center mb-6" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                Manage your profile information and account preferences.
              </p>
              <Link
                href="/profile"
                className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-700 transition-all duration-200 text-center block"
                style={{ fontFamily: 'Red Hat Display, sans-serif' }}
              >
                Edit Profile
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <h2 className="text-3xl font-light text-slate-900 mb-8 text-center" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
              Your Progress
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                  0
                </div>
                <p className="text-slate-600" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                  Analyses Completed
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                  1
                </div>
                <p className="text-slate-600" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                  Assessments Taken
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                  0
                </div>
                <p className="text-slate-600" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                  Reports Generated
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                  0
                </div>
                <p className="text-slate-600" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                  AI Conversations
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}