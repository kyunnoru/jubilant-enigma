import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
// You can add more providers as needed

export default NextAuth({
  providers: [
    // Uncomment and configure when you get Google OAuth credentials
    /*
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    */
    
    // For development, you can use a credentials provider or other providers
    // Add your preferred authentication method here
  ],
  
  pages: {
    signIn: '/auth/signin', // Optional: custom sign-in page
    error: '/auth/error',   // Optional: custom error page
  },
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  
  session: {
    strategy: 'jwt',
  },
  
  // Disable debug mode
  debug: false,
  
  secret: process.env.NEXTAUTH_SECRET,
})