import React from 'react';

const Stats = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-shimmer mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>10k+</div>
            <div className="text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>Students Guided</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-shimmer mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>95%</div>
            <div className="text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>Accuracy Rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-shimmer mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>50+</div>
            <div className="text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>Universities Partner</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-shimmer mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>24/7</div>
            <div className="text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>AI Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
