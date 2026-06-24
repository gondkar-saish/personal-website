import React, { useState, useEffect } from 'react';
import Projects from '../components/Projects';
import ModulePreloader from '../components/ModulePreloader';

const ProjectsPage = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  const loadingLines = [
    'INITIALIZING PROJECTS MODULE //',
    'loading project archives',
    'fetching build history',
    'compiling case studies',
    'organizing featured work',
    'rendering saish_gondkar.projects'
  ];

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem('projectsIntroPlayed');
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
    sessionStorage.setItem('projectsIntroPlayed', 'true');
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
        <Projects />
      </div>
    </>
  );
};

export default ProjectsPage;
