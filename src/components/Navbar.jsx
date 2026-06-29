import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBlackHoleActive, setIsBlackHoleActive] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Skills', href: '/skills' },
    { name: 'Projects', href: '/projects' },
    { name: 'Hardware Systems', href: '/hardware-systems' },
    { name: 'Side Quests', href: '/side-quests' },
  ];

  return (
    <nav className="fixed top-4 md:top-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[92%] max-w-7xl border border-[var(--nav-border)] shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-2xl z-50 transition-all duration-300 group/navcontainer">
      
      <style>{`
        @keyframes nav-circuit-slide {
          from { transform: translateX(0); }
          to { transform: translateX(-400px); }
        }
        @keyframes orb-liquid-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orb-glow-pulse {
          0%, 100% { 
            box-shadow: 0 0 10px rgba(0, 224, 164, 0.4), inset -2px -2px 6px rgba(0,0,0,0.6), inset 2px 2px 6px rgba(255,255,255,0.3);
            border-color: rgba(0, 224, 164, 0.3);
          }
          50% { 
            box-shadow: 0 0 18px rgba(56, 189, 248, 0.6), inset -2px -2px 6px rgba(0,0,0,0.5), inset 2px 2px 6px rgba(255,255,255,0.4);
            border-color: rgba(56, 189, 248, 0.5);
          }
        }
      `}</style>

      {/* Glass Base */}
      <div className="absolute inset-0 bg-[var(--nav-bg)] backdrop-blur-[18px] pointer-events-none -z-20 transition-all duration-500 rounded-2xl"></div>

      {/* Animated Circuit Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 rounded-2xl">
        <div 
          className="absolute top-0 left-0 h-full w-[calc(100%+400px)] mix-blend-multiply opacity-75 transition-all duration-500"
          style={{ 
            animation: prefersReducedMotion ? 'none' : 'nav-circuit-slide 50s linear infinite',
          }}
        >
          <svg width="100%" height="100%">
          <defs>
            <pattern id="nav-circuit" x="0" y="0" width="400" height="80" patternUnits="userSpaceOnUse">
               {/* Circuit lines */}
               <path d="M 0 25 H 40 L 60 45 H 180 L 200 25 H 400" fill="none" stroke="var(--nav-circuit-stroke)" strokeWidth="1" className="transition-all duration-500" />
               <path d="M 60 80 V 60 L 80 40" fill="none" stroke="var(--nav-circuit-stroke)" strokeWidth="1" className="transition-all duration-500" />
               <path d="M 120 45 L 140 65 H 280 L 300 45 H 400" fill="none" stroke="var(--nav-circuit-stroke)" strokeWidth="1" className="transition-all duration-500" />
               <path d="M 220 80 V 60 L 240 40 H 260" fill="none" stroke="var(--nav-circuit-stroke)" strokeWidth="1" className="transition-all duration-500" />
               <path d="M 320 0 V 30 L 350 60 H 400" fill="none" stroke="var(--nav-circuit-stroke)" strokeWidth="1" className="transition-all duration-500" />
               <path d="M 340 0 V 15 L 355 30 H 400" fill="none" stroke="var(--nav-circuit-stroke)" strokeWidth="1" className="transition-all duration-500" />
               <path d="M 10 0 V 10 L 25 25" fill="none" stroke="var(--nav-circuit-stroke)" strokeWidth="1" className="transition-all duration-500" />
               
               {/* Nodes */}
               <circle cx="40" cy="25" r="2.5" fill="var(--nav-circuit-stroke)" className="transition-all duration-500" />
               <circle cx="180" cy="25" r="2" fill="var(--nav-circuit-stroke)" className="transition-all duration-500" />
               <circle cx="120" cy="45" r="2.5" fill="var(--nav-circuit-stroke)" className="transition-all duration-500" />
               <circle cx="280" cy="65" r="2" fill="var(--nav-circuit-stroke)" className="transition-all duration-500" />
               <circle cx="260" cy="40" r="1.5" fill="var(--nav-circuit-stroke)" className="transition-all duration-500" />
               <circle cx="350" cy="60" r="2.5" fill="var(--nav-circuit-stroke)" className="transition-all duration-500" />
               <circle cx="355" cy="30" r="2" fill="var(--nav-circuit-stroke)" className="transition-all duration-500" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#nav-circuit)" />
        </svg>
        </div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px] md:h-[80px]">
          
          {/* Logo Brand with Tech Core Orb */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <div 
              className="group relative w-[30px] h-[30px] rounded-full overflow-hidden border border-border-subtle flex-shrink-0 hover:scale-110 hover:brightness-110 transition-all duration-500 cursor-pointer"
              style={{
                animation: 'orb-glow-pulse 6s infinite ease-in-out',
                background: 'rgba(8, 12, 24, 0.8)',
              }}
            >
              {/* Swirling Liquid Core */}
              <div 
                className="absolute -inset-[50%] rounded-full opacity-90 filter blur-[2px] transition-transform duration-700"
                style={{
                  background: 'conic-gradient(from 0deg, #00E0A4, #0284C7, #00E0A4, #38BDF8, rgba(139, 92, 246, 0.4), #00E0A4)',
                  animation: 'orb-liquid-spin 12s linear infinite',
                }}
              ></div>
              
              {/* Secondary Shimmer Accent */}
              <div 
                className="absolute inset-0 rounded-full opacity-50 mix-blend-color-dodge transition-opacity duration-300 group-hover:opacity-70"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.45), transparent 60%)',
                }}
              ></div>

              {/* Glossy Reflection Highlight */}
              <div 
                className="absolute top-[1px] left-[2px] w-[80%] h-[35%] rounded-full pointer-events-none z-10"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 100%)',
                  transform: 'rotate(-15deg)',
                }}
              ></div>
            </div>
            <Link 
              to="/" 
              onClick={(e) => {
                e.preventDefault();
                if (isBlackHoleActive) return;
                setIsBlackHoleActive(true);
                setIsOpen(false);
                setTimeout(() => {
                  window.location.reload();
                }, 1200);
              }} 
              className="text-lg md:text-xl font-extrabold text-nav-text-main tracking-wide hover:opacity-80 transition-all duration-300 relative z-50"
            >
              Saish Gondkar
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            <div className="flex space-x-1 mr-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  end={link.href === '/'}
                  className={({ isActive }) => 
                    `px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg relative ${
                      isActive 
                        ? 'text-nav-text-main bg-[var(--nav-btn-hover)]' 
                        : 'text-nav-text-muted hover:text-nav-text-main hover:bg-[var(--nav-btn-hover)]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {isActive && (
                        <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[var(--nav-text-main)] rounded-full opacity-60"></span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
            
            {/* Contact Button */}
            <Link 
              to="/contact"
              className="px-6 py-2.5 text-sm font-bold text-bg-base bg-text-main hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(0,0,0,0.15)] transition-all duration-300 rounded-[10px]"
            >
              Contact Me
            </Link>
          </div>

          {/* Mobile Menu Button Section */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
              className="text-nav-text-main hover:text-accent-primary p-2 rounded-lg hover:bg-[var(--nav-btn-hover)] transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-[var(--nav-bg)] backdrop-blur-[20px] border border-[var(--nav-border)] shadow-[0_16px_40px_rgba(0,0,0,0.15)] rounded-2xl overflow-hidden flex flex-col p-4 lg:hidden transition-all duration-300">
          <div className="space-y-1 mb-4 relative z-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                end={link.href === '/'}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => 
                  `block px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                    isActive 
                      ? 'text-nav-text-main bg-[var(--nav-btn-hover)]' 
                      : 'text-nav-text-muted hover:text-nav-text-main hover:bg-[var(--nav-btn-hover)]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
          
          <Link 
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="w-full py-3.5 text-sm font-bold text-center text-bg-base bg-text-main hover:opacity-90 rounded-xl active:scale-[0.98] transition-all relative z-10"
          >
            Contact Me
          </Link>
        </div>
      )}

      {/* Black Hole Animation Overlay */}
      {isBlackHoleActive && createPortal(
        <div className="fixed inset-0 z-[99999] pointer-events-none flex items-center justify-center overflow-hidden">
          <style>{`
            #root {
               will-change: transform, opacity, filter;
               animation: suck-into-void 1.1s cubic-bezier(0.5, 0, 0.1, 1) forwards !important;
               transform-origin: center top;
            }
            @keyframes suck-into-void {
               0% { filter: blur(0px); transform: translate3d(0, 0, 0) scale(1) rotate(0deg); opacity: 1; }
               100% { filter: blur(10px); transform: translate3d(0, -100vh, 0) scale(0) rotate(180deg); opacity: 0; }
            }
            @keyframes black-hole-expand {
               0% { transform: scale(0); opacity: 0; }
               20% { transform: scale(1); opacity: 1; }
               80% { transform: scale(1.5); box-shadow: 0 0 100px 50px rgba(0, 224, 164, 0.8), 0 0 200px 100px rgba(0,0,0,1); }
               100% { transform: scale(50); opacity: 1; background: black; }
            }
            @keyframes accretion-spin {
               0% { transform: rotate(0deg) scale(1); }
               100% { transform: rotate(360deg) scale(0); }
            }
            @media (max-width: 768px) {
               @keyframes suck-into-void {
                  0% { transform: translate3d(0, 0, 0) scale(1); opacity: 1; }
                  100% { transform: translate3d(0, -50vh, 0) scale(0); opacity: 0; }
               }
               .black-hole-expand-layer {
                  box-shadow: 0 0 20px 5px rgba(0, 224, 164, 0.8) !important;
               }
               .black-hole-ring {
                  box-shadow: none !important;
                  border-width: 1px !important;
               }
            }
            @media (prefers-reduced-motion: reduce) {
               #root {
                  animation: simple-fade 1.1s ease forwards !important;
               }
               @keyframes simple-fade {
                  to { opacity: 0; }
               }
               .bh-container { display: none !important; }
            }
          `}</style>
          
          <div className="bh-container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100000]">
            {/* The Black Hole */}
            <div 
              className="black-hole-expand-layer w-16 h-16 md:w-24 md:h-24 rounded-full bg-black relative flex items-center justify-center will-change-transform"
              style={{
                animation: 'black-hole-expand 1.1s cubic-bezier(0.5, 0, 0.1, 1) forwards',
                boxShadow: '0 0 40px 10px rgba(0, 224, 164, 0.6), inset 0 0 20px black'
              }}
            >
              {/* Accretion Disk / Glow Ring */}
              <div 
                className="black-hole-ring absolute inset-[-100%] rounded-full border-[3px] border-accent-primary opacity-80 mix-blend-screen will-change-transform"
                style={{
                  animation: 'accretion-spin 0.8s linear infinite',
                  boxShadow: '0 0 30px rgba(0,224,164,0.8), inset 0 0 20px rgba(0,224,164,0.5)'
                }}
              ></div>
              <div 
                className="black-hole-ring absolute inset-[-150%] rounded-full border-[2px] border-[#0284C7] opacity-60 mix-blend-screen will-change-transform"
                style={{
                  animation: 'accretion-spin 0.6s linear infinite reverse',
                  boxShadow: '0 0 40px rgba(2,132,199,0.6)'
                }}
              ></div>
            </div>
          </div>
        </div>,
        document.body
      )}

    </nav>
  );
};

export default Navbar;
