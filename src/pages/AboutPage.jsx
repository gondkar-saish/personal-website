import React, { useState, useEffect } from 'react';
import About from '../components/About';
import Resume from '../components/Resume';
import AboutPreloader from '../components/AboutPreloader';

const AboutPage = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Check if user has already seen the intro this session, or prefers no motion
    const hasPlayed = sessionStorage.getItem('aboutIntroPlayed');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasPlayed && !prefersReducedMotion) {
      setShowIntro(true);
    } else {
      // If already played or motion reduced, instantly show content
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
      {/* The full-screen dark preloader */}
      {showIntro && <AboutPreloader onComplete={handleIntroComplete} />}
      
      {/* Main Content with smooth staggered reveal transition */}
      <div className={`pt-20 transition-all duration-1000 delay-150 ease-out transform ${
        contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <About />
        <Resume />
      </div>
    </>
  );
};

export default AboutPage;
