import { useRef } from 'react';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MilkyWay from './components/MilkyWay';

export default function App() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    // background: transparent — MilkyWay canvas sits behind everything
    <div className="noise" style={{ background: 'transparent', minHeight: '100vh', position: 'relative' }}>
      {/* Fixed Milky Way starfield — z-index 0, behind all content */}
      <MilkyWay />

      <Cursor />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero onExplore={scrollToProjects} />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
