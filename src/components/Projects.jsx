import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import Marquee from './Marquee';

export default function Projects() {
  const stackRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] });

  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <Marquee items={projects.flatMap((p) => [p.title, p.category.split(' / ')[0]])} />
      <div className="section-head">
        <p className="eyebrow mono">(01) Selected work</p>
        <h2 id="work-title">
          Things I’ve built <em>&amp; put online.</em>
        </h2>
        <p className="section-note">
          {projects.length} projects, all live. Open any of them and poke around — that’s the
          best way to see how I work.
        </p>
      </div>
      <div className="work-stack" ref={stackRef}>
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            total={projects.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
