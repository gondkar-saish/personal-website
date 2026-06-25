import React, { useRef, useState, useEffect, useCallback, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Float,
  Text,
  Sparkles,
  PerspectiveCamera,
} from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// ─── Face Data ────────────────────────────────────────────────────────────────
const FACES = [
  {
    id: 'backend',
    label: 'BACKEND',
    accentColor: '#38BDF8',
    title: 'Backend Engineering',
    description: 'Building scalable REST APIs, authentication systems, and data-driven applications using Java and Spring Boot.',
    techs: ['Java', 'Spring Boot', 'MySQL', 'Hibernate', 'REST API', 'JWT'],
    experience: '2+ years building production-ready backend systems',
    faceIndex: 0,
  },
  {
    id: 'mobile',
    label: 'MOBILE',
    accentColor: '#A78BFA',
    title: 'Mobile Development',
    description: 'Cross-platform mobile app development with React Native and Expo for iOS and Android.',
    techs: ['React Native', 'Expo', 'JavaScript'],
    experience: 'Building performant, native-feel mobile experiences',
    faceIndex: 1,
  },
  {
    id: 'hardware',
    label: 'HARDWARE',
    accentColor: '#00E0A4',
    title: 'Hardware Systems',
    description: 'Designing embedded sensor systems and IoT solutions with ESP32 and Arduino microcontrollers.',
    techs: ['ESP32', 'Arduino', 'DHT11', 'PIR', 'LDR', 'Sensors'],
    experience: 'Smart room monitoring and hardware-software integration',
    faceIndex: 2,
  },
  {
    id: 'tools',
    label: 'TOOLS',
    accentColor: '#FACC15',
    title: 'Dev Tools & Workflow',
    description: 'Professional development toolchain for version control, API testing, and full-stack productivity.',
    techs: ['Git', 'GitHub', 'IntelliJ IDEA', 'VS Code', 'Postman', 'MySQL Workbench'],
    experience: 'Industry-standard workflows with modern tooling',
    faceIndex: 3,
  },
];

// Target rotations for each face to face the camera (front = +Z)
const FACE_ROTATIONS = [
  [0, 0, 0],                       // Face 0: Backend  → front face
  [0, Math.PI / 2, 0],             // Face 1: Mobile   → right face rotated left
  [-Math.PI / 2, 0, 0],            // Face 2: Hardware → top face rotated down
  [0, -Math.PI / 2, 0],            // Face 3: Tools    → left face rotated right
];

// ─── Titanium Edge Lines ──────────────────────────────────────────────────────
function TitaniumFrame() {
  const ref = useRef();
  const geo = new THREE.EdgesGeometry(new THREE.BoxGeometry(2.04, 2.04, 2.04));
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.material.opacity = 0.22 + Math.sin(clock.getElapsedTime() * 0.4) * 0.04;
    }
  });
  return (
    <lineSegments ref={ref} geometry={geo}>
      <lineBasicMaterial color="#7FA2B8" transparent opacity={0.22} />
    </lineSegments>
  );
}

// ─── Corner Accent Spheres ────────────────────────────────────────────────────
function CornerBolts() {
  const corners = [];
  for (let x of [-1, 1]) for (let y of [-1, 1]) for (let z of [-1, 1]) corners.push([x, y, z]);
  return (
    <group>
      {corners.map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[0.032, 10, 10]} />
          <meshStandardMaterial
            color="#E2E8F0"
            metalness={0.95}
            roughness={0.12}
            emissive="#000000"
            emissiveIntensity={0.0}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Face Panel (frosted dark backing) ────────────────────────────────────────
function FacePanel({ position, rotation, color, isActive }) {
  const ref = useRef();
  useFrame(() => {
    if (!ref.current) return;
    // Active face: highly opaque dark panel for contrast. Inactive: dimmer, slightly transparent.
    ref.current.material.opacity = isActive ? 0.96 : 0.82;
  });
  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <planeGeometry args={[1.92, 1.92]} />
      <meshPhysicalMaterial
        color={isActive ? '#090e18' : '#020408'}
        roughness={0.75}
        metalness={0.12}
        transmission={0.3}
        thickness={0.05}
        ior={1.1}
        transparent
        opacity={0.82}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

// ─── Subtle colored border glow around active face ───────────────────────────
function FaceBorderGlow({ position, rotation, color, isActive }) {
  if (!isActive) return null;
  const geo = new THREE.EdgesGeometry(new THREE.PlaneGeometry(1.94, 1.94));
  return (
    <lineSegments position={position} rotation={rotation} geometry={geo}>
      <lineBasicMaterial color={color} transparent opacity={0.65} />
    </lineSegments>
  );
}

// ─── Face Tech Labels ─────────────────────────────────────────────────────────
function FaceContent({ position, rotation, face, isActive }) {
  const techs = face.techs;
  const cols = techs.length <= 3 ? techs.length : 3;
  const rows = Math.ceil(techs.length / cols);
  const colGap = techs.length <= 3 ? 0.50 : 0.60;
  const rowGap = 0.35;
  const centerY = -0.12;

  // Active face is ultra-bright and crisp, inactive is beautifully subtle
  const labelColor = isActive ? '#FFFFFF' : face.accentColor;
  const dividerOpacity = isActive ? 0.8 : 0.3;

  return (
    <group position={position} rotation={rotation}>
      {/* Category label at top */}
      <Text
        position={[0, 0.72, 0.005]}
        fontSize={isActive ? 0.175 : 0.155}
        color={labelColor}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.16}
        fontWeight={isActive ? 800 : 600}
        outlineWidth={isActive ? 0.008 : 0.005}
        outlineColor="#000308"
      >
        {face.label}
      </Text>
      {/* Divider line */}
      <mesh position={[0, 0.54, 0.003]}>
        <planeGeometry args={[1.4, 0.01]} />
        <meshBasicMaterial color={face.accentColor} transparent opacity={dividerOpacity} />
      </mesh>
      {/* Tech items */}
      {techs.map((tech, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = ((col - (cols - 1) / 2)) * colGap;
        const y = centerY + ((rows - 1) / 2 - row) * rowGap;
        return (
          <Text
            key={tech}
            position={[x, y, 0.005]}
            fontSize={isActive ? 0.115 : 0.092}
            color={isActive ? '#FFFFFF' : '#8A9FAD'}
            anchorX="center"
            anchorY="middle"
            fontWeight={isActive ? 700 : 500}
            outlineWidth={isActive ? 0.007 : 0.004}
            outlineColor="#000308"
          >
            {tech}
          </Text>
        );
      })}
    </group>
  );
}

// ─── Cube with Drag + Parallax ────────────────────────────────────────────────
function SkillCube({ activeFace, mouseRef }) {
  const group = useRef();
  const isDragging = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });
  const manualOffset = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  // Face positions and rotations
  const faces = [
    { pos: [0, 0, 1.02],  rot: [0, 0, 0],             id: 0 },
    { pos: [0, 0, -1.02], rot: [Math.PI, 0, 0],        id: 0 }, // back
    { pos: [-1.02, 0, 0], rot: [0, Math.PI / 2, 0],    id: 1 },
    { pos: [1.02, 0, 0],  rot: [0, -Math.PI / 2, 0],   id: 3 },
    { pos: [0, 1.02, 0],  rot: [-Math.PI / 2, 0, 0],   id: 2 },
    { pos: [0, -1.02, 0], rot: [Math.PI / 2, 0, 0],    id: 2 },
  ];

  useFrame(({ clock }) => {
    if (!group.current) return;

    // Target from active face
    const [tx, ty, tz] = FACE_ROTATIONS[activeFace];

    // Apply velocity (inertia from drag)
    if (!isDragging.current) {
      velocity.current.x *= 0.92;
      velocity.current.y *= 0.92;
      manualOffset.current.x += velocity.current.x;
      manualOffset.current.y += velocity.current.y;

      // Lerp manual offset back to 0 when idle
      manualOffset.current.x *= 0.97;
      manualOffset.current.y *= 0.97;
    }

    // Mouse parallax (gentle)
    const mx = mouseRef.current.x * 0.18;
    const my = mouseRef.current.y * 0.18;

    const finalX = tx + manualOffset.current.x - my;
    const finalY = ty + manualOffset.current.y + mx;

    group.current.rotation.x += (finalX - group.current.rotation.x) * 0.055;
    group.current.rotation.y += (finalY - group.current.rotation.y) * 0.055;
    group.current.rotation.z += (tz - group.current.rotation.z) * 0.055;
  });

  const handlePointerDown = useCallback((e) => {
    isDragging.current = true;
    prevMouse.current = { x: e.clientX, y: e.clientY };
    e.stopPropagation();
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (!isDragging.current) return;
      const dx = e.clientX - prevMouse.current.x;
      const dy = e.clientY - prevMouse.current.y;
      velocity.current.x = dy * 0.007;
      velocity.current.y = dx * 0.007;
      manualOffset.current.x += dy * 0.007;
      manualOffset.current.y += dx * 0.007;
      prevMouse.current = { x: e.clientX, y: e.clientY };
    };
    const onUp = () => { isDragging.current = false; };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  return (
    <Float speed={1.3} floatIntensity={0.2} rotationIntensity={0} floatingRange={[-0.07, 0.07]}>
      <group ref={group} onPointerDown={handlePointerDown}>
        {/* Dark core block for solid background contrast */}
        <mesh>
          <boxGeometry args={[1.98, 1.98, 1.98]} />
          <meshStandardMaterial
            color="#03060d"
            metalness={0.1}
            roughness={0.9}
            transparent
            opacity={0.98}
            side={THREE.DoubleSide}
            depthWrite={true}
          />
        </mesh>

        {/* Titanium frame */}
        <TitaniumFrame />
        <CornerBolts />

        {/* Dark frosted face panels (solid backing for text contrast) */}
        {faces.map((fc, i) => (
          <FacePanel
            key={i}
            position={fc.pos}
            rotation={fc.rot}
            color={FACES[fc.id].accentColor}
            isActive={activeFace === fc.id}
          />
        ))}

        {/* Subtle colored border glow on active face only */}
        {faces.map((fc, i) => (
          <FaceBorderGlow
            key={i + '-glow'}
            position={fc.pos.map((v) => v * 1.001)}
            rotation={fc.rot}
            color={FACES[fc.id].accentColor}
            isActive={activeFace === fc.id}
          />
        ))}

        {/* Tech content on each face — positioned in front of panel for 100% legibility */}
        {faces.map((fc, i) => (
          <FaceContent
            key={i + '-content'}
            position={fc.pos.map((v) => v * 1.015)}
            rotation={fc.rot}
            face={FACES[fc.id]}
            isActive={activeFace === fc.id}
          />
        ))}
      </group>
    </Float>
  );
}

// ─── Scene ────────────────────────────────────────────────────────────────────
function Scene({ activeFace, mouseRef }) {
  const accent = FACES[activeFace]?.accentColor || '#38BDF8';
  const pulseRef = useRef();

  useFrame(({ clock }) => {
    if (pulseRef.current) {
      // Gentle, low-frequency breath with zero hotspots
      pulseRef.current.intensity = 0.3 + Math.sin(clock.getElapsedTime() * 0.4) * 0.08;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={40} />

      {/* Soft, even, high-contrast ambient lighting */}
      <ambientLight intensity={0.85} color="#1d273a" />
      <directionalLight position={[3, 4, 5]} intensity={0.45} color="#e6f0fa" />
      <directionalLight position={[-3, -2, -3]} intensity={0.1} color="#08101e" />

      {/* Extremely subtle accent wash — very low intensity, no hotspots */}
      <pointLight ref={pulseRef} position={[0, 0, 3.0]} intensity={0.3} color={accent} distance={6} decay={2} />

      {/* Dim, elegant sparkles for depth — completely unobtrusive */}
      <Sparkles count={20} scale={8} size={0.4} speed={0.08} color="#38BDF8" opacity={0.08} />
      <Sparkles count={10} scale={6} size={0.3} speed={0.05} color="#00E0A4" opacity={0.04} />

      <SkillCube activeFace={activeFace} mouseRef={mouseRef} />

      {/* NO Environment map — removes all reflections */}

      {/* Very subtle bloom only to prevent text bleed */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.65} luminanceSmoothing={0.95} intensity={0.15} />
      </EffectComposer>
    </>
  );
}

// ─── Detail Panel (HTML) ──────────────────────────────────────────────────────
function DetailPanel({ face }) {
  const [key, setKey] = useState(0);
  const [current, setCurrent] = useState(face);

  useEffect(() => {
    setCurrent(face);
    setKey((k) => k + 1);
  }, [face]);

  const accent = current.accentColor;

  return (
    <div key={key} style={{ animation: 'panelIn 0.45s cubic-bezier(0.25,1,0.5,1) forwards', opacity: 0 }}>
      <style>{`
        @keyframes panelIn {
          from { opacity:0; transform: translateX(20px) scale(0.97); }
          to   { opacity:1; transform: translateX(0) scale(1); }
        }
        @keyframes pillIn {
          from { opacity:0; transform: translateY(6px); }
          to   { opacity:1; transform: translateY(0); }
        }
      `}</style>
      <div style={{
        background: 'linear-gradient(135deg, rgba(4,12,30,0.92) 0%, rgba(6,16,36,0.85) 100%)',
        backdropFilter: 'blur(28px)',
        border: `1px solid ${accent}2a`,
        borderRadius: '20px',
        padding: '32px 28px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: `0 0 50px ${accent}14, 0 24px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)`,
        maxWidth: '360px',
        minWidth: '260px',
      }}>
        {/* Ambient glow blob top right */}
        <div style={{
          position: 'absolute', top: -40, right: -40,
          width: 180, height: 180,
          background: `radial-gradient(circle, ${accent}1a 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        {/* HUD corner brackets */}
        {[[{top:0,left:0},{borderTopWidth:'2px',borderLeftWidth:'2px'}],
          [{top:0,right:0},{borderTopWidth:'2px',borderRightWidth:'2px'}],
          [{bottom:0,left:0},{borderBottomWidth:'2px',borderLeftWidth:'2px'}],
          [{bottom:0,right:0},{borderBottomWidth:'2px',borderRightWidth:'2px'}],
        ].map(([pos, borders], i) => (
          <div key={i} style={{
            position: 'absolute', width: 14, height: 14,
            borderStyle: 'solid', borderColor: accent,
            borderTopWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, borderLeftWidth: 0,
            ...borders, ...pos,
          }} />
        ))}

        {/* Node label */}
        <div style={{ fontFamily: 'monospace', fontSize: '10px', color: accent, letterSpacing: '0.18em', marginBottom: '8px', opacity: 0.75 }}>
          // NODE_{String(current.faceIndex).padStart(2, '0')} ACTIVE
        </div>

        {/* Title */}
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#F8FAFC', margin: '0 0 18px', letterSpacing: '-0.01em' }}>
          {current.title}
        </h3>

        {/* Divider */}
        <div style={{ height: 1, background: `linear-gradient(90deg, ${accent}55, transparent)`, marginBottom: '16px' }} />

        {/* Description */}
        <p style={{ color: '#94A3B8', fontFamily: 'monospace', fontSize: '0.79rem', lineHeight: 1.75, marginBottom: '20px' }}>
          {current.description}
        </p>

        {/* Tech pills */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontFamily: 'monospace', fontSize: '9px', color: accent, letterSpacing: '0.16em', marginBottom: '10px', opacity: 0.65 }}>
            TECHNOLOGIES
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {current.techs.map((t, i) => (
              <span key={t} style={{
                padding: '4px 10px',
                border: `1px solid ${accent}44`,
                borderRadius: '6px',
                background: `${accent}0c`,
                color: accent,
                fontFamily: 'monospace',
                fontSize: '10px',
                fontWeight: 700,
                animation: `pillIn 0.38s ${i * 0.055}s ease forwards`,
                opacity: 0,
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div style={{ borderTop: `1px dashed ${accent}2a`, paddingTop: '14px', fontFamily: 'monospace', fontSize: '10px', color: '#64748B', lineHeight: 1.5 }}>
          <span style={{ color: accent, opacity: 0.7 }}>EXP // </span>{current.experience}
        </div>
      </div>
    </div>
  );
}

// ─── Face Selector Tabs ───────────────────────────────────────────────────────
function FaceTabs({ activeFace, setActiveFace }) {
  return (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
      {FACES.map((face, i) => {
        const on = activeFace === i;
        return (
          <button
            key={face.id}
            onClick={() => setActiveFace(i)}
            style={{
              padding: '9px 20px',
              background: on ? `${face.accentColor}15` : 'rgba(4,12,28,0.6)',
              border: `1px solid ${on ? face.accentColor + '80' : 'rgba(255,255,255,0.07)'}`,
              borderRadius: '10px',
              color: on ? face.accentColor : '#64748B',
              fontFamily: 'monospace',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.13em',
              cursor: 'pointer',
              transition: 'all 0.28s ease',
              boxShadow: on ? `0 0 18px ${face.accentColor}2a` : 'none',
              outline: 'none',
            }}
          >
            {face.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Root Export ──────────────────────────────────────────────────────────────
export default function SkillsCube() {
  const [activeFace, setActiveFace] = useState(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef();

  useEffect(() => {
    const onMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseRef.current = {
        x: (e.clientX - cx) / (rect.width / 2),
        y: (e.clientY - cy) / (rect.height / 2),
      };
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section id="skills" style={{ minHeight: '100vh', padding: '120px 24px 80px', position: 'relative', background: 'transparent', fontFamily: "'Inter', sans-serif", overflow: 'hidden' }}>
      <style>{`
        .sk-layout { display: flex; align-items: center; justify-content: center; gap: 52px; max-width: 1200px; margin: 0 auto; }
        .sk-canvas { flex: 0 0 480px; height: 480px; position: relative; cursor: grab; border-radius: 24px; overflow: hidden; }
        .sk-canvas:active { cursor: grabbing; }
        .sk-panel { flex: 1; min-width: 0; }
        @media (max-width: 900px) {
          .sk-layout { flex-direction: column; gap: 32px; }
          .sk-canvas { flex: none; width: min(440px, 90vw); height: min(440px, 90vw); }
          .sk-panel { width: 100%; display: flex; justify-content: center; }
        }
        @media (max-width: 520px) {
          .sk-canvas { width: 88vw; height: 88vw; }
        }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{
          display: 'inline-block', fontFamily: 'monospace', fontSize: '11px',
          color: '#00E0A4', border: '1px solid rgba(0,224,164,0.3)', borderRadius: '4px',
          padding: '4px 14px', letterSpacing: '0.2em', background: 'rgba(0,224,164,0.05)',
          textTransform: 'uppercase', marginBottom: '16px',
        }}>
          // TECHNICAL SKILLS NODE
        </span>
        <h2 style={{
          color: '#F8FAFC', fontSize: 'clamp(1.9rem, 5vw, 3.2rem)', fontWeight: 900,
          textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.1,
          marginBottom: '12px', textShadow: '0 0 40px rgba(56,189,248,0.12)',
          margin: '0 0 12px',
        }}>
          Skill Set Matrix
        </h2>
        <p style={{ color: 'rgba(148,163,184,0.7)', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', margin: 0 }}>
          DRAG CUBE TO ROTATE // SELECT A TAB TO INSPECT EACH FACE
        </p>
      </div>

      {/* Main */}
      <div className="sk-layout" ref={containerRef}>
        {/* Canvas */}
        <div className="sk-canvas">
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '24px',
            border: '1px solid rgba(56,189,248,0.1)',
            boxShadow: '0 0 60px rgba(56,189,248,0.05), inset 0 0 60px rgba(56,189,248,0.02)',
            pointerEvents: 'none', zIndex: 2,
          }} />
          <Canvas
            shadows
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
            style={{ background: 'transparent' }}
          >
            <Suspense fallback={null}>
              <Scene activeFace={activeFace} mouseRef={mouseRef} />
            </Suspense>
          </Canvas>
        </div>

        {/* Detail panel */}
        <div className="sk-panel">
          <DetailPanel face={FACES[activeFace]} />
        </div>
      </div>

      {/* Tabs */}
      <div style={{ marginTop: '44px' }}>
        <FaceTabs activeFace={activeFace} setActiveFace={setActiveFace} />
      </div>
      <p style={{ textAlign: 'center', marginTop: '18px', fontFamily: 'monospace', fontSize: '10px', color: 'rgba(100,116,139,0.5)', letterSpacing: '0.12em' }}>
        CLICK + DRAG THE CUBE TO ROTATE // CLICK TABS TO FOCUS A FACE
      </p>
    </section>
  );
}
