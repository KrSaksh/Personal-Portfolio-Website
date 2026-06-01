import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SolarSystem from './SolarSystem';

const FONT = 'Arial, "Helvetica Neue", Helvetica, sans-serif';
const HEADER_H = 160; // px — height of the text strip above the canvas

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="projects"
      ref={ref}
      style={{
        /* Two viewport heights: one for the header, one full for the canvas */
        height: `calc(100vh + ${HEADER_H}px)`,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        background: 'transparent',
      }}
    >
      {/* ── Header strip ─────────────────────────────────────────── */}
      <div style={{
        height: HEADER_H,
        flexShrink: 0,
        padding: '2.5rem 2.5rem 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.7rem' }}
        >
          <span style={{
            fontFamily: FONT,
            fontSize: '0.72rem',
            fontWeight: 700,
            color: '#ff6b35',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}>
            03 / Projects
          </span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(255,107,53,0.4), transparent)' }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: FONT,
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.01em',
            marginBottom: '0.3rem',
          }}
        >
          Project Solar System
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ fontFamily: FONT, color: '#8892b0', fontSize: '0.85rem' }}
        >
          Each planet is a project — click to explore, drag to orbit, scroll to zoom.
        </motion.p>
      </div>

      {/* ── Canvas — fills the remaining 100vh exactly ────────────── */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <SolarSystem />
      </div>
    </section>
  );
}
