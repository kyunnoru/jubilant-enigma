// src/components/landing/Hero.tsx

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import AnimatedTitle from '../ui/AnimatedTitle'; // Import komponen yang baru kita buat

const Hero = () => {
  const { data: session } = useSession();

  // === LOGIKA ANIMASI MENGETIK ===
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const toRotate = ["Masa Depan", "Cita-Cita", "Impian"]; // Daftar kata-kata Anda
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  }
  // === AKHIR LOGIKA ANIMASI ===

  return (
    <section className="gradient-bg min-h-screen flex items-center justify-center relative z-10 px-6">
      <div className="max-w-6xl mx-auto text-center relative">
        <div className="mb-8 section-reveal">
          <span className="inline-block px-6 py-3 bg-white/20 text-white rounded-full text-sm font-semibold backdrop-blur-sm border border-white/30" style={{ fontFamily: 'Inter, sans-serif' }}>
            🚀 AI-Powered Career Discovery
          </span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black leading-none text-white mb-8 section-reveal" style={{ fontFamily: 'Space Grotesk, sans-serif', animationDelay: '0.2s' }}>
          Your Future
          <br />
          {/* === PERUBAHAN: Ganti teks statis dengan komponen animasi === */}
          <AnimatedTitle text={text} />
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-12 font-light section-reveal" style={{ fontFamily: 'Inter, sans-serif', animationDelay: '0.4s' }}>
          Unlock your potential with AI-powered insights. Discover the perfect academic path and career that aligns with your unique personality, interests, and goals.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center section-reveal" style={{ animationDelay: '0.6s' }}>
          {session ? (
            <Link
              href="/dashboard"
              className="magnetic-button px-12 py-5 bg-white text-purple-600 rounded-full text-xl font-bold shadow-2xl"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              <span>Continue Journey</span>
            </Link>
          ) : (
            <>
              <Link
                href="/auth/signup"
                className="magnetic-button px-12 py-5 bg-white text-purple-600 rounded-full text-xl font-bold shadow-2xl"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                <span>Start Your Journey</span>
              </Link>
              <button
                onClick={() => signIn()}
                className="magnetic-button px-12 py-5 bg-transparent text-white rounded-full text-xl font-bold border-2 border-white/50"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                <span>Sign In</span>
              </button>
            </>
          )}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
