import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Esp32ProjectPage = () => {
  // Component data map (Web Dashboard removed as requested)
  const components = [
    {
      id: 'esp32',
      name: 'ESP32',
      role: 'Main Controller',
      description: 'The ESP32 is the core controller of the system. It reads data from connected sensors, processes the inputs, drives output modules, and enables future IoT capabilities through built-in wireless support.',
      image: `${import.meta.env.BASE_URL}images/esp32Image.png`,
      top: '50%',
      left: '50%',
      width: 'w-48 md:w-64',
      zIndex: 40,
      delay: '0s'
    },
    {
      id: 'oled',
      name: 'OLED Display',
      role: 'Live Output Display',
      description: 'The OLED display presents real-time sensor values and system status directly on the device, making the setup easier to monitor without external tools.',
      image: `${import.meta.env.BASE_URL}images/oledDisplayImage.png`,
      top: '25%',
      left: '80%',
      width: 'w-36 md:w-48',
      zIndex: 30,
      delay: '0.5s'
    },
    {
      id: 'dht11',
      name: 'DHT11 Sensor',
      role: 'Temperature & Humidity',
      description: 'The DHT11 captures temperature and humidity readings, helping the system monitor essential environmental conditions inside the room.',
      image: `${import.meta.env.BASE_URL}images/dht11Image.png`,
      top: '25%',
      left: '20%',
      width: 'w-32 md:w-40',
      zIndex: 30,
      delay: '1.2s'
    },
    {
      id: 'pir',
      name: 'PIR Motion Sensor',
      role: 'Motion Detection',
      description: 'The PIR sensor detects movement in the room, making it useful for occupancy awareness, automation triggers, and smart alert behavior.',
      image: `${import.meta.env.BASE_URL}images/pirSensorImage.png`,
      top: '60%',
      left: '15%',
      width: 'w-36 md:w-44',
      zIndex: 30,
      delay: '0.8s'
    },
    {
      id: 'ldr',
      name: 'LDR Sensor',
      role: 'Light Detection',
      description: 'The LDR sensor measures ambient light intensity, allowing the system to understand changes in room brightness and respond to lighting conditions.',
      image: `${import.meta.env.BASE_URL}images/ldrSensorImage.png`,
      top: '15%',
      left: '50%',
      width: 'w-24 md:w-32',
      zIndex: 20,
      delay: '1.5s'
    },
    {
      id: 'buzzer',
      name: 'Buzzer',
      role: 'Audio Alert',
      description: 'The buzzer provides immediate audible feedback for alerts, warnings, or system-triggered events based on sensor activity or defined thresholds.',
      image: `${import.meta.env.BASE_URL}images/buzzerImage.png`,
      top: '80%',
      left: '35%',
      width: 'w-24 md:w-32',
      zIndex: 30,
      delay: '0.3s'
    },
    {
      id: 'relay',
      name: 'Relay Module',
      role: 'Device Control',
      description: 'The relay module enables switching external electrical devices on or off, allowing the monitoring system to expand into basic automation and control.',
      image: `${import.meta.env.BASE_URL}images/relayModuleImage.png`,
      top: '75%',
      left: '75%',
      width: 'w-32 md:w-44',
      zIndex: 30,
      delay: '1.8s'
    }
  ];

  // Default active component is ESP32
  const [activeComponent, setActiveComponent] = useState(components[0]);
  const [isHovering, setIsHovering] = useState(false);

  // Parallax effect state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    // Calculate normalized mouse position from -1 to 1
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    setMousePos({ x, y });
  };

  return (
    <div 
      className="min-h-screen bg-transparent text-[#F5F5F5] pt-20 overflow-hidden relative flex flex-col z-10"
      onMouseMove={handleMouseMove}
    >
      
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      ></div>

      {/* Subtle Central Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00E0A4]/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8 flex-grow flex flex-col w-full">
        
        {/* Navigation & Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link 
              to="/hardware-systems" 
              className="w-12 h-12 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center text-[#A3A3A3] hover:text-[#00E0A4] hover:bg-[#1A1A1A] hover:border-[#00E0A4]/50 transition-all shadow-lg"
            >
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#F5F5F5]">Interactive Hardware Breakdown</h1>
              <span className="text-sm font-bold tracking-widest uppercase text-[#00E0A4]">ESP32 Smart Room Monitor</span>
            </div>
          </div>
        </div>

        {/* Main Exploded View Layout */}
        <div className="flex flex-col xl:flex-row gap-8 flex-grow">
          
          {/* Exploded Stage Area (Left/Top) */}
          <div className="w-full xl:w-2/3 bg-[#0A0A0A] border border-white/10 rounded-3xl relative overflow-hidden flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            
            {/* 
              Horizontal Scrolling Container for Mobile 
              We enforce a minimum width for the inner stage so the absolute positioning 
              stays perfectly wide and spread out, allowing mobile users to pan around the scene.
            */}
            <div className="w-full overflow-x-auto hide-scrollbar touch-pan-x touch-pan-y">
              <div className="relative min-w-[1000px] w-full aspect-[16/10] md:aspect-video lg:aspect-[16/9] xl:aspect-[4/3] flex items-center justify-center">
                
                {/* Connector Lines Layer (Optional Visuals) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                  <line x1="50%" y1="50%" x2="20%" y2="25%" stroke="#00E0A4" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="50%" y1="50%" x2="80%" y2="25%" stroke="#00E0A4" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="50%" y1="50%" x2="15%" y2="60%" stroke="#00E0A4" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="50%" y1="50%" x2="50%" y2="15%" stroke="#00E0A4" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="50%" y1="50%" x2="35%" y2="80%" stroke="#00E0A4" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="#00E0A4" strokeWidth="1" strokeDasharray="4 4" />
                </svg>

                {/* Floating Components */}
                {components.map((comp) => {
                  const isActive = activeComponent.id === comp.id;
                  
                  return (
                    <div
                      key={comp.id}
                      className="absolute group cursor-pointer transition-all duration-700 ease-out"
                      style={{ 
                        top: comp.top, 
                        left: comp.left, 
                        transform: `translate(-50%, -50%)`,
                        zIndex: isActive ? 50 : comp.zIndex,
                        opacity: !isActive && isHovering ? 0.3 : 1
                      }}
                      onMouseEnter={() => {
                        setActiveComponent(comp);
                        setIsHovering(true);
                      }}
                      onMouseLeave={() => setIsHovering(false)}
                      onClick={() => setActiveComponent(comp)}
                    >
                      {/* 
                        The Floating Wrapper 
                        Uses custom float animation. Parallax offset applied to translation.
                      */}
                      <div 
                        className={`animate-float flex items-center justify-center p-4 transition-all duration-500 ease-out ${
                          isActive 
                            ? 'scale-125 md:scale-150 drop-shadow-[0_0_40px_rgba(0,224,164,0.6)]' 
                            : 'scale-100 hover:scale-110 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                        }`}
                        style={{ 
                          animationDelay: comp.delay,
                          transform: `translate(${mousePos.x * (comp.zIndex - 10)}px, ${mousePos.y * (comp.zIndex - 10)}px)`
                        }}
                      >
                        <div className={`relative flex items-center justify-center ${comp.width} aspect-square`}>
                          <img 
                            src={comp.image} 
                            alt={comp.name} 
                            className="w-full h-full object-contain drop-shadow-2xl"
                          />
                        </div>
                        
                        {/* Name Label Badge - Appears subtly under component */}
                        <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                          isActive 
                            ? 'text-[#00E0A4] opacity-100 scale-100 drop-shadow-[0_0_10px_rgba(0,224,164,0.8)]' 
                            : 'text-[#A3A3A3] opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100'
                        }`}>
                          {comp.name}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Dynamic Information Panel (Right/Bottom) */}
          <div className="w-full xl:w-1/3 flex flex-col pt-4 xl:pt-0">
            <div className="bg-[#111111] border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden flex-grow shadow-2xl flex flex-col justify-center">
              
              {/* Animated Accents */}
              <div className="absolute top-0 left-0 w-1 h-full bg-[#00E0A4] shadow-[0_0_20px_rgba(0,224,164,0.5)]"></div>
              
              {/* Content wraps in a key-driven transition layer so it animates when activeComponent changes */}
              <div key={activeComponent.id} className="animate-intro-fade-in flex flex-col justify-center h-full">
                <div className="mb-3 text-[#00E0A4] text-sm font-black uppercase tracking-widest flex items-center gap-2">
                  <ChevronRight size={16} />
                  {activeComponent.role}
                </div>
                
                <h3 className="text-3xl md:text-4xl font-extrabold text-[#F5F5F5] mb-6 leading-tight">
                  {activeComponent.name}
                </h3>
                
                <div className="w-16 h-1 bg-white/10 rounded-full mb-8"></div>
                
                <p className="text-[#A3A3A3] text-lg leading-relaxed md:leading-loose">
                  {activeComponent.description}
                </p>
              </div>

            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Esp32ProjectPage;
