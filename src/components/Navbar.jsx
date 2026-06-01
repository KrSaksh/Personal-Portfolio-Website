import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FONT = 'Arial, "Helvetica Neue", Helvetica, sans-serif';

const navItems = [
  { label: 'Home',     href: '#hero' },
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 500,
        padding: '0.9rem 2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(2,4,8,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.3s ease',
        fontFamily: FONT,
      }}
    >
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => scrollTo('#hero')}
        data-hover
        style={{ cursor: 'none', display: 'flex', alignItems: 'center' }}
      >
        <img
          src="/dino_pixel.png"
          alt="Logo"
          style={{
            height: '38px',
            width: 'auto',
            imageRendering: 'pixelated', /* keeps pixel art crisp */
            display: 'block',
          }}
        />
      </motion.div>

      {/* Nav links */}
      <div style={{ display: 'flex', gap: '0.2rem', alignItems: 'center' }}>
        {navItems.map((item) => {
          const isActive = active === item.href.replace('#', '');
          return (
            <motion.button
              key={item.label}
              onClick={() => scrollTo(item.href)}
              whileHover={{ color: '#ffffff' }}
              whileTap={{ scale: 0.96 }}
              data-hover
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: isActive ? '1px solid #00d4ff' : '1px solid transparent',
                color: isActive ? '#ffffff' : '#8892b0',
                padding: '0.4rem 0.8rem',
                fontSize: '0.82rem',
                fontFamily: FONT,
                fontWeight: isActive ? 700 : 400,
                cursor: 'none',
                letterSpacing: '0.04em',
                transition: 'all 0.2s ease',
                borderRadius: 0,
              }}
            >
              {item.label}
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
}
