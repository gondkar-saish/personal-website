import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const HardwareSystems = () => {
  const hardwareProjects = [
    {
      id: 'esp32',
      title: 'ESP32 Smart Room Monitor',
      status: 'In Progress',
      tech: 'ESP32, sensors, OLED display, Arduino IDE, embedded C/C++',
      description: 'An embedded IoT system built around the ESP32 to monitor real-time room conditions using sensors and display modules.',
      image: `${import.meta.env.BASE_URL}images/esp32-image.jpg`
    },
    {
      id: 'de10',
      title: 'DE-10 Lite Calculator',
      status: 'Built',
      tech: 'DE-10 Lite FPGA board, Verilog/VHDL, digital logic, seven-segment',
      description: 'An FPGA-based calculator implemented on the DE-10 Lite board using digital logic design. Demonstrates hardware-level computation.',
      image: `${import.meta.env.BASE_URL}images/de10-lite-image.jpg`
    },
    {
      id: 'arduino',
      title: 'Arduino Ultrasonic Radar',
      status: 'Upcoming',
      tech: 'Arduino, ultrasonic sensor, servo motor, embedded C/C++',
      description: 'A planned Arduino-based radar scanner using an ultrasonic sensor and servo motor to detect nearby objects.',
      image: `${import.meta.env.BASE_URL}images/arduino-image.jpg`
    }
  ];

  const [activeIndex, setActiveIndex] = useState(1); // Default to middle card
  const [isMobile, setIsMobile] = useState(false);
  const hoverTimeoutRef = useRef(null);

  const handleMouseEnter = (index) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveIndex(index);
    }, 800);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  // Check for mobile/touch devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getStatusColor = (status) => {
    if (status === 'Built') return 'text-accent-primary bg-accent-primary/10 border-accent-primary/30 shadow-[0_0_10px_var(--accent-primary)]';
    if (status === 'In Progress') return 'text-amber-400 bg-amber-400/10 border-amber-400/30 shadow-[0_0_10px_rgba(251,191,36,0.2)]';
    return 'text-text-muted bg-slate-500/10 border-slate-500/30 shadow-[0_0_10px_rgba(148,163,184,0.1)]';
  };

  return (
    <section id="hardware" className="py-24 min-h-[calc(100vh-80px)] flex flex-col justify-center border-t border-b border-border-subtle relative overflow-hidden bg-transparent">

      {/* Technical Header */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 mb-12 mt-12 md:mt-0">
        <div className="flex flex-col items-center text-center">
          <span className="text-accent-primary font-mono text-xs md:text-sm tracking-widest uppercase mb-2 animate-pulse">
            // HARDWARE SYSTEMS NODE
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-text-main uppercase tracking-wider">
            Hardware & Embedded
          </h2>
          <div className="w-16 h-[2px] bg-accent-primary mt-3 shadow-[0_0_10px_var(--accent-primary)] mb-6"></div>
          <p className="text-text-muted text-lg max-w-2xl">
            Hands-on embedded systems, FPGA logic, and sensor-based projects combining hardware control with software thinking.
          </p>
        </div>
      </div>

      {/* Interactive Showcase Container */}
      <div className="relative w-full md:h-[650px] flex items-center justify-center overflow-visible md:overflow-hidden py-4 md:py-0">
        
        {/* Mobile View: Native Scroll Snap */}
        {isMobile ? (
          <div className="w-full h-auto overflow-x-auto snap-x snap-mandatory hide-scrollbar flex items-stretch gap-6 px-[10vw] py-4">
            {hardwareProjects.map((project, index) => (
              <div 
                key={project.id}
                onClick={() => setActiveIndex(index)}
                className={`snap-center shrink-0 w-[85vw] h-auto min-h-[500px] flex flex-col engineering-card relative text-left transition-all duration-300 ${
                  activeIndex === index ? 'border-accent-primary/60 shadow-[0_0_30px_var(--accent-primary)]' : 'border-border-subtle'
                }`}
              >
                <div className="relative w-full h-56 flex-shrink-0 overflow-hidden border-b border-accent-primary/20"
                  style={{ backgroundColor: '#05080f' }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 pb-8 flex flex-col flex-grow relative z-10 h-auto">
                  <span className="text-[9px] font-mono text-accent-primary/70 tracking-widest uppercase mb-1 block">
                    [ SYSTEM // MODULE 0{index + 1} ]
                  </span>
                  <h3 className="font-bold text-text-main text-2xl mb-4">{project.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-6">{project.description}</p>
                  
                  <div className="mt-auto pt-2">
                    <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2 font-mono">// Tech Stack</h4>
                    <p className="text-sm font-mono font-bold text-accent-primary/90">{project.tech}</p>
                  </div>
                  
                  {/* Explore System Button */}
                  {project.id === 'esp32' && activeIndex === index && (
                    <div className="mt-6">
                      <Link 
                        to="/hardware-systems/esp32-smart-room-monitor"
                        className="engineering-button-secondary w-full py-2.5 text-xs font-mono font-bold uppercase tracking-wider gap-2 flex justify-center items-center"
                      >
                        Explore System
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          
          /* Desktop View: True 3D Center-Stage Layout */
          <div className="relative w-full max-w-7xl h-[600px] flex items-center justify-center">
            {hardwareProjects.map((project, index) => {
              
              // Calculate relative circular position
              const positionOffset = index - activeIndex;
              let visualPosition = positionOffset;
              if (positionOffset === -2) visualPosition = 1; // Wrap right
              if (positionOffset === 2) visualPosition = -1; // Wrap left

              const isActive = visualPosition === 0;
              const isLeft = visualPosition === -1;
              const isRight = visualPosition === 1;

              // Compute transform based on visual position
              let transformStyle = '';
              let zIndex = 10;
              let opacity = 1;

              if (isActive) {
                transformStyle = 'translateX(-50%) scale(1.06)';
                zIndex = 30;
                opacity = 1;
              } else if (isLeft) {
                transformStyle = 'translateX(-120%) scale(0.85)';
                zIndex = 20;
                opacity = 0.4;
              } else if (isRight) {
                transformStyle = 'translateX(20%) scale(0.85)';
                zIndex = 20;
                opacity = 0.4;
              }

              return (
                <div 
                  key={project.id}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => setActiveIndex(index)}
                  className={`absolute left-1/2 top-1/2 -translate-y-1/2 w-[400px] h-[550px] transition-all duration-[2500ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col cursor-pointer group ${
                    isActive 
                      ? 'engineering-card border-accent-primary/60 shadow-[0_0_40px_rgba(0,224,164,0.25)]' 
                      : 'bg-bg-surface45 border border-border-subtle rounded-xl overflow-hidden'
                  }`}
                  style={{ 
                    transform: `translateY(-50%) ${transformStyle}`,
                    zIndex,
                    opacity
                  }}
                >
                  {/* Project Image */}
                  <div className={`relative w-full overflow-hidden border-b transition-all duration-[2500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'h-56 border-accent-primary/25' : 'h-48 border-transparent'}`}
                    style={{ backgroundColor: '#05080f' }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`w-full h-full object-cover transition-all duration-[2500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'opacity-90 scale-100' : 'opacity-40 scale-105 grayscale'}`}
                    />
                    <div className={`absolute inset-0 transition-opacity duration-[2500ms] ease-[cubic-bezier(0.16,1,0.3,1)] bg-gradient-to-t from-bg-surface via-transparent to-transparent ${isActive ? 'opacity-80' : 'opacity-95'}`}></div>
                    <div className="absolute top-4 right-4 z-10">
                      <span className={`px-4 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-8 flex flex-col flex-grow text-left relative z-10">
                    {/* Technical Label */}
                    <span className="text-[9px] font-mono text-accent-primary/80 tracking-widest uppercase mb-1 block">
                      [ SYSTEM // MODULE 0{index + 1} ]
                    </span>
                    
                    <h3 className={`font-bold transition-colors duration-[2500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'text-2xl text-text-main mb-4 delay-150' : 'text-xl text-text-muted mb-3'}`}>
                      {project.title}
                    </h3>
                    
                    <p className={`text-sm leading-relaxed flex-grow transition-all duration-[2500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'text-text-muted opacity-100 delay-300' : 'text-[#556677] opacity-0 translate-y-4'}`}>
                      {project.description}
                    </p>
                    
                    <div className={`mt-auto transition-all duration-[2500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-4'}`}>
                      <h4 className="text-[10px] font-bold text-[#6B8599] uppercase tracking-widest mb-2 font-mono">// Tech Stack</h4>
                      <p className="text-sm font-mono font-bold text-accent-primary/90 mb-4">
                        {project.tech}
                      </p>
                      
                      {/* Explore System Button */}
                      {project.id === 'esp32' && isActive && (
                        <div className="pt-4 border-t border-accent-primary/15">
                          <Link 
                            to="/hardware-systems/esp32-smart-room-monitor"
                            className="engineering-button-secondary w-full py-2.5 text-xs font-mono font-bold uppercase tracking-wider gap-2"
                          >
                            Explore System
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Subtle hover gradient over the whole card when inactive */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-[2500ms] ease-[cubic-bezier(0.16,1,0.3,1)]"></div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

export default HardwareSystems;
