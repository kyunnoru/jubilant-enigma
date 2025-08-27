// src/components/DebugSession.tsx
import React from 'react';
import { useSession } from 'next-auth/react';

const DebugSession: React.FC = () => {
  const { data: session, status } = useSession();

  return (
    <div className="fixed top-4 right-4 bg-red-100 border-2 border-red-500 p-4 rounded-lg max-w-sm z-50">
      <h3 className="font-bold text-red-800 mb-2">🔍 DEBUG SESSION</h3>
      <div className="text-xs space-y-1">
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Session exists:</strong> {session ? '✅ YES' : '❌ NO'}</p>
        {session && (
          <>
            <p><strong>User ID:</strong> {session.user?.id || 'MISSING'}</p>
            <p><strong>Email:</strong> {session.user?.email || 'MISSING'}</p>
            <p><strong>isPremium:</strong> 
              <span className={session.user?.isPremium ? 'text-green-600' : 'text-red-600'}>
                {session.user?.isPremium ? ' ✅ TRUE' : ' ❌ FALSE'}
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default DebugSession;