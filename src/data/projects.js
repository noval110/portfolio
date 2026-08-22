import microSayurPreview from '../assets/projects/micro-sayur.png';
import hydroTechPreview from '../assets/projects/hydro-tech.png';
import codingPreview from '../assets/coding.jpeg';

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
    title: 'Code Experiments',
    category: 'Learning Archive',
    description: 'A growing collection of university work and small experiments made while learning software development.',
    tech: ['Go', 'PHP', 'JavaScript'],
    image: codingPreview,
    github: 'https://github.com/noval110',
    live: null,
    theme: 'graphite',
  },
];
