import React from 'react';
import { ExternalLink } from 'lucide-react';

const Projects = () => {
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
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#F8FAFC] uppercase tracking-wider mb-4">
            Featured Projects
          </h2>
          <p className="text-[#94A3B8] max-w-2xl text-sm md:text-base mb-6">
            Backend and software projects built with Java, Spring Boot, MySQL, REST APIs, and authentication concepts.
          </p>
          <div className="w-16 h-[2px] bg-[#00E0A4] shadow-[0_0_10px_rgba(0,224,164,0.6)]"></div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fallbackProjects.map((project, index) => (
            <div key={index} className="engineering-card p-8 flex flex-col h-full bg-[#05070a]/80 border border-white/10 rounded-lg">
              
              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/title inline-flex items-start gap-2 mb-4 w-fit cursor-pointer"
              >
                <h3 className="text-xl font-bold text-[#F8FAFC] group-hover/title:text-[#00E0A4] transition-colors relative">
                  {project.title}
                  <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-[#00E0A4] transition-all duration-300 group-hover/title:w-full"></span>
                </h3>
                <ExternalLink size={18} className="text-[#05070a] group-hover/title:text-[#00E0A4] transition-colors mt-0.5 flex-shrink-0" />
              </a>
              
              <p className="text-[#94A3B8] mb-6 flex-grow text-sm leading-relaxed">
                {project.description}
              </p>
              
              <div className="mb-2 mt-auto">
                <span className="text-xs font-mono text-[#00E0A4] font-bold">Tech stack: </span>
                <span className="text-xs font-mono text-[#94A3B8]">{project.techStack}</span>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
