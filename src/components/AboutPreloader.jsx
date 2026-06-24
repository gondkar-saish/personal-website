import React, { useState, useEffect } from 'react';

const lines = [
  'INITIALIZING ABOUT MODULE //',
  'loading profile.data',
  'reading academic background',
  'mapping skills and interests',
  'connecting hardware + software experience',
  'rendering saish_gondkar.about',
  'status: ready'
];

const AboutPreloader = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState([]);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    let timeouts = [];

    // Timing logic to spread the 7 lines over ~2.5 seconds
    // 0ms, 400ms, 800ms, 1200ms, 1600ms, 2000ms, 2400ms
    lines.forEach((line, index) => {
      const timeout = setTimeout(() => {
        setVisibleLines(prev => [...prev, line]);
        
        // If this is the last line ("status: ready"), trigger the fade out after a brief hold
        if (index === lines.length - 1) {
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(onComplete, 500); // 500ms fade out duration
          }, 600); // Hold for 600ms so user can read "status: ready"
        }
      }, index * 350); // Reveal a new line every 350ms
      
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(onComplete, 300);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 bg-[#050505] flex flex-col justify-between p-8 font-mono transition-opacity duration-500 ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Texture Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      ></div>

      {/* Terminal Output Area (Top Left) */}
      <div className="relative z-10 max-w-2xl">
        {visibleLines.map((line, index) => {
          const isLastLine = index === lines.length - 1;
          return (
            <div 
              key={index} 
              className={`text-sm md:text-base mb-2 ${isLastLine ? 'text-[#00E0A4] font-bold' : 'text-[#A3A3A3]'}`}
            >
              <span className="opacity-50 mr-3">{`[${String(index).padStart(2, '0')}]`}</span>
              {line}
              {/* Blinking Cursor on the most recently printed line */}
              {index === visibleLines.length - 1 && !isFadingOut && (
                <span className="inline-block w-2 h-4 ml-2 bg-current animate-pulse align-middle"></span>
              )}
            </div>
          );
        })}
      </div>

      {/* Skip Button (Bottom Right) */}
      <div className="relative z-10 flex justify-end">
        <button 
          onClick={handleSkip}
          className="text-[#666666] hover:text-[#F5F5F5] text-xs tracking-widest uppercase transition-colors"
        >
          [ Skip ]
        </button>
      </div>
    </div>
  );
};

export default AboutPreloader;
