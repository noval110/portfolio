import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

// A label that trails the pointer only over elements marked with data-cursor="Label".
export default function Cursor() {
  const reduce = useReducedMotion();
  const [label, setLabel] = useState('');
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 });

  useEffect(() => {
    if (reduce || !matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setLabel(e.target.closest?.('[data-cursor]')?.dataset.cursor || '');
    };
    addEventListener('pointermove', move, { passive: true });
    return () => removeEventListener('pointermove', move);
  }, [reduce, x, y]);

  if (!enabled) return null;
  return (
    <motion.div className="cursor" style={{ x: sx, y: sy }} aria-hidden="true">
      <motion.span
        animate={{ scale: label ? 1 : 0, opacity: label ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}
