import React from 'react';
import Image from 'next/image'; // Gunakan Image dari Next.js

const Footer = () => {
  return (
    <footer className="py-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center space-x-3 mb-8">
          {/* === Ikon diganti dengan Image === */}
          <Image 
            src="/logo.svg" // Ganti dengan path logo Anda di folder /public
            alt="Neurvia Logo"
            width={48}
            height={48}
            className="rounded-2xl"
          />
          <span className="text-3xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Neurvia
          </span>
        </div>
        <p className="text-gray-400 mb-8 text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
          Empowering the next generation through intelligent career guidance
        </p>
        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
            © 2024 Neurvia. Crafted with ❤️ for your future.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
