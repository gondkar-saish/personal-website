import React, { useState, useEffect } from 'react';

const IntroAnimation = ({ onComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Start fade out overlay
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2500);

    // Completely unmount the component
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020202] transition-opacity duration-700 ease-in-out ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      {/* Subtle background scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="w-full h-[15vh] bg-gradient-to-b from-transparent via-[#00E0A4] to-transparent opacity-0"
          style={{ animation: 'scan-line 2.5s linear infinite' }}
        ></div>
      </div>

      <div 
        className="relative z-10 flex flex-col items-center opacity-0" 
        style={{ animation: 'intro-fade-in 1s cubic-bezier(0.4, 0, 0.2, 1) forwards' }}
      >
        {/* The futuristic text with metallic sweep gradient */}
        <h1 
          className="font-transformers text-5xl md:text-7xl lg:text-9xl font-black uppercase tracking-widest text-transparent bg-clip-text text-center leading-none"
          style={{ 
            backgroundImage: 'linear-gradient(to right, #444 0%, #fff 40%, #00E0A4 50%, #fff 60%, #444 100%)',
            backgroundSize: '200% auto',
            animation: 'metallic-sweep 2s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.3s',
            filter: 'drop-shadow(0 0 15px rgba(0, 224, 164, 0.15))'
          }}
        >
          Saish<br/>Gondkar
        </h1>
        
        {/* Growing underline accent */}
        <div className="mt-8 flex justify-center">
          <div 
            className="h-1 bg-[#00E0A4] rounded-full shadow-[0_0_15px_#00E0A4] opacity-0" 
            style={{ animation: 'expand-line 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.8s' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default IntroAnimation;
