// src/pages/index.tsx

import Link from 'next/link';
import Head from 'next/head';
import { useSession, signIn } from 'next-auth/react';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Stats from '@/components/landing/Stats';
import Footer from '@/components/landing/Footer';
import BackgroundBlobs from '@/components/landing/BackgroundBlobs';

export default function LandingPage() {
  const { data: session } = useSession();

  return (
    <>
      <BackgroundBlobs />
      <Head>
        <title>Neurvia</title>
        <meta name="description" content="Discover your true potential with Neurvia's AI-powered career analysis. Find the perfect academic path and career that matches your personality and interests." />

      </Head>
      
      <main className="min-h-screen relative">
        <Navbar />
        <Hero />
        <Features />
        <Stats />
      </main>
      <Footer />
    </>
  );
}

  