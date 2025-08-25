// src/components/AppNavbar.tsx

import Link from 'next/link';
import { useSession, signOut, signIn } from 'next-auth/react';
import { useState } from 'react';

const AppNavbar = () => {
  const { data: session, status } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  const handleLogin = () => {
    signIn();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Show loading state
  if (status === 'loading') {
    return (
      <nav className="w-full px-6 py-4 border-b border-slate-200/60 bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-xl font-semibold text-slate-900">
              Neurvia
            </span>
          </Link>
          <div className="animate-pulse">
            <div className="w-20 h-8 bg-slate-200 rounded-lg"></div>
          </div>
        </div>
      </nav>
    );
  }

  // Show login/signup navbar when not authenticated
  if (!session) {
    return (
      <nav className="w-full px-6 py-4 border-b border-slate-200/60 bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-md">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
              Neurvia
            </span>
          </Link>

          {/* Navigation Links - Public */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/features" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium">
              Features
            </Link>
            <Link href="/about" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium">
              About
            </Link>
            <Link href="/contact" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium">
              Contact
            </Link>
          </div>
          
          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleLogin}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm font-medium"
            >
              Get Started
            </button>
          </div>

        </div>
      </nav>
    );
  }

  // Show full authenticated navbar
  return (
    <nav className="w-full px-6 py-4 border-b border-slate-200/60 bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo Section with hover effect */}
        <Link href="/dashboard" className="flex items-center space-x-3 group">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-md">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <span className="text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
            Neurvia
          </span>
        </Link>

        {/* Navigation Links - Authenticated */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/dashboard" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium">
            Dashboard
          </Link>
          <Link href="/career-guidance" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium">
            Career Guidance
          </Link>
          <Link href="/assessments" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium">
            Assessments
          </Link>
        </div>
        
        {/* User Profile Section */}
        <div className="flex items-center">
          {/* User Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-50 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {session?.user?.name ? getInitials(session.user.name) : 'U'}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-slate-900">
                  {session?.user?.name || 'User'}
                </p>
                <p className="text-xs text-slate-500">
                  {session?.user?.email || 'user@example.com'}
                </p>
              </div>
              <svg className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <>
                {/* Overlay to close dropdown when clicking outside */}
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsProfileOpen(false)}
                />
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-20">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-200">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Profile Settings</span>
                    </div>
                  </Link>
                  <Link href="/preferences" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-200">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>Preferences</span>
                    </div>
                  </Link>
                  <hr className="my-2 border-slate-200" />
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Sign Out</span>
                    </div>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
};

export default AppNavbar;