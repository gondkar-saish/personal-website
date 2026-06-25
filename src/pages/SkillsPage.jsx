import React, { useState, useEffect } from 'react';
import SkillsCube from '../components/SkillsCube';
import ModulePreloader from '../components/ModulePreloader';

const SkillsPage = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  const loadingLines = [
    'INITIALIZING 3D SKILLS MODULE //',
    'loading react-three-fiber engine',
    'compiling shader programs',
    'calibrating cube geometry',
    'mapping tech stack to faces',
    'rendering saish_gondkar.skills_3d'
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
