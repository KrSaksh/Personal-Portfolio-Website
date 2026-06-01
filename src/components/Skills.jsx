import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '../data/projects';

const categories = ['All', 'Languages', 'Database', 'Web', 'Mobile', 'Systems', 'Game Dev', 'Tools', 'Design'];

const categoryColors = {
  Languages: '#00d4ff',
  Database: '#7b2fff',
  Web: '#ff6b35',
  Mobile: '#ff4da6',
  Systems: '#00ff88',
  'Game Dev': '#ffd700',
  Tools: '#8892b0',
  Design: '#ff8c00',
};

function SkillBar({ skill, inView, delay }) {
  const color = categoryColors[skill.category] || '#00d4ff';
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      style={{ marginBottom: '1.2rem' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
        <span style={{ color: '#e8eaf6', fontSize: '0.9rem', fontWeight: 500 }}>{skill.name}</span>
        <span style={{ color: color, fontSize: '0.8rem', fontWeight: 600 }}>{skill.level}%</span>
      </div>
      <div style={{
        height: '4px',
        background: 'rgba(255,255,255,0.06)',
        borderRadius: '2px',
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: '100%',
            background: `linear-gradient(to right, ${color}88, ${color})`,
            borderRadius: '2px',
            boxShadow: `0 0 8px ${color}66`,
          }}
        />
      </div>
    </motion.div>
  );
}

function SkillOrb({ skill, index, inView }) {
  const [hovered, setHovered] = useState(false);
  const color = categoryColors[skill.category] || '#00d4ff';
  const size = 60 + (skill.level / 100) * 30;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.15, zIndex: 10 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      data-hover
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: hovered ? `${color}22` : `${color}0e`,
        border: `1.5px solid ${hovered ? color : color + '44'}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'none',
        position: 'relative',
        boxShadow: hovered ? `0 0 20px ${color}44` : 'none',
        transition: 'all 0.3s ease',
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: '0.7rem', fontWeight: 600, color: hovered ? color : '#e8eaf6', textAlign: 'center', padding: '0 4px', lineHeight: 1.2 }}>
        {skill.name}
      </span>
      {hovered && (
        <motion.span
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '0.65rem', color, marginTop: '2px' }}
        >
          {skill.level}%
        </motion.span>
      )}
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('All');
  const [view, setView] = useState('bars'); // 'bars' | 'orbs'

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        minHeight: '100vh',
        padding: '6rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background */}
      <div style={{
        position: 'absolute',
        top: '30%',
        right: '-10%',
        width: '50vw',
        height: '50vw',
        background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}
        >
          <span style={{
            fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
            fontSize: '0.75rem',
            color: '#00d4ff',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}>
            02 / Skills
          </span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(0,212,255,0.5), transparent)' }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: 700,
            marginBottom: '2.5rem',
          }}
        >
          Tech{' '}
          <span style={{
            background: 'linear-gradient(135deg, #00d4ff, #7b2fff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Arsenal
          </span>
        </motion.h2>

        {/* Controls */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Category filter */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', flex: 1 }}>
            {categories.map(cat => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-hover
                style={{
                  background: activeCategory === cat ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${activeCategory === cat ? 'rgba(0,212,255,0.4)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '8px',
                  color: activeCategory === cat ? '#00d4ff' : '#8892b0',
                  padding: '0.35rem 0.8rem',
                  fontSize: '0.78rem',
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                  cursor: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* View toggle */}
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {['bars', 'orbs'].map(v => (
              <motion.button
                key={v}
                onClick={() => setView(v)}
                whileHover={{ scale: 1.05 }}
                data-hover
                style={{
                  background: view === v ? 'rgba(123,47,255,0.2)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${view === v ? 'rgba(123,47,255,0.5)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '8px',
                  color: view === v ? '#7b2fff' : '#8892b0',
                  padding: '0.35rem 0.8rem',
                  fontSize: '0.78rem',
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                  cursor: 'none',
                }}
              >
                {v === 'bars' ? '▬ Bars' : '● Orbs'}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Skills display */}
        {view === 'bars' ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '0 3rem',
          }}>
            {filtered.map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} inView={inView} delay={i * 0.06} />
            ))}
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 0',
          }}>
            {filtered.map((skill, i) => (
              <SkillOrb key={skill.name} skill={skill} index={i} inView={inView} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
