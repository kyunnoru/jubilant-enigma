// pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

// Extend the built-in session types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isPremium: boolean;
    };
  }
  
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    isPremium: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    isPremium: boolean;
  }
}

// Initialize mock storage
if (!global.mockUsers) {
  global.mockUsers = new Map();
}

export const authOptions: NextAuthOptions = {
  providers: [
    // Google Provider (for your existing Google sign-in button)
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    
    // Credentials Provider (for your existing email/password form)
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (credentials?.email && credentials?.password) {
          // Your existing authentication logic
          // For demo purposes, accept demo credentials
          if (credentials.email === 'demo@neurvia.com' && credentials.password === 'demo123') {
            return {
              id: 'demo_user',
              email: 'demo@neurvia.com',
              name: 'Demo User',
              image: null,
              isPremium: false, // Default to false - user needs to pay for career guidance
            };
          }
          
          // Add your existing user validation here
          // Example: check against your database
          /*
          const user = await validateUserCredentials(credentials.email, credentials.password);
          if (user) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
              isPremium: user.isPremium || false,
            };
          }
          */
        }
        return null;
      }
    })
  ],
  
  callbacks: {
    async jwt({ token, user, account }) {
      // When user signs in, add their info to token
      if (user) {
        token.id = user.id;
        token.isPremium = user.isPremium;
      }
      
      // For Google sign-in, create user record if doesn't exist
      if (account?.provider === 'google' && user) {
        // Check if user exists in your system
        let existingUser = null;
        for (const [userId, userData] of global.mockUsers.entries()) {
          if (userData.email === user.email) {
            existingUser = { id: userId, ...userData };
            break;
          }
        }
        
        // If user doesn't exist, create them
        if (!existingUser) {
          const newUserId = `google_${Date.now()}`;
          const newUser = {
            id: newUserId,
            email: user.email,
            name: user.name,
            image: user.image,
            isPremium: false, // Default to false - no premium access
            provider: 'google',
            createdAt: new Date(),
          };
          
          global.mockUsers.set(newUserId, newUser);
          token.id = newUserId;
          token.isPremium = false;
        } else {
          token.id = existingUser.id;
          token.isPremium = existingUser.isPremium;
        }
      }
      
      // Always get fresh premium status from storage
      if (token.id && global.mockUsers) {
        const userData = global.mockUsers.get(token.id);
        if (userData) {
          token.isPremium = userData.isPremium || false;
        }
      }
      
      return token;
    },
    
    async session({ session, token }) {
      // Add user info to session
      if (token && session.user) {
        session.user.id = token.id;
        session.user.isPremium = token.isPremium;
      }
      return session;
    },
  },
  
  pages: {
    signIn: '/auth/signin', // Use your existing sign-in page
  },
  
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);