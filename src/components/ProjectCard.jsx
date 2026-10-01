import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function ProjectCard({ project }) {
  const number = String(project.id).padStart(2, '0');
  const href = project.live || project.github;
  const VisualTag = href ? 'a' : 'div';
  const spotlight = e => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--spot-x', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--spot-y', `${e.clientY - r.top}px`);
  };

  return (
    <motion.article
      onPointerMove={spotlight}
      className="project"
      initial={{ clipPath: 'inset(0 0 12% 0)', opacity: .2 }}
      whileInView={{ clipPath: 'inset(0)', opacity: 1 }}
      viewport={{ once: true, amount: .1 }}
      transition={{ duration: .8, ease: [.22, 1, .36, 1] }}
    >
      <VisualTag
        data-cursor={href ? 'project' : ''}
        className={`project-preview theme-${project.theme}`}
        {...(href ? { href, target: '_blank', rel: 'noreferrer', 'aria-label': `View ${project.title}` } : {})}
      >
        <img src={project.image} alt={`${project.title} website preview`} loading="lazy"/>
        <span className="project-category mono">{project.category}</span>
        {href && <span className="project-arrow"><ArrowUpRight/></span>}
      </VisualTag>
      <div className="project-info">
        <div><p className="project-number mono">{number} / 2026</p><h3>{project.title}</h3></div>
        <p className="project-description">{project.description}</p>
        <div className="project-meta">
          <div className="project-stack mono">{project.tech.map(tech => <span key={tech}>{tech}</span>)}</div>
          {project.live && <a href={project.live} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={14}/></a>}
          {project.github && <a href={project.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14}/></a>}
        </div>
      </div>
    </motion.article>
  );
}
