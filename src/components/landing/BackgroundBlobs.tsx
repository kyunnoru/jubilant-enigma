import React from 'react';

const BackgroundBlobs = () => {
  return (
    <>
      {/* Floating Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="morphing-blob floating-element w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 top-10 left-10"></div>
        <div className="morphing-blob floating-element w-80 h-80 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-20 top-1/3 right-10"></div>
        <div className="morphing-blob floating-element w-72 h-72 bg-gradient-to-r from-green-400 to-blue-400 opacity-20 bottom-10 left-1/4"></div>
      </div>
      {/* Neural Network Background */}
      <div className="neural-network">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="neural-dot"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </>
  );
};

export default BackgroundBlobs;
