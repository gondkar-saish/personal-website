import React from 'react';
import { FileText, Download } from 'lucide-react';

const Resume = () => {
  return (
    <section id="resume" className="py-20 bg-transparent border-t border-white/5 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Glassy Resume Control Module Wrapper */}
        <div className="engineering-card p-10 md:p-14 relative group">
          {/* Subtle inner grid glow overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00E0A4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          {/* Technical Section Header */}
          <div className="mb-8 flex flex-col items-center relative z-10">
            <span className="text-[#00E0A4] font-mono text-xs md:text-sm tracking-widest uppercase mb-2 animate-pulse">
              // CREDENTIAL NODE
            </span>
            <h2 className="text-3xl font-extrabold text-[#F8FAFC] uppercase tracking-wider">
              Curriculum Vitae
            </h2>
            <div className="w-16 h-[2px] bg-[#00E0A4] mt-3 shadow-[0_0_10px_rgba(0,224,164,0.6)]"></div>
          </div>
          
          <p className="text-[#94A3B8] text-base md:text-lg mb-10 max-w-2xl mx-auto relative z-10 font-sans leading-relaxed">
            Interested in my full experience and educational background? Download my resume to see detailed information about my skills, projects, and work history.
          </p>
          
          {/* Action Buttons Panel */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 relative z-10">
            <a 
              href="#" 
              className="engineering-button-primary w-full sm:w-auto gap-2"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </a>
            <a 
              href="#" 
              className="engineering-button-secondary w-full sm:w-auto gap-2"
            >
              <FileText className="h-4 w-4" />
              View Online
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
