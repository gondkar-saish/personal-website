import React, { useState } from 'react';

const SideQuests = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div style={{
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '40px 24px 100px',
      fontFamily: 'Orbitron, monospace',
      position: 'relative',
      zIndex: 1,
    }}>
      {/* Self-contained Sci-Fi styling and keyframes */}
      <style>{`
        @keyframes scanline-anim {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        @keyframes gold-float-anim {
          0% { transform: translateY(20px) scale(0.5); opacity: 0; }
          50% { opacity: 0.7; }
          100% { transform: translateY(-150px) scale(1.5); opacity: 0; }
        }
        @keyframes chi-aura-anim {
          0%, 100% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.25; filter: blur(20px); }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.5; filter: blur(30px); }
        }
        @keyframes minion-shake-anim {
          0%, 100% { transform: rotate(0deg) scale(1); }
          20% { transform: rotate(-2deg) scale(1.02); }
          40% { transform: rotate(1.5deg) scale(0.99); }
          60% { transform: rotate(-1.5deg) scale(1.01); }
          80% { transform: rotate(1deg) scale(1.01); }
        }
        @keyframes grid-glow-anim {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.3; }
        }
        @keyframes blink-anim {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .sci-fi-card {
          position: relative;
          background: rgba(8, 12, 24, 0.75);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.7);
        }
        .stagger-card {
          transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), border-color 0.4s, box-shadow 0.4s;
        }
        .dossier-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          justify-content: center;
          align-items: stretch;
          max-width: 1200px;
          margin: 50px auto 0;
          position: relative;
          z-index: 2;
        }
        .circuit-lines {
          display: none;
        }
        @media (max-width: 639px) {
          .stagger-card:hover {
            transform: translateY(-8px) scale(1.02);
          }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .dossier-grid {
            grid-template-columns: repeat(2, 1fr);
            max-width: 800px;
            gap: 32px;
            padding: 20px 0;
          }
          .stagger-card:nth-child(odd) {
            transform: translateY(-15px);
          }
          .stagger-card:nth-child(even) {
            transform: translateY(15px);
          }
          .stagger-card:nth-child(odd):hover {
            transform: translateY(-25px) scale(1.03);
          }
          .stagger-card:nth-child(even):hover {
            transform: translateY(5px) scale(1.03);
          }
        }
        @media (min-width: 1024px) {
          .dossier-grid {
            grid-template-columns: repeat(4, 1fr);
            max-width: 1240px;
            gap: 20px;
            padding: 40px 0;
          }
          .stagger-card:nth-child(1),
          .stagger-card:nth-child(3) {
            transform: translateY(-25px);
          }
          .stagger-card:nth-child(2),
          .stagger-card:nth-child(4) {
            transform: translateY(25px);
          }
          .stagger-card:nth-child(1):hover,
          .stagger-card:nth-child(3):hover {
            transform: translateY(-38px) scale(1.03);
          }
          .stagger-card:nth-child(2):hover,
          .stagger-card:nth-child(4):hover {
            transform: translateY(12px) scale(1.03);
          }
          .circuit-lines {
            display: block;
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
          }
        }
        @keyframes mcqueen-rumble-anim {
          0%, 100% { transform: scale(1) translate(0, 0); }
          10% { transform: scale(1.04) translate(-1.5px, -1px); }
          20% { transform: scale(1.04) translate(1.5px, 0.5px); }
          30% { transform: scale(1.04) translate(-0.5px, 1.5px); }
          40% { transform: scale(1.04) translate(1px, -1.5px); }
          50% { transform: scale(1.04) translate(-1.5px, 0.5px); }
          60% { transform: scale(1.04) translate(1.5px, -1px); }
          70% { transform: scale(1.04) translate(-0.5px, 0.5px); }
          80% { transform: scale(1.04) translate(1.5px, 1.5px); }
          90% { transform: scale(1.04) translate(-1.5px, -1.5px); }
        }
        .dossier-image-container {
          position: relative;
          height: 280px;
          overflow: hidden;
          background: #02040a;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          margin: 16px;
        }
        .scanline {
          position: absolute;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(to bottom, rgba(255,255,255,0), currentColor 50%, rgba(255,255,255,0));
          opacity: 0.75;
          pointer-events: none;
          z-index: 10;
          animation: scanline-anim 3s linear infinite;
        }
        .hologram-overlay {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(18, 24, 38, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
            linear-gradient(90deg, rgba(255, 0, 0, 0.04), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.04));
          background-size: 100% 4px, 6px 100%;
          pointer-events: none;
          z-index: 8;
          opacity: 0.2;
          animation: grid-glow-anim 4s ease infinite;
        }
        .corner-bracket {
          position: absolute;
          width: 12px;
          height: 12px;
          border-color: currentColor;
          border-style: solid;
          pointer-events: none;
          z-index: 9;
          opacity: 0.6;
        }
        .bracket-tl { top: 8px; left: 8px; border-width: 2px 0 0 2px; }
        .bracket-tr { top: 8px; right: 8px; border-width: 2px 2px 0 0; }
        .bracket-bl { bottom: 8px; left: 8px; border-width: 0 0 2px 2px; }
        .bracket-br { bottom: 8px; right: 8px; border-width: 0 2px 2px 0; }
        
        .gold-particle {
          position: absolute;
          bottom: -10px;
          background: radial-gradient(circle, #FACC15 20%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          animation: gold-float-anim 6s ease-in infinite;
        }
      `}</style>

      {/* Futuristic Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{
          display: 'inline-block',
          fontFamily: 'monospace',
          fontSize: '11px',
          color: '#00E0A4',
          border: '1px solid rgba(0, 224, 164, 0.3)',
          borderRadius: '4px',
          padding: '4px 12px',
          letterSpacing: '0.2em',
          backgroundColor: 'rgba(0, 224, 164, 0.05)',
          textTransform: 'uppercase',
          marginBottom: '16px',
          animation: 'blink-anim 2s infinite ease-in-out'
        }}>
          // CLASSIFIED ARCHIVE: OFFLINE INTERESTS
        </span>
        <h1 style={{
          color: '#ffffff',
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          marginBottom: '12px',
          textShadow: '0 0 30px rgba(255,255,255,0.1)',
        }}>
          Beyond The Code
        </h1>
        <p style={{
          color: 'rgba(148, 163, 184, 0.8)',
          fontFamily: 'monospace',
          fontSize: '11px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}>
          PERSONALITY MODULES // OFFLINE INTERESTS // CHARACTER ARCHIVE
        </p>
      </div>

      {/* Staggered Classified Archive Wall Layout */}
      <div className="dossier-grid">
        
        {/* Connecting Circuit Lines (Desktop Only) */}
        <svg className="circuit-lines" viewBox="0 0 1200 400" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="circuit-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FACC15" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="circuit-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FDE047" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="circuit-grad-3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FDE047" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0.5" />
            </linearGradient>
            
            <filter id="circuit-glow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Line 1: Jack (high, right side) to Po (low, left side) */}
          <path 
            d="M 280 150 L 293 150 L 293 250 L 306 250" 
            stroke="url(#circuit-grad-1)" 
            strokeWidth="1.5" 
            filter="url(#circuit-glow)"
            strokeDasharray="6 4"
          />
          <circle cx="280" cy="150" r="3.5" fill="#FACC15" filter="url(#circuit-glow)" />
          <circle cx="306" cy="250" r="3.5" fill="#38BDF8" filter="url(#circuit-glow)" />

          {/* Line 2: Po (low, right side) to Minions (high, left side) */}
          <path 
            d="M 586 250 L 600 250 L 600 150 L 613 150" 
            stroke="url(#circuit-grad-2)" 
            strokeWidth="1.5" 
            filter="url(#circuit-glow)"
            strokeDasharray="6 4"
          />
          <circle cx="586" cy="250" r="3.5" fill="#38BDF8" filter="url(#circuit-glow)" />
          <circle cx="613" cy="150" r="3.5" fill="#FDE047" filter="url(#circuit-glow)" />

          {/* Line 3: Minions (high, right side) to McQueen (low, left side) */}
          <path 
            d="M 893 150 L 906 150 L 906 250 L 920 250" 
            stroke="url(#circuit-grad-3)" 
            strokeWidth="1.5" 
            filter="url(#circuit-glow)"
            strokeDasharray="6 4"
          />
          <circle cx="893" cy="150" r="3.5" fill="#FDE047" filter="url(#circuit-glow)" />
          <circle cx="920" cy="250" r="3.5" fill="#EF4444" filter="url(#circuit-glow)" />
        </svg>

        {/* CARD 1: CAPTAIN JACK SPARROW (Gold & Cyan Theme) */}
        <div 
          className="sci-fi-card stagger-card"
          style={{
            borderColor: hoveredCard === 'jack' ? '#FACC1599' : 'rgba(250, 204, 21, 0.15)',
            boxShadow: hoveredCard === 'jack' 
              ? '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(250, 204, 21, 0.15), 0 0 60px rgba(6, 182, 212, 0.1)'
              : '0 10px 40px rgba(0, 0, 0, 0.7)'
          }}
          onMouseEnter={() => setHoveredCard('jack')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Futuristic Card Header Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'between',
            alignItems: 'center',
            padding: '16px 20px 8px',
            borderBottom: '1px solid rgba(250, 204, 21, 0.15)',
            fontSize: '10px',
            color: '#FACC15',
            fontFamily: 'monospace',
            letterSpacing: '0.1em'
          }}>
            <span>SUBJECT: DOSSIER_JS_082</span>
            <span style={{ marginLeft: 'auto', opacity: 0.6 }}>CLASSIFIED // AI_REC</span>
          </div>

          {/* Image Dossier Frame */}
          <div 
            className="dossier-image-container"
            style={{ color: '#06B6D4' }} // Cyan accents for HUD elements
          >
            {/* HUD Corner Brackets */}
            <div className="corner-bracket bracket-tl"></div>
            <div className="corner-bracket bracket-tr"></div>
            <div className="corner-bracket bracket-bl"></div>
            <div className="corner-bracket bracket-br"></div>

            {/* Scanline and holographic overlay */}
            <div className="scanline"></div>
            <div className="hologram-overlay"></div>

            {/* Floating Gold Particles (drifting behind/above) */}
            <div className="gold-particle" style={{ left: '15%', width: '6px', height: '6px', animationDelay: '0s', animationDuration: '5s' }}></div>
            <div className="gold-particle" style={{ left: '45%', width: '8px', height: '8px', animationDelay: '1.5s', animationDuration: '7s' }}></div>
            <div className="gold-particle" style={{ left: '75%', width: '5px', height: '5px', animationDelay: '3.2s', animationDuration: '6s' }}></div>

            <img
              src={`${import.meta.env.BASE_URL}images/jack-sparrow.jpg`}
              alt="Captain Jack Sparrow"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                filter: hoveredCard === 'jack' ? 'brightness(1.1) contrast(1.05) saturate(1.1)' : 'brightness(0.85) contrast(1)' ,
                transition: 'filter 0.3s ease'
              }}
            />

            {/* Diagonal holographic HUD line */}
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              color: '#06B6D4',
              fontFamily: 'monospace',
              fontSize: '8px',
              opacity: 0.7,
              letterSpacing: '0.05em'
            }}>
              SYS_REF: PIRATE_SYS // SECURE_CON
            </div>
          </div>

          {/* Card Content Area */}
          <div style={{ padding: '8px 24px 28px' }}>
            {/* Status Tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontFamily: 'monospace',
                fontSize: '10px',
                color: '#FACC15',
                border: '1px solid rgba(250, 204, 21, 0.3)',
                borderRadius: '4px',
                padding: '2px 8px',
                backgroundColor: 'rgba(250, 204, 21, 0.05)',
                fontWeight: 'bold',
              }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#FACC15',
                  display: 'inline-block',
                  animation: 'blink-anim 1s infinite'
                }}></span>
                CHAOS MODE: ACTIVE
              </span>
            </div>

            <h3 style={{ 
              color: '#FACC15', 
              fontWeight: 800, 
              fontSize: '1.2rem', 
              letterSpacing: '0.03em', 
              marginBottom: '10px',
              textTransform: 'uppercase'
            }}>
              Captain Jack Sparrow
            </h3>
            
            <p style={{ 
              color: '#94A3B8', 
              fontFamily: 'monospace',
              fontSize: '0.82rem', 
              lineHeight: 1.6,
              marginBottom: '20px'
            }}>
              A masterclass in embracing uncertainty. Operates on pure intuition, theatrical flair, and an uncanny ability to turn complete disaster into spectacular victory.
            </p>

            {/* Interactive Data Block Stats */}
            <div style={{
              borderTop: '1px dashed rgba(250, 204, 21, 0.2)',
              paddingTop: '14px',
              fontFamily: 'monospace',
              fontSize: '10px',
              color: '#8A99AD',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>UNPREDICTABLE INDEX:</span>
                <span style={{ color: '#06B6D4', fontWeight: 'bold' }}>98.4%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>TACTICAL ESCAPES:</span>
                <span style={{ color: '#FACC15', fontWeight: 'bold' }}>MAX_VAL</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>RUM RESERVES:</span>
                <span style={{ color: '#EF4444', fontWeight: 'bold' }}>4% [RELOAD_REQ]</span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: PO, THE DRAGON WARRIOR (Blue Energy Theme) */}
        <div 
          className="sci-fi-card stagger-card"
          style={{
            borderColor: hoveredCard === 'po' ? '#38BDF899' : 'rgba(56, 189, 248, 0.15)',
            boxShadow: hoveredCard === 'po' 
              ? '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(56, 189, 248, 0.15), 0 0 60px rgba(168, 85, 247, 0.1)'
              : '0 10px 40px rgba(0, 0, 0, 0.7)'
          }}
          onMouseEnter={() => setHoveredCard('po')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Header Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'between',
            alignItems: 'center',
            padding: '16px 20px 8px',
            borderBottom: '1px solid rgba(56, 189, 248, 0.15)',
            fontSize: '10px',
            color: '#38BDF8',
            fontFamily: 'monospace',
            letterSpacing: '0.1em'
          }}>
            <span>SUBJECT: DOSSIER_DRG_001</span>
            <span style={{ marginLeft: 'auto', opacity: 0.6 }}>CLASSIFIED // ARCHIVE</span>
          </div>

          {/* Image Dossier Frame */}
          <div 
            className="dossier-image-container"
            style={{ color: '#38BDF8' }}
          >
            {/* HUD Corner Brackets */}
            <div className="corner-bracket bracket-tl"></div>
            <div className="corner-bracket bracket-tr"></div>
            <div className="corner-bracket bracket-bl"></div>
            <div className="corner-bracket bracket-br"></div>

            {/* Scanline and holographic overlay */}
            <div className="scanline"></div>
            <div className="hologram-overlay"></div>

            {/* Pulsing Chi Aura behind Po */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, rgba(168, 85, 247, 0.05) 50%, transparent 70%)',
              zIndex: 1,
              animation: 'chi-aura-anim 4s infinite ease-in-out',
              pointerEvents: 'none'
            }}></div>

            <img
              src={`${import.meta.env.BASE_URL}images/po.jpg`}
              alt="Po the Dragon Warrior"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                position: 'relative',
                zIndex: 2,
                filter: hoveredCard === 'po' ? 'brightness(1.1) contrast(1.05)' : 'brightness(0.85) contrast(1)',
                transition: 'filter 0.3s ease'
              }}
            />

            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              color: '#38BDF8',
              fontFamily: 'monospace',
              fontSize: '8px',
              opacity: 0.7,
              letterSpacing: '0.05em',
              zIndex: 3
            }}>
              SYS_REF: WARRIOR_CORE // LEVEL_CAP: 99
            </div>
          </div>

          {/* Card Content Area */}
          <div style={{ padding: '8px 24px 28px' }}>
            {/* Status Tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontFamily: 'monospace',
                fontSize: '10px',
                color: '#38BDF8',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                borderRadius: '4px',
                padding: '2px 8px',
                backgroundColor: 'rgba(56, 189, 248, 0.05)',
                fontWeight: 'bold',
              }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#38BDF8',
                  display: 'inline-block',
                  animation: 'blink-anim 1s infinite'
                }}></span>
                LEVELING UP: IN PROGRESS
              </span>
            </div>

            <h3 style={{ 
              color: '#38BDF8', 
              fontWeight: 800, 
              fontSize: '1.2rem', 
              letterSpacing: '0.03em', 
              marginBottom: '10px',
              textTransform: 'uppercase'
            }}>
              Po, The Dragon Warrior
            </h3>
            
            <p style={{ 
              color: '#94A3B8', 
              fontFamily: 'monospace',
              fontSize: '0.82rem', 
              lineHeight: 1.6,
              marginBottom: '20px'
            }}>
              A testament to organic growth and inner peace. Proves that being unique, accepting yourself, and eating plenty of dumplings can unlock incredible power.
            </p>

            {/* Interactive Data Block Stats */}
            <div style={{
              borderTop: '1px dashed rgba(56, 189, 248, 0.2)',
              paddingTop: '14px',
              fontFamily: 'monospace',
              fontSize: '10px',
              color: '#8A99AD',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>CHI ENERGY RATE:</span>
                <span style={{ color: '#38BDF8', fontWeight: 'bold' }}>1200% [STABLE]</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>INNER PEACE LEVEL:</span>
                <span style={{ color: '#A855F7', fontWeight: 'bold' }}>88.2%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>DUMPLING CAPACITY:</span>
                <span style={{ color: '#00E0A4', fontWeight: 'bold' }}>INFINITE</span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3: MINIONS SQUAD (Yellow Neon Chaotic Theme) */}
        <div 
          className="sci-fi-card stagger-card"
          style={{
            borderColor: hoveredCard === 'minions' ? '#FDE04799' : 'rgba(253, 224, 71, 0.15)',
            boxShadow: hoveredCard === 'minions' 
              ? '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(253, 224, 71, 0.15), 0 0 60px rgba(239, 68, 68, 0.1)'
              : '0 10px 40px rgba(0, 0, 0, 0.7)'
          }}
          onMouseEnter={() => setHoveredCard('minions')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Header Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'between',
            alignItems: 'center',
            padding: '16px 20px 8px',
            borderBottom: '1px solid rgba(253, 224, 71, 0.15)',
            fontSize: '10px',
            color: '#FDE047',
            fontFamily: 'monospace',
            letterSpacing: '0.1em'
          }}>
            <span>SUBJECT: DOSSIER_BAN_999</span>
            <span style={{ marginLeft: 'auto', opacity: 0.6 }}>CLASSIFIED // EX_HAZARD</span>
          </div>

          {/* Image Dossier Frame (3 columns for 3 minions) */}
          <div 
            className="dossier-image-container"
            style={{ 
              color: '#FDE047', 
              display: 'flex',
              animation: hoveredCard === 'minions' ? 'minion-shake-anim 0.35s infinite ease-in-out' : 'none'
            }}
          >
            {/* HUD Corner Brackets */}
            <div className="corner-bracket bracket-tl"></div>
            <div className="corner-bracket bracket-tr"></div>
            <div className="corner-bracket bracket-bl"></div>
            <div className="corner-bracket bracket-br"></div>

            {/* Scanline and holographic overlay */}
            <div className="scanline"></div>
            <div className="hologram-overlay"></div>

            {/* Three minions side by side */}
            <div style={{ flex: 1, overflow: 'hidden', borderRight: '1px solid #1a1800', position: 'relative' }}>
              <img 
                src={`${import.meta.env.BASE_URL}images/minion1.jpg`} 
                alt="Minion 1" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  filter: hoveredCard === 'minions' ? 'brightness(1.15) contrast(1.1)' : 'brightness(0.85)',
                  transition: 'filter 0.3s ease'
                }} 
              />
            </div>
            <div style={{ flex: 1, overflow: 'hidden', borderRight: '1px solid #1a1800', position: 'relative' }}>
              <img 
                src={`${import.meta.env.BASE_URL}images/minion2.jpg`} 
                alt="Minion 2" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  filter: hoveredCard === 'minions' ? 'brightness(1.15) contrast(1.1)' : 'brightness(0.85)',
                  transition: 'filter 0.3s ease'
                }} 
              />
            </div>
            <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
              <img 
                src={`${import.meta.env.BASE_URL}images/minion3.jpg`} 
                alt="Minion 3" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  filter: hoveredCard === 'minions' ? 'brightness(1.15) contrast(1.1)' : 'brightness(0.85)',
                  transition: 'filter 0.3s ease'
                }} 
              />
            </div>

            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              color: '#FDE047',
              fontFamily: 'monospace',
              fontSize: '8px',
              opacity: 0.7,
              letterSpacing: '0.05em',
              zIndex: 3
            }}>
              SYS_REF: MINIONS_SYS // CHAOS: MAX
            </div>
          </div>

          {/* Card Content Area */}
          <div style={{ padding: '8px 24px 28px' }}>
            {/* Status Tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontFamily: 'monospace',
                fontSize: '10px',
                color: '#EF4444',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                borderRadius: '4px',
                padding: '2px 8px',
                backgroundColor: 'rgba(239, 68, 68, 0.08)',
                fontWeight: 'bold',
              }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#EF4444',
                  display: 'inline-block',
                  animation: 'blink-anim 0.5s infinite'
                }}></span>
                THREAT LEVEL: QUESTIONABLE
              </span>
            </div>

            <h3 style={{ 
              color: '#FDE047', 
              fontWeight: 800, 
              fontSize: '1.2rem', 
              letterSpacing: '0.03em', 
              marginBottom: '10px',
              textTransform: 'uppercase'
            }}>
              Minion Squad
            </h3>
            
            <p style={{ 
              color: '#94A3B8', 
              fontFamily: 'monospace',
              fontSize: '0.82rem', 
              lineHeight: 1.6,
              marginBottom: '20px'
            }}>
              Three tiny, yellow agents of complete pandemonium. They speak an undecipherable banana dialect, serve the most villainous master they can find, and excel in slapstick logic.
            </p>

            {/* Interactive Data Block Stats */}
            <div style={{
              borderTop: '1px dashed rgba(253, 224, 71, 0.2)',
              paddingTop: '14px',
              fontFamily: 'monospace',
              fontSize: '10px',
              color: '#8A99AD',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>BANANA CONVERT RATE:</span>
                <span style={{ color: '#FDE047', fontWeight: 'bold' }}>100% [CRITICAL]</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>INTELLIGENCE RATIO:</span>
                <span style={{ color: '#EF4444', fontWeight: 'bold' }}>0.01% [ERROR_VAL]</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>COLLATERAL DAMAGE:</span>
                <span style={{ color: '#06B6D4', fontWeight: 'bold' }}>SEVERE</span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 4: LIGHTNING MCQUEEN (Red & Yellow Speed Theme) */}
        <div 
          className="sci-fi-card stagger-card"
          style={{
            borderColor: hoveredCard === 'mcqueen' ? '#EF444499' : 'rgba(239, 68, 68, 0.15)',
            boxShadow: hoveredCard === 'mcqueen' 
              ? '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(239, 68, 68, 0.2), 0 0 60px rgba(250, 204, 21, 0.15)'
              : '0 10px 40px rgba(0, 0, 0, 0.7)'
          }}
          onMouseEnter={() => setHoveredCard('mcqueen')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Header Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'between',
            alignItems: 'center',
            padding: '16px 20px 8px',
            borderBottom: '1px solid rgba(239, 68, 68, 0.15)',
            fontSize: '10px',
            color: '#EF4444',
            fontFamily: 'monospace',
            letterSpacing: '0.1em'
          }}>
            <span>SUBJECT: DOSSIER_MCQUEEN_095</span>
            <span style={{ marginLeft: 'auto', opacity: 0.6 }}>CLASSIFIED // SPEED_ARCHIVE</span>
          </div>

          {/* Image Dossier Frame */}
          <div 
            className="dossier-image-container"
            style={{ color: '#FACC15' }}
          >
            {/* HUD Corner Brackets */}
            <div className="corner-bracket bracket-tl"></div>
            <div className="corner-bracket bracket-tr"></div>
            <div className="corner-bracket bracket-bl"></div>
            <div className="corner-bracket bracket-br"></div>

            {/* Scanline and holographic overlay */}
            <div className="scanline"></div>
            <div className="hologram-overlay"></div>

            <img
              src={`${import.meta.env.BASE_URL}images/mcqueen.png`}
              alt="Lightning McQueen"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
                position: 'relative',
                zIndex: 2,
                filter: hoveredCard === 'mcqueen' 
                  ? 'brightness(1.1) contrast(1.05) drop-shadow(0 0 8px rgba(239, 68, 68, 0.5))' 
                  : 'brightness(0.9) contrast(1)',
                animation: hoveredCard === 'mcqueen' ? 'mcqueen-rumble-anim 0.15s infinite linear' : 'none',
                transition: 'filter 0.3s ease'
              }}
            />

            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              color: '#FACC15',
              fontFamily: 'monospace',
              fontSize: '8px',
              opacity: 0.7,
              letterSpacing: '0.05em',
              zIndex: 3
            }}>
              SYS_REF: KACHOW_ENG // RPM: MAX
            </div>
          </div>

          {/* Card Content Area */}
          <div style={{ padding: '8px 24px 28px' }}>
            {/* Status Tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontFamily: 'monospace',
                fontSize: '10px',
                color: '#EF4444',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                borderRadius: '4px',
                padding: '2px 8px',
                backgroundColor: 'rgba(239, 68, 68, 0.08)',
                fontWeight: 'bold',
              }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#EF4444',
                  display: 'inline-block',
                  animation: 'blink-anim 0.8s infinite'
                }}></span>
                SPEED MODE: ACTIVE
              </span>
            </div>

            <h3 style={{ 
              color: '#FACC15', 
              fontWeight: 800, 
              fontSize: '1.2rem', 
              letterSpacing: '0.03em', 
              marginBottom: '10px',
              textTransform: 'uppercase'
            }}>
              Lightning McQueen
            </h3>
            
            <p style={{ 
              color: '#94A3B8', 
              fontFamily: 'monospace',
              fontSize: '0.82rem', 
              lineHeight: 1.6,
              marginBottom: '20px'
            }}>
              A high-speed legend powered by confidence, loyalty, and pure racing instinct. Turns every track into a comeback story.
            </p>

            {/* Interactive Data Block Stats */}
            <div style={{
              borderTop: '1px dashed rgba(239, 68, 68, 0.2)',
              paddingTop: '14px',
              fontFamily: 'monospace',
              fontSize: '10px',
              color: '#8A99AD',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>TOP SPEED:</span>
                <span style={{ color: '#FACC15', fontWeight: 'bold' }}>200 MPH</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>EGO LEVEL:</span>
                <span style={{ color: '#EF4444', fontWeight: 'bold' }}>95%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>FRIENDSHIP BOOST:</span>
                <span style={{ color: '#00E0A4', fontWeight: 'bold' }}>MAX</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>CATCHPHRASE POWER:</span>
                <span style={{ color: '#38BDF8', fontWeight: 'bold' }}>KA-CHOW</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SideQuests;
