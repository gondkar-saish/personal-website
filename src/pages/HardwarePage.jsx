import React, { useState, useEffect } from 'react';
import HardwareSystems from '../components/HardwareSystems';
import ModulePreloader from '../components/ModulePreloader';

const HardwarePage = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  const loadingLines = [
    'INITIALIZING HARDWARE MODULE //',
    'detecting ESP32 modules',
    'loading sensors and circuits',
    'mapping embedded systems',
    'syncing hardware + software flow',
    'rendering saish_gondkar.hardware'
  ];

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem('hardwareIntroPlayed');
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
    sessionStorage.setItem('hardwareIntroPlayed', 'true');
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
        <HardwareSystems />
      </div>
    </>
  );
};

export default HardwarePage;
