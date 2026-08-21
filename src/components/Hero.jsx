import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { profile } from '../data/profile';
import { useMousePosition } from '../hooks/useMousePosition';

export default function Hero({ navigateTo }) {
  const mouse=useMousePosition(); const reduce=useReducedMotion();
  const parent={hidden:{},show:{transition:{staggerChildren:.12,delayChildren:.15}}};
  const item={hidden:{opacity:0,y:reduce?0:55},show:{opacity:1,y:0,transition:{duration:.9,ease:[.22,1,.36,1]}}};
  return <section className="hero section" id="home" aria-labelledby="hero-title" style={{'--mouse-x':`${mouse.x}px`,'--mouse-y':`${mouse.y}px`}}>
    <div className="hero-grid" aria-hidden="true"/><div className="hero-glow" aria-hidden="true"/>
    <div className="hero-meta mono"><span>PORTFOLIO / 2026</span><span>{profile.location.toUpperCase()}</span></div>
    <motion.div className="hero-content" variants={parent} initial="hidden" animate="show">
      <motion.p className="eyebrow mono" variants={item}><span className="status-dot"/>AVAILABLE FOR OPPORTUNITIES</motion.p>
      <h1 className="hero-title" id="hero-title">
        {['AKHMAD','NOVAL','ANNUR'].map((line,index)=><span className={`title-line ${index===1?'title-indent':''}`} key={line}><motion.span variants={item}>{line}</motion.span></span>)}
      </h1>
      <motion.div className="hero-bottom" variants={item}><div><p className="hero-role">{profile.role}</p><p className="hero-description">Building thoughtful digital experiences through code, design, and curiosity.</p></div><button className="explore-button mono" onClick={()=>navigateTo('about')}>SCROLL TO EXPLORE <ArrowDown size={17}/></button></motion.div>
    </motion.div><span className="hero-number mono">01</span>
  </section>;
}
