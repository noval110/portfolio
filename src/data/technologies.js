import { SiReact, SiJavascript, SiGo, SiPhp, SiMysql, SiHtml5, SiCss, SiGit, SiDocker, SiTailwindcss, SiVite, SiAxios, SiFastapi, SiPytorch, SiPostgresql } from 'react-icons/si';

// `match` lists the project tech names that count as using this tool (React implies JavaScript).
export const stackGroups = [
  {
    label: 'Languages',
    items: [
      { name: 'JavaScript', Icon: SiJavascript, match: ['JavaScript', 'React'] },
      { name: 'Go', Icon: SiGo },
      { name: 'PHP', Icon: SiPhp },
      { name: 'HTML5', Icon: SiHtml5 },
      { name: 'CSS3', Icon: SiCss },
    ],
  },
  {
    label: 'Frontend',
    items: [
      { name: 'React', Icon: SiReact },
      { name: 'Tailwind CSS', Icon: SiTailwindcss },
      { name: 'Vite', Icon: SiVite },
      { name: 'Axios', Icon: SiAxios },
    ],
  },
  {
    label: 'Backend & Data',
    items: [
      { name: 'FastAPI', Icon: SiFastapi },
      { name: 'PyTorch', Icon: SiPytorch },
      { name: 'PostgreSQL', Icon: SiPostgresql },
      { name: 'MySQL', Icon: SiMysql },
    ],
  },
  {
    label: 'Tooling',
    items: [
      { name: 'Git', Icon: SiGit },
      { name: 'Docker', Icon: SiDocker },
    ],
  },
];
