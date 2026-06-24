import React, { useState, useEffect } from 'react';

const ModulePreloader = ({ lines = [], onComplete, speed = 250 }) => {
  const [visibleLines, setVisibleLines] = useState([]);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (lines.length === 0) {
      onComplete();
      return;
    }

    let timeouts = [];
    const allLines = [...lines, 'status: ready'];

    allLines.forEach((line, index) => {
      const timeout = setTimeout(() => {
        setVisibleLines(prev => [...prev, line]);
        
        // If this is the last line ("status: ready"), trigger the fade out after a brief hold
        if (index === allLines.length - 1) {
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(onComplete, 500); // 500ms fade out duration
          }, 400); // Hold for 400ms so user can read "status: ready"
        }
      }, index * speed); // Reveal a new line based on speed
      
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [lines, onComplete, speed]);

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
          const isLastLine = index === lines.length; // The extra 'status: ready' line
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

export default ModulePreloader;
