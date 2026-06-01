import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

// ─── EmailJS config ───────────────────────────────────────────────────────────
// 1. Go to https://www.emailjs.com and create a free account
// 2. Add an Email Service (Gmail recommended) → copy the Service ID
// 3. Create an Email Template with variables: {{from_name}}, {{from_email}}, {{message}}
//    Copy the Template ID
// 4. Go to Account → API Keys → copy your Public Key
// Replace the placeholders below:
const EMAILJS_SERVICE_ID  = 'service_025sc5a';   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'template_akqbag4';  // e.g. 'template_xyz789'
const EMAILJS_PUBLIC_KEY  = 'J-yCKUmzUgNqc0-T1';   // e.g. 'abcDEFghiJKL'
// ─────────────────────────────────────────────────────────────────────────────

const socials = [
  { label: 'Email', icon: '📧', href: 'mailto:almostsaksham@gmail.com', value: 'almostsaksham@gmail.com' },
  { label: 'GitHub', icon: '🐱', href: 'https://github.com/KrSaksh', value: 'krsaksh' },
  { label: 'LinkedIn', icon: '💼', href: 'https://www.linkedin.com/in/almostsaksham/', value: 'almostsaksham' },
];

function InputField({ label, name, type = 'text', value, onChange, placeholder, multiline }) {
  const [focused, setFocused] = useState(false);
  const Tag = multiline ? 'textarea' : 'input';

  return (
    <div style={{ marginBottom: '1.2rem' }}>
      <label style={{
        display: 'block',
        color: focused ? '#00d4ff' : '#8892b0',
        fontSize: '0.78rem',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginBottom: '0.5rem',
        transition: 'color 0.2s ease',
        fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
      }}>
        {label}
      </label>
      <Tag
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={multiline ? 5 : undefined}
        style={{
          width: '100%',
          background: focused ? 'rgba(0,212,255,0.05)' : 'rgba(255,255,255,0.03)',
          border: `1px solid ${focused ? 'rgba(0,212,255,0.4)' : 'rgba(255,255,255,0.08)'}`,
          borderRadius: '10px',
          padding: '0.85rem 1rem',
          color: '#e8eaf6',
          fontSize: '0.95rem',
          fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
          outline: 'none',
          resize: multiline ? 'vertical' : undefined,
          transition: 'all 0.2s ease',
          boxShadow: focused ? '0 0 0 3px rgba(0,212,255,0.08)' : 'none',
        }}
      />
    </div>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const formRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const [form, setForm] = useState({ from_name: '', from_email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.from_name || !form.from_email || !form.message) return;

    setStatus('sending');
    setErrorMsg('');

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setForm({ from_name: '', from_email: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg(
        EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID'
          ? 'EmailJS not configured yet. See Contact.jsx for setup instructions.'
          : 'Something went wrong. Please try again or email directly.'
      );
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        minHeight: '100vh',
        padding: '6rem 2rem',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80vw',
        height: '40vw',
        background: 'radial-gradient(ellipse, rgba(123,47,255,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
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
            color: '#ff4da6',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}>
            04 / Contact
          </span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(255,77,166,0.5), transparent)' }} />
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'start',
        }}>
          {/* Left: info */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                fontWeight: 700,
                marginBottom: '1rem',
                lineHeight: 1.2,
              }}
            >
              Let's{' '}
              <span style={{
                background: 'linear-gradient(135deg, #ff4da6, #7b2fff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Connect
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ color: '#8892b0', lineHeight: 1.8, marginBottom: '2.5rem', fontSize: '1rem' }}
            >
              Whether you have a project idea, a collaboration in mind, or just want to say hi — my inbox is always open. I'll get back to you as soon as possible.
            </motion.p>

            {/* Socials */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 6, color: '#ff4da6' }}
                  data-hover
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    color: '#8892b0',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                    transition: 'color 0.2s ease',
                    padding: '0.8rem 1rem',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '10px',
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px', opacity: 0.6 }}>
                      {s.label}
                    </div>
                    <div style={{ fontWeight: 500 }}>{s.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,77,166,0.15)',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }}
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ textAlign: 'center', padding: '3rem 1rem' }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
                  <h3 style={{
                    fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                    color: '#00d4ff',
                    marginBottom: '0.8rem',
                    fontSize: '1.2rem',
                  }}>
                    Message Sent!
                  </h3>
                  <p style={{ color: '#8892b0', fontSize: '0.9rem', lineHeight: 1.7 }}>
                    Thanks for reaching out. I'll get back to you soon.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setStatus('idle')}
                    data-hover
                    style={{
                      marginTop: '1.5rem',
                      background: 'rgba(0,212,255,0.1)',
                      border: '1px solid rgba(0,212,255,0.3)',
                      borderRadius: '8px',
                      color: '#00d4ff',
                      padding: '0.6rem 1.5rem',
                      fontSize: '0.85rem',
                      fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                      cursor: 'none',
                    }}
                  >
                    Send another
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <InputField
                    label="Your Name"
                    name="from_name"
                    value={form.from_name}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                  <InputField
                    label="Your Email"
                    name="from_email"
                    type="email"
                    value={form.from_email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                  />
                  <InputField
                    label="Message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or idea..."
                    multiline
                  />

                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        color: '#ff4da6',
                        fontSize: '0.82rem',
                        marginBottom: '1rem',
                        padding: '0.6rem 0.8rem',
                        background: 'rgba(255,77,166,0.08)',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,77,166,0.2)',
                      }}
                    >
                      ⚠️ {errorMsg}
                    </motion.p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={status !== 'sending' ? { scale: 1.02, boxShadow: '0 0 25px rgba(255,77,166,0.3)' } : {}}
                    whileTap={status !== 'sending' ? { scale: 0.98 } : {}}
                    data-hover
                    style={{
                      width: '100%',
                      background: status === 'sending'
                        ? 'rgba(255,77,166,0.2)'
                        : 'linear-gradient(135deg, #ff4da6, #7b2fff)',
                      border: 'none',
                      borderRadius: '10px',
                      color: '#fff',
                      padding: '0.9rem',
                      fontSize: '0.95rem',
                      fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                      fontWeight: 600,
                      cursor: status === 'sending' ? 'not-allowed' : 'none',
                      letterSpacing: '0.03em',
                      transition: 'background 0.3s ease',
                    }}
                  >
                    {status === 'sending' ? '📡 Transmitting...' : '🚀 Send Message'}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
