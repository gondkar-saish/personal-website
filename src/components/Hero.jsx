import React from 'react';
import { FileText, Download } from 'lucide-react';
import ChipTileHeroBackground from './ChipTileHeroBackground';

const Hero = () => {
  return (
    <section id="hero" className="bg-bg-base pt-32 pb-20 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center border-b border-border-subtle relative z-10 overflow-hidden text-center">
      
      <ChipTileHeroBackground />

      <div className="max-w-4xl mx-auto w-full relative z-20 flex flex-col items-center mt-12 md:mt-0">
        
        <p className="text-accent-primary font-mono font-bold tracking-widest uppercase mb-6 animate-pulse">
          // INITIALIZE SEQUENCE
        </p>
        
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-text-main mb-8 max-w-3xl leading-tight tracking-tight drop-shadow-md">
          Building scalable software, embedded hardware projects, and backend systems with an engineering-first mindset.
        </h1>
        
        <h2 className="font-transformers text-base md:text-lg lg:text-xl font-bold uppercase tracking-widest text-text-muted opacity-60 mb-12 drop-shadow-sm" style={{ letterSpacing: '0.3em' }}>
          Built for Systems.
        </h2>
        
        {/* CV Actions */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 w-full max-w-md mx-auto">
          <a href="#" className="engineering-button-primary w-full sm:w-auto gap-2">
            <Download className="h-4 w-4" />
            Download CV
          </a>
          <a href="#" className="engineering-button-secondary w-full sm:w-auto gap-2">
            <FileText className="h-4 w-4" />
            View Online
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
