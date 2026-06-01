import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer style={{
      padding: '2rem',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      textAlign: 'center',
      fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
    }}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{ color: '#8892b0', fontSize: '0.82rem' }}
      >
        <span style={{ opacity: 0.5 }}>Designed & Built by Kumar Saksham | Made with React + Three.js</span>
      </motion.div>
    </footer>
  );
}
