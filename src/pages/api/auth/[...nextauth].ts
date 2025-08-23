import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // This is a simple demo implementation
        // In production, you would validate against your database
        if (credentials?.email === "demo@neurvia.com" && credentials?.password === "demo123") {
          return {
            id: "1",
            email: "demo@neurvia.com",
            name: "Demo User",
            image: null,
          };
        }
        
        // You can add more demo users here
        if (credentials?.email === "admin@neurvia.com" && credentials?.password === "admin123") {
          return {
            id: "2",
            email: "admin@neurvia.com",
            name: "Admin User",
            image: null,
          };
        }
        
        return null;
      }
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-here',
});
