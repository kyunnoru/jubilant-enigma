import Link from 'next/link';
import { useState } from 'react';

const AppNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simple state management for demo

  const handleSignOut = () => {
    setIsLoggedIn(false);
    // In a real app, you'd clear tokens, redirect, etc.
  };

  const handleSignIn = () => {
    // For demo purposes, just redirect to signin page
    window.location.href = '/signin';
  };

  return (
    <nav className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                NNeurvia
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <span className="text-gray-700 dark:text-gray-300">
                  Welcome back!
                </span>
                <Link
                  href="/dashboard"
                  className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/signin"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;