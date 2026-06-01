import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FONT = 'Arial, "Helvetica Neue", Helvetica, sans-serif';

// ── Multilingual greeting rotator ────────────────────────────────────────────
const greetings = [
  { text: 'Hello',       lang: 'English'    },
  { text: 'नमस्ते',      lang: 'Hindi'      },
  { text: 'Hola',        lang: 'Spanish'    },
  { text: 'Bonjour',     lang: 'French'     },
  { text: 'こんにちは',   lang: 'Japanese'   },
  { text: 'Ciao',        lang: 'Italian'    },
  { text: 'Hallo',       lang: 'German'     },
  { text: '안녕하세요',   lang: 'Korean'     },
  { text: 'Olá',         lang: 'Portuguese' },
  { text: 'مرحبا',       lang: 'Arabic'     },
  { text: 'Привет',      lang: 'Russian'    },
  { text: 'Ni hao',      lang: 'Chinese'    },
];

function GreetingRotator() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % greetings.length);
        setVisible(true);
      }, 300);
    }, 1800);
    return () => clearInterval(cycle);
  }, []);

  const g = greetings[idx];
  return (
    <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <span style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-8px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        display: 'block',
      }}>
        {g.text}
      </span>
    </span>
  );
}
const roles = [
  "I once emulated a Nintendo. no big deal",
  "I resolve merge conflicts for a living",
  "I make the CPU cry in C++",
  "I ship bugs with great confidence",
  "I will fix it tomorrow (I won't)",
  "I turn coffee into segfaults",
  "I blame the compiler first, always",
  "I write code, rewrite it, then cry",
  "I have 47 browser tabs open right now",
];

function TypeWriter({ words }) {
  const [index, setIndex]         = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase]         = useState('typing');

  useEffect(() => {
    const word = words[index];
    if (phase === 'typing') {
      if (displayed.length < word.length) {
        const t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 72);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase('deleting'), 1600);
        return () => clearTimeout(t);
      }
    }
    if (phase === 'deleting') {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(d => d.slice(0, -1)), 28);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          setIndex(i => (i + 1) % words.length);
          setPhase('typing');
        }, 0);
        return () => clearTimeout(t);
      }
    }
  }, [displayed, phase, index, words]);

  return (
    <span>
      {displayed}
      <span style={{
        display: 'inline-block',
        width: '2px',
        height: '0.9em',
        background: '#00d4ff',
        marginLeft: '3px',
        verticalAlign: 'text-bottom',
        animation: 'blink 1s step-end infinite',
      }} />
    </span>
  );
}

// ── Live Codeforces counter ───────────────────────────────────────────────────
function LiveCounter() {
  const [wrong, setWrong]   = useState(null);
  const [error, setError]   = useState(false);

  useEffect(() => {
    // Codeforces public API — no auth needed
    fetch('https://codeforces.com/api/user.status?handle=CodeSaksham&count=1000')
      .then(r => r.json())
      .then(data => {
        if (data.status !== 'OK') throw new Error();
        const subs = data.result;
        const w = subs.filter(s => s.verdict !== 'OK').length;
        setWrong(w);
      })
      .catch(() => setError(true));
  }, []);

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'transparent',
      border: '1px solid rgba(255,107,53,0.25)',
      borderRadius: '6px',
      padding: '0.4rem 0.85rem',
      fontFamily: FONT,
      fontSize: '0.8rem',
      color: '#8892b0',
    }}>
      <span style={{
        width: '7px', height: '7px', borderRadius: '50%',
        background: error ? '#444' : '#ff6b35',
        display: 'inline-block',
        animation: error ? 'none' : 'pulse 1.4s ease-in-out infinite',
        flexShrink: 0,
      }} />
      {error ? (
        <span style={{ opacity: 0.5 }}>codeforces is hiding the evidence</span>
      ) : wrong === null ? (
        <span style={{ opacity: 0.4 }}>counting the damage…</span>
      ) : (
        <>
          <span>codeforces has witnessed</span>
          &nbsp;
          <motion.span
            key={wrong}
            initial={{ y: -6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.25 }}
            style={{ fontWeight: 700, color: '#ff6b35', fontVariantNumeric: 'tabular-nums' }}
          >
            {wrong}
          </motion.span>
          &nbsp;
          <span>of my crimes</span>
        </>
      )}
    </div>
  );
}

// ── Social links data ─────────────────────────────────────────────────────────
const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/KrSaksh',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/almostsaksham/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/krsakshamm',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    label: 'Behance',
    href: 'https://www.behance.net/kumarsaksham2002',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029H23.7zM15.971 13h4.06c-.056-1.34-.73-2.034-1.912-2.034-1.23 0-1.989.714-2.148 2.034zM8.309 9.004c.916 0 1.677.152 2.286.455.609.304 1.068.749 1.378 1.337.31.588.465 1.297.465 2.127 0 .83-.155 1.539-.465 2.127-.31.588-.769 1.033-1.378 1.337-.609.304-1.37.455-2.286.455H3V9.004h5.309zm-.309 6.5c.609 0 1.068-.152 1.378-.455.31-.304.465-.749.465-1.337 0-.588-.155-1.033-.465-1.337-.31-.304-.769-.455-1.378-.455H5.5v3.584h2.5zm-2.5-8.5h2.5c.609 0 1.068-.152 1.378-.455.31-.304.465-.749.465-1.337 0-.588-.155-1.033-.465-1.337-.31-.304-.769-.455-1.378-.455H5.5V7z"/>
      </svg>
    ),
  },
  {
    label: 'LeetCode',
    href: 'https://leetcode.com/u/undestructive/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
      </svg>
    ),
  },
  {
    label: 'Codeforces',
    href: 'https://codeforces.com/profile/CodeSaksham',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5V19.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V4.5C9 3.672 9.672 3 10.5 3h3zm9 7.5c.828 0 1.5.672 1.5 1.5v9c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-9c0-.828.672-1.5 1.5-1.5h3z"/>
      </svg>
    ),
  },
];

// ── About modal ───────────────────────────────────────────────────────────────
function AboutModal({ onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(2,4,8,0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 200,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1.5rem',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={e => e.stopPropagation()}
          style={{
            background: '#0d1117',
            border: '1px solid rgba(0,212,255,0.18)',
            borderRadius: '16px',
            padding: '2.5rem',
            maxWidth: '520px', width: '100%',
            position: 'relative',
            boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 40px rgba(0,212,255,0.06)',
            fontFamily: FONT,
          }}
        >
          <button onClick={onClose} data-hover style={{
            position: 'absolute', top: '1.2rem', right: '1.2rem',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '6px', color: '#8892b0',
            width: '30px', height: '30px', cursor: 'none',
            fontFamily: FONT, fontSize: '0.9rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>✕</button>

          <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#00d4ff', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Who is this guy?
          </p>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#ffffff', marginBottom: '1.2rem', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
            Kumar Saksham
          </h2>
          <p style={{ fontSize: '0.92rem', color: '#8892b0', lineHeight: 1.8, marginBottom: '1rem' }}>
            CS undergrad at <span style={{ color: '#e8eaf6', fontWeight: 600 }}>IIIT Delhi</span> who builds things across the full stack — from bare-metal memory managers in C to Android apps to a fully working NES emulator.
          </p>
          <p style={{ fontSize: '0.92rem', color: '#8892b0', lineHeight: 1.8, marginBottom: '1rem' }}>
            I like systems that are fast, code that is clean, and problems that are hard. I've shipped projects in Python, C/C++, Java, Kotlin, and JavaScript — sometimes all in the same semester.
          </p>
          <p style={{ fontSize: '0.92rem', color: '#8892b0', lineHeight: 1.8 }}>
            When I'm not debugging at 2am, I'm probably playing games, thinking about game architecture, or adding one more tab to the 47 already open.
          </p>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', margin: '1.5rem 0' }} />
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[{ label: 'Based in', value: 'New Delhi' }, { label: 'Degree', value: 'B.Tech CSE' }, { label: 'Institute', value: 'IIIT Delhi' }].map(f => (
              <div key={f.label}>
                <div style={{ fontSize: '0.68rem', color: '#8892b0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>{f.label}</div>
                <div style={{ fontSize: '0.88rem', color: '#e8eaf6', fontWeight: 600 }}>{f.value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Floating drift wrapper ────────────────────────────────────────────────────
// Entrance via Framer Motion, continuous drift via CSS animation (GPU-composited)
function FloatDrift({ x, y, delay, duration, children }) {
  const animName = `drift-${Math.round(parseFloat(x))}-${Math.round(parseFloat(y))}`;
  return (
    <>
      <style>{`
        @keyframes ${animName} {
          0%   { transform: translate(0px, 0px); }
          25%  { transform: translate(8px, -10px); }
          50%  { transform: translate(-6px, 8px); }
          75%  { transform: translate(10px, 4px); }
          100% { transform: translate(0px, 0px); }
        }
      `}</style>
      <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          left: x,
          top: y,
          zIndex: 4,
          animation: `${animName} ${duration}s ease-in-out infinite`,
          animationDelay: `${delay}s`,
          willChange: 'transform',
        }}
      >
        {children}
      </motion.div>
    </>
  );
}

// ── All floating items (buttons + socials) ────────────────────────────────────
function FloatingItems({ onExplore, onAbout }) {
  const base = {
    fontFamily: FONT,
    cursor: 'none',
    letterSpacing: '0.12em',
    whiteSpace: 'nowrap',
    textTransform: 'uppercase',
    fontSize: '0.78rem',
    fontWeight: 600,
    padding: '0.6rem 1.4rem',
    borderRadius: '6px',
    background: 'transparent',
    backdropFilter: 'blur(10px)',
    transition: 'background 0.22s ease, color 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease',
  };

  // 6 icon positions spread across the right half
  const iconPositions = [
    { x: '80%', y: '15%', dur: 9  },
    { x: '87%', y: '32%', dur: 11 },
    { x: '76%', y: '50%', dur: 8  },
    { x: '84%', y: '65%', dur: 13 },
    { x: '70%', y: '78%', dur: 10 },
    { x: '89%', y: '48%', dur: 12 },
  ];

  return (
    <>
      {/* Works */}
      <FloatDrift x="62%" y="20%" delay={0.8} duration={10}>
        <motion.button
          whileHover={{ background: '#00d4ff', color: '#020408', borderColor: '#00d4ff', boxShadow: '0 0 20px rgba(0,212,255,0.4)' }}
          whileTap={{ scale: 0.93 }}
          onClick={onExplore}
          data-hover
          style={{ ...base, border: '1px solid rgba(0,212,255,0.45)', color: '#00d4ff' }}
        >
          Works 🪐
        </motion.button>
      </FloatDrift>

      {/* Talk */}
      <FloatDrift x="66%" y="57%" delay={1.0} duration={13}>
        <motion.button
          whileHover={{ background: 'rgba(255,255,255,0.12)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.5)', boxShadow: '0 0 16px rgba(255,255,255,0.1)' }}
          whileTap={{ scale: 0.93 }}
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          data-hover
          style={{ ...base, border: '1px solid rgba(255,255,255,0.2)', color: '#c8cfe8' }}
        >
          Talk 🛰️
        </motion.button>
      </FloatDrift>

      {/* Me */}
      <FloatDrift x="56%" y="74%" delay={1.2} duration={11}>
        <motion.button
          whileHover={{ background: 'rgba(123,47,255,0.35)', color: '#e0d4ff', borderColor: 'rgba(123,47,255,0.8)', boxShadow: '0 0 20px rgba(123,47,255,0.3)' }}
          whileTap={{ scale: 0.93 }}
          onClick={onAbout}
          data-hover
          style={{ ...base, border: '1px solid rgba(123,47,255,0.4)', color: '#a78bfa', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7b2fff', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite', flexShrink: 0 }} />
          Me 🌙
        </motion.button>
      </FloatDrift>

      {/* Social icons */}
      {socials.map((s, i) => {
        const p = iconPositions[i];
        return (
          <FloatDrift key={s.label} x={p.x} y={p.y} delay={1.3 + i * 0.12} duration={p.dur}>
            <motion.a
              href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
              whileHover={{ background: 'rgba(0,212,255,0.15)', color: '#00d4ff', borderColor: 'rgba(0,212,255,0.5)', boxShadow: '0 0 14px rgba(0,212,255,0.2)' }}
              whileTap={{ scale: 0.9 }}
              data-hover
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '40px', height: '40px', borderRadius: '8px',
                background: 'transparent',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#8892b0',
                textDecoration: 'none',
                transition: 'background 0.22s ease, color 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease',
              }}
            >
              {s.icon}
            </motion.a>
          </FloatDrift>
        );
      })}
    </>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero({ onExplore }) {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <section id="hero" style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      {/* Bottom fade */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '25%', background: 'linear-gradient(to bottom, transparent, #020408)', zIndex: 2, pointerEvents: 'none' }} />

      {/* Floating buttons + social icons */}
      <FloatingItems onExplore={onExplore} onAbout={() => setAboutOpen(true)} />

      {/* ── Main text block (left side) ── */}
      <div style={{ position: 'relative', zIndex: 3, width: '100%', maxWidth: '1100px', padding: '0 2.5rem' }}>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontFamily: FONT, fontSize: '0.8rem', fontWeight: 400, color: '#00d4ff', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1.4rem' }}
        >
          Software Developer
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          style={{ fontFamily: FONT, fontSize: 'clamp(3rem, 7.5vw, 6rem)', fontWeight: 700, lineHeight: 1.05, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '1.2rem' }}
        >
          <GreetingRotator />
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          style={{ transformOrigin: 'left', width: '60px', height: '2px', background: '#00d4ff', marginBottom: '1.6rem' }}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          style={{ fontFamily: FONT, fontSize: 'clamp(1rem, 2.2vw, 1.2rem)', fontWeight: 400, color: '#8892b0', marginBottom: '2rem', minHeight: '1.8rem' }}
        >
          <TypeWriter words={roles} />
        </motion.p>

        {/* Live LeetCode counter */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.75 }}
        >
          <LiveCounter />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{ position: 'absolute', bottom: '2.2rem', right: '2.5rem', zIndex: 3, display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#8892b0', fontSize: '0.7rem', fontFamily: FONT, letterSpacing: '0.14em', textTransform: 'uppercase' }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          style={{ width: '1px', height: '28px', background: 'linear-gradient(to bottom, #00d4ff, transparent)' }}
        />
        Scroll
      </motion.div>

      {aboutOpen && <AboutModal onClose={() => setAboutOpen(false)} />}

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.75)} }
      `}</style>
    </section>
  );
}
