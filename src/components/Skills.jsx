import React from 'react';
import { skills } from '../data/projects';

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Technical Section Header */}
        <div className="mb-16 flex flex-col items-center">
          <span className="text-[#00E0A4] font-mono text-xs md:text-sm tracking-widest uppercase mb-2 animate-pulse">
            // TECHNICAL SKILLS NODE
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#F8FAFC] uppercase tracking-wider text-center">
            Skill Set Matrix
          </h2>
          <div className="w-16 h-[2px] bg-[#00E0A4] mt-3 shadow-[0_0_10px_rgba(0,224,164,0.6)]"></div>
        </div>
        
        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skillGroup, index) => (
            <div key={index} className="engineering-card p-6 relative group flex flex-col justify-between">
              
              {/* Card Inner Glow Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00E0A4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="relative z-10 text-left">
                {/* Technical Label */}
                <span className="text-[9px] font-mono text-[#00E0A4]/80 tracking-widest uppercase mb-2 block">
                  [ NODE // 0{index + 1} ]
                </span>
                
                <h3 className="text-xl font-bold text-[#F8FAFC] mb-5 group-hover:text-[#00E0A4] transition-colors duration-300">
                  {skillGroup.category}
                </h3>
                
                {/* Skill Tags */}
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1.5 bg-[#0a1625]/60 backdrop-blur-md border border-[#00E0A4]/15 text-[#00E0A4] hover:text-[#38BDF8] hover:border-[#38BDF8]/40 text-xs font-mono font-bold rounded-md shadow-sm transition-all duration-300 cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
