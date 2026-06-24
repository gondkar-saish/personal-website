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
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.7);
        }
        .sci-fi-card:hover {
          transform: translateY(-10px) scale(1.02);
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

      {/* Redesigned 3-Card Dossier Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '40px',
        justifyContent: 'center',
        alignItems: 'stretch',
        maxWidth: '1150px',
        margin: '0 auto'
      }}>
        
        {/* CARD 1: CAPTAIN JACK SPARROW (Gold & Cyan Theme) */}
        <div 
          className="sci-fi-card"
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
          className="sci-fi-card"
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
          className="sci-fi-card"
          style={{
            borderColor: hoveredCard === 'minions' ? '#FDE04799' : 'rgba(253, 224, 71, 0.15)',
            boxShadow: hoveredCard === 'minions' 
              ? '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(253, 224, 71, 0.15), 0 0 60px rgba(239, 68, 68, 0.1)'
              : '0 10px 40px rgba(0, 0, 0, 0.7)',
            animation: hoveredCard === 'minions' ? 'minion-shake-anim 0.35s infinite ease-in-out' : 'none'
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
            style={{ color: '#FDE047', display: 'flex' }}
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

      </div>
    </div>
  );
};

export default SideQuests;
