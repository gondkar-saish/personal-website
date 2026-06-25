import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import { Linkedin, Instagram } from './Icons';

const Contact = () => {
  const contactItems = [
    {
      name: "Email",
      value: "saish.gondkar06@gmail.com",
      url: "mailto:saish.gondkar06@gmail.com",
      icon: <Mail size={24} className="text-text-main group-hover:text-accent-primary transition-colors duration-300" />
    },
    {
      name: "LinkedIn",
      value: "Saish Gondkar",
      url: "https://www.linkedin.com/in/saish-gondkar/",
      icon: <Linkedin size={24} className="text-text-main group-hover:text-accent-primary transition-colors duration-300" />
    },
    {
      name: "Instagram",
      value: "the.saish18",
      url: "https://www.instagram.com/the.saish18",
      icon: <Instagram size={24} className="text-text-main group-hover:text-accent-primary transition-colors duration-300" />
    }
  ];

  return (
    <section id="contact" className="py-24 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <h2 className="text-4xl font-extrabold text-text-main uppercase tracking-wider mb-3">
            Contact
          </h2>
          <div className="w-16 h-[2px] bg-accent-primary shadow-[0_0_10px_var(--accent-primary)]"></div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Left Side: Contact Information */}
          <div className="engineering-card p-8 flex flex-col h-full">
            <h3 className="text-2xl font-bold text-text-main mb-8 relative z-10 flex items-center gap-3">
              <span className="text-accent-primary">{'//'}</span> Contact Me
            </h3>
            
            <div className="flex flex-col gap-6 relative z-10">
              {contactItems.map((item, index) => (
                <a 
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-6 p-4 rounded-lg bg-bg-surface border border-border-subtle hover:border-accent-primary/30 hover:bg-accent-primary/5 transition-all duration-300"
                >
                  <div className="p-3 bg-bg-surface rounded-md border border-border-subtle group-hover:border-accent-primary/50 group-hover:shadow-[0_0_10px_var(--accent-primary)] transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm text-text-muted font-mono mb-1">{item.name}</div>
                    <div className="text-text-main font-medium group-hover:text-accent-primary transition-colors duration-300">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right Side: Map Card */}
          <div className="flex flex-col h-full">
            <div className="engineering-card p-8 flex flex-col relative overflow-hidden group flex-grow">
              <h3 className="text-2xl font-bold text-text-main mb-6 relative z-10 flex items-center gap-3">
                <span className="text-accent-primary">{'//'}</span> You might find me here
              </h3>
              
              <div className="flex-grow relative rounded-lg border border-border-subtle bg-bg-surface overflow-hidden min-h-[250px] z-10">
                <iframe 
                  src="https://maps.google.com/maps?q=20.0052125,73.7695156&hl=en&z=14&output=embed" 
                  className="absolute inset-0 w-full h-full border-0 filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                ></iframe>
                
                {/* Corner Accents for the map iframe container */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent-primary opacity-50 z-20"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent-primary opacity-50 z-20"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent-primary opacity-50 z-20"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent-primary opacity-50 z-20"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
