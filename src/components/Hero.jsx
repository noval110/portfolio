import { useEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { profile } from '../data/profile';

const ease = [0.22, 1, 0.36, 1];
const rise = {
  hidden: { y: '110%' },
  show: (i) => ({ y: '0%', transition: { duration: 1.1, delay: 0.15 + i * 0.09, ease } }),
};
const fade = (ready, delay) => ({
  initial: { opacity: 0, y: 14 },
  animate: ready ? { opacity: 1, y: 0 } : undefined,
  transition: { duration: 0.8, delay, ease },
});

// Letters thin out as the pointer nears them — Bricolage's weight axis does the work.
function useWeightField(ref, enabled) {
  useEffect(() => {
    const root = ref.current;
    if (!enabled || !root || !matchMedia('(pointer: fine)').matches) return;
    const letters = [...root.querySelectorAll('.hero-char')];
    let frame = 0;
    let px = -9999;
    let py = -9999;
    const paint = () => {
      frame = 0;
      for (const el of letters) {
        const r = el.getBoundingClientRect();
        const d = Math.hypot(px - (r.left + r.width / 2), py - (r.top + r.height / 2));
        const t = Math.max(0, 1 - d / (r.height * 1.7));
        el.style.fontVariationSettings = `'opsz' 96, 'wght' ${Math.round(800 - t * 600)}`;
      }
    };
    const move = (e) => {
      px = e.clientX;
      py = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const leave = () => {
      px = py = -9999;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const section = root.closest('section');
    section.addEventListener('pointermove', move);
    section.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(frame);
      section.removeEventListener('pointermove', move);
      section.removeEventListener('pointerleave', leave);
    };
  }, [ref, enabled]);
}

const chars = (word) => [...word].map((c, i) => <span key={i} className="hero-char">{c}</span>);

export default function Hero({ navigateTo, ready }) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const titleRef = useRef(null);
  const reduce = useReducedMotion();
  useWeightField(titleRef, !reduce);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-28%']);
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);
  const photoR = useTransform(scrollYProgress, [0, 1], [0, 14]);
  const footOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const state = ready ? 'show' : 'hidden';

  return (
    <section className="hero" id="home" ref={sectionRef} aria-labelledby="hero-title">
      <motion.div className="hero-meta mono" {...fade(ready, 0.05)}>
        <span>Portfolio — ’26</span>
        <span>Informatics Engineering, Telkom University Purwokerto</span>
        <span className="hero-status"><i aria-hidden="true" />Available for projects</span>
      </motion.div>

      <div className="hero-stage" ref={stageRef}>
        <motion.h1
          id="hero-title"
          className="hero-title"
          ref={titleRef}
          style={{ y: reduce ? 0 : titleY }}
        >
          <span className="sr-only">{profile.name}, {profile.role}</span>
          <span className="hero-line" aria-hidden="true">
            <motion.span custom={0} variants={rise} initial="hidden" animate={state}>{chars('Noval')}</motion.span>
          </span>
          <span className="hero-line" aria-hidden="true">
            <motion.span custom={1} variants={rise} initial="hidden" animate={state}>
              {chars('Annur')}<b>.</b>
            </motion.span>
          </span>
        </motion.h1>

        <motion.div className="hero-photo-wrap" style={{ y: reduce ? 0 : photoY, rotate: reduce ? 0 : photoR }}>
          <motion.figure
            className="hero-photo"
            drag={!reduce}
            dragConstraints={stageRef}
            dragElastic={0.15}
            dragSnapToOrigin
            whileDrag={{ scale: 1.04, rotate: 0 }}
            whileHover={{ rotate: 2 }}
            initial={{ opacity: 0, rotate: -6, y: 80 }}
            animate={ready ? { opacity: 1, rotate: 5, y: 0 } : undefined}
            transition={{ duration: 1.2, delay: 0.45, ease }}
            data-cursor="Drag"
          >
            <span className="hero-tape" aria-hidden="true" />
            <img
              src={profile.photo}
              alt="Akhmad Noval Annur making peace signs in a classroom"
              fetchPriority="high"
              draggable="false"
            />
            <figcaption className="mono">
              <span>Noval, ’26</span>
              {!reduce && <span>drag me ↗</span>}
            </figcaption>
          </motion.figure>
        </motion.div>

        <motion.p className="hero-role" {...fade(ready, 0.55)}>
          Informatics student <span>&amp;</span> web developer
        </motion.p>
      </div>

      <motion.div className="hero-foot" style={{ opacity: reduce ? 1 : footOpacity }}>
        <motion.p className="hero-lede" {...fade(ready, 0.7)}>
          I build web products end to end - interfaces in <strong>React</strong>, services
          in <strong>Go</strong>. Lately that’s meant a fresh-produce storefront, a hydroponics
          landing page, a teammate matcher and an AI tool for diabetic-foot screening.
        </motion.p>
        <motion.div className="hero-actions" {...fade(ready, 0.8)}>
          <button className="btn btn-solid" onClick={() => navigateTo('work')}>
            <span className="btn-label"><span data-text="See the work">See the work</span></span> <ArrowDown size={16} />
          </button>
          <a className="btn" href={profile.github} target="_blank" rel="noreferrer">
            <span className="btn-label"><span data-text="GitHub">GitHub</span></span> <ArrowUpRight size={16} />
          </a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
            <span className="btn-label"><span data-text="LinkedIn">LinkedIn</span></span> <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
