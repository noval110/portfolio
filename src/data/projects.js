import microSayurPreview from '../assets/projects/micro-sayur.png';
import hydroTechPreview from '../assets/projects/hydro-tech.png';
import skillMatchPreview from '../assets/projects/skillmatch.png';
import footGuardPreview from '../assets/projects/footguard-ai.png';

export const projects = [
  {
    id: 1,
    title: 'Micro Sayur',
    category: 'E-commerce / Fresh Produce',
    description: 'A fresh-produce storefront for browsing vegetables and fruit, supported by product search, categories, cart, authentication, and admin pages.',
    tech: ['React', 'Tailwind CSS', 'Go', 'Docker', 'Axios', 'Vite'],
    image: microSayurPreview,
    github: 'https://github.com/noval110/micro-sayur',
    live: 'https://micro-sayur.vercel.app/',
    theme: 'vegetable',
  },
  {
    id: 2,
    title: 'AgriSmart Hydro Tech',
    category: 'IoT Agriculture Landing Page',
    description: 'An interactive hydroponic technology landing page presenting automated nutrient circulation, water monitoring, harvest simulation, and live sensor concepts.',
    tech: ['React', 'Tailwind CSS', 'Vite'],
    image: hydroTechPreview,
    github: 'https://github.com/noval110/hydro-tech-landing',
    live: 'https://agrissmart.netlify.app/',
    theme: 'hydro',
  },
  {
    id: 3,
    title: 'SkillMatch',
    category: 'Competition Team Matching',
    description: 'A platform for finding competition teammates based on skills, roles, interests, experience level, and compatibility.',
    tech: ['JavaScript', 'React'],
    image: skillMatchPreview,
    github: 'https://github.com/noval110/skillmatch',
    live: 'https://skillmatch-noval7.vercel.app/',
    theme: 'skillmatch',
  },
  {
    id: 4,
    title: 'FootGuard AI',
    category: 'AI / Healthcare',
    description: 'An AI-assisted platform for diabetic foot screening and monitoring, with wound classification, segmentation, risk assessment, and healthcare provider review.',
    tech: ['React', 'Go', 'FastAPI', 'PyTorch', 'PostgreSQL'],
    image: footGuardPreview,
    github: 'https://github.com/noval110/footguard-AI',
    live: 'https://footguard-ai.vercel.app/',
    theme: 'footguard',
  },
];
