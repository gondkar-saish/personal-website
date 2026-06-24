import React from 'react';

const cards = [
  {
    title: 'Cricket',
    color: '#00E0A4',
    bg: '#051a10',
    image: null, // No cricket image uploaded yet
    emoji: '🏏',
    description: 'Competition, patience, timing, and match-day energy.',
  },
  {
    title: 'Captain Jack Sparrow',
    color: '#FACC15',
    bg: '#1a1505',
    image: '/jack-sparrow.jpg',
    emoji: '🏴‍☠️',
    description: 'Chaos, confidence, humor, and unpredictable energy.',
  },
  {
    title: 'Po, the Dragon Warrior',
    color: '#38BDF8',
    bg: '#051520',
    image: '/po.jpg',
    emoji: '🐼',
    description: 'Growth, strength, humor, and becoming better one step at a time.',
  },
  {
    title: 'Minion Squad',
    color: '#FDE047',
    bg: '#1a1800',
    image: null, // Three minions shown differently below
    emoji: '💛',
    description: 'Three tiny chaos machines bringing unserious energy and comedy.',
  },
];

const SideQuests = () => {
  return (
    <div style={{
      position: 'relative',
      zIndex: 1,
      minHeight: '100vh',
      backgroundColor: '#030712',
      paddingTop: '60px',
      paddingBottom: '100px',
      paddingLeft: '24px',
      paddingRight: '24px',
    }}>

      {/* Heading block */}
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 64px' }}>
        <p style={{
          color: '#00E0A4',
          fontFamily: 'monospace',
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          marginBottom: '20px',
        }}>
          {'// SIDE QUESTS'}
        </p>
        <h1 style={{
          color: '#ffffff',
          fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: '-0.03em',
          lineHeight: 1,
          marginBottom: '24px',
        }}>
          Beyond the Code
        </h1>
        <p style={{
          color: '#94A3B8',
          fontSize: '1.1rem',
          lineHeight: 1.8,
        }}>
          A small corner of the things that keep me inspired, entertained, and competitive.
        </p>
      </div>

      {/* Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '28px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>

        {/* Cricket card (no image yet) */}
        <div
          style={{
            backgroundColor: '#0d1f2d',
            border: '1px solid #00E0A433',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0,0,0,0.6)',
            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.7), 0 0 30px #00E0A422';
            e.currentTarget.style.borderColor = '#00E0A488';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.6)';
            e.currentTarget.style.borderColor = '#00E0A433';
          }}
        >
          <div style={{
            height: '220px',
            backgroundColor: '#051a10',
            borderBottom: '1px solid #00E0A444',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
          }}>
            <span style={{ fontSize: '4.5rem', lineHeight: 1 }}>🏏</span>
            <span style={{
              display: 'inline-block',
              fontFamily: 'monospace',
              fontSize: '10px',
              color: '#00E0A4',
              border: '1px solid #00E0A455',
              borderRadius: '4px',
              padding: '3px 10px',
              letterSpacing: '0.12em',
              backgroundColor: '#00E0A40d',
            }}>
              [ CRICKET IMAGE COMING SOON ]
            </span>
          </div>
          <div style={{ padding: '28px 24px' }}>
            <h3 style={{ color: '#00E0A4', fontWeight: 800, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
              Cricket
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.7 }}>
              Competition, patience, timing, and match-day energy.
            </p>
          </div>
        </div>

        {/* Jack Sparrow card */}
        <div
          style={{
            backgroundColor: '#0d1f2d',
            border: '1px solid #FACC1533',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0,0,0,0.6)',
            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.7), 0 0 30px #FACC1522';
            e.currentTarget.style.borderColor = '#FACC1588';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.6)';
            e.currentTarget.style.borderColor = '#FACC1533';
          }}
        >
          <div style={{
            height: '220px',
            backgroundColor: '#1a1505',
            borderBottom: '1px solid #FACC1544',
            overflow: 'hidden',
            position: 'relative',
          }}>
            <img
              src="/jack-sparrow.jpg"
              alt="Captain Jack Sparrow"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
            />
          </div>
          <div style={{ padding: '28px 24px' }}>
            <h3 style={{ color: '#FACC15', fontWeight: 800, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
              Captain Jack Sparrow
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.7 }}>
              Chaos, confidence, humor, and unpredictable energy.
            </p>
          </div>
        </div>

        {/* Po card */}
        <div
          style={{
            backgroundColor: '#0d1f2d',
            border: '1px solid #38BDF833',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0,0,0,0.6)',
            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.7), 0 0 30px #38BDF822';
            e.currentTarget.style.borderColor = '#38BDF888';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.6)';
            e.currentTarget.style.borderColor = '#38BDF833';
          }}
        >
          <div style={{
            height: '220px',
            backgroundColor: '#051520',
            borderBottom: '1px solid #38BDF844',
            overflow: 'hidden',
            position: 'relative',
          }}>
            <img
              src="/po.jpg"
              alt="Po the Dragon Warrior"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
            />
          </div>
          <div style={{ padding: '28px 24px' }}>
            <h3 style={{ color: '#38BDF8', fontWeight: 800, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
              Po, the Dragon Warrior
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.7 }}>
              Growth, strength, humor, and becoming better one step at a time.
            </p>
          </div>
        </div>

        {/* Minion Squad card — 3 images */}
        <div
          style={{
            backgroundColor: '#0d1f2d',
            border: '1px solid #FDE04733',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0,0,0,0.6)',
            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.7), 0 0 30px #FDE04722';
            e.currentTarget.style.borderColor = '#FDE04788';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.6)';
            e.currentTarget.style.borderColor = '#FDE04733';
          }}
        >
          <div style={{
            height: '220px',
            backgroundColor: '#1a1800',
            borderBottom: '1px solid #FDE04744',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
          }}>
            {/* Three minions side by side */}
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <img src="/minion1.jpg" alt="Minion 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1, overflow: 'hidden', borderLeft: '2px solid #1a1800', borderRight: '2px solid #1a1800' }}>
              <img src="/minion2.jpg" alt="Minion 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <img src="/minion3.jpg" alt="Minion 3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
          <div style={{ padding: '28px 24px' }}>
            <h3 style={{ color: '#FDE047', fontWeight: 800, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
              Minion Squad
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.7 }}>
              Three tiny chaos machines bringing unserious energy and comedy.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SideQuests;
