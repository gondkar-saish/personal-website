import React, { useState, useEffect } from 'react';
import About from '../components/About';
import Resume from '../components/Resume';
import ModulePreloader from '../components/ModulePreloader';

const AboutPage = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  const loadingLines = [
    'INITIALIZING ABOUT MODULE //',
    'loading profile.data',
    'reading academic background',
    'mapping skills and interests',
    'connecting hardware + software experience',
    'rendering saish_gondkar.about'
  ];

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem('aboutIntroPlayed');
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
    sessionStorage.setItem('aboutIntroPlayed', 'true');
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
      
      <div className={`pt-20 transition-all duration-1000 ease-out transform ${
        contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <About />
        <Resume />
      </div>
    </>
  );
};

export default AboutPage;
