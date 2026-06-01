import { useRef, useState, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';

// ── Local texture paths (served from /public/textures/) ───────────────────────
const TEXTURE_URLS = {
  mercury:     '/textures/mercury.jpg',
  venus:       '/textures/venus.jpg',
  earth:       '/textures/earth.jpg',
  mars:        '/textures/mars.jpg',
  jupiter:     '/textures/jupiter.jpg',
  saturn:      '/textures/saturn.jpg',
  uranus:      '/textures/uranus.jpg',
  saturn_ring: '/textures/saturn_ring.jpg',
};

// ── Per-planet real properties ────────────────────────────────────────────────
const PLANET_META = [
  { key: 'mercury', name: 'Mercury', tilt: 0.034, atmo: null,       rings: null },
  { key: 'venus',   name: 'Venus',   tilt: 3.096, atmo: '#e8c060',  rings: null },
  { key: 'earth',   name: 'Earth',   tilt: 0.409, atmo: '#4488ff',  rings: null },
  { key: 'mars',    name: 'Mars',    tilt: 0.440, atmo: '#ff6633',  rings: null },
  { key: 'jupiter', name: 'Jupiter', tilt: 0.054, atmo: '#c8a060',  rings: null },
  {
    key: 'saturn', name: 'Saturn', tilt: 0.467, atmo: '#e8d090',
    rings: { innerMult: 1.35, outerMult: 2.4, opacity: 0.75 },
  },
  {
    key: 'uranus', name: 'Uranus', tilt: 1.706, atmo: '#80d8e8',
    rings: { innerMult: 1.2, outerMult: 1.65, opacity: 0.28 },
  },
];

// ── Orbit ring ────────────────────────────────────────────────────────────────
function OrbitRing({ radius }) {
  const points = [];
  for (let i = 0; i <= 256; i++) {
    const a = (i / 256) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
  }
  const geo = new THREE.BufferGeometry().setFromPoints(points);
  return (
    <line geometry={geo}>
      <lineBasicMaterial color="#aaccff" transparent opacity={0.07} />
    </line>
  );
}

// ── Ring disk (Saturn / Uranus) ───────────────────────────────────────────────
function RingDisk({ innerR, outerR, opacity, ringTexture }) {
  const geo = new THREE.RingGeometry(innerR, outerR, 128);
  // Remap UVs so texture maps radially outward
  const pos = geo.attributes.position;
  const uv  = geo.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), z = pos.getZ(i);
    const r = Math.sqrt(x * x + z * z);
    uv.setXY(i, (r - innerR) / (outerR - innerR), 0.5);
  }
  uv.needsUpdate = true;
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} geometry={geo}>
      <meshBasicMaterial
        map={ringTexture}
        side={THREE.DoubleSide}
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </mesh>
  );
}

// ── Planet mesh — loads textures, animates ────────────────────────────────────
function PlanetMesh({ project, meta, onClick, isSelected }) {
  const groupRef = useRef();
  const meshRef  = useRef();
  const [hovered, setHovered] = useState(false);
  const angleRef = useRef(project.initialAngle);

  const surfaceTex = useTexture(TEXTURE_URLS[meta.key]);
  const ringTex    = useTexture(meta.rings ? TEXTURE_URLS.saturn_ring : TEXTURE_URLS[meta.key]);

  const r = project.planetSize;

  useFrame((_, delta) => {
    angleRef.current += delta * project.orbitSpeed * 0.3;
    const x = Math.cos(angleRef.current) * project.orbitRadius;
    const z = Math.sin(angleRef.current) * project.orbitRadius;
    if (groupRef.current) groupRef.current.position.set(x, 0, z);
    if (meshRef.current)  meshRef.current.rotation.y += delta * 0.35;
  });

  const scale = isSelected ? 1.6 : hovered ? 1.25 : 1;

  return (
    <group ref={groupRef}>
      {/* Axial-tilt group */}
      <group rotation={[0, 0, meta.tilt]}>
        {/* Planet sphere */}
        <mesh
          ref={meshRef}
          scale={[scale, scale, scale]}
          onClick={e => { e.stopPropagation(); onClick(project); }}
          onPointerOver={e => { e.stopPropagation(); setHovered(true); }}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[r, 64, 64]} />
          <meshStandardMaterial
            map={surfaceTex}
            roughness={0.8}
            metalness={0.0}
            emissive={new THREE.Color(project.emissive)}
            emissiveIntensity={hovered ? 0.18 : 0.05}
          />
        </mesh>

        {/* Rings */}
        {meta.rings && (
          <RingDisk
            innerR={r * meta.rings.innerMult}
            outerR={r * meta.rings.outerMult}
            opacity={meta.rings.opacity}
            ringTexture={ringTex}
          />
        )}
      </group>

      {/* Hover / selected label */}
      {(hovered || isSelected) && (
        <Html
          center
          position={[0, r * (meta.rings ? 2.9 : 2.1) + 0.4, 0]}
          style={{ pointerEvents: 'none' }}
        >
          <div style={{
            background: 'rgba(2,4,8,0.9)',
            border: `1px solid ${project.color}`,
            borderRadius: '8px',
            padding: '5px 12px',
            color: project.color,
            fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
            fontSize: '11px',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            boxShadow: `0 0 16px ${project.color}66`,
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
          }}>
            {meta.name} · {project.name}
          </div>
        </Html>
      )}
    </group>
  );
}

// ── Fallback shown while textures load ────────────────────────────────────────
function PlanetFallback({ project }) {
  const angleRef = useRef(project.initialAngle);
  const groupRef = useRef();
  useFrame((_, delta) => {
    angleRef.current += delta * project.orbitSpeed * 0.3;
    if (groupRef.current) {
      groupRef.current.position.set(
        Math.cos(angleRef.current) * project.orbitRadius,
        0,
        Math.sin(angleRef.current) * project.orbitRadius,
      );
    }
  });
  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[project.planetSize, 16, 16]} />
        <meshBasicMaterial color={project.color} wireframe opacity={0.3} transparent />
      </mesh>
    </group>
  );
}

// ── Public export ─────────────────────────────────────────────────────────────
export default function Planet({ project, onClick, isSelected }) {
  const meta = PLANET_META[project.id % PLANET_META.length];
  return (
    <>
      <OrbitRing radius={project.orbitRadius} />
      <Suspense fallback={<PlanetFallback project={project} />}>
        <PlanetMesh
          project={project}
          meta={meta}
          onClick={onClick}
          isSelected={isSelected}
        />
      </Suspense>
    </>
  );
}
