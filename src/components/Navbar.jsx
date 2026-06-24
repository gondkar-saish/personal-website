import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    <nav className="fixed top-4 md:top-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[92%] max-w-7xl border border-black/5 shadow-[0_8px_32px_rgba(0,0,0,0.06)] rounded-2xl z-50 transition-all duration-300 overflow-hidden group/navcontainer">
      
      <style>{`
        @keyframes nav-circuit-slide {
          from { transform: translateX(0); }
          to { transform: translateX(-400px); }
        }
      `}</style>

      {/* Glass Base (Blurs page content) */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-[18px] pointer-events-none -z-20 transition-colors duration-500 group-hover/navcontainer:bg-white/90"></div>

      {/* Animated Circuit Pattern */}
      <div 
        className="absolute top-0 left-0 h-full w-[calc(100%+400px)] pointer-events-none -z-10 mix-blend-multiply"
        style={{ 
          animation: prefersReducedMotion ? 'none' : 'nav-circuit-slide 50s linear infinite',
          opacity: 0.6
        }}
      >
        <svg width="100%" height="100%">
          <defs>
            <pattern id="nav-circuit" x="0" y="0" width="400" height="80" patternUnits="userSpaceOnUse">
               {/* Circuit lines */}
               <path d="M 0 25 H 40 L 60 45 H 180 L 200 25 H 400" fill="none" stroke="rgba(15, 23, 42, 0.15)" strokeWidth="1" />
               <path d="M 60 80 V 60 L 80 40" fill="none" stroke="rgba(15, 23, 42, 0.15)" strokeWidth="1" />
               <path d="M 120 45 L 140 65 H 280 L 300 45 H 400" fill="none" stroke="rgba(15, 23, 42, 0.2)" strokeWidth="1" />
               <path d="M 220 80 V 60 L 240 40 H 260" fill="none" stroke="rgba(15, 23, 42, 0.15)" strokeWidth="1" />
               <path d="M 320 0 V 30 L 350 60 H 400" fill="none" stroke="rgba(15, 23, 42, 0.2)" strokeWidth="1" />
               <path d="M 340 0 V 15 L 355 30 H 400" fill="none" stroke="rgba(15, 23, 42, 0.15)" strokeWidth="1" />
               <path d="M 10 0 V 10 L 25 25" fill="none" stroke="rgba(15, 23, 42, 0.2)" strokeWidth="1" />
               
               {/* Nodes */}
               <circle cx="40" cy="25" r="2.5" fill="rgba(15, 23, 42, 0.3)" />
               <circle cx="180" cy="25" r="2" fill="rgba(15, 23, 42, 0.2)" />
               <circle cx="120" cy="45" r="2.5" fill="rgba(15, 23, 42, 0.3)" />
               <circle cx="280" cy="65" r="2" fill="rgba(15, 23, 42, 0.25)" />
               <circle cx="260" cy="40" r="1.5" fill="rgba(15, 23, 42, 0.3)" />
               <circle cx="350" cy="60" r="2.5" fill="rgba(15, 23, 42, 0.3)" />
               <circle cx="355" cy="30" r="2" fill="rgba(15, 23, 42, 0.4)" />
               
               {/* Decorative dots */}
               <circle cx="90" cy="65" r="1" fill="rgba(15, 23, 42, 0.2)" />
               <circle cx="96" cy="65" r="1" fill="rgba(15, 23, 42, 0.2)" />
               <circle cx="102" cy="65" r="1" fill="rgba(15, 23, 42, 0.2)" />
               
               <circle cx="300" cy="20" r="1" fill="rgba(15, 23, 42, 0.2)" />
               <circle cx="300" cy="26" r="1" fill="rgba(15, 23, 42, 0.2)" />
               <circle cx="300" cy="32" r="1" fill="rgba(15, 23, 42, 0.2)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#nav-circuit)" />
        </svg>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px] md:h-[80px]">
          
          {/* Logo Brand */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#00E0A4] to-[#38BDF8] shadow-[0_0_10px_rgba(0,224,164,0.3)]"></div>
            <Link 
              to="/" 
              onClick={() => setIsOpen(false)} 
              className="text-lg md:text-xl font-extrabold text-[#0F172A] tracking-wide hover:opacity-80 transition-opacity"
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
                        ? 'text-[#0F172A] bg-black/[0.04]' 
                        : 'text-gray-500 hover:text-[#0F172A] hover:bg-black/[0.02]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {isActive && (
                        <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#0F172A] rounded-full opacity-60"></span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
            
            {/* Contact Button */}
            <Link 
              to="/contact"
              className="px-6 py-2.5 text-sm font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(15,23,42,0.3)] transition-all duration-300 rounded-[10px]"
            >
              Contact Me
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
              className="text-[#0F172A] hover:text-[#00E0A4] p-2 rounded-lg hover:bg-black/5 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-[20px] border border-black/5 shadow-[0_16px_40px_rgba(0,0,0,0.15)] rounded-2xl overflow-hidden flex flex-col p-4 lg:hidden transition-all duration-300">
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
                      ? 'text-[#0F172A] bg-black/5' 
                      : 'text-gray-500 hover:text-[#0F172A] hover:bg-black/[0.02]'
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
            className="w-full py-3.5 text-sm font-bold text-center text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-xl active:scale-[0.98] transition-all relative z-10"
          >
            Contact Me
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
