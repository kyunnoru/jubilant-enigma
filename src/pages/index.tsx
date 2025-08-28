import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import AppNavbar from '@/components/AppNavbar';

const Home = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <>
      <Head>
        <title>Neurvia - Your Future Career Path</title>
        <meta name="description" content="Unlock your potential with AI-powered insights. Discover the perfect academic path and career that aligns with your unique personality, interests, and goals." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen">
        <Navbar />
        <Hero />
        <Features />
      </div>
    </>
  );
};

export default Home;