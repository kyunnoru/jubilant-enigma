// src/pages/signin.tsx

import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      // Simple demo login - just check if fields are filled
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign In - Neurvia</title>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap');
          `}
        </style>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="text-2xl font-semibold text-slate-900" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                Neurvia
              </span>
            </Link>
          </div>

          {/* Sign In Form */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-light text-slate-900 mb-2" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                Welcome Back
              </h1>
              <p className="text-slate-600" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                Sign in to continue your career discovery journey
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                  {error}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                  style={{ fontFamily: 'Red Hat Display, sans-serif' }}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                  style={{ fontFamily: 'Red Hat Display, sans-serif' }}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-slate-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:bg-slate-900 disabled:cursor-not-allowed"
                style={{ fontFamily: 'Red Hat Display, sans-serif' }}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-600 text-sm" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                Don't have an account?{' '}
                <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                  Sign up
                </Link>
              </p>
            </div>

            <div className="text-center mt-4">
              <p className="text-slate-500 text-sm" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                Demo: Enter any email and password to continue
              </p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <Link 
              href="/" 
              className="text-slate-600 hover:text-slate-800 text-sm transition-colors duration-200"
              style={{ fontFamily: 'Red Hat Display, sans-serif' }}
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}