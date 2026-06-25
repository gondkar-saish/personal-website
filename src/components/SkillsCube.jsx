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

// ─── Procedural 3D Logo Components ──────────────────────────────────────────

function JavaLogo() {
  return (
    <group>
      {/* Cup Body */}
      <mesh>
        <cylinderGeometry args={[0.07, 0.06, 0.12, 16]} />
        <meshStandardMaterial color="#F3F4F6" metalness={0.2} roughness={0.3} />
      </mesh>
      {/* Cup Handle */}
      <mesh position={[0.06, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.035, 0.012, 8, 16]} />
        <meshStandardMaterial color="#F3F4F6" metalness={0.2} roughness={0.3} />
      </mesh>
      {/* Cup Rim Top */}
      <mesh position={[0, 0.06, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.068, 0.008, 8, 16]} />
        <meshStandardMaterial color="#E5E7EB" metalness={0.2} roughness={0.3} />
      </mesh>
      {/* Steam lines */}
      <group position={[0, 0.08, 0]}>
        <mesh position={[-0.02, 0.02, 0]} rotation={[0, 0, 0.1]}>
          <boxGeometry args={[0.008, 0.04, 0.008]} />
          <meshBasicMaterial color="#7DD3FC" transparent opacity={0.6} />
        </mesh>
        <mesh position={[0.02, 0.03, 0]} rotation={[0, 0, -0.1]}>
          <boxGeometry args={[0.008, 0.04, 0.008]} />
          <meshBasicMaterial color="#7DD3FC" transparent opacity={0.6} />
        </mesh>
      </group>
    </group>
  );
}

function SpringBootLogo() {
  const leafShape = React.useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.09);
    shape.quadraticCurveTo(0.08, -0.04, 0.08, 0.03);
    shape.quadraticCurveTo(0.05, 0.10, 0, 0.12);
    shape.quadraticCurveTo(-0.05, 0.10, -0.08, 0.03);
    shape.quadraticCurveTo(-0.08, -0.04, 0, -0.09);
    return shape;
  }, []);

  return (
    <group>
      <mesh>
        <shapeGeometry args={[leafShape]} />
        <meshBasicMaterial color="#10B981" side={THREE.DoubleSide} />
      </mesh>
      {/* Leaf stem/vein */}
      <mesh position={[0, 0.01, 0.005]}>
        <boxGeometry args={[0.01, 0.14, 0.005]} />
        <meshBasicMaterial color="#34D399" />
      </mesh>
    </group>
  );
}

function MySqlLogo() {
  return (
    <group>
      {/* 3 Stacked Cylinders */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.036, 16]} />
        <meshStandardMaterial color="#00758F" metalness={0.6} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.036, 16]} />
        <meshStandardMaterial color="#00758F" metalness={0.6} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.036, 16]} />
        <meshStandardMaterial color="#00758F" metalness={0.6} roughness={0.2} />
      </mesh>
      {/* Database indicators */}
      <mesh position={[0, 0.05, 0.081]}>
        <boxGeometry args={[0.015, 0.015, 0.005]} />
        <meshBasicMaterial color="#FACC15" />
      </mesh>
      <mesh position={[0, 0, 0.081]}>
        <boxGeometry args={[0.015, 0.015, 0.005]} />
        <meshBasicMaterial color="#FACC15" />
      </mesh>
    </group>
  );
}

function HibernateLogo() {
  return (
    <group>
      {/* 3D H Shape */}
      <mesh position={[-0.045, 0, 0]}>
        <boxGeometry args={[0.024, 0.12, 0.024]} />
        <meshStandardMaterial color="#C2410C" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0.045, 0, 0]}>
        <boxGeometry args={[0.024, 0.12, 0.024]} />
        <meshStandardMaterial color="#C2410C" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.07, 0.024, 0.024]} />
        <meshStandardMaterial color="#C2410C" metalness={0.3} roughness={0.4} />
      </mesh>
    </group>
  );
}

function RestApiLogo() {
  return (
    <group>
      {/* Network hub node */}
      <mesh>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#06B6D4" />
      </mesh>
      {/* 2 Satellite nodes */}
      <mesh position={[-0.07, 0.05, 0]}>
        <sphereGeometry args={[0.022, 8, 8]} />
        <meshBasicMaterial color="#06B6D4" />
      </mesh>
      <mesh position={[0.07, -0.05, 0]}>
        <sphereGeometry args={[0.022, 8, 8]} />
        <meshBasicMaterial color="#06B6D4" />
      </mesh>
      {/* Connecting bars */}
      <mesh position={[-0.035, 0.025, 0]} rotation={[0, 0, -Math.PI / 5]}>
        <cylinderGeometry args={[0.005, 0.005, 0.08, 8]} />
        <meshBasicMaterial color="#0891B2" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0.035, -0.025, 0]} rotation={[0, 0, -Math.PI / 5]}>
        <cylinderGeometry args={[0.005, 0.005, 0.08, 8]} />
        <meshBasicMaterial color="#0891B2" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

// ─── Security Shield Geometry Helper ──────────────────────────────────────────
function getShieldShape() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.06);
  shape.quadraticCurveTo(0.05, 0.06, 0.06, 0.03);
  shape.quadraticCurveTo(0.06, -0.02, 0, -0.07);
  shape.quadraticCurveTo(-0.06, -0.02, -0.06, 0.03);
  shape.quadraticCurveTo(-0.05, 0.06, 0, 0.06);
  return shape;
}

function JwtLogo() {
  const shieldShape = React.useMemo(() => getShieldShape(), []);
  return (
    <group>
      {/* 3D Shield */}
      <mesh>
        <extrudeGeometry args={[shieldShape, { depth: 0.025, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.008, bevelThickness: 0.008 }]} />
        <meshStandardMaterial color="#C084FC" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Glowing core in center of shield */}
      <mesh position={[0, 0, 0.02]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color="#F472B6" />
      </mesh>
    </group>
  );
}

function ReactNativeLogo() {
  const ringRef1 = useRef();
  const ringRef2 = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ringRef1.current) ringRef1.current.rotation.x = t * 1.2;
    if (ringRef2.current) ringRef2.current.rotation.y = t * 0.8;
  });
  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color="#38BDF8" />
      </mesh>
      <mesh ref={ringRef1} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[0.1, 0.006, 8, 32]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.8} />
      </mesh>
      <mesh ref={ringRef2} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[0.1, 0.006, 8, 32]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

function ExpoLogo() {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <coneGeometry args={[0.07, 0.11, 3]} />
      <meshStandardMaterial color="#DDD6FE" metalness={0.3} roughness={0.4} />
    </mesh>
  );
}

// ─── Visual 3D Centerpiece Implementations by Division ──────────────────────

function BackendCore({ targetColor }) {
  const dbRef = useRef();
  const ringRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (dbRef.current) {
      dbRef.current.rotation.y = t * 0.35;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.55;
      ringRef.current.rotation.y = -t * 0.25;
    }
  });

  return (
    <group>
      {/* 3-Tier Server Database Tower */}
      <group ref={dbRef}>
        {/* Tier 1 */}
        <mesh position={[0, 0.16, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.09, 16]} />
          <meshStandardMaterial color="#0b1329" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.16, 0.221]}>
          <boxGeometry args={[0.045, 0.045, 0.01]} />
          <meshBasicMaterial color={targetColor} />
        </mesh>

        {/* Tier 2 */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.09, 16]} />
          <meshStandardMaterial color="#0b1329" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.221]}>
          <boxGeometry args={[0.045, 0.045, 0.01]} />
          <meshBasicMaterial color={targetColor} />
        </mesh>

        {/* Tier 3 */}
        <mesh position={[0, -0.16, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.09, 16]} />
          <meshStandardMaterial color="#0b1329" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.16, 0.221]}>
          <boxGeometry args={[0.045, 0.045, 0.01]} />
          <meshBasicMaterial color={targetColor} />
        </mesh>

        {/* Framing pillars */}
        <mesh position={[-0.23, 0, 0]}>
          <boxGeometry args={[0.02, 0.46, 0.04]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        <mesh position={[0.23, 0, 0]}>
          <boxGeometry args={[0.02, 0.46, 0.04]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
      </group>

      {/* Outer Data Orbit Ring */}
      <group ref={ringRef}>
        <mesh>
          <torusGeometry args={[0.48, 0.022, 8, 32]} />
          <meshBasicMaterial color={targetColor} transparent opacity={0.5} />
        </mesh>
        <mesh position={[0.48, 0, 0]}>
          <sphereGeometry args={[0.042, 8, 8]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[-0.48, 0, 0]}>
          <sphereGeometry args={[0.042, 8, 8]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>

      {/* Hex base plates */}
      <mesh position={[0, -0.36, 0]}>
        <cylinderGeometry args={[0.36, 0.36, 0.03, 6]} />
        <meshStandardMaterial color="#090D16" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.36, 0]}>
        <cylinderGeometry args={[0.36, 0.36, 0.03, 6]} />
        <meshStandardMaterial color="#090D16" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

function MobileCore({ targetColor }) {
  const phoneRef = useRef();
  const atomRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (phoneRef.current) {
      phoneRef.current.rotation.y = Math.sin(t * 0.6) * 0.35;
    }
    if (atomRef.current) {
      atomRef.current.rotation.y = t * 1.4;
    }
  });

  return (
    <group>
      {/* Floating high-tech smartphone screen frame */}
      <group ref={phoneRef}>
        {/* Phone Bezel */}
        <mesh>
          <boxGeometry args={[0.42, 0.74, 0.032]} />
          <meshStandardMaterial color="#090D16" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Glass Screen */}
        <mesh position={[0, 0, 0.017]}>
          <planeGeometry args={[0.38, 0.7]} />
          <meshPhysicalMaterial
            color="#091128"
            roughness={0.1}
            transmission={0.4}
            thickness={0.02}
            transparent
            opacity={0.86}
          />
        </mesh>

        {/* 3D Animated React Atom inside screen */}
        <group ref={atomRef} position={[0, 0, 0.06]}>
          <mesh>
            <sphereGeometry args={[0.03, 12, 12]} />
            <meshBasicMaterial color={targetColor} />
          </mesh>
          <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            <torusGeometry args={[0.09, 0.005, 6, 24]} />
            <meshBasicMaterial color={targetColor} transparent opacity={0.7} />
          </mesh>
          <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
            <torusGeometry args={[0.09, 0.005, 6, 24]} />
            <meshBasicMaterial color={targetColor} transparent opacity={0.7} />
          </mesh>
        </group>

        {/* Notch and bar */}
        <mesh position={[0, 0.33, 0.018]}>
          <boxGeometry args={[0.11, 0.022, 0.002]} />
          <meshBasicMaterial color="#020408" />
        </mesh>
        <mesh position={[0, -0.34, 0.018]}>
          <boxGeometry args={[0.09, 0.008, 0.002]} />
          <meshBasicMaterial color="#64748B" />
        </mesh>
      </group>
    </group>
  );
}

function HardwareCore({ targetColor }) {
  const boardRef = useRef();
  const gearRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (boardRef.current) {
      boardRef.current.rotation.x = Math.sin(t * 0.45) * 0.15;
      boardRef.current.rotation.y = t * 0.3;
    }
    if (gearRef.current) {
      gearRef.current.rotation.z = -t * 0.45;
    }
  });

  return (
    <group>
      {/* Cybernetic IoT Processor Board */}
      <group ref={boardRef}>
        {/* Board Plate */}
        <mesh>
          <boxGeometry args={[0.46, 0.32, 0.02]} />
          <meshStandardMaterial color="#045f47" roughness={0.8} />
        </mesh>
        {/* Silicon chip */}
        <mesh position={[0, 0, 0.015]}>
          <boxGeometry args={[0.13, 0.13, 0.02]} />
          <meshStandardMaterial color="#111827" metalness={0.2} roughness={0.5} />
        </mesh>
        {/* Metallic processor cap */}
        <mesh position={[0, 0, 0.026]}>
          <boxGeometry args={[0.09, 0.09, 0.004]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Glowing green circuit traces */}
        <mesh position={[0.09, 0.06, 0.012]}>
          <boxGeometry args={[0.01, 0.13, 0.004]} />
          <meshBasicMaterial color={targetColor} />
        </mesh>
        <mesh position={[-0.09, -0.06, 0.012]}>
          <boxGeometry args={[0.01, 0.13, 0.004]} />
          <meshBasicMaterial color={targetColor} />
        </mesh>
        {/* Solder Capacitors */}
        {[-0.15, -0.09, 0.09, 0.15].map((x, i) => (
          <mesh key={i} position={[x, 0.09, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.042, 8]} />
            <meshStandardMaterial color="#EF4444" metalness={0.5} roughness={0.3} />
          </mesh>
        ))}
      </group>

      {/* Background physical rotating brass gear */}
      <group ref={gearRef} position={[0, 0, -0.16]}>
        <mesh>
          <torusGeometry args={[0.44, 0.03, 8, 32]} />
          <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Gear teeth */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * Math.PI) / 6;
          const x = 0.44 * Math.cos(angle);
          const y = 0.44 * Math.sin(angle);
          return (
            <mesh key={i} position={[x, y, 0]} rotation={[0, 0, angle]}>
              <boxGeometry args={[0.06, 0.04, 0.04]} />
              <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

function ToolsCore({ targetColor }) {
  const gear1Ref = useRef();
  const gear2Ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (gear1Ref.current) {
      gear1Ref.current.rotation.z = t * 0.45;
    }
    if (gear2Ref.current) {
      gear2Ref.current.rotation.z = -t * 0.45;
    }
  });

  return (
    <group>
      {/* Primary Tool Gear */}
      <group ref={gear1Ref} position={[-0.14, 0.08, 0]}>
        <mesh>
          <cylinderGeometry args={[0.26, 0.26, 0.05, 12]} />
          <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.03, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.06, 12]} />
          <meshStandardMaterial color="#0F172A" metalness={0.2} roughness={0.8} />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.2, 0.2, 0.052, 12]} />
          <meshBasicMaterial color={targetColor} transparent opacity={0.4} />
        </mesh>
      </group>

      {/* Intermeshed Secondary Gear */}
      <group ref={gear2Ref} position={[0.22, -0.12, 0]}>
        <mesh>
          <cylinderGeometry args={[0.16, 0.16, 0.045, 8]} />
          <meshStandardMaterial color="#8ABED8" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.08, 0.08, 0.05, 8]} />
          <meshStandardMaterial color="#0F172A" />
        </mesh>
      </group>

      {/* HUD network grid backdrop */}
      <mesh position={[0, 0, -0.1]}>
        <ringGeometry args={[0.45, 0.46, 32]} />
        <meshBasicMaterial color={targetColor} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

// ─── Technology Logo Geometries ──────────────────────────────────────────────

function JavaScriptLogo() {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.11, 0.11, 0.015]} />
        <meshStandardMaterial color="#FBBF24" metalness={0.0} roughness={0.4} />
      </mesh>
      <Text position={[0.015, -0.018, 0.009]} fontSize={0.065} color="#000000" fontWeight="bold">
        JS
      </Text>
    </group>
  );
}

function MicrochipLogo() {
  return (
    <group>
      {/* Board */}
      <mesh>
        <boxGeometry args={[0.14, 0.1, 0.015]} />
        <meshStandardMaterial color="#065F46" roughness={0.8} />
      </mesh>
      {/* CPU Chip */}
      <mesh position={[0, 0, 0.009]}>
        <boxGeometry args={[0.06, 0.06, 0.01]} />
        <meshStandardMaterial color="#1F2937" metalness={0.1} roughness={0.5} />
      </mesh>
      {/* Golden Pins */}
      <mesh position={[-0.048, 0, 0.009]}>
        <boxGeometry args={[0.01, 0.08, 0.004]} />
        <meshStandardMaterial color="#D97706" metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[0.048, 0, 0.009]}>
        <boxGeometry args={[0.01, 0.08, 0.004]} />
        <meshStandardMaterial color="#D97706" metalness={0.9} roughness={0.15} />
      </mesh>
    </group>
  );
}

function SensorLogo() {
  return (
    <group>
      {/* Base */}
      <mesh position={[0, -0.03, 0]}>
        <boxGeometry args={[0.1, 0.03, 0.1]} />
        <meshStandardMaterial color="#64748B" roughness={0.5} />
      </mesh>
      {/* Sensor dome */}
      <mesh position={[0, 0.015, 0]}>
        <sphereGeometry args={[0.054, 16, 16]} />
        <meshStandardMaterial color="#E2E8F0" metalness={0.2} roughness={0.1} />
      </mesh>
    </group>
  );
}

function GitLogo() {
  return (
    <group>
      {/* 3 nodes in branch */}
      <mesh position={[0, -0.05, 0]}>
        <sphereGeometry args={[0.024, 8, 8]} />
        <meshBasicMaterial color="#EF5B3C" />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <sphereGeometry args={[0.024, 8, 8]} />
        <meshBasicMaterial color="#EF5B3C" />
      </mesh>
      <mesh position={[0.045, 0, 0]}>
        <sphereGeometry args={[0.024, 8, 8]} />
        <meshBasicMaterial color="#EF5B3C" />
      </mesh>
      {/* Branching lines */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.1, 8]} />
        <meshBasicMaterial color="#F97316" />
      </mesh>
      <mesh position={[0.0225, -0.025, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.005, 0.005, 0.07, 8]} />
        <meshBasicMaterial color="#F97316" />
      </mesh>
    </group>
  );
}

function GitHubLogo() {
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.075, 0.075, 0.015, 16]} />
        <meshStandardMaterial color="#1F2937" metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0.009]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
    </group>
  );
}

function IntelliJLogo() {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.1, 0.1, 0.015]} />
        <meshStandardMaterial color="#030712" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.009]}>
        <boxGeometry args={[0.088, 0.088, 0.003]} />
        <meshStandardMaterial color="#8B5CF6" metalness={0.8} roughness={0.2} />
      </mesh>
      <Text position={[0, 0, 0.012]} fontSize={0.052} color="#FFFFFF" fontWeight="bold">
        IJ
      </Text>
    </group>
  );
}

function VsCodeLogo() {
  return (
    <group>
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.09, 0.045, 0.015]} />
        <meshStandardMaterial color="#0284C7" metalness={0.6} roughness={0.2} />
      </mesh>
      <mesh rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.09, 0.045, 0.015]} />
        <meshStandardMaterial color="#0284C7" metalness={0.6} roughness={0.2} />
      </mesh>
    </group>
  );
}

function PostmanLogo() {
  return (
    <group>
      {/* Rocket Body */}
      <mesh position={[0, 0.015, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.09, 12]} />
        <meshStandardMaterial color="#FF6C37" metalness={0.4} roughness={0.3} />
      </mesh>
      {/* Nose Cone */}
      <mesh position={[0, 0.075, 0]}>
        <coneGeometry args={[0.03, 0.038, 12]} />
        <meshStandardMaterial color="#FF6C37" />
      </mesh>
      {/* Fins */}
      <mesh position={[-0.03, -0.02, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.01, 0.038, 0.03]} />
        <meshStandardMaterial color="#E2E8F0" />
      </mesh>
      <mesh position={[0.03, -0.02, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[0.01, 0.038, 0.03]} />
        <meshStandardMaterial color="#E2E8F0" />
      </mesh>
      {/* Engine flame */}
      <mesh position={[0, -0.04, 0]}>
        <coneGeometry args={[0.015, 0.02, 8]} />
        <meshBasicMaterial color="#FBBF24" />
      </mesh>
    </group>
  );
}

function MySqlWorkbenchLogo() {
  return (
    <group>
      <mesh position={[0, -0.02, 0]}>
        <boxGeometry args={[0.1, 0.015, 0.1]} />
        <meshStandardMaterial color="#64748B" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.05, 12]} />
        <meshStandardMaterial color="#00758F" metalness={0.5} roughness={0.2} />
      </mesh>
    </group>
  );
}

function TechLogo3D({ techName }) {
  const normalized = techName.toLowerCase();

  if (normalized.includes('java') && !normalized.includes('script') && !normalized.includes('spring')) {
    return <JavaLogo />;
  }
  if (normalized.includes('spring')) {
    return <SpringBootLogo />;
  }
  if (normalized.includes('mysql') && !normalized.includes('workbench')) {
    return <MySqlLogo />;
  }
  if (normalized.includes('hibernate')) {
    return <HibernateLogo />;
  }
  if (normalized.includes('rest')) {
    return <RestApiLogo />;
  }
  if (normalized.includes('jwt')) {
    return <JwtLogo />;
  }
  if (normalized.includes('react')) {
    return <ReactNativeLogo />;
  }
  if (normalized.includes('expo')) {
    return <ExpoLogo />;
  }
  if (normalized.includes('javascript') || normalized === 'js') {
    return <JavaScriptLogo />;
  }
  if (normalized.includes('esp32') || normalized.includes('arduino')) {
    return <MicrochipLogo />;
  }
  if (normalized.includes('dht11') || normalized.includes('pir') || normalized.includes('ldr') || normalized.includes('sensor')) {
    return <SensorLogo />;
  }
  if (normalized === 'git') {
    return <GitLogo />;
  }
  if (normalized.includes('github')) {
    return <GitHubLogo />;
  }
  if (normalized.includes('intellij')) {
    return <IntelliJLogo />;
  }
  if (normalized.includes('vs code') || normalized.includes('vscode')) {
    return <VsCodeLogo />;
  }
  if (normalized.includes('postman')) {
    return <PostmanLogo />;
  }
  if (normalized.includes('workbench')) {
    return <MySqlWorkbenchLogo />;
  }

  // Fallback
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color="#00E0A4" metalness={0.8} roughness={0.2} />
      </mesh>
      <Text position={[0, 0, 0.055]} fontSize={0.065} color="#FFFFFF" fontWeight="bold">
        {techName.charAt(0).toUpperCase()}
      </Text>
    </group>
  );
}

// ─── Central Tech Core Selector ──────────────────────────────────────────────
function TechCore({ activeFace }) {
  const coreRef = useRef();
  const targetColor = FACES[activeFace]?.accentColor || '#38BDF8';

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Gentle overall core float breathing
    if (coreRef.current) {
      coreRef.current.position.y = Math.sin(t * 1.3) * 0.08;
    }
  });

  // Render thematic centerpiece depending on active face division
  return (
    <group ref={coreRef}>
      {activeFace === 0 && <BackendCore targetColor={targetColor} />}
      {activeFace === 1 && <MobileCore targetColor={targetColor} />}
      {activeFace === 2 && <HardwareCore targetColor={targetColor} />}
      {activeFace === 3 && <ToolsCore targetColor={targetColor} />}
    </group>
  );
}

// ─── Orbiting Holographic Technology Node ────────────────────────────────────
function TechNode({ techName, index, total, isTargetActive, color }) {
  const ref = useRef();
  const currentPos = useRef(new THREE.Vector3(0, 0, 0));
  const currentScale = useRef(0);

  // Decreased orbit radius to 1.70 to guarantee nodes stay inside the visible frame area
  const radius = 1.70;
  const angle = (index * 2 * Math.PI) / total;

  // Orbit target position in space surrounding the core
  const targetPos = isTargetActive
    ? new THREE.Vector3(radius * Math.cos(angle), radius * Math.sin(angle), 0)
    : new THREE.Vector3(0, 0, 0);

  const targetScale = isTargetActive ? 1.0 : 0.0;

  useFrame(() => {
    if (!ref.current) return;

    // Smooth position lerping from/to center core
    currentPos.current.lerp(targetPos, 0.08);
    ref.current.position.copy(currentPos.current);

    // Smooth scale lerping
    currentScale.current += (targetScale - currentScale.current) * 0.1;
    ref.current.scale.setScalar(currentScale.current);

    // Optimize rendering by toggling visibility based on scale
    const isVisible = currentScale.current > 0.01;
    if (ref.current.visible !== isVisible) {
      ref.current.visible = isVisible;
    }
  });

  return (
    <group ref={ref}>
      {/* Slightly smaller glass HUD panel plate to prevent overlapping */}
      <mesh>
        <planeGeometry args={[0.48, 0.48]} />
        <meshPhysicalMaterial
          color="#060c18"
          roughness={0.7}
          metalness={0.1}
          transmission={0.4}
          thickness={0.03}
          transparent
          opacity={0.88}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Premium thin glowing border outline */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(0.48, 0.48)]} />
        <lineBasicMaterial color={color} transparent opacity={0.45} />
      </lineSegments>

      {/* 3D Logo Component - scaled down slightly to fit new panel size */}
      <group position={[0, 0.04, 0.03]} scale={0.88}>
        <TechLogo3D techName={techName} />
      </group>

      {/* Highly legible, slightly tighter Text Label */}
      <Text
        position={[0, -0.34, 0.03]}
        fontSize={0.072}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        fontWeight={700}
        outlineWidth={0.005}
        outlineColor="#000308"
      >
        {techName}
      </Text>
    </group>
  );
}

// ─── Scene Container & Inertial Drag ──────────────────────────────────────────
function ArtifactScene({ activeFace, mouseRef }) {
  const group = useRef();
  const isDragging = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });
  const manualOffset = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  const accent = FACES[activeFace]?.accentColor || '#38BDF8';
  const pulseRef = useRef();

  useFrame(({ clock }) => {
    if (!group.current) return;

    // Apply drag inertial physics
    if (!isDragging.current) {
      velocity.current.x *= 0.91;
      velocity.current.y *= 0.91;
      manualOffset.current.x += velocity.current.x;
      manualOffset.current.y += velocity.current.y;

      // Gently lerp back to 0 when idle so text aligns front-facing for readability
      manualOffset.current.x *= 0.95;
      manualOffset.current.y *= 0.95;
    }

    // Subtle mouse parallax
    const mx = mouseRef.current.x * 0.12;
    const my = mouseRef.current.y * 0.12;

    const finalX = manualOffset.current.x - my;
    const finalY = manualOffset.current.y + mx;

    // Apply rotation
    group.current.rotation.x += (finalX - group.current.rotation.x) * 0.07;
    group.current.rotation.y += (finalY - group.current.rotation.y) * 0.07;
    group.current.rotation.z += (0 - group.current.rotation.z) * 0.07;

    // Breath glow on the point light
    if (pulseRef.current) {
      pulseRef.current.intensity = 0.25 + Math.sin(clock.getElapsedTime() * 0.4) * 0.06;
    }
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
      velocity.current.x = dy * 0.006;
      velocity.current.y = dx * 0.006;
      manualOffset.current.x += dy * 0.006;
      manualOffset.current.y += dx * 0.006;
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
    <>
      {/* Camera moved back to position Z = 6.4 to provide a wide, safe viewport */}
      <PerspectiveCamera makeDefault position={[0, 0, 6.4]} fov={40} />

      {/* Clean high-contrast ambient lighting */}
      <ambientLight intensity={0.8} color="#1c2538" />
      <directionalLight position={[3, 4, 5]} intensity={0.55} color="#eaf2fa" />
      <directionalLight position={[-3, -2, -3]} intensity={0.1} color="#08101c" />

      {/* Subtle colored point light wash */}
      <pointLight ref={pulseRef} position={[0, 0, 2.6]} intensity={0.3} color={accent} distance={6} decay={2} />

      {/* Unobtrusive sparkles for deep space feel */}
      <Sparkles count={20} scale={8} size={0.35} speed={0.06} color="#38BDF8" opacity={0.06} />
      <Sparkles count={10} scale={6} size={0.25} speed={0.04} color="#00E0A4" opacity={0.03} />

      {/* Rotating scene group */}
      <group ref={group} onPointerDown={handlePointerDown}>
        {/* Thematic centerpiece matching current active division */}
        <TechCore activeFace={activeFace} />

        {/* Orbiting Technology Nodes from all categories, lerping to their active state */}
        {FACES.map((face, faceIdx) => {
          const isCategoryActive = activeFace === faceIdx;
          return face.techs.map((tech, techIdx) => (
            <TechNode
              key={face.id + '-' + tech}
              techName={tech}
              index={techIdx}
              total={face.techs.length}
              isTargetActive={isCategoryActive}
              color={face.accentColor}
            />
          ));
        })}
      </group>

      {/* Subtle bloom postprocessing */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.95} intensity={0.12} />
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
          DRAG CORE TO ROTATE // SELECT A TAB TO EXPLORE NODE
        </p>
      </div>

      {/* Main Layout */}
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
              <ArtifactScene activeFace={activeFace} mouseRef={mouseRef} />
            </Suspense>
          </Canvas>
        </div>

        {/* Detail Panel */}
        <div className="sk-panel">
          <DetailPanel face={FACES[activeFace]} />
        </div>
      </div>

      {/* Tabs */}
      <div style={{ marginTop: '44px' }}>
        <FaceTabs activeFace={activeFace} setActiveFace={setActiveFace} />
      </div>
      <p style={{ textAlign: 'center', marginTop: '18px', fontFamily: 'monospace', fontSize: '10px', color: 'rgba(100,116,139,0.5)', letterSpacing: '0.12em' }}>
        CLICK + DRAG TO INSPECT ARTIFACT // CLICK TABS TO SWAP TECHNOLOGY NODES
      </p>
    </section>
  );
}
