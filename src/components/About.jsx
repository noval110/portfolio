import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import workspacePhoto from '../assets/about-workspace.jpeg';

const intro =
  'I’m an Informatics Engineering student at Telkom University Purwokerto. I like taking an idea from a rough sketch to something people can actually click - designing the interface, wiring up the API, and getting it deployed. Most of what I know, I learned by building.';

const facts = [
  ['Studying', 'Informatics Engineering'],
  ['At', 'Telkom University Purwokerto'],
  ['Focus', 'Web development'],
  ['Based in', 'Purwokerto, Indonesia'],
  ['Learning now', 'React & Go, deeper'],
  ['Interested in', 'Software engineering'],
];

const milestones = [
  ['2025 — now', 'Informatics student', 'Studying computing foundations and building practical web experiences.'],
  ['2026', 'Web development exploration', 'Deepening frontend, backend, and interface design skills.'],
  ['Now', 'Learning & building', 'Turning curiosity into small, useful technology projects.'],
];

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}

export default function About() {
  const textRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: textRef, offset: ['start 0.85', 'end 0.45'] });
  const words = intro.split(' ');

  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="about-intro">
        <p className="eyebrow mono">(02) About</p>
        <h2 id="about-title" className="sr-only">About me</h2>
        <p className="about-text" ref={textRef}>
          {reduce
            ? intro
            : words.map((word, i) => (
                <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                  {word}
                </Word>
              ))}
        </p>
      </div>

      <div className="about-grid">
        <motion.figure
          className="about-photo"
          initial={{ clipPath: 'inset(12% 12% 12% 12%)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={workspacePhoto} alt="Laptop running the SkillMatch Go backend next to an iced drink" loading="lazy" />
          <figcaption className="mono">SkillMatch’s Go backend, mid-session.</figcaption>
        </motion.figure>

        <div className="about-side">
          <dl className="facts">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt className="mono">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <div className="timeline">
            <h3 className="mono">So far</h3>
            <ol>
              {milestones.map(([time, title, copy]) => (
                <li key={time}>
                  <time className="mono">{time}</time>
                  <div>
                    <strong>{title}</strong>
                    <p>{copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
