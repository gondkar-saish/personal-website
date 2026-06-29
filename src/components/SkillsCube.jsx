import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Face Data ────────────────────────────────────────────────────────────────
const FACES = [
  {
    id: 'backend',
    label: 'BACKEND',
    accentColor: '#38BDF8',
    title: 'Backend Engineering',
    description: 'Building scalable REST APIs, authentication systems, and data-driven applications using Java and Spring Boot.',
    techs: ['Java', 'Spring Boot', 'MySQL', 'Hibernate', 'REST API', 'JWT'],
    experience: '2+ years building production-ready backend systems',
    faceIndex: 0,
  },
  {
    id: 'mobile',
    label: 'MOBILE',
    accentColor: '#A78BFA',
    title: 'Mobile Development',
    description: 'Cross-platform mobile app development with React Native and Expo for iOS and Android.',
    techs: ['React Native', 'Expo', 'JavaScript'],
    experience: 'Building performant, native-feel mobile experiences',
    faceIndex: 1,
  },
  {
    id: 'hardware',
    label: 'HARDWARE',
    accentColor: '#00E0A4',
    title: 'Hardware Systems',
    description: 'Designing embedded sensor systems and IoT solutions with ESP32 and Arduino microcontrollers.',
    techs: ['ESP32', 'Arduino', 'DHT11', 'PIR', 'LDR', 'Sensors'],
    experience: 'Smart room monitoring and hardware-software integration',
    faceIndex: 2,
  },
  {
    id: 'tools',
    label: 'TOOLS',
    accentColor: '#FACC15',
    title: 'Dev Tools & Workflow',
    description: 'Professional development toolchain for version control, API testing, and full-stack productivity.',
    techs: ['Git', 'GitHub', 'IntelliJ IDEA', 'VS Code', 'Postman', 'MySQL Workbench'],
    experience: 'Industry-standard workflows with modern tooling',
    faceIndex: 3,
  },
];

// ─── Detail Panel ─────────────────────────────────────────────────────────────
function DetailPanel({ face }) {
  const accent = face.accentColor;

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={face.id}
        initial={{ opacity: 0, x: 20, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -20, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden p-8 rounded-[20px] w-full max-w-[360px] mx-auto md:mx-0"
        style={{
          background: 'linear-gradient(135deg, rgba(4,12,30,0.92) 0%, rgba(6,16,36,0.85) 100%)',
          backdropFilter: 'blur(28px)',
          border: `1px solid ${accent}2a`,
          boxShadow: `0 0 50px ${accent}14, 0 24px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)`,
        }}
      >
        {/* Ambient glow blob */}
        <div className="absolute -top-10 -right-10 w-48 h-48 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${accent}1a 0%, transparent 70%)` }}
        />

        {/* HUD corner brackets */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: accent }} />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: accent }} />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: accent }} />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: accent }} />

        {/* Node label */}
        <div className="font-mono text-[10px] tracking-[0.18em] mb-2 opacity-75" style={{ color: accent }}>
          // NODE_{String(face.faceIndex).padStart(2, '0')} ACTIVE
        </div>

        {/* Title */}
        <h3 className="text-2xl font-extrabold text-white mb-4 tracking-tight">
          {face.title}
        </h3>

        {/* Divider */}
        <div className="h-[1px] mb-4" style={{ background: `linear-gradient(90deg, ${accent}55, transparent)` }} />

        {/* Description */}
        <p className="text-slate-400 font-mono text-sm leading-relaxed mb-6 relative z-10">
          {face.description}
        </p>

        {/* Tech pills */}
        <div className="mb-6 relative z-10">
          <div className="font-mono text-[9px] tracking-[0.16em] mb-3 opacity-65" style={{ color: accent }}>
            TECHNOLOGIES
          </div>
          <div className="flex flex-wrap gap-2">
            {face.techs.map((t, i) => (
              <motion.span 
                key={t} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 + 0.2 }}
                className="px-3 py-1 rounded-md font-mono text-[10px] font-bold"
                style={{
                  border: `1px solid ${accent}44`,
                  background: `${accent}0c`,
                  color: accent,
                }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="pt-3 border-t font-mono text-[10px] text-slate-500 leading-relaxed relative z-10" style={{ borderColor: `${accent}2a` }}>
          <span style={{ color: accent, opacity: 0.7 }}>EXP // </span>{face.experience}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Sci-Fi Portal Components ────────────────────────────────────────────────

function CoreArtifact({ accentColor, isMobile }) {
  const outerSize = isMobile ? 120 : 160;
  const midSize = isMobile ? 80 : 110;
  const coreSize = isMobile ? 48 : 64;

  return (
    <div className="absolute flex items-center justify-center z-20 pointer-events-none">
      {/* Outer energy rings */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        className="absolute rounded-full border-t-2 border-b-2 border-dashed opacity-70 mix-blend-screen"
        style={{ width: outerSize, height: outerSize, borderColor: accentColor }}
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 15, ease: "linear", repeat: Infinity }}
        className="absolute rounded-full border-r-2 border-l-2 opacity-50 mix-blend-screen"
        style={{ width: midSize, height: midSize, borderColor: accentColor }}
      />
      
      {/* Core glowing orb */}
      <motion.div 
        animate={{ scale: [1, 1.15, 1], filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'] }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
        className="rounded-full flex items-center justify-center"
        style={{ 
          width: coreSize, 
          height: coreSize,
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 80%)`,
          boxShadow: `0 0 40px ${accentColor}, inset 0 0 20px #fff`
        }}
      >
        <div className="w-1/3 h-1/3 bg-white rounded-full blur-[2px]" />
      </motion.div>
    </div>
  );
}

function TechPortal({ tech, index, total, accentColor, isMobile }) {
  const radius = isMobile ? 120 : 180; 
  const angle = (index / total) * Math.PI * 2;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  const size = isMobile ? 64 : 80;

  return (
    <motion.div
      className="absolute z-30 flex items-center justify-center group"
      initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
      animate={{ x, y, opacity: 1, scale: 1 }}
      exit={{ x: 0, y: 0, opacity: 0, scale: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
    >
      {/* Connector Beam (points from portal back to core) */}
      <div 
        className="absolute top-1/2 left-1/2 h-[2px] origin-left opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          width: `${radius - (isMobile ? 24 : 32)}px`,
          background: `linear-gradient(90deg, ${accentColor}00, ${accentColor})`,
          transform: `translateY(-50%) rotate(${Math.atan2(-y, -x)}rad)`,
        }}
      />

      {/* Counter rotation wrapper to keep portals upright while the parent constellation rotates */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        <motion.div 
          whileHover={{ scale: 1.25 }}
          className="relative flex items-center justify-center rounded-full cursor-pointer"
          style={{ width: size, height: size }}
        >
          {/* Portal Energy Rings */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, ease: "linear", repeat: Infinity }}
            className="absolute inset-0 rounded-full border border-dashed opacity-60"
            style={{ borderColor: accentColor }}
          />
          <div 
            className="absolute inset-1 rounded-full border opacity-30"
            style={{ borderColor: accentColor }}
          />
          
          {/* Portal Background & Content */}
          <div 
            className="absolute inset-2 rounded-full backdrop-blur-md flex items-center justify-center overflow-hidden"
            style={{ 
              background: 'rgba(4,12,30,0.7)',
              boxShadow: `inset 0 0 15px ${accentColor}40, 0 0 15px ${accentColor}40`
            }}
          >
            <span className="text-[10px] md:text-[11px] font-bold text-white text-center leading-tight px-1 z-10 break-words drop-shadow-md">
              {tech}
            </span>
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `radial-gradient(circle, ${accentColor}50 0%, transparent 70%)` }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function PortalConstellation({ activeFace }) {
  const currentFace = FACES[activeFace];
  const techs = currentFace.techs;
  const accentColor = currentFace.accentColor;
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // initial check
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Background ambient glow based on accent color */}
      <div 
        className="absolute inset-0 opacity-20 transition-colors duration-1000"
        style={{ background: `radial-gradient(circle at center, ${accentColor} 0%, transparent 70%)` }}
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentFace.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Slowly rotating container for the entire constellation */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Central Relic Hub */}
            <CoreArtifact accentColor={accentColor} isMobile={isMobile} />

            {/* Orbiting Dimensional Portals */}
            {techs.map((tech, index) => (
              <TechPortal
                key={tech}
                tech={tech}
                index={index}
                total={techs.length}
                accentColor={accentColor}
                isMobile={isMobile}
              />
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Face Tabs ────────────────────────────────────────────────────────────────
function FaceTabs({ activeFace, setActiveFace }) {
  return (
    <div className="flex gap-2 justify-center flex-wrap">
      {FACES.map((face, i) => {
        const on = activeFace === i;
        return (
          <button
            key={face.id}
            onClick={() => setActiveFace(i)}
            className="px-5 py-2 rounded-lg font-mono text-[11px] font-bold tracking-widest transition-all duration-300 outline-none"
            style={{
              background: on ? `${face.accentColor}15` : 'rgba(4,12,28,0.6)',
              border: `1px solid ${on ? face.accentColor + '80' : 'rgba(255,255,255,0.07)'}`,
              color: on ? face.accentColor : '#64748B',
              boxShadow: on ? `0 0 18px ${face.accentColor}2a` : 'none',
            }}
          >
            {face.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Root Export ──────────────────────────────────────────────────────────────
export default function SkillsCube() {
  const [activeFace, setActiveFace] = useState(0);

  return (
    <section id="skills" className="min-h-screen py-20 px-4 flex flex-col justify-center relative bg-transparent font-sans overflow-hidden">
      
      {/* Header */}
      <div className="text-center mb-6">
        <span className="inline-block font-mono text-[11px] text-accent-primary border border-accent-primary/30 rounded px-3 py-1 tracking-widest bg-accent-primary/5 uppercase mb-3">
          // TECHNICAL SKILLS NODE
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight shadow-accent-primary/10 drop-shadow-lg m-0">
          Skill Set Matrix
        </h2>
      </div>

      {/* Tabs */}
      <div className="mb-8 flex flex-col items-center">
        <FaceTabs activeFace={activeFace} setActiveFace={setActiveFace} />
        <p className="text-center mt-4 font-mono text-[10px] text-slate-400/50 tracking-[0.12em]">
          SELECT DIMENSION // EXPLORE ARTIFACTS
        </p>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 max-w-6xl mx-auto w-full">
        
        {/* Canvas / Visualization Area */}
        <div className="w-[340px] h-[340px] md:w-[480px] md:h-[480px] flex-shrink-0 relative rounded-3xl overflow-hidden border transition-colors duration-1000"
             style={{ 
               borderColor: `${FACES[activeFace].accentColor}2a`,
               boxShadow: `inset 0 0 60px ${FACES[activeFace].accentColor}05, 0 0 60px ${FACES[activeFace].accentColor}0d` 
             }}>
          <PortalConstellation activeFace={activeFace} />
        </div>

        {/* Detail Panel */}
        <div className="flex-1 min-w-0 w-full flex justify-center lg:justify-start">
          <DetailPanel face={FACES[activeFace]} />
        </div>
      </div>
    </section>
  );
}
