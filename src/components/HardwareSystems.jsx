import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HardwareSystems = () => {
  const hardwareProjects = [
    {
      id: 'esp32',
      title: 'ESP32 Smart Room Monitor',
      status: 'In Progress',
      tech: 'ESP32, sensors, OLED display, Arduino IDE, embedded C/C++',
      description: 'An embedded IoT system built around the ESP32 to monitor real-time room conditions using sensors and display modules.',
      image: '/esp32-image.jpg'
    },
    {
      id: 'de10',
      title: 'DE-10 Lite Calculator',
      status: 'Built',
      tech: 'DE-10 Lite FPGA board, Verilog/VHDL, digital logic, seven-segment',
      description: 'An FPGA-based calculator implemented on the DE-10 Lite board using digital logic design. Demonstrates hardware-level computation.',
      image: '/de10-lite-image.jpg'
    },
    {
      id: 'arduino',
      title: 'Arduino Ultrasonic Radar',
      status: 'Upcoming',
      tech: 'Arduino, ultrasonic sensor, servo motor, embedded C/C++',
      description: 'A planned Arduino-based radar scanner using an ultrasonic sensor and servo motor to detect nearby objects.',
      image: '/arduino-image.jpg'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(1); // Default to middle card
  const [isMobile, setIsMobile] = useState(false);

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
    if (status === 'Built') return 'text-[#00E0A4] bg-[#00E0A4]/10 border-[#00E0A4]/30 shadow-[0_0_10px_rgba(0,224,164,0.2)]';
    if (status === 'In Progress') return 'text-amber-400 bg-amber-400/10 border-amber-400/30 shadow-[0_0_10px_rgba(251,191,36,0.2)]';
    return 'text-[#94A3B8] bg-slate-500/10 border-slate-500/30 shadow-[0_0_10px_rgba(148,163,184,0.1)]';
  };

  return (
    <section id="hardware" className="py-24 min-h-[calc(100vh-80px)] flex flex-col justify-center border-t border-b border-white/5 relative overflow-hidden bg-transparent">

      {/* Technical Header */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 mb-12 mt-12 md:mt-0">
        <div className="flex flex-col items-center text-center">
          <span className="text-[#00E0A4] font-mono text-xs md:text-sm tracking-widest uppercase mb-2 animate-pulse">
            // HARDWARE SYSTEMS NODE
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#F8FAFC] uppercase tracking-wider">
            Hardware & Embedded
          </h2>
          <div className="w-16 h-[2px] bg-[#00E0A4] mt-3 shadow-[0_0_10px_rgba(0,224,164,0.6)] mb-6"></div>
          <p className="text-[#94A3B8] text-lg max-w-2xl">
            Hands-on embedded systems, FPGA logic, and sensor-based projects combining hardware control with software thinking.
          </p>
        </div>
      </div>

      {/* Interactive Showcase Container */}
      <div className="relative w-full h-[650px] flex items-center justify-center overflow-hidden">
        
        {/* Mobile View: Native Scroll Snap */}
        {isMobile ? (
          <div className="w-full h-full overflow-x-auto snap-x snap-mandatory hide-scrollbar flex items-center gap-6 px-[10vw]">
            {hardwareProjects.map((project, index) => (
              <div 
                key={project.id}
                onClick={() => setActiveIndex(index)}
                className={`snap-center shrink-0 w-[85vw] h-[550px] engineering-card relative text-left ${
                  activeIndex === index ? 'border-[#00E0A4]/60 shadow-[0_0_30px_rgba(0,224,164,0.2)]' : 'border-white/10'
                }`}
              >
                <div className="relative w-full h-64 overflow-hidden border-b border-[#00E0A4]/20"
                  style={{ backgroundColor: '#05080f' }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow relative z-10 h-[calc(100%-16rem)]">
                  <span className="text-[9px] font-mono text-[#00E0A4]/70 tracking-widest uppercase mb-1 block">
                    [ SYSTEM // MODULE 0{index + 1} ]
                  </span>
                  <h3 className="font-bold text-[#F8FAFC] text-2xl mb-4">{project.title}</h3>
                  <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">{project.description}</p>
                  
                  <div className="mt-auto">
                    <h4 className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2 font-mono">// Tech Stack</h4>
                    <p className="text-sm font-mono font-bold text-[#00E0A4]/90">{project.tech}</p>
                  </div>
                  
                  {/* Explore System Button */}
                  {project.id === 'esp32' && activeIndex === index && (
                    <div className="mt-6">
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
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className={`absolute left-1/2 top-1/2 -translate-y-1/2 w-[400px] h-[550px] transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col cursor-pointer group ${
                    isActive 
                      ? 'engineering-card border-[#00E0A4]/60 shadow-[0_0_40px_rgba(0,224,164,0.25)]' 
                      : 'bg-[#07111f]/45 border border-white/10 rounded-xl overflow-hidden'
                  }`}
                  style={{ 
                    transform: `translateY(-50%) ${transformStyle}`,
                    zIndex,
                    opacity
                  }}
                >
                  {/* Project Image */}
                  <div className={`relative w-full overflow-hidden border-b transition-all duration-[800ms] ${isActive ? 'h-56 border-[#00E0A4]/25' : 'h-48 border-transparent'}`}
                    style={{ backgroundColor: '#05080f' }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`w-full h-full object-cover transition-all duration-[800ms] ${isActive ? 'opacity-90 scale-100' : 'opacity-40 scale-105 grayscale'}`}
                    />
                    <div className={`absolute inset-0 transition-opacity duration-700 bg-gradient-to-t from-[#07111f] via-transparent to-transparent ${isActive ? 'opacity-80' : 'opacity-95'}`}></div>
                    <div className="absolute top-4 right-4 z-10">
                      <span className={`px-4 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-8 flex flex-col flex-grow text-left relative z-10">
                    {/* Technical Label */}
                    <span className="text-[9px] font-mono text-[#00E0A4]/80 tracking-widest uppercase mb-1 block">
                      [ SYSTEM // MODULE 0{index + 1} ]
                    </span>
                    
                    <h3 className={`font-bold transition-colors duration-500 ${isActive ? 'text-2xl text-[#F8FAFC] mb-4' : 'text-xl text-[#94A3B8] mb-3'}`}>
                      {project.title}
                    </h3>
                    
                    <p className={`text-sm leading-relaxed flex-grow transition-all duration-500 ${isActive ? 'text-[#94A3B8] opacity-100' : 'text-[#556677] opacity-0 translate-y-4'}`}>
                      {project.description}
                    </p>
                    
                    <div className={`mt-auto transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 translate-y-4'}`}>
                      <h4 className="text-[10px] font-bold text-[#6B8599] uppercase tracking-widest mb-2 font-mono">// Tech Stack</h4>
                      <p className="text-sm font-mono font-bold text-[#00E0A4]/90 mb-4">
                        {project.tech}
                      </p>
                      
                      {/* Explore System Button */}
                      {project.id === 'esp32' && isActive && (
                        <div className="pt-4 border-t border-[#00E0A4]/15">
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
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300"></div>
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
