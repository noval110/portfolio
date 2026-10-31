import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import './App.css';
import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import TechStack from './components/TechStack';
import Contact from './components/Contact';
import Footer from './components/Footer';

const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    if (reduceMotion()) return;
    const lenis = new Lenis({ lerp: 0.1 });
    lenisRef.current = lenis;
    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen || !ready);
    const lenis = lenisRef.current;
    if (lenis) {
      if (menuOpen || !ready) lenis.stop();
      else lenis.start();
    }
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen, ready]);

  const navigateTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    setMenuOpen(false);
    if (lenisRef.current) {
      lenisRef.current.start();
      lenisRef.current.scrollTo(el, { duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth' });
    }
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <Navbar menuOpen={menuOpen} onToggle={() => setMenuOpen((v) => !v)} navigateTo={navigateTo} />
      <main id="main-content">
        <Hero navigateTo={navigateTo} ready={ready} />
        <Projects />
        <About />
        <TechStack />
        <Contact />
      </main>
      <Footer navigateTo={navigateTo} />
    </>
  );
}
