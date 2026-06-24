import React, { useState, useEffect } from 'react';
import SideQuests from '../components/SideQuests';
import ModulePreloader from '../components/ModulePreloader';

const SideQuestsPage = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  const loadingLines = [
    'INITIALIZING SIDE QUESTS MODULE //',
    'loading interests.data',
    'scanning cricket archives',
    'summoning jack_sparrow.energy',
    'training dragon_warrior.mode',
    'rendering saish_gondkar.side_quests'
  ];

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem('sideQuestsIntroPlayed');
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
    sessionStorage.setItem('sideQuestsIntroPlayed', 'true');
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
        <SideQuests />
      </div>
    </>
  );
};

export default SideQuestsPage;
