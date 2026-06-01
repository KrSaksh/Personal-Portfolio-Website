import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sparkles, useTexture } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import Planet from './Planet';
import { projects } from '../data/projects';

function Sun() {
  const sunRef    = useRef();
  const glowRef   = useRef();
  const coronaRef = useRef();
  const texture   = useTexture('/textures/sun.jpg');

  useFrame((state) => {
    if (sunRef.current)    sunRef.current.rotation.y    += 0.0015;
    if (glowRef.current)   glowRef.current.material.opacity   = 0.22 + Math.sin(state.clock.elapsedTime * 1.1) * 0.07;
    if (coronaRef.current) coronaRef.current.material.opacity = 0.07 + Math.sin(state.clock.elapsedTime * 0.6) * 0.03;
  });

  return (
    <group>
      <mesh ref={coronaRef}>
        <sphereGeometry args={[2.2, 16, 16]} />
        <meshBasicMaterial color="#ff6600" transparent opacity={0.07} side={THREE.BackSide} />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshBasicMaterial color="#ffaa00" transparent opacity={0.22} side={THREE.BackSide} />
      </mesh>
      <mesh ref={sunRef}>
        <sphereGeometry args={[1.0, 64, 64]} />
        <meshStandardMaterial map={texture} emissive="#ff8800" emissiveIntensity={1.0} roughness={0.5} />
      </mesh>
      <pointLight color="#fff5cc" intensity={5}   distance={80} decay={1.3} />
      <pointLight color="#ff8800" intensity={2}   distance={30}  decay={2}   />
    </group>
  );
}

function SunFallback() {
  const ref = useRef();
  useFrame(() => { if (ref.current) ref.current.rotation.y += 0.002; });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.0, 32, 32]} />
      <meshBasicMaterial color="#ffaa00" />
      <pointLight color="#fff5cc" intensity={5} distance={80} decay={1.3} />
    </mesh>
  );
}

// ── Smooth camera fly-to ──────────────────────────────────────────────────────
function CameraController({ target, onDone }) {
  const { camera } = useThree();
  const progress = useRef(0);
  const startPos = useRef(camera.position.clone());
  const active   = useRef(false);

  useFrame((_, delta) => {
    if (!target) return;
    if (!active.current) {
      active.current = true;
      startPos.current = camera.position.clone();
      progress.current = 0;
    }
    progress.current = Math.min(progress.current + delta * 0.7, 1);
    const t = 1 - Math.pow(1 - progress.current, 3);
    camera.position.lerpVectors(startPos.current, target, t);
    camera.lookAt(0, 0, 0);
    if (progress.current >= 1) {
      active.current = false;
      onDone?.();
    }
  });
  return null;
}

// ── Project info card ─────────────────────────────────────────────────────────
const FONT = 'Arial, "Helvetica Neue", Helvetica, sans-serif';

function ProjectCard({ project, onClose }) {
  if (!project) return null;
  return (
    <motion.div
      initial={{ opacity: 0, x: 60, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed', top: '50%', right: '2rem',
        transform: 'translateY(-50%)',
        width: 'min(380px, 90vw)',
        background: 'rgba(2,4,8,0.93)',
        backdropFilter: 'blur(24px)',
        border: `1px solid ${project.color}44`,
        borderRadius: '20px',
        padding: '2rem',
        zIndex: 100,
        boxShadow: `0 0 40px ${project.color}22, 0 20px 60px rgba(0,0,0,0.7)`,
        fontFamily: FONT,
        overflowY: 'auto',
        maxHeight: '90vh',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
        <div>
          <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>{project.icon}</div>
          <h2 style={{ fontFamily: FONT, fontSize: '1.3rem', color: project.color, fontWeight: 700, marginBottom: '0.2rem' }}>
            {project.name}
          </h2>
          <p style={{ color: '#8892b0', fontSize: '0.85rem' }}>{project.subtitle}</p>
        </div>
        <button onClick={onClose} style={{
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px', color: '#8892b0', width: '32px', height: '32px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1rem', cursor: 'none', flexShrink: 0,
        }}>✕</button>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <span style={{ background: `${project.color}18`, border: `1px solid ${project.color}44`, borderRadius: '6px', padding: '3px 10px', fontSize: '0.75rem', color: project.color }}>
          {project.period}
        </span>
        {project.guide && (
          <span style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '3px 10px', fontSize: '0.75rem', color: '#8892b0' }}>
            {project.guide}
          </span>
        )}
        {project.teamSize && (
          <span style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '3px 10px', fontSize: '0.75rem', color: '#8892b0' }}>
            Team of {project.teamSize}
          </span>
        )}
      </div>

      <div style={{ fontSize: '0.7rem', color: project.color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.8rem', opacity: 0.8 }}>
        {project.category}
      </div>

      <p style={{ color: '#c8cfe8', fontSize: '0.88rem', lineHeight: 1.75, marginBottom: '1.2rem' }}>
        {project.description}
      </p>

      <p style={{ color: '#8892b0', fontSize: '0.72rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        Tech Stack
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {project.tech.map(t => (
          <span key={t} style={{ background: `${project.color}14`, border: `1px solid ${project.color}33`, borderRadius: '6px', padding: '4px 10px', fontSize: '0.78rem', color: project.color, fontWeight: 500 }}>
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function SolarSystem() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [cameraTarget,    setCameraTarget]    = useState(null);

  const handlePlanetClick = (project) => {
    if (selectedProject?.id === project.id) {
      setSelectedProject(null);
      setCameraTarget(new THREE.Vector3(0, 22, 28));
    } else {
      setSelectedProject(project);
      const angle = project.initialAngle + Math.PI * 0.3;
      const dist  = project.orbitRadius * 0.7 + 5;
      setCameraTarget(new THREE.Vector3(
        Math.cos(angle) * dist,
        dist * 0.4,
        Math.sin(angle) * dist,
      ));
    }
  };

  const handleClose = () => {
    setSelectedProject(null);
    setCameraTarget(new THREE.Vector3(0, 22, 28));
  };

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Canvas
        camera={{ position: [0, 22, 28], fov: 52 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.9} />
        <Sparkles count={50} scale={60} size={1.0} speed={0.15} color="#aaccff" opacity={0.2} />

        <Suspense fallback={<SunFallback />}>
          <Sun />
        </Suspense>

        {projects.map(project => (
          <Planet
            key={project.id}
            project={project}
            onClick={handlePlanetClick}
            isSelected={selectedProject?.id === project.id}
          />
        ))}

        {cameraTarget && (
          <CameraController target={cameraTarget} onDone={() => setCameraTarget(null)} />
        )}

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={!selectedProject}
          autoRotateSpeed={0.2}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>

      {!selectedProject && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          style={{
            position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
            color: '#8892b0', fontSize: '0.8rem', fontFamily: FONT,
            textAlign: 'center', pointerEvents: 'none', letterSpacing: '0.04em',
          }}
        >
          Click any planet to explore a project · Drag to orbit
        </motion.div>
      )}

      <AnimatePresence>
        {selectedProject && <ProjectCard project={selectedProject} onClose={handleClose} />}
      </AnimatePresence>
    </div>
  );
}
