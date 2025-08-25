import React from 'react';

const Footer = () => {
  return (
    <footer className="py-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center space-x-3 mb-8">
          {/* === Logo replaced with styled text === */}
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">N</span>
          </div>
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