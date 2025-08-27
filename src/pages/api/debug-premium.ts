// pages/api/debug-premium.ts
// Debug endpoint to check premium status and user data
// REMOVE THIS IN PRODUCTION - only for testing!
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get current session
    const session = await getSession({ req });
    
    // Get all mock users from storage
    const allMockUsers = global.mockUsers ? Array.from(global.mockUsers.entries()) : [];
    
    // Debug information
    const debugInfo = {
      timestamp: new Date().toISOString(),
      session: {
        exists: !!session,
        user: session?.user ? {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
          isPremium: session.user.isPremium,
        } : null,
      },
      mockStorage: {
        initialized: !!global.mockUsers,
        totalUsers: allMockUsers.length,
        users: allMockUsers.map(([id, user]) => ({
          id: id,
          email: user.email,
          name: user.name,
          isPremium: user.isPremium,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        })),
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        nextauthUrl: process.env.NEXTAUTH_URL,
        nextauthSecret: process.env.NEXTAUTH_SECRET ? '[SET]' : '[NOT SET]',
      },
    };

    return res.status(200).json({
      success: true,
      debug: debugInfo,
    });

  } catch (error) {
    console.error('Debug premium error:', error);
    return res.status(500).json({
      success: false,
      message: 'Debug failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}