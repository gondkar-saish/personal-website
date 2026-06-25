import React, { useState } from 'react';
import { ExternalLink, X, ChevronRight } from 'lucide-react';

const Projects = () => {
  const [showRideWiseDetails, setShowRideWiseDetails] = useState(false);

  const fallbackProjects = [
    {
      title: "E-Commerce Backend System",
      description: "A Spring Boot backend system handling users, products, cart management, order placement, payment simulation, and order tracking.",
      techStack: "Java, Spring Boot, MySQL, Hibernate, REST APIs, Swagger",
      link: "https://github.com/gondkar-saish/Ticket-Booking-System"
    },
    {
      title: "Role-Based Authentication System",
      description: "A backend authentication project with user registration, JWT login, password encryption, and role-based access for ADMIN and USER.",
      techStack: "Java, Spring Boot, Spring Security, JWT, MySQL",
      link: "https://github.com/gondkar-saish/Role-Based-Authorisation-System"
    },
    {
      title: "Inventory Management System",
      description: "A backend system for tracking stock levels, supplier details, and low-stock alerts through structured REST APIs.",
      techStack: "Java, Spring Boot, MySQL, JPA, REST APIs",
      link: "PASTE_INVENTORY_GITHUB_LINK_HERE"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-main uppercase tracking-wider mb-4">
            Featured Projects
          </h2>
          <p className="text-text-muted max-w-2xl text-sm md:text-base mb-6">
            Backend and software projects built with Java, Spring Boot, MySQL, REST APIs, and authentication concepts.
          </p>
          <div className="w-16 h-[2px] bg-accent-primary shadow-[0_0_10px_var(--accent-primary)]"></div>
        </div>

        {/* Regular Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {fallbackProjects.map((project, index) => (
            <div key={index} className="engineering-card p-8 flex flex-col h-full bg-bg-surface border border-border-subtle rounded-lg">
              
              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/title inline-flex items-start gap-2 mb-4 w-fit cursor-pointer"
              >
                <h3 className="text-xl font-bold text-text-main group-hover/title:text-accent-primary transition-colors relative">
                  {project.title}
                  <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-accent-primary transition-all duration-300 group-hover/title:w-full"></span>
                </h3>
                <ExternalLink size={18} className="text-text-muted group-hover/title:text-accent-primary transition-colors mt-0.5 flex-shrink-0" />
              </a>
              
              <p className="text-text-muted mb-6 flex-grow text-sm leading-relaxed">
                {project.description}
              </p>
              
              <div className="mb-2 mt-auto">
                <span className="text-xs font-mono text-accent-primary font-bold">Tech stack: </span>
                <span className="text-xs font-mono text-text-muted">{project.techStack}</span>
              </div>
              
            </div>
          ))}
        </div>

        {/* Featured Special Project: RideWise */}
        <div className="mb-8 flex flex-col items-start">
          <h3 className="text-2xl font-bold text-text-muted mb-2 font-mono tracking-wider">
            // SPECIAL FEATURE
          </h3>
        </div>

        <div className="mb-10 engineering-card relative overflow-hidden group flex flex-col xl:flex-row gap-0">
          
          {/* Main Card Content */}
          <div className={`relative z-10 p-8 md:p-12 w-full transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${showRideWiseDetails ? 'xl:w-1/2' : 'xl:w-full'}`}>
            {/* Animated Background (constrained to this side) */}
            <div className="absolute inset-0 z-0 bg-[#030712] overflow-hidden">
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'linear-gradient(rgba(0, 224, 164, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 224, 164, 0.1) 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }}
              ></div>
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <style>
                  {`
                    @keyframes route-dash {
                      to { stroke-dashoffset: -1000; }
                    }
                    @keyframes pulse-node {
                      0%, 100% { transform: scale(1); opacity: 0.8; }
                      50% { transform: scale(1.5); opacity: 1; }
                    }
                  `}
                </style>
                <path 
                  d="M -50 80 Q 150 200 350 150 T 700 300 T 1200 100" 
                  fill="none" 
                  stroke="#00E0A4" 
                  strokeWidth="2"
                  strokeDasharray="10 10"
                  className="opacity-40"
                  style={{ animation: 'route-dash 30s linear infinite' }}
                />
                <circle cx="350" cy="150" r="4" fill="#00E0A4" className="animate-pulse" />
                <circle cx="700" cy="300" r="5" fill="#10B981" style={{ animation: 'pulse-node 2s infinite', transformOrigin: '700px 300px' }} />
                <text x="715" y="295" fill="#10B981" fontSize="12" fontWeight="bold" fontFamily="monospace" opacity="0.8">SAVINGS ZONE</text>
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-bg-base via-bg-surface/80 to-transparent z-0"></div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center h-full">
              <div className={`w-full transition-all duration-[1200ms] ${showRideWiseDetails ? 'md:w-full' : 'md:w-2/3'} text-left`}>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-3 py-1 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-sm bg-accent-primary/10 text-accent-primary border border-accent-primary/30 shadow-[0_0_10px_rgba(0,224,164,0.2)]">
                    HACKATHON PROJECT
                  </span>
                  <span className="px-3 py-1 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-sm bg-[#F58220]/10 text-[#F58220] border border-[#F58220]/30 shadow-[0_0_10px_rgba(245,130,32,0.15)]">
                    ANDROID + FIREBASE
                  </span>
                </div>
                
                <h3 className="text-4xl md:text-5xl font-extrabold text-text-main mb-3 uppercase tracking-tight">
                  RideWise
                </h3>
                
                <h4 className="text-lg md:text-xl text-accent-primary font-mono mb-6">
                  Smarter ride comparison and savings assistant for Uber/Lyft trips.
                </h4>
                
                <p className="text-text-muted text-base leading-relaxed mb-8 max-w-2xl">
                  Built during a hackathon, RideWise helps users compare ride prices, predict better booking windows, find nearby pickup zones, and track ride savings through a Firebase-powered Android app.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://github.com/SohamxP/RideWise" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="engineering-button-primary gap-2 text-sm"
                  >
                    <ExternalLink size={16} />
                    View GitHub
                  </a>
                  <button 
                    onClick={() => setShowRideWiseDetails(!showRideWiseDetails)}
                    className="engineering-button-secondary gap-2 text-sm relative overflow-hidden"
                  >
                    {showRideWiseDetails ? 'Close Details' : 'View Details'}
                    {showRideWiseDetails && <X size={16} className="ml-1" />}
                  </button>
                </div>
              </div>
              
              {!showRideWiseDetails && (
                <div className="w-full md:w-1/3 flex justify-center transition-all duration-[1200ms] animate-in fade-in zoom-in duration-500">
                  <div className="relative w-48 h-80 rounded-2xl border-4 border-border-subtle bg-bg-surface overflow-hidden shadow-[0_0_30px_rgba(0,224,164,0.15)] group-hover:shadow-[0_0_40px_rgba(0,224,164,0.3)] transition-shadow duration-500">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full bg-border-subtle"></div>
                    <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 100 200">
                      <path d="M 20 180 L 40 120 L 80 80 L 50 20" fill="none" stroke="#00E0A4" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
                      <circle cx="50" cy="20" r="4" fill="#10B981" />
                      <circle cx="20" cy="180" r="4" fill="#0284C7" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col justify-end p-4 z-10">
                      <div className="w-full bg-[#10B981]/20 border border-[#10B981]/50 rounded-lg p-3 backdrop-blur-sm mb-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        <div className="text-[10px] font-mono text-[#10B981] font-bold uppercase mb-1">Wait & Save</div>
                        <div className="text-xs text-white">- $4.50 predicted</div>
                      </div>
                      <div className="w-full bg-bg-base/90 border border-border-subtle rounded-lg p-3 backdrop-blur-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200 shadow-lg">
                        <div className="text-[10px] font-mono text-accent-primary font-bold uppercase mb-1">UberX vs Lyft</div>
                        <div className="flex justify-between items-center text-xs mt-2">
                          <span className="text-white font-bold">$12.40</span>
                          <span className="text-[#94A3B8] line-through">$16.20</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Cinematic Details Panel (HUD-style) */}
          {showRideWiseDetails && (
            <div className={`w-full xl:w-1/2 border-t xl:border-t-0 xl:border-l border-accent-primary/30 relative overflow-hidden bg-[#050B14] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] animate-in fade-in`}>
              
              {/* HUD Scanline & Glow Sweep */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="w-full h-[2px] bg-accent-primary/40 shadow-[0_0_15px_#00E0A4] absolute top-0 left-0 animate-scanline opacity-60 z-20"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 via-transparent to-transparent opacity-50 z-10"></div>
              </div>

              <div className="p-8 md:p-12 relative z-30 h-full flex flex-col bg-bg-surface/50 backdrop-blur-sm">
                <div className="flex justify-between items-start mb-6">
                  <h4 className="font-mono text-accent-primary uppercase tracking-widest text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse"></span>
                    System Details //
                  </h4>
                  <button 
                    onClick={() => setShowRideWiseDetails(false)}
                    className="text-text-muted hover:text-accent-primary transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <p className="text-text-main/90 text-sm md:text-base leading-relaxed mb-8">
                  RideWise is a hackathon-built Android app designed to help users make smarter ride-booking decisions. It compares Uber and Lyft ride estimates, highlights the cheaper option, predicts whether waiting could reduce the fare, and suggests nearby pickup zones that may save money.
                </p>
                
                <div className="mb-8">
                  <h5 className="text-[10px] font-bold font-mono text-text-muted uppercase tracking-wider mb-4 border-b border-border-subtle pb-2">Key Features</h5>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-text-main/80">
                    <li className="flex items-start gap-2"><ChevronRight size={16} className="text-accent-primary shrink-0 mt-0.5" /> Uber/Lyft ride comparison</li>
                    <li className="flex items-start gap-2"><ChevronRight size={16} className="text-accent-primary shrink-0 mt-0.5" /> Wait & Save fare prediction</li>
                    <li className="flex items-start gap-2"><ChevronRight size={16} className="text-accent-primary shrink-0 mt-0.5" /> Walk Nearby pickup-zone suggestions</li>
                    <li className="flex items-start gap-2"><ChevronRight size={16} className="text-accent-primary shrink-0 mt-0.5" /> Firebase ride history & savings tracking</li>
                    <li className="flex items-start gap-2"><ChevronRight size={16} className="text-accent-primary shrink-0 mt-0.5" /> Google Maps & Places integration</li>
                    <li className="flex items-start gap-2"><ChevronRight size={16} className="text-accent-primary shrink-0 mt-0.5" /> Deep links to open ride apps</li>
                  </ul>
                </div>

                <div className="mt-auto pt-6 border-t border-accent-primary/20">
                  <h5 className="text-[10px] font-bold font-mono text-accent-primary uppercase tracking-wider mb-2">Tech Stack</h5>
                  <p className="font-mono text-xs text-text-muted leading-relaxed">
                    Java, Android SDK, Firebase Auth, Firestore, Google Maps, Google Places, Location Services
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(800px); opacity: 0; }
        }
        .animate-scanline {
          animation: scanline 4s linear infinite;
        }
        @keyframes fadeInHUD {
          0% { filter: blur(10px); opacity: 0; transform: scale(0.98) translateX(20px); }
          100% { filter: blur(0px); opacity: 1; transform: scale(1) translateX(0); }
        }
        .animate-in.fade-in {
          animation: fadeInHUD 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
};

export default Projects;
