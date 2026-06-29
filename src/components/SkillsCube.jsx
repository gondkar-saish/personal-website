import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

// ─── Face Data ────────────────────────────────────────────────────────────────
const TECH_DESCRIPTIONS = {
  // Backend
  'Java': 'Backend programming language used to build APIs and server-side logic.',
  'Spring Boot': 'Java framework for building production-ready REST APIs with minimal setup.',
  'MySQL': 'Relational database used to store and query structured application data.',
  'Hibernate': 'ORM tool that maps Java objects to database tables seamlessly.',
  'REST API': 'Architectural style for communication between frontend and backend services.',
  'JWT': 'Token-based authentication for secure, stateless login sessions.',
  // Mobile
  'React Native': 'Framework for building native iOS and Android apps with JavaScript.',
  'Expo': 'Platform that simplifies React Native development and deployment.',
  'JavaScript': 'Core scripting language powering web and mobile applications.',
  // Hardware
  'ESP32': 'Dual-core microcontroller with Wi-Fi and Bluetooth for IoT projects.',
  'Arduino': 'Open-source electronics platform for embedded hardware programming.',
  'DHT11': 'Digital sensor for measuring temperature and humidity in real time.',
  'PIR': 'Passive Infrared sensor used to detect motion from heat signatures.',
  'LDR': 'Light Dependent Resistor that adjusts output based on ambient light levels.',
  'Sensors': 'General-purpose input modules used for environmental data collection.',
  // Tools
  'Git': 'Distributed version control system for tracking code changes.',
  'GitHub': 'Cloud platform for hosting repositories and collaborating on code.',
  'IntelliJ IDEA': 'Professional IDE for Java development with smart code assistance.',
  'VS Code': 'Lightweight, extensible code editor popular across all tech stacks.',
  'Postman': 'API testing tool for sending requests and validating responses.',
  'MySQL Workbench': 'GUI tool for designing, managing, and querying MySQL databases.',
};

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

// ─── Tooltip ──────────────────────────────────────────────────────────────────
function SkillTooltip({ tech, accentColor, children }) {
  const [visible, setVisible] = useState(false);
  const desc = TECH_DESCRIPTIONS[tech] || tech;

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onTouchStart={() => setVisible(v => !v)}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="absolute bottom-full mb-3 z-[100] pointer-events-none"
            style={{ minWidth: 180, maxWidth: 220 }}
          >
            <div
              className="relative px-3 py-2 rounded-xl font-mono text-[10px] leading-snug text-white text-center"
              style={{
                background: 'rgba(4,12,30,0.97)',
                border: `1px solid ${accentColor}55`,
                boxShadow: `0 0 20px ${accentColor}40, 0 8px 32px rgba(0,0,0,0.6)`,
                backdropFilter: 'blur(16px)',
              }}
            >
              {/* Corner brackets */}
              <span className="absolute top-0 left-0 w-2 h-2 border-t border-l" style={{ borderColor: accentColor }} />
              <span className="absolute top-0 right-0 w-2 h-2 border-t border-r" style={{ borderColor: accentColor }} />
              <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l" style={{ borderColor: accentColor }} />
              <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r" style={{ borderColor: accentColor }} />
              <span style={{ color: accentColor }} className="font-bold tracking-widest block mb-[3px] text-[9px] opacity-80">
                {tech.toUpperCase()}
              </span>
              {desc}
              {/* Arrow */}
              <div
                className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0"
                style={{
                  borderLeft: '6px solid transparent',
                  borderRight: '6px solid transparent',
                  borderTop: `6px solid ${accentColor}55`,
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative overflow-hidden p-8 rounded-[20px] w-full h-full flex flex-col"
        style={{
          background: 'linear-gradient(135deg, rgba(4,12,30,0.92) 0%, rgba(6,16,36,0.85) 100%)',
          backdropFilter: 'blur(28px)',
          border: `1px solid ${accent}2a`,
          boxShadow: `0 0 50px ${accent}14, 0 24px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)`,
        }}
      >
        {/* Ambient glow blob */}
        <div
          className="absolute -top-10 -right-10 w-48 h-48 pointer-events-none transition-colors duration-1000"
          style={{ background: `radial-gradient(circle, ${accent}1a 0%, transparent 70%)` }}
        />

        {/* HUD corner brackets */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 transition-colors duration-700" style={{ borderColor: accent }} />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 transition-colors duration-700" style={{ borderColor: accent }} />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 transition-colors duration-700" style={{ borderColor: accent }} />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 transition-colors duration-700" style={{ borderColor: accent }} />

        {/* Node label */}
        <div className="font-mono text-[10px] tracking-[0.18em] mb-2 opacity-75 transition-colors duration-700" style={{ color: accent }}>
          // NODE_{String(face.faceIndex).padStart(2, '0')} ACTIVE
        </div>

        {/* Title */}
        <h3 className="text-2xl font-extrabold text-white mb-4 tracking-tight">
          {face.title}
        </h3>

        {/* Divider */}
        <div className="h-[1px] mb-4 transition-colors duration-700" style={{ background: `linear-gradient(90deg, ${accent}55, transparent)` }} />

        {/* Description */}
        <p className="text-slate-400 font-mono text-sm leading-relaxed mb-6 relative z-10">
          {face.description}
        </p>

        {/* Tech pills */}
        <div className="mb-6 relative z-10 flex-1">
          <div className="font-mono text-[9px] tracking-[0.16em] mb-3 opacity-65 transition-colors duration-700" style={{ color: accent }}>
            TECHNOLOGIES
          </div>
          <div className="flex flex-wrap gap-2">
            {face.techs.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 + 0.1, type: 'spring' }}
                className="px-3 py-1 rounded-md font-mono text-[10px] font-bold transition-colors duration-700"
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
        <div className="pt-3 border-t font-mono text-[10px] text-slate-500 leading-relaxed relative z-10 transition-colors duration-700 mt-auto" style={{ borderColor: `${accent}2a` }}>
          <span className="transition-colors duration-700" style={{ color: accent, opacity: 0.7 }}>EXP // </span>{face.experience}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Sci-Fi Portal Components ────────────────────────────────────────────────

function CoreParticle({ accentColor }) {
  const randomAngle = Math.random() * Math.PI * 2;
  const distance = 80 + Math.random() * 40;
  const x = Math.cos(randomAngle) * distance;
  const y = Math.sin(randomAngle) * distance;

  return (
    <motion.div
      initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
      animate={{ x, y, scale: Math.random() * 1.5 + 0.5, opacity: 0 }}
      transition={{
        duration: 2 + Math.random() * 2,
        repeat: Infinity,
        ease: 'easeOut',
        delay: Math.random() * 2,
      }}
      className="absolute w-1 h-1 rounded-full pointer-events-none"
      style={{
        background: accentColor,
        boxShadow: `0 0 10px ${accentColor}`,
      }}
    />
  );
}

function CoreArtifact({ accentColor, isMobile }) {
  const outerSize = isMobile ? 120 : 160;
  const midSize = isMobile ? 80 : 110;
  const coreSize = isMobile ? 48 : 64;
  const particles = Array.from({ length: 8 });

  return (
    <div className="absolute flex items-center justify-center z-20 pointer-events-none">
      {/* Pulse Waves */}
      <motion.div
        animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
        transition={{ duration: 3, ease: 'easeOut', repeat: Infinity }}
        className="absolute rounded-full border border-solid mix-blend-screen"
        style={{ width: coreSize, height: coreSize, borderColor: accentColor }}
      />
      <motion.div
        animate={{ scale: [1, 3], opacity: [0.4, 0] }}
        transition={{ duration: 3, ease: 'easeOut', repeat: Infinity, delay: 1.5 }}
        className="absolute rounded-full border border-solid mix-blend-screen"
        style={{ width: coreSize, height: coreSize, borderColor: accentColor }}
      />

      {/* Outward Particles */}
      {particles.map((_, i) => (
        <CoreParticle key={i} accentColor={accentColor} />
      ))}

      {/* Outer energy rings */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
        className="absolute rounded-full border-t-2 border-b-2 border-dashed opacity-70 mix-blend-screen"
        style={{ width: outerSize, height: outerSize, borderColor: accentColor }}
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 15, ease: 'linear', repeat: Infinity }}
        className="absolute rounded-full border-r-2 border-l-2 opacity-50 mix-blend-screen"
        style={{ width: midSize, height: midSize, borderColor: accentColor }}
      />

      {/* Core glowing orb */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'] }}
        transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
        className="rounded-full flex items-center justify-center transition-colors duration-1000"
        style={{
          width: coreSize,
          height: coreSize,
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 80%)`,
          boxShadow: `0 0 40px ${accentColor}, inset 0 0 20px #fff`,
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
      className="absolute z-30 flex items-center justify-center"
      initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
      animate={{ x, y, opacity: 1, scale: 1 }}
      exit={{ x: 0, y: 0, opacity: 0, scale: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15, delay: index * 0.08 }}
    >
      {/* Connector Beam (points from portal back to core) */}
      <motion.div
        className="absolute top-1/2 left-1/2 h-[3px] origin-left opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          width: `${radius - (isMobile ? 24 : 32)}px`,
          background: `linear-gradient(90deg, ${accentColor}00, ${accentColor})`,
          transform: `translateY(-50%) rotate(${Math.atan2(-y, -x)}rad)`,
          boxShadow: `0 0 15px ${accentColor}`,
        }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />

      {/* Counter rotation to keep portals upright */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 50, ease: 'linear', repeat: Infinity }}
      >
        {/* Tooltip wraps the portal so hover works in local space */}
        <SkillTooltip tech={tech} accentColor={accentColor}>
          <motion.div
            whileHover={{ scale: 1.35, zIndex: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="relative flex items-center justify-center rounded-full group cursor-pointer clickable-cursor"
            style={{ width: size, height: size }}
          >
            {/* Portal Energy Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, ease: 'linear', repeat: Infinity }}
              className="absolute inset-0 rounded-full border-2 border-dashed opacity-60 group-hover:opacity-100 group-hover:border-solid transition-all duration-300"
              style={{ borderColor: accentColor, boxShadow: `inset 0 0 10px ${accentColor}` }}
            />
            <div
              className="absolute inset-1 rounded-full border opacity-30 group-hover:opacity-80 transition-opacity duration-300"
              style={{ borderColor: accentColor }}
            />

            {/* Portal Background & Content */}
            <div
              className="absolute inset-2 rounded-full backdrop-blur-md flex items-center justify-center overflow-hidden transition-all duration-300"
              style={{
                background: 'rgba(4,12,30,0.85)',
                boxShadow: `inset 0 0 15px ${accentColor}40, 0 0 15px ${accentColor}40`,
              }}
            >
              <span className="text-[10px] md:text-[11px] font-bold text-white text-center leading-tight px-1 z-10 break-words drop-shadow-md">
                {tech}
              </span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `radial-gradient(circle, ${accentColor}70 0%, transparent 80%)` }}
              />
            </div>

            {/* Intense Outer Glow on Hover */}
            <div
              className="absolute inset-[-10px] rounded-full opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 blur-md"
              style={{ background: `radial-gradient(circle, ${accentColor}40 0%, transparent 70%)` }}
            />
          </motion.div>
        </SkillTooltip>
      </motion.div>
    </motion.div>
  );
}

function PortalConstellation({ activeFace, parallaxX, parallaxY }) {
  const currentFace = FACES[activeFace];
  const techs = currentFace.techs;
  const accentColor = currentFace.accentColor;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-visible">
      {/* Background ambient glow */}
      <div
        className="absolute inset-0 opacity-20 transition-colors duration-1000 pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${accentColor} 0%, transparent 70%)` }}
      />

      {/* Parallax Container */}
      <motion.div style={{ x: parallaxX, y: parallaxY }} className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFace.id}
            initial={{ opacity: 0, scale: 0.7, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.3, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Slowly rotating container for the entire constellation */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 50, ease: 'linear', repeat: Infinity }}
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
      </motion.div>
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
            className="clickable-cursor px-5 py-2 rounded-lg font-mono text-[11px] font-bold tracking-widest transition-all duration-500 outline-none relative overflow-hidden"
            style={{
              background: on ? `${face.accentColor}15` : 'rgba(4,12,28,0.6)',
              border: `1px solid ${on ? face.accentColor + '80' : 'rgba(255,255,255,0.07)'}`,
              color: on ? face.accentColor : '#64748B',
              boxShadow: on ? `0 0 20px ${face.accentColor}3a, inset 0 0 10px ${face.accentColor}1a` : 'none',
              transform: on ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            <span className="relative z-10">{face.label}</span>
            {on && (
              <motion.div
                layoutId="activeTabGlow"
                className="absolute inset-0 z-0"
                style={{ background: `linear-gradient(90deg, transparent, ${face.accentColor}2a, transparent)` }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── Root Export ──────────────────────────────────────────────────────────────
export default function SkillsCube() {
  const [activeFace, setActiveFace] = useState(0);

  // Parallax setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 40, damping: 20, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  const parallaxX = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const parallaxY = useTransform(springY, [-0.5, 0.5], [-20, 20]);

  const handleMouseMove = (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const BOX_SIZE = 480; // px — the canonical square size of both boxes on desktop

  return (
    <section
      id="skills"
      className="min-h-screen py-20 px-4 flex flex-col justify-center relative bg-transparent font-sans overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <span className="inline-block font-mono text-[11px] text-accent-primary border border-accent-primary/30 rounded px-3 py-1 tracking-widest bg-accent-primary/5 uppercase mb-3 shadow-[0_0_15px_rgba(0,224,164,0.2)]">
          // TECHNICAL SKILLS NODE
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight drop-shadow-lg m-0">
          Skill Set Matrix
        </h2>
      </div>

      {/* Tabs */}
      <div className="mb-8 flex flex-col items-center">
        <FaceTabs activeFace={activeFace} setActiveFace={setActiveFace} />
        <p className="text-center mt-4 font-mono text-[10px] text-slate-400/50 tracking-[0.12em]">
          SELECT DIMENSION // HOVER PORTALS TO INSPECT
        </p>
      </div>

      {/* Main Layout — items-stretch ensures equal height */}
      <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-8 lg:gap-12 max-w-5xl mx-auto w-full relative z-10">

        {/* ─── Left: Visualization box ─── */}
        <div
          className="flex-shrink-0 relative rounded-3xl border transition-all duration-1000 overflow-visible"
          style={{
            width: BOX_SIZE,
            /* On desktop the row uses items-stretch, so height is determined by the taller sibling.
               We set a min-height so it never collapses smaller than the square we want. */
            minHeight: BOX_SIZE,
            borderColor: `${FACES[activeFace].accentColor}3a`,
            boxShadow: `inset 0 0 80px ${FACES[activeFace].accentColor}10, 0 0 60px ${FACES[activeFace].accentColor}15`,
          }}
        >
          {/* Clip just the background glow, not the portals (so tooltips aren't clipped) */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
            <div
              className="absolute inset-0 opacity-10 transition-colors duration-1000"
              style={{ background: `radial-gradient(circle at center, ${FACES[activeFace].accentColor} 0%, transparent 70%)` }}
            />
          </div>
          <PortalConstellation activeFace={activeFace} parallaxX={parallaxX} parallaxY={parallaxY} />
        </div>

        {/* ─── Right: Detail Panel — stretches to match left box height ─── */}
        <div
          className="flex-shrink-0 lg:flex-1 w-full lg:w-auto"
          style={{ maxWidth: 380, minWidth: 280 }}
        >
          {/* DetailPanel itself is h-full so it fills the stretched container */}
          <div className="h-full">
            <DetailPanel face={FACES[activeFace]} />
          </div>
        </div>
      </div>
    </section>
  );
}
