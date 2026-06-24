import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import IntroAnimation from './components/IntroAnimation';
import GlobalBackground from './components/GlobalBackground';

// Pages
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import SkillsPage from './pages/SkillsPage';
import ProjectsPage from './pages/ProjectsPage';
import HardwarePage from './pages/HardwarePage';
import ContactPage from './pages/ContactPage';
import Esp32ProjectPage from './pages/Esp32ProjectPage';
import SideQuestsPage from './pages/SideQuestsPage';
function App() {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    // TEMPORARILY DISABLED for testing: check if intro has already been played
    // const introPlayed = sessionStorage.getItem('introPlayed');
    const introPlayed = false; // Force it to play every time for testing
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!introPlayed && !prefersReducedMotion) {
      setShowIntro(true);
    } else {
      document.body.style.overflow = 'auto';
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('introPlayed', 'true');
    document.body.style.overflow = 'auto';
  };

  // Lock scrolling while intro is playing
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
    }
  }, [showIntro]);

  return (
    <>
      <GlobalBackground />
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      <div className="min-h-screen flex flex-col text-[#F5F5F5] selection:bg-[#00E0A4]/30 selection:text-white relative z-0">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/hardware-systems" element={<HardwarePage />} />
            <Route path="/hardware-systems/esp32-smart-room-monitor" element={<Esp32ProjectPage />} />
            <Route path="/side-quests" element={<SideQuestsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
