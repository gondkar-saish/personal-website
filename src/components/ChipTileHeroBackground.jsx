import React, { useEffect, useState } from 'react';

const ChipTileHeroBackground = () => {
  const [tiles, setTiles] = useState([]);
  
  useEffect(() => {
    // Generate enough tiles to fill a large grid
    const totalTiles = 350; 
    const newTiles = [];
    
    for (let i = 0; i < totalTiles; i++) {
      const isRect = Math.random() > 0.85; // 15% chance to be a double-width tile
      // Stagger animation based on index + some randomness
      const delay = Math.random() * 1.5 + (i * 0.005); 
      newTiles.push({
        id: `tile-${i}`,
        delay,
        isRect,
      });
    }
    setTiles(newTiles);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-bg-base">
      
      <style>{`
        @keyframes tile-drop {
          0% { transform: translateY(-30px) scale(0.9); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>
      
      {/* Tile Grid */}
      <div className="absolute inset-[-5%] w-[110%] h-[110%] opacity-15">
        <div className="w-full h-full grid grid-cols-10 md:grid-cols-16 lg:grid-cols-24 auto-rows-fr gap-2 p-2">
           {tiles.map((tile) => {
             const hasGlow = Math.random() > 0.85; // Randomly assign a subtle cyan edge to some tiles
             return (
               <div 
                 key={tile.id}
                 className={`relative overflow-hidden rounded-sm min-h-[40px] md:min-h-[50px] group ${tile.isRect ? 'col-span-2' : 'col-span-1'} shadow-[0_4px_10px_rgba(0,0,0,0.4)]`}
                 style={{
                   background: 'linear-gradient(145deg, var(--bg-surface-hover), var(--bg-surface))',
                   border: '1px solid var(--border-subtle)',
                   animation: `tile-drop 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${tile.delay}s both`
                 }}
               >
                  {/* Metallic highlight edge */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--border-subtle)] to-transparent"></div>
                  
                  {/* Inner chip core */}
                  <div className="absolute inset-[25%] border border-border-subtle rounded-[2px] bg-bg-base shadow-inner"></div>
                  
                  {/* Random Cyan/Teal Glow on edges */}
                  {hasGlow && (
                    <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-accent-primary/10 to-transparent"></div>
                  )}

                  {/* Subtle hover effect (interactive!) */}
                  <div className="absolute inset-0 bg-accent-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300 mix-blend-screen"></div>
               </div>
             );
           })}
        </div>
      </div>

      {/* Lighting / Vignette Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_var(--bg-base)_80%)] pointer-events-none z-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-primary/5 rounded-full blur-[140px] opacity-60 pointer-events-none z-10"></div>
      
    </div>
  );
};

export default ChipTileHeroBackground;
