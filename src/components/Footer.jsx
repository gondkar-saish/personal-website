import React from 'react';
import { Mail } from 'lucide-react';
import { Github, Linkedin } from './Icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const githubUrl = "https://github.com/gondkar-saish";
  const linkedinUrl = "https://www.linkedin.com/in/saish-gondkar/";

  return (
    <footer className="bg-[#050505] border-t border-white/5 text-[#A3A3A3] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <span className="text-xl font-bold text-[#F5F5F5] tracking-tight">
              Saish <span className="text-[#00E0A4]">Gondkar</span>
            </span>
            <p className="mt-2 text-sm text-[#A3A3A3]">
              Building scalable systems and intelligent hardware.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-[#A3A3A3] hover:text-[#00E0A4] transition-colors">
              <Github size={24} />
            </a>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[#A3A3A3] hover:text-[#00E0A4] transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="mailto:hello@example.com" aria-label="Email" className="text-[#A3A3A3] hover:text-[#00E0A4] transition-colors">
              <Mail size={24} />
            </a>
          </div>
        </div>
        
        <div className="mt-8 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-[#A3A3A3] mb-2 md:mb-0">
            &copy; {currentYear} Saish Gondkar. All rights reserved.
          </p>
          <p className="text-[#A3A3A3]">
            Designed & Built with React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
