import React, { useState, useEffect, useRef } from 'react';

const About = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [hoveredComponent, setHoveredComponent] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, title: '', subtitle: '', text: '' });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e) => {
    if (!prefersReducedMotion) {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    }

    if (hoveredComponent && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      // Position tooltip slightly offset from the cursor
      setTooltip((prev) => ({
        ...prev,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }));
    }
  };

  const handleComponentHover = (componentId) => {
    setHoveredComponent(componentId);
    if (componentId && tooltips[componentId]) {
      setTooltip((prev) => ({
        ...prev,
        show: true,
        title: tooltips[componentId].title,
        subtitle: tooltips[componentId].subtitle,
        text: tooltips[componentId].text,
      }));
    } else {
      setTooltip((prev) => ({ ...prev, show: false }));
    }
  };

  const cards = [
    { 
      id: 'education', 
      title: 'Education', 
      content: 'Computer Engineering Junior at the University of Texas at Arlington.',
      category: 'education'
    },
    { 
      id: 'software', 
      title: 'Software Focus', 
      content: 'Backend systems, Java, Spring Boot, REST APIs, MySQL, authentication, and scalable project architecture.',
      category: 'software'
    },
    { 
      id: 'hardware', 
      title: 'Hardware Focus', 
      content: 'ESP32 systems, Arduino projects, FPGA logic with DE-10 Lite, sensors, displays, and hardware-software integration.',
      category: 'hardware'
    },
    { 
      id: 'direction', 
      title: 'Current Direction', 
      content: 'Building projects that combine backend development, embedded systems, and interactive web experiences.',
      category: 'direction'
    }
  ];

  const tooltips = {
    cpu: {
      title: 'CPU',
      subtitle: 'Core Processor',
      text: 'Core engineering foundation and problem-solving.'
    },
    ram: {
      title: 'RAM',
      subtitle: 'System Memory',
      text: 'Learning, memory, and technical growth.'
    },
    backend: {
      title: 'BACKEND',
      subtitle: 'Logic & Database',
      text: 'Java, Spring Boot, REST APIs, and databases.'
    },
    embedded: {
      title: 'EMBEDDED',
      subtitle: 'Microcontrollers',
      text: 'ESP32, Arduino, sensors, and hardware control.'
    },
    fpga: {
      title: 'FPGA',
      subtitle: 'Digital Logic',
      text: 'Digital logic and DE-10 Lite hardware projects.'
    },
    iot: {
      title: 'IOT & SENSORS',
      subtitle: 'Connected Devices',
      text: 'Connecting hardware data with software interfaces.'
    },
    data: {
      title: 'DATA',
      subtitle: 'Storage Subsystem',
      text: 'Structuring, storing, and optimizing data flow.'
    }
  };

  const isComponentActive = (id) => {
    if (hoveredComponent === id) return true;
    if (!activeCategory) return false;
    
    const categoryMap = {
      'education': ['cpu', 'ram'],
      'software': ['backend', 'data', 'cpu'],
      'hardware': ['embedded', 'fpga', 'iot', 'cpu'],
      'direction': ['backend', 'embedded', 'fpga', 'iot', 'cpu', 'ram', 'data']
    };
    
    return categoryMap[activeCategory]?.includes(id);
  };

  const mainTraces = [
    { id: 'data', d: 'M 82 95 H 60 V 45 H 41 V 40' },
    { id: 'iot', d: 'M 100 82 V 42' },
    { id: 'embedded', d: 'M 115 82 V 50 H 162.5 V 49' },
    { id: 'backend', d: 'M 85 118 V 132 H 42.5 V 145' },
    { id: 'fpga', d: 'M 115 118 V 132 H 157.5 V 145' },
    { id: 'ram', d: 'M 118 100 H 136' }
  ];

  const decorativeTraces = [
    { d: 'M 82 108 H 68 V 122 H 55' },
    { d: 'M 118 92 H 125 V 82 H 132' },
    { d: 'M 100 118 V 126 H 108 V 135' },
    { d: 'M 60 95 V 110 H 50' },
    { d: 'M 157.5 132 H 170 V 120' },
    { d: 'M 41 45 H 25 V 70' }
  ];

  return (
    <section id="about" className="py-6 md:py-10 bg-transparent min-h-[100vh] relative overflow-hidden z-10 flex flex-col justify-center" onMouseMove={handleMouseMove}>
      
      {/* Background Grid Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: 'linear-gradient(rgba(160, 189, 207, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(160, 189, 207, 0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Top Hero Layout: Text + Blueprint */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center mb-10">
          
          {/* Left Text Block */}
          <div className="w-full lg:w-5/12 flex flex-col justify-center text-left">
            <div className="mb-2 text-accent-primary text-xs md:text-sm font-mono font-bold tracking-widest uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-accent-primary animate-pulse"></span>
              ABOUT SYSTEM
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-text-main mb-2 leading-[1.1] tracking-tight">
              Computer<br/>Engineering<br/>Junior
            </h2>
            
            <h3 className="text-xl md:text-2xl text-accent-secondary font-medium mb-4 font-mono">
              University of Texas at Arlington
            </h3>
            
            <div className="w-16 h-1 bg-white/10 rounded-full mb-5"></div>
            
            <p className="text-text-muted text-lg md:text-[1.15rem] leading-[1.5] max-w-[270px] md:max-w-[310px]">
              Building scalable software, embedded hardware projects, and backend systems with an engineering-first mindset.
            </p>
          </div>

          {/* Right Animated Blueprint SVG */}
          <div 
            ref={containerRef}
            className="w-full lg:w-7/12 relative aspect-square md:aspect-[4/3] lg:aspect-square max-w-[500px] mx-auto"
            onMouseMove={handleMouseMove}
          >
            
            {/* Soft backdrop glow */}
            <div className="absolute inset-0 bg-accent-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Premium Glassy Skill Tooltip */}
            {tooltip.show && (
              <div 
                className="absolute pointer-events-none z-50 bg-bg-surface/95 backdrop-blur-md border border-accent-primary/40 shadow-[0_0_15px_var(--accent-primary)0.25)] rounded-lg p-3 text-xs font-mono text-accent-secondary max-w-[220px] transition-all duration-100 ease-out"
                style={{ 
                  left: `${tooltip.x}px`, 
                  top: `${tooltip.y}px`, 
                  transform: 'translate(12px, 12px)' 
                }}
              >
                <div className="text-accent-primary font-bold uppercase tracking-wider mb-0.5">
                  {tooltip.title}
                </div>
                <div className="text-text-muted text-[10px] font-bold uppercase tracking-widest mb-1.5 opacity-80 border-b border-accent-secondary pb-1">
                  {tooltip.subtitle}
                </div>
                <div className="text-xs leading-relaxed font-sans text-text-main">
                  {tooltip.text}
                </div>
              </div>
            )}

            {/* The Motherboard SVG Canvas */}
            <svg 
              viewBox="0 0 200 200" 
              className="w-full h-full overflow-visible transition-transform duration-700 ease-out"
              style={{ transform: prefersReducedMotion ? 'none' : `translate(${mousePos.x * 8}px, ${mousePos.y * 8}px)` }}
            >
              <defs>
                <style>{`
                  @keyframes motherboard-float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-1.5px); }
                  }
                  @keyframes pulse-glow {
                    0%, 100% { opacity: 0.15; }
                    50% { opacity: 0.35; }
                  }
                  @keyframes pulse-fast {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 1; }
                  }
                  .micro-float-1 {
                    animation: motherboard-float 5s ease-in-out infinite;
                  }
                  .micro-float-2 {
                    animation: motherboard-float 6s ease-in-out infinite;
                    animation-delay: 1.5s;
                  }
                  .micro-float-3 {
                    animation: motherboard-float 7s ease-in-out infinite;
                    animation-delay: 3s;
                  }
                  .pulse-cpu {
                    animation: pulse-glow 3s ease-in-out infinite;
                  }
                  .pulse-node {
                    animation: pulse-fast 2s ease-in-out infinite;
                  }
                `}</style>

                {/* Glow Filters */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Blueprint Grid Pattern */}
                <pattern id="blueprint-dots" width="10" height="10" patternUnits="userSpaceOnUse">
                  <circle cx="5" cy="5" r="0.4" fill="#3b82f6" opacity="0.2" />
                </pattern>

                {/* CPU Glow Gradient */}
                <radialGradient id="cpuGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00E0A4" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#00E0A4" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Dotted Blueprint Grid */}
              <rect x="5" y="5" width="190" height="190" fill="url(#blueprint-dots)" />

              {/* Outer Technical Frame */}
              <rect x="5" y="5" width="190" height="190" rx="6" fill="none" stroke="#1E3A8A" strokeWidth="0.5" strokeDasharray="3 9" opacity="0.4" />
              <rect x="2" y="2" width="196" height="196" rx="8" fill="none" stroke="#1E2E3D" strokeWidth="0.3" opacity="0.3" />
              
              {/* Technical Corner Marks */}
              <path d="M 12 5 H 5 V 12" fill="none" stroke="#00E0A4" strokeWidth="1" opacity="0.6" />
              <path d="M 188 5 H 195 V 12" fill="none" stroke="#00E0A4" strokeWidth="1" opacity="0.6" />
              <path d="M 5 188 V 195 H 12" fill="none" stroke="#00E0A4" strokeWidth="1" opacity="0.6" />
              <path d="M 195 188 V 195 H 188" fill="none" stroke="#00E0A4" strokeWidth="1" opacity="0.6" />

              {/* Static Circuit Traces (Dim Base) */}
              {decorativeTraces.map((trace, i) => (
                <path 
                  key={`dec-base-${i}`}
                  d={trace.d}
                  fill="none"
                  stroke="#101F30"
                  strokeWidth="0.8"
                  strokeLinejoin="round"
                  opacity="0.6"
                />
              ))}
              
              {mainTraces.map((trace, i) => {
                const active = isComponentActive(trace.id);
                return (
                  <path 
                    key={`main-base-${i}`}
                    d={trace.d}
                    fill="none"
                    stroke={active ? "#1B3B5F" : "#122538"}
                    strokeWidth="1"
                    strokeLinejoin="round"
                    className="transition-colors duration-500"
                  />
                );
              })}

              {/* Glowing Active Circuit Pulses (Continuous Flow) */}
              {mainTraces.map((trace, i) => {
                const active = isComponentActive(trace.id);
                return (
                  <path 
                    key={`pulse-${i}`}
                    d={trace.d}
                    fill="none"
                    stroke="#00E0A4"
                    strokeWidth={active ? "1.5" : "1"}
                    strokeLinejoin="round"
                    strokeDasharray="6 30"
                    filter={active ? "url(#glow)" : "none"}
                    className="animate-circuit"
                    style={{
                      opacity: active ? 1 : 0.25,
                      animationDuration: active ? '5s' : '10s',
                      transition: 'opacity 0.5s ease, stroke-width 0.5s ease, stroke 0.5s ease',
                    }}
                  />
                );
              })}

              {/* CENTRAL CPU CHIP */}
              <g 
                onMouseEnter={() => handleComponentHover('cpu')}
                onMouseLeave={() => handleComponentHover(null)}
                className="transition-all duration-500"
                style={{ transformOrigin: '100px 100px' }}
              >
                {/* CPU Radial Background Glow */}
                <circle cx="100" cy="100" r="28" fill="url(#cpuGlow)" className={isComponentActive('cpu') ? "pulse-cpu" : "opacity-0 transition-opacity duration-500"} />
                
                {/* CPU Pins */}
                <path 
                  d="M 88 82 V 77 M 94 82 V 77 M 100 82 V 77 M 106 82 V 77 M 112 82 V 77
                     M 88 118 V 123 M 94 118 V 123 M 100 118 V 123 M 106 118 V 123 M 112 118 V 123
                     M 82 88 H 77 M 82 94 H 77 M 82 100 H 77 M 82 106 H 77 M 82 112 H 77
                     M 118 88 H 123 M 118 94 H 123 M 118 100 H 123 M 118 106 H 123 M 118 112 H 123" 
                  stroke={isComponentActive('cpu') ? "#00E0A4" : "#1E3A8A"} 
                  strokeWidth="0.8"
                  className="transition-colors duration-500"
                />

                {/* CPU Socket Frame */}
                <rect x="80" y="80" width="40" height="40" rx="3" fill="#050A0F" stroke={isComponentActive('cpu') ? "#00E0A4" : "#152B3C"} strokeWidth="1" className="transition-all duration-500" />
                <rect x="82" y="82" width="36" height="36" rx="2" fill="#0A121D" stroke="#1E3A8A" strokeWidth="0.5" opacity="0.6" />
                
                {/* Metallic Heat Spreader */}
                <rect 
                  x="86" y="86" width="28" height="28" rx="1.5" 
                  fill={isComponentActive('cpu') ? "#0D2235" : "#070E17"} 
                  stroke={isComponentActive('cpu') ? "#00E0A4" : "#204060"} 
                  strokeWidth="1.2" 
                  className="transition-all duration-500"
                />

                {/* CPU Die (Silicon Center) */}
                <rect x="91" y="91" width="18" height="18" rx="1" fill="#04080D" stroke={isComponentActive('cpu') ? "#00E0A4" : "#1F3D5A"} strokeWidth="0.8" />
                
                {/* CPU Decorative Die Lines */}
                <line x1="91" y1="95" x2="109" y2="95" stroke="#1B3B5F" strokeWidth="0.5" opacity="0.5" />
                <line x1="91" y1="105" x2="109" y2="105" stroke="#1B3B5F" strokeWidth="0.5" opacity="0.5" />
                
                {/* CPU Label */}
                <text 
                  x="100" 
                  y="101" 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  fill={isComponentActive('cpu') ? "#00E0A4" : "#8FA9BC"} 
                  fontSize="4.5" 
                  fontFamily="monospace" 
                  fontWeight="bold"
                  className="tracking-widest transition-colors duration-500 pointer-events-none"
                  filter={isComponentActive('cpu') ? "url(#glow)" : "none"}
                >
                  CPU
                </text>

                {/* Hover Hitbox (Transparent) */}
                <rect x="76" y="76" width="48" height="48" fill="transparent" className="cursor-crosshair" />
              </g>

              {/* RAM / MEMORY MODULES */}
              <g 
                onMouseEnter={() => handleComponentHover('ram')}
                onMouseLeave={() => handleComponentHover(null)}
                className={`transition-all duration-500 ${prefersReducedMotion ? '' : 'micro-float-1'}`}
                style={{ transformOrigin: '143px 100px' }}
              >
                {/* Socket base */}
                <rect x="133" y="129" width="24" height="4" fill="#04080D" stroke="#1E3A8A" strokeWidth="0.5" />
                
                {/* RAM Stick 1 */}
                <g>
                  <rect x="136" y="72" width="4" height="57" rx="0.5" fill="#0A121D" stroke={isComponentActive('ram') ? "#00E0A4" : "#1E3A8A"} strokeWidth="0.6" className="transition-all duration-500" />
                  {/* Memory chips */}
                  <rect x="136.5" y="77" width="3" height="6" fill="#04080D" stroke="#1F3D5A" strokeWidth="0.3" />
                  <rect x="136.5" y="87" width="3" height="6" fill="#04080D" stroke="#1F3D5A" strokeWidth="0.3" />
                  <rect x="136.5" y="97" width="3" height="6" fill="#04080D" stroke="#1F3D5A" strokeWidth="0.3" />
                  <rect x="136.5" y="107" width="3" height="6" fill="#04080D" stroke="#1F3D5A" strokeWidth="0.3" />
                  {/* Gold Fingers */}
                  <line x1="137" y1="128" x2="137" y2="129" stroke="#00E0A4" strokeWidth="0.5" opacity={isComponentActive('ram') ? "1" : "0.5"} />
                  <line x1="138" y1="128" x2="138" y2="129" stroke="#00E0A4" strokeWidth="0.5" opacity={isComponentActive('ram') ? "1" : "0.5"} />
                  <line x1="139" y1="128" x2="139" y2="129" stroke="#00E0A4" strokeWidth="0.5" opacity={isComponentActive('ram') ? "1" : "0.5"} />
                </g>

                {/* RAM Stick 2 */}
                <g>
                  <rect x="143" y="70" width="4" height="59" rx="0.5" fill="#0A121D" stroke={isComponentActive('ram') ? "#00E0A4" : "#1E3A8A"} strokeWidth="0.6" className="transition-all duration-500" />
                  {/* Memory chips */}
                  <rect x="143.5" y="75" width="3" height="6" fill="#04080D" stroke="#1F3D5A" strokeWidth="0.3" />
                  <rect x="143.5" y="85" width="3" height="6" fill="#04080D" stroke="#1F3D5A" strokeWidth="0.3" />
                  <rect x="143.5" y="95" width="3" height="6" fill="#04080D" stroke="#1F3D5A" strokeWidth="0.3" />
                  <rect x="143.5" y="105" width="3" height="6" fill="#04080D" stroke="#1F3D5A" strokeWidth="0.3" />
                  {/* Gold Fingers */}
                  <line x1="144" y1="128" x2="144" y2="129" stroke="#00E0A4" strokeWidth="0.5" opacity={isComponentActive('ram') ? "1" : "0.5"} />
                  <line x1="145" y1="128" x2="145" y2="129" stroke="#00E0A4" strokeWidth="0.5" opacity={isComponentActive('ram') ? "1" : "0.5"} />
                  <line x1="146" y1="128" x2="146" y2="129" stroke="#00E0A4" strokeWidth="0.5" opacity={isComponentActive('ram') ? "1" : "0.5"} />
                </g>

                {/* RAM Stick 3 */}
                <g>
                  <rect x="150" y="72" width="4" height="57" rx="0.5" fill="#0A121D" stroke={isComponentActive('ram') ? "#00E0A4" : "#1E3A8A"} strokeWidth="0.6" className="transition-all duration-500" />
                  {/* Memory chips */}
                  <rect x="150.5" y="77" width="3" height="6" fill="#04080D" stroke="#1F3D5A" strokeWidth="0.3" />
                  <rect x="150.5" y="87" width="3" height="6" fill="#04080D" stroke="#1F3D5A" strokeWidth="0.3" />
                  <rect x="150.5" y="97" width="3" height="6" fill="#04080D" stroke="#1F3D5A" strokeWidth="0.3" />
                  <rect x="150.5" y="107" width="3" height="6" fill="#04080D" stroke="#1F3D5A" strokeWidth="0.3" />
                  {/* Gold Fingers */}
                  <line x1="151" y1="128" x2="151" y2="129" stroke="#00E0A4" strokeWidth="0.5" opacity={isComponentActive('ram') ? "1" : "0.5"} />
                  <line x1="152" y1="128" x2="152" y2="129" stroke="#00E0A4" strokeWidth="0.5" opacity={isComponentActive('ram') ? "1" : "0.5"} />
                  <line x1="153" y1="128" x2="153" y2="129" stroke="#00E0A4" strokeWidth="0.5" opacity={isComponentActive('ram') ? "1" : "0.5"} />
                </g>

                {/* Group Label */}
                <text 
                  x="143" 
                  y="63" 
                  textAnchor="middle" 
                  fill={isComponentActive('ram') ? "#00E0A4" : "#8FA9BC"} 
                  fontSize="4.5" 
                  fontFamily="monospace" 
                  fontWeight="bold"
                  className="transition-colors duration-500 pointer-events-none"
                >
                  RAM
                </text>

                {/* Hover Hitbox (Transparent) */}
                <rect x="131" y="58" width="28" height="76" fill="transparent" className="cursor-crosshair" />
              </g>

              {/* STORAGE / DATA BLOCK */}
              <g 
                onMouseEnter={() => handleComponentHover('data')}
                onMouseLeave={() => handleComponentHover(null)}
                className={`transition-all duration-500 ${prefersReducedMotion ? '' : 'micro-float-2'}`}
                style={{ transformOrigin: '41px 40px' }}
              >
                {/* Silicon chip container */}
                <rect x="25" y="30" width="32" height="20" rx="1.5" fill="#050A0F" stroke={isComponentActive('data') ? "#00E0A4" : "#1E3A8A"} strokeWidth="1" className="transition-all duration-500" />
                
                {/* NAND Flash package */}
                <rect x="29" y="34" width="11" height="12" fill="#0A121D" stroke="#1E3A8A" strokeWidth="0.5" />
                <line x1="29" y1="40" x2="40" y2="40" stroke="#1B3B5F" strokeWidth="0.3" opacity="0.4" />
                
                {/* SSD Controller chip */}
                <rect x="44" y="36" width="8" height="8" rx="0.5" fill="#0D1622" stroke="#1F3D5A" strokeWidth="0.5" />
                <circle cx="48" cy="40" r="1.2" fill="#00E0A4" opacity={isComponentActive('data') ? "0.8" : "0.3"} className="transition-opacity" />
                
                {/* Label */}
                <text 
                  x="41" 
                  y="25" 
                  textAnchor="middle" 
                  fill={isComponentActive('data') ? "#00E0A4" : "#8FA9BC"} 
                  fontSize="4.5" 
                  fontFamily="monospace" 
                  fontWeight="bold"
                  className="transition-colors duration-500 pointer-events-none"
                >
                  DATA
                </text>

                {/* Hover Hitbox */}
                <rect x="22" y="20" width="38" height="34" fill="transparent" className="cursor-crosshair" />
              </g>

              {/* EMBEDDED SYSTEMS BLOCK */}
              <g 
                onMouseEnter={() => handleComponentHover('embedded')}
                onMouseLeave={() => handleComponentHover(null)}
                className={`transition-all duration-500 ${prefersReducedMotion ? '' : 'micro-float-3'}`}
                style={{ transformOrigin: '162.5px 37px' }}
              >
                {/* Microcontroller shell */}
                <rect x="145" y="25" width="35" height="24" rx="2" fill="#050A0F" stroke={isComponentActive('embedded') ? "#00E0A4" : "#1E3A8A"} strokeWidth="1" className="transition-all duration-500" />
                
                {/* MCU core die */}
                <rect x="150" y="30" width="15" height="14" rx="1" fill="#0A121D" stroke="#1F3D5A" strokeWidth="0.5" />
                
                {/* Winding ESP32-style PCB antenna trace */}
                <path 
                  d="M 169 29 H 176 V 32 H 169 V 35 H 176 V 38 H 169 V 41 H 176 V 44 H 169" 
                  fill="none" 
                  stroke={isComponentActive('embedded') ? "#00E0A4" : "#8FA9BC"} 
                  strokeWidth="0.7" 
                  className="transition-colors duration-500"
                  opacity="0.8" 
                />

                {/* Technical pins */}
                <path d="M 145 31 H 143 M 145 37 H 143 M 145 43 H 143" stroke="#1E3A8A" strokeWidth="0.5" />
                
                {/* Label */}
                <text 
                  x="162.5" 
                  y="20" 
                  textAnchor="middle" 
                  fill={isComponentActive('embedded') ? "#00E0A4" : "#8FA9BC"} 
                  fontSize="4.5" 
                  fontFamily="monospace" 
                  fontWeight="bold"
                  className="transition-colors duration-500 pointer-events-none"
                >
                  EMBEDDED
                </text>

                {/* Hover Hitbox */}
                <rect x="140" y="15" width="44" height="38" fill="transparent" className="cursor-crosshair" />
              </g>

              {/* SENSOR / IOT BLOCK */}
              <g 
                onMouseEnter={() => handleComponentHover('iot')}
                onMouseLeave={() => handleComponentHover(null)}
                className={`transition-all duration-500 ${prefersReducedMotion ? '' : 'micro-float-1'}`}
                style={{ transformOrigin: '100px 32px' }}
              >
                {/* Breakout board */}
                <rect x="87" y="22" width="26" height="20" rx="1.5" fill="#050A0F" stroke={isComponentActive('iot') ? "#00E0A4" : "#1E3A8A"} strokeWidth="1" className="transition-all duration-500" />
                
                {/* Sensor transducer ring */}
                <circle cx="100" cy="32" r="6" fill="#070E17" stroke="#1F3D5A" strokeWidth="0.8" />
                <circle cx="100" cy="32" r="4" fill="none" stroke={isComponentActive('iot') ? "#00E0A4" : "#101F30"} strokeWidth="0.5" />
                <circle cx="100" cy="32" r="1.5" fill="#00E0A4" className={isComponentActive('iot') ? "animate-pulse" : ""} />
                
                {/* Decorative circuit vias */}
                <circle cx="91" cy="26" r="0.5" fill="#A0BDCF" opacity="0.6" />
                <circle cx="109" cy="26" r="0.5" fill="#A0BDCF" opacity="0.6" />
                
                {/* Label */}
                <text 
                  x="100" 
                  y="16" 
                  textAnchor="middle" 
                  fill={isComponentActive('iot') ? "#00E0A4" : "#8FA9BC"} 
                  fontSize="4.5" 
                  fontFamily="monospace" 
                  fontWeight="bold"
                  className="transition-colors duration-500 pointer-events-none"
                >
                  IOT
                </text>

                {/* Hover Hitbox */}
                <rect x="84" y="11" width="32" height="34" fill="transparent" className="cursor-crosshair" />
              </g>

              {/* BACKEND SYSTEMS BLOCK */}
              <g 
                onMouseEnter={() => handleComponentHover('backend')}
                onMouseLeave={() => handleComponentHover(null)}
                className={`transition-all duration-500 ${prefersReducedMotion ? '' : 'micro-float-2'}`}
                style={{ transformOrigin: '42.5px 156px' }}
              >
                {/* Server chip or multi-socket board */}
                <rect x="25" y="145" width="35" height="22" rx="1.5" fill="#050A0F" stroke={isComponentActive('backend') ? "#00E0A4" : "#1E3A8A"} strokeWidth="1" className="transition-all duration-500" />
                
                {/* Server rows */}
                <g>
                  <rect x="29" y="149" width="27" height="3" rx="0.3" fill="#0A121D" stroke="#1F3D5A" strokeWidth="0.4" />
                  <circle cx="31" cy="150.5" r="0.5" fill="#00E0A4" className="pulse-node" />
                  
                  <rect x="29" y="154.5" width="27" height="3" rx="0.3" fill="#0A121D" stroke="#1F3D5A" strokeWidth="0.4" />
                  <circle cx="31" cy="156" r="0.5" fill="#00E0A4" className="pulse-node" style={{ animationDelay: '0.5s' }} />
                  
                  <rect x="29" y="160" width="27" height="3" rx="0.3" fill="#0A121D" stroke="#1F3D5A" strokeWidth="0.4" />
                  <circle cx="31" cy="161.5" r="0.5" fill="#00E0A4" className="pulse-node" style={{ animationDelay: '1s' }} />
                </g>
                
                {/* Label */}
                <text 
                  x="42.5" 
                  y="139" 
                  textAnchor="middle" 
                  fill={isComponentActive('backend') ? "#00E0A4" : "#8FA9BC"} 
                  fontSize="4.5" 
                  fontFamily="monospace" 
                  fontWeight="bold"
                  className="transition-colors duration-500 pointer-events-none"
                >
                  BACKEND
                </text>

                {/* Hover Hitbox */}
                <rect x="22" y="134" width="41" height="36" fill="transparent" className="cursor-crosshair" />
              </g>

              {/* FPGA / LOGIC BLOCK */}
              <g 
                onMouseEnter={() => handleComponentHover('fpga')}
                onMouseLeave={() => handleComponentHover(null)}
                className={`transition-all duration-500 ${prefersReducedMotion ? '' : 'micro-float-3'}`}
                style={{ transformOrigin: '157.5px 156px' }}
              >
                {/* Dense chip package */}
                <rect x="140" y="145" width="35" height="22" rx="1.5" fill="#050A0F" stroke={isComponentActive('fpga') ? "#00E0A4" : "#1E3A8A"} strokeWidth="1" className="transition-all duration-500" />
                
                {/* BGA Fabric pattern simulation */}
                <rect x="146" y="150" width="23" height="12" rx="0.5" fill="#0A121D" stroke="#1F3D5A" strokeWidth="0.5" />
                
                {/* Tiny inner fabric nodes */}
                <circle cx="150" cy="153" r="0.5" fill="#3b82f6" opacity={isComponentActive('fpga') ? "0.9" : "0.4"} className="transition-opacity duration-300" />
                <circle cx="157" cy="153" r="0.5" fill="#3b82f6" opacity={isComponentActive('fpga') ? "0.9" : "0.4"} className="transition-opacity duration-300" />
                <circle cx="164" cy="153" r="0.5" fill="#3b82f6" opacity={isComponentActive('fpga') ? "0.9" : "0.4"} className="transition-opacity duration-300" />
                <circle cx="150" cy="159" r="0.5" fill="#3b82f6" opacity={isComponentActive('fpga') ? "0.9" : "0.4"} className="transition-opacity duration-300" />
                <circle cx="157" cy="159" r="0.5" fill="#3b82f6" opacity={isComponentActive('fpga') ? "0.9" : "0.4"} className="transition-opacity duration-300" />
                <circle cx="164" cy="159" r="0.5" fill="#3b82f6" opacity={isComponentActive('fpga') ? "0.9" : "0.4"} className="transition-opacity duration-300" />
                
                {/* Label */}
                <text 
                  x="157.5" 
                  y="139" 
                  textAnchor="middle" 
                  fill={isComponentActive('fpga') ? "#00E0A4" : "#8FA9BC"} 
                  fontSize="4.5" 
                  fontFamily="monospace" 
                  fontWeight="bold"
                  className="transition-colors duration-500 pointer-events-none"
                >
                  FPGA
                </text>

                {/* Hover Hitbox */}
                <rect x="137" y="134" width="41" height="36" fill="transparent" className="cursor-crosshair" />
              </g>
            </svg>
          </div>
        </div>

        {/* Bottom Data Panel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const isHovered = activeCategory === card.category;
            
            return (
              <div 
                key={card.id}
                onMouseEnter={() => setActiveCategory(card.category)}
                onMouseLeave={() => setActiveCategory(null)}
                className={`bg-bg-surface/80 backdrop-blur-sm border transition-all duration-300 rounded-xl p-6 relative overflow-hidden group cursor-crosshair text-left ${
                  isHovered ? 'border-accent-primary shadow-[0_0_20px_var(--accent-primary)0.15)] -translate-y-2' : 'border-border-subtle hover:border-accent-secondary'
                }`}
              >
                {/* Scanline Effect on Hover */}
                {isHovered && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-accent-primary/30 animate-pulse"></div>
                )}
                
                <h4 className="text-base md:text-lg font-mono font-black uppercase tracking-widest mb-4 text-accent-primary border-b border-accent-primary/40 pb-3 flex items-center gap-2 drop-shadow-[0_0_8px_rgba(0,224,164,0.3)]">
                  <span className="text-white">{'//'}</span> {card.title}
                </h4>
                
                <p className="text-text-muted text-sm leading-relaxed font-sans">
                  {card.content}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default About;
