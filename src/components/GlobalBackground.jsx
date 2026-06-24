import React, { useState, useEffect } from 'react';

const GlobalBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (prefersReducedMotion) return;
      // Calculate normalized mouse position from -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  return (
    <div className="fixed inset-0 z-[-10] overflow-hidden pointer-events-none bg-[#030712]">
      
      {/* Layer 1: Dark Radial Gradient Base for deep screen depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(7,17,31,0.85)_0%,_#030712_100%)] opacity-95"></div>

      {/* Layer 2: Dotted Blueprint Grid */}
      <div 
        className="absolute inset-[-10%] opacity-[0.12] transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: 'radial-gradient(rgba(56, 189, 248, 0.15) 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px',
          transform: prefersReducedMotion ? 'none' : `translate(${mousePos.x * -6}px, ${mousePos.y * -6}px)`
        }}
      ></div>

      {/* Layer 3: Faint Circuit-Line SVG Pattern */}
      <div 
        className="absolute inset-[-10%] opacity-[0.05] transition-transform duration-1000 ease-out"
        style={{
          transform: prefersReducedMotion ? 'none' : `translate(${mousePos.x * -12}px, ${mousePos.y * -12}px)`
        }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="bg-circuit" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M 0 50 H 100 V 150 H 200 M 50 0 V 50 M 150 150 V 200 M 100 50 L 150 100 H 200" fill="none" stroke="#38BDF8" strokeWidth="1" />
              <circle cx="100" cy="50" r="2.5" fill="none" stroke="#38BDF8" strokeWidth="0.8" />
              <circle cx="150" cy="100" r="2.5" fill="none" stroke="#38BDF8" strokeWidth="0.8" />
              <circle cx="150" cy="150" r="2.5" fill="none" stroke="#38BDF8" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bg-circuit)" />
        </svg>
      </div>

      {/* Layer 4: Slow moving scanline to simulate a terminal screen */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00E0A4]/[0.015] to-transparent h-[12px] w-full animate-scanline pointer-events-none"></div>
      )}

      {/* Layer 5: Ambient Soft Radial Glows that move in response to mouse cursor */}
      <div 
        className="absolute top-[-10%] left-[-5%] w-[60vw] h-[60vw] max-w-[800px] bg-[#00E0A4]/5 rounded-full blur-[130px] mix-blend-screen transition-transform duration-1000 ease-out"
        style={{ 
          transform: prefersReducedMotion ? 'none' : `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)`,
        }}
      ></div>
      
      <div 
        className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] max-w-[700px] bg-[#38BDF8]/5 rounded-full blur-[110px] mix-blend-screen transition-transform duration-1000 ease-out"
        style={{ 
          transform: prefersReducedMotion ? 'none' : `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`,
        }}
      ></div>

      {/* Layer 6: Continuous Background Circuit Traces & Glow Pulses */}
      {!prefersReducedMotion && (
        <svg className="absolute inset-0 w-full h-full opacity-[0.22] pointer-events-none">
          <defs>
            <style>{`
              @keyframes bg-circuit-flow {
                0% { stroke-dashoffset: 240; }
                100% { stroke-dashoffset: 0; }
              }
              .bg-trace-pulse {
                stroke-dasharray: 6 50;
                animation: bg-circuit-flow 18s linear infinite;
              }
            `}</style>
          </defs>

          {/* Faint Nodes */}
          <circle cx="10%" cy="15%" r="2" fill="#00E0A4" className="animate-pulse" style={{ animationDuration: '3s' }} />
          <circle cx="90%" cy="25%" r="1.5" fill="#38BDF8" className="animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
          <circle cx="80%" cy="75%" r="2.5" fill="#00E0A4" className="animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
          <circle cx="20%" cy="85%" r="1.5" fill="#38BDF8" className="animate-pulse" style={{ animationDuration: '3s', animationDelay: '1.5s' }} />

          {/* Circuit Traces running across screen */}
          <path d="M -50 150 H 150 L 200 200 H 450 V 350 L 400 400 H -50" fill="none" stroke="rgba(56, 189, 248, 0.03)" strokeWidth="1" />
          <path d="M -50 150 H 150 L 200 200 H 450 V 350 L 400 400 H -50" fill="none" stroke="#00E0A4" strokeWidth="1.2" className="bg-trace-pulse" opacity="0.5" />

          <path d="M 1200 750 H 950 L 900 700 H 750 V 550 L 800 500 H 1250" fill="none" stroke="rgba(56, 189, 248, 0.03)" strokeWidth="1" />
          <path d="M 1200 750 H 950 L 900 700 H 750 V 550 L 800 500 H 1250" fill="none" stroke="#38BDF8" strokeWidth="1.2" className="bg-trace-pulse" opacity="0.5" style={{ animationDuration: '24s', animationDelay: '4s' }} />
        </svg>
      )}

      {/* Layer 7: Faint Digital Noise overlay for hardware screen effect */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      ></div>

      {/* Vignette border darkener */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#020408_100%)] opacity-80"></div>
    </div>
  );
};

export default GlobalBackground;
