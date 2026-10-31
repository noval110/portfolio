import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { profile } from '../data/profile';
import { useClock } from '../hooks/useClock';

const mark = 'Noval Annur';

export default function Footer({ navigateTo }) {
  const time = useClock();
  return (
    <footer className="footer">
      <div className="footer-row mono">
        <p>© 2026 {profile.name}</p>
        <p>Purwokerto — {time} WIB</p>
        <button onClick={() => navigateTo('home')}>Back to top <ArrowUp size={14} /></button>
      </div>
      {/* Observe the parent: the letters start clipped, so they can't be observed themselves. */}
      <motion.p
        className="footer-mark"
        aria-hidden="true"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {[...mark].map((c, i) => (
          <motion.span
            key={i}
            variants={{ hidden: { y: '100%' }, show: { y: '0%' } }}
            transition={{ duration: 0.9, delay: i * 0.035, ease: [0.22, 1, 0.36, 1] }}
          >
            {c === ' ' ? ' ' : c}
          </motion.span>
        ))}
      </motion.p>
    </footer>
  );
}
