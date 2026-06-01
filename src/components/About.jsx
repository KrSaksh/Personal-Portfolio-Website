import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const facts = [
  { icon: '🎓', label: 'Education', value: 'IIIT Delhi' },
  { icon: '💻', label: 'Focus', value: 'Backend Development' },
  { icon: '🎮', label: 'Passion', value: 'Dance, Chess, Badminton' },
  { icon: '🌍', label: 'Location', value: 'New Delhi, India' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '6rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '-20%',
        width: '60vw',
        height: '60vw',
        background: 'radial-gradient(circle, rgba(123,47,255,0.06) 0%, transparent 70%)',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '3rem',
          }}
        >
          <span style={{
            fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
            fontSize: '0.75rem',
            color: '#7b2fff',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}>
            01 / About
          </span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(123,47,255,0.5), transparent)' }} />
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'center',
        }}>
          {/* Text */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: 700,
                marginBottom: '1.5rem',
                lineHeight: 1.2,
              }}
            >
              Building things that{' '}
              <span style={{
                background: 'linear-gradient(135deg, #00d4ff, #7b2fff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                matter
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                color: '#8892b0',
                lineHeight: 1.8,
                fontSize: '1rem',
                marginBottom: '1.2rem',
              }}
            >
              I'm a developer at IIIT Delhi with a deep passion for building systems from the ground up — whether that's a memory manager in C, a full NES emulator, or a web app that helps elderly users navigate daily life.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{
                color: '#8892b0',
                lineHeight: 1.8,
                fontSize: '1rem',
                marginBottom: '1.2rem',
              }}
            >
              I thrive at the intersection of low-level systems programming and high-level product thinking. From CPU emulation to Android apps, I enjoy the full spectrum of software development.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              style={{
                color: '#8892b0',
                lineHeight: 1.8,
                fontSize: '1rem',
              }}
            >
              When I'm not coding, I'm exploring game architecture, contributing to team projects, and pushing the boundaries of what software can do.
            </motion.p>
          </div>

          {/* Facts grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
          }}>
            {facts.map((fact, i) => (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(0,212,255,0.1)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  transition: 'border-color 0.3s ease, background 0.3s ease',
                }}
                whileHover={{
                  borderColor: 'rgba(0,212,255,0.3)',
                  background: 'rgba(0,212,255,0.05)',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{fact.icon}</div>
                <div style={{ color: '#8892b0', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>
                  {fact.label}
                </div>
                <div style={{ color: '#e8eaf6', fontWeight: 600, fontSize: '0.95rem' }}>
                  {fact.value}
                </div>
              </motion.div>
            ))}

            {/* Resume button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              style={{ gridColumn: '1 / -1' }}
            >
              <motion.a
                href="mailto:amostsaksham@gmail.com"
                whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0,212,255,0.2)' }}
                whileTap={{ scale: 0.98 }}
                data-hover
                style={{
                  display: 'block',
                  background: 'rgba(0,212,255,0.06)',
                  border: '1px solid rgba(0,212,255,0.25)',
                  borderRadius: '12px',
                  padding: '1rem',
                  textAlign: 'center',
                  color: '#00d4ff',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                  letterSpacing: '0.03em',
                }}
              >
                📬 amostsaksham@gmail.com
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
