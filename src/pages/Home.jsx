import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ModulePreloader from '../components/ModulePreloader';

const Home = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  const loadingLines = [
    'INITIALIZING HOME MODULE //',
    'booting portfolio.interface',
    'loading hero sequence',
    'assembling chip grid',
    'syncing visual systems',
    'rendering saish_gondkar.home'
  ];

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem('homeIntroPlayed');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasPlayed && !prefersReducedMotion) {
      setShowIntro(true);
    } else {
      setContentVisible(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setContentVisible(true);
    sessionStorage.setItem('homeIntroPlayed', 'true');
  };

  return (
    <>
      {showIntro && (
        <ModulePreloader 
          lines={loadingLines} 
          onComplete={handleIntroComplete} 
          speed={200} 
        />
      )}
      
      <div className={`transition-all duration-1000 ease-out transform ${
        contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <Hero />
      </div>
    </>
  );
};

export default Home;
