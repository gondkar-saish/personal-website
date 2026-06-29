import React, { useState, useEffect } from 'react';
import SkillsCube from '../components/SkillsCube';
import ModulePreloader from '../components/ModulePreloader';

const SkillsPage = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  const loadingLines = [
    'INITIALIZING PORTAL CONSTELLATION //',
    'calibrating quantum cores',
    'establishing dimensional links',
    'aligning technology artifacts',
    'rendering saish_gondkar.skills_matrix'
  ];

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem('skillsIntroPlayed');
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
    sessionStorage.setItem('skillsIntroPlayed', 'true');
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
        <SkillsCube />
      </div>
    </>
  );
};

export default SkillsPage;
