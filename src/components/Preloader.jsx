import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion } from 'framer-motion';

const ease = [0.76, 0, 0.24, 1];
const KEY = 'noval-intro-seen';

const seenBefore = () => {
  try {
    return sessionStorage.getItem(KEY) === '1' || matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
};

// Counts to 100 on the first visit of a session, then lifts like a curtain while the hero animates in.
export default function Preloader({ onDone }) {
  const [skip] = useState(seenBefore);
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(!skip);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (skip) {
      doneRef.current();
      return;
    }
    const controls = animate(0, 100, {
      duration: 1.6,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        try { sessionStorage.setItem(KEY, '1'); } catch { /* storage blocked */ }
        setVisible(false);
        doneRef.current();
      },
    });
    return () => controls.stop();
  }, [skip]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="preloader"
          aria-hidden="true"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.9, ease }}
        >
          <div className="preloader-top mono">
            <span>Akhmad Noval Annur</span>
            <span>Portfolio — ’26</span>
          </div>
          <div className="preloader-words">
            {['Learn', 'Build', 'Ship'].map((word, i) => (
              <motion.span
                key={word}
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}{i < 2 ? ',' : '.'}
              </motion.span>
            ))}
          </div>
          <div className="preloader-bottom">
            <div className="preloader-bar"><i style={{ transform: `scaleX(${count / 100})` }} /></div>
            <span className="preloader-count">{String(count).padStart(3, '0')}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
