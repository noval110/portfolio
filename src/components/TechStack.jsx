import { useState } from 'react';
import { stackGroups } from '../data/technologies';
import { projects } from '../data/projects';

const usedIn = (item) => projects.filter((p) => p.tech.some((t) => (item.match || [item.name]).includes(t)));

export default function TechStack() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="stack" id="stack" aria-labelledby="stack-title">
      <div className="section-head">
        <p className="eyebrow mono">(03) Stack</p>
        <h2 id="stack-title">
          What I reach for, <em>and where.</em>
        </h2>
        <p className="section-note">
          Each dot is a project above that uses the tool. No skill bars, just receipts.
        </p>
      </div>

      <ul className="stack-legend mono" aria-label="Projects">
        {projects.map((p) => (
          <li
            key={p.id}
            style={{ '--dot': p.palette.accent }}
            className={hovered && !hovered.includes(p.id) ? 'is-dim' : ''}
          >
            <i aria-hidden="true" />{p.title}
          </li>
        ))}
      </ul>

      <div className="stack-groups">
        {stackGroups.map((group) => (
          <div className="stack-group" key={group.label}>
            <h3 className="mono">{group.label}</h3>
            <ul>
              {group.items.map((item) => {
                const used = usedIn(item);
                const { Icon } = item;
                return (
                  <li
                    key={item.name}
                    onPointerEnter={() => setHovered(used.map((p) => p.id))}
                    onPointerLeave={() => setHovered(null)}
                  >
                    <Icon className="stack-icon" aria-hidden="true" />
                    <span className="stack-name">{item.name}</span>
                    <span
                      className="stack-dots"
                      aria-label={used.length ? `Used in ${used.map((p) => p.title).join(', ')}` : 'Used outside these projects'}
                    >
                      {used.map((p) => <i key={p.id} style={{ background: p.palette.accent }} />)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
