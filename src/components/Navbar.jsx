import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useClock } from '../hooks/useClock';

const links = [['Work', 'work'], ['About', 'about'], ['Stack', 'stack'], ['Contact', 'contact']];
const ease = [0.22, 1, 0.36, 1];

export default function Navbar({ menuOpen, onToggle, navigateTo }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [hidden, setHidden] = useState(false);
  const time = useClock();

  useEffect(() => {
    let lastY = scrollY;
    // Tuck the bar away while reading downward; bring it back on any upward scroll.
    const update = () => {
      const y = scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 400);
        lastY = y;
      }
    };
    update();
    addEventListener('scroll', update, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-45% 0px -50%' },
    );
    ['home', ...links.map(([, id]) => id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => {
      removeEventListener('scroll', update);
      observer.disconnect();
    };
  }, []);

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'is-open' : ''} ${hidden && !menuOpen ? 'is-hidden' : ''}`}>
      <button className="nav-brand" onClick={() => navigateTo('home')} aria-label="Back to top">
        <span className="nav-mark" aria-hidden="true">N</span>
        Noval Annur
      </button>
      <nav className="nav-links" aria-label="Primary navigation">
        {links.map(([label, id], index) => (
          <button key={id} className={active === id ? 'is-active' : ''} onClick={() => navigateTo(id)}>
            <sup className="mono">0{index + 1}</sup>{label}
          </button>
        ))}
      </nav>
      <p className="nav-time mono"><i aria-hidden="true" />Purwokerto {time}</p>
      <button
        className="nav-toggle mono"
        onClick={onToggle}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
      >
        {menuOpen ? 'Close' : 'Menu'}
      </button>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            className="nav-sheet"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease }}
          >
            {links.map(([label, id], index) => (
              <motion.button
                key={id}
                onClick={() => navigateTo(id)}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.15 + index * 0.05, ease }}
              >
                <small className="mono">0{index + 1}</small>{label}
              </motion.button>
            ))}
            <p className="mono">Purwokerto, Indonesia — {time} WIB</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
