// src/pages/test-premium.tsx
// This is a test page to verify premium status is working
import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

const TestPremiumPage: React.FC = () => {
  const { data: session, status } = useSession();

  const togglePremium = async () => {
    if (!session?.user?.id) return;
    
    try {
      const response = await fetch('/api/toggle-premium', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.id,
          isPremium: !session.user.isPremium
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Force session update
        window.location.reload();
      }
    } catch (error) {
      console.error('Error toggling premium:', error);
    }
  };

  if (status === 'loading') return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Premium Status Test Page</h1>
        
        {!session ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">You need to be signed in to test premium status.</p>
            <button
              onClick={() => signIn()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Sign In
            </button>
          </div>
        ) : (
          <div>
            <div className="bg-gray-50 rounded-lg p-6 mb-6 border">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Current Session Data:</h2>
              <div className="space-y-2 font-mono text-sm">
                <p className="text-gray-800"><strong>User ID:</strong> {session.user.id || 'Not set'}</p>
                <p className="text-gray-800"><strong>Email:</strong> {session.user.email || 'Not set'}</p>
                <p className="text-gray-800"><strong>Name:</strong> {session.user.name || 'Not set'}</p>
                <p className={`text-lg font-bold ${session.user.isPremium ? 'text-green-700' : 'text-red-700'}`}>
                  <strong>Premium Status:</strong> {session.user.isPremium ? '✅ PREMIUM' : '❌ NOT PREMIUM'}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={togglePremium}
                className={`w-full px-6 py-3 rounded-lg font-semibold ${
                  session.user.isPremium 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {session.user.isPremium ? 'Remove Premium Access' : 'Grant Premium Access'}
              </button>

              <a
                href="/career-guidance"
                className="block w-full bg-indigo-600 text-white text-center px-6 py-3 rounded-lg hover:bg-indigo-700"
              >
                Test Career Guidance Access
              </a>

              <button
                onClick={() => signOut()}
                className="w-full bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
              >
                Sign Out
              </button>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">Testing Instructions:</h3>
              <ol className="text-yellow-700 text-sm space-y-1 list-decimal list-inside">
                <li>Check your current premium status above</li>
                <li>Click "Test Career Guidance Access" - you should be blocked if not premium</li>
                <li>Use "Grant Premium Access" to simulate successful payment</li>
                <li>Test the career guidance page again - you should now have access</li>
                <li>Use "Remove Premium Access" to test the blocking again</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestPremiumPage;