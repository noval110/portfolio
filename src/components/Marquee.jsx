import { useRef } from 'react';
import {
  motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity,
} from 'framer-motion';

const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

// Drifts slowly on its own; scrolling speeds it up and flips direction with the scroll.
export default function Marquee({ items, speed = 2.5 }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const direction = useRef(1);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [-1000, 0, 1000], [-4, 0, 4], { clamp: false });
  const skew = useTransform(velocity, [-2000, 0, 2000], [6, 0, -6]);
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    baseX.set(baseX.get() - direction.current * speed * (delta / 1000) * (1 + Math.abs(f)));
  });

  const row = items.map((item, i) => (
    <span key={i} className={i % 2 ? 'is-serif' : ''}>
      {item}<i aria-hidden="true">✦</i>
    </span>
  ));

  return (
    <div className="marquee" aria-hidden="true">
      <motion.div className="marquee-track" style={{ x, skewX: reduce ? 0 : skew }}>
        {row}{row}{row}{row}
      </motion.div>
    </div>
  );
}
