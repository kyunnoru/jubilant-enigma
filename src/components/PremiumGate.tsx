import { useState } from 'react'
import axios from 'axios'

interface PremiumGateProps {
  children?: React.ReactNode
}

export default function PremiumGate({ children }: PremiumGateProps) {
  const { data: session, status } = {
    data: {
      user: {
        id: 'demo-user-id',
        email: 'demo@example.com',
        name: 'Demo User',
        isPremium: false
      }
    },
    status: 'authenticated' as const
  };
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePremiumUpgrade = async () => {
    // Clear any previous errors
    setError(null)
    
    // Check if user is authenticated first
    if (!session) {
      setError('Please sign in first to upgrade to premium')
      console.log('Sign in functionality not available')
      return
    }

    // Redirect to payment form page
    window.location.href = '/payment/form'
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upgrade to Premium
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock powerful career assessment tools and get personalized insights to accelerate your professional growth.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Premium Features */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Premium Features</h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Comprehensive Career Assessment</h3>
                  <p className="text-gray-600">Detailed analysis of your personality, interests, skills, and values</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Personalized Career Recommendations</h3>
                  <p className="text-gray-600">AI-powered suggestions based on your unique profile</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Detailed Development Plan</h3>
                  <p className="text-gray-600">Step-by-step roadmap to achieve your career goals</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Priority Support</h3>
                  <p className="text-gray-600">Get help from our career experts when you need it</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Ad-Free Experience</h3>
                  <p className="text-gray-600">Focus on your career growth without distractions</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Pricing Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-100">
            {/* Pricing Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Premium Plan</h3>
              <div className="flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-900">Rp 200.000</span>
                <span className="text-lg text-gray-600 ml-2">/ month</span>
              </div>
              <p className="text-gray-600 mt-2">Billed monthly, cancel anytime</p>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex">
                  <svg className="w-5 h-5 text-red-400 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="text-sm font-medium text-red-800 mb-1">Payment Error</h4>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Authentication Notice */}
            {!session && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex">
                  <svg className="w-5 h-5 text-yellow-400 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800 mb-1">Sign In Required</h4>
                    <p className="text-sm text-yellow-700">Please sign in to your account to upgrade to premium.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Upgrade Button */}
            <button
              onClick={handlePremiumUpgrade}
              disabled={isLoading}
              className={`w-full font-bold py-4 px-6 rounded-xl text-lg transition-all duration-200 ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed transform scale-95' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 active:scale-95 shadow-lg hover:shadow-xl'
              } text-white`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Payment...
                </span>
              ) : (
                'Upgrade to Premium Now'
              )}
            </button>

            {/* Security Notice */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Secure payment powered by Xendit
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">
                Your payment information is encrypted and secure. Cancel anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Content */}
        {children && (
          <div className="mt-12">
            {children}
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-8">Trusted by professionals worldwide</h3>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-gray-500">🏢 500+ Companies</div>
            <div className="text-gray-500">👥 10,000+ Users</div>
            <div className="text-gray-500">⭐ 4.8/5 Rating</div>
          </div>
        </div>
      </div>
    </div>
  )
}