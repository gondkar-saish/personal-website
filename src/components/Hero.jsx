import React from 'react';
import ChipTileHeroBackground from './ChipTileHeroBackground';

const Hero = () => {
  return (
    <section id="hero" className="bg-[#030712] pt-32 pb-20 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center border-b border-white/5 relative z-10 overflow-hidden text-center">
      
      <ChipTileHeroBackground />

      <div className="max-w-4xl mx-auto w-full relative z-20 flex flex-col items-center mt-12 md:mt-0">
        
        <p className="text-[#00E0A4] font-mono font-bold tracking-widest uppercase mb-6 animate-pulse">
          // INITIALIZE SEQUENCE
        </p>
        
        <h1 className="font-transformers text-5xl md:text-7xl lg:text-[7.5rem] font-black uppercase tracking-tighter mb-8 text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]" style={{ lineHeight: '1' }}>
          Built for Systems.
        </h1>
        
        <p className="text-lg md:text-xl text-[#94A3B8] mb-12 max-w-2xl leading-relaxed drop-shadow-md">
          I build scalable software, embedded hardware projects, and backend systems with an engineering-first mindset.
        </p>
      </div>
    </section>
  );
};

export default Hero;
