import { motion, useReducedMotion, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function ProjectCard({ project, index, total, progress }) {
  const reduce = useReducedMotion();
  // Earlier cards shrink more as later ones slide over them, so the pile reads as layered.
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - index - 1) * 0.035]);
  const number = String(index + 1).padStart(2, '0');
  const domain = new URL(project.live).hostname;
  const { surface, ink, accent } = project.palette;

  return (
    <div className="card-slot" style={{ '--i': index }}>
      <motion.article
        className="card"
        style={{ scale: reduce ? 1 : scale, '--surface': surface, '--card-ink': ink, '--card-accent': accent }}
        aria-labelledby={`project-${project.id}`}
      >
        <div className="card-info">
          <div className="card-top mono">
            <span>{number} / {String(total).padStart(2, '0')}</span>
            <span>{project.category}</span>
          </div>
          <h3 id={`project-${project.id}`}>{project.title}</h3>
          <p className="card-desc">{project.description}</p>
          <ul className="card-tech mono" aria-label="Built with">
            {project.tech.map((tech) => <li key={tech}>{tech}</li>)}
          </ul>
          <div className="card-links">
            <a className="card-cta" href={project.live} target="_blank" rel="noreferrer">
              Visit site <ArrowUpRight size={16} />
            </a>
            <a className="card-source" href={project.github} target="_blank" rel="noreferrer">
              <FaGithub size={15} /> Source
            </a>
          </div>
        </div>
        <a
          className="card-shot"
          href={project.live}
          target="_blank"
          rel="noreferrer"
          tabIndex={-1}
          aria-hidden="true"
          data-cursor="Visit ↗"
        >
          <div className="browser">
            <div className="browser-bar">
              <i /><i /><i />
              <span className="mono">{domain}</span>
            </div>
            <div className="browser-view">
              <div className="browser-zoom">
                <motion.img
                  src={project.image}
                  alt=""
                  loading="lazy"
                  initial={{ scale: 1.18, filter: 'blur(8px)' }}
                  whileInView={{ scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </div>
        </a>
      </motion.article>
    </div>
  );
}
