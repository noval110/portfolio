import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Journey from './components/Journey';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { document.body.classList.toggle('menu-open', menuOpen); return () => document.body.classList.remove('menu-open'); }, [menuOpen]);
  const navigateTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior:'smooth' }); setMenuOpen(false); };
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <CustomCursor />
    <Navbar menuOpen={menuOpen} onToggle={() => setMenuOpen((v) => !v)} navigateTo={navigateTo} />
    <main id="main-content"><Hero navigateTo={navigateTo} /><About /><Projects /><TechStack /><Journey /><Contact /></main>
    <Footer navigateTo={navigateTo} />
  </>;
}
