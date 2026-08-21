import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [['About','about'],['Work','work'],['Stack','stack'],['Contact','contact']];
export default function Navbar({ menuOpen, onToggle, navigateTo }) {
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{ const update=()=>setScrolled(window.scrollY>24); update(); window.addEventListener('scroll',update,{passive:true}); return()=>window.removeEventListener('scroll',update); },[]);
  return <nav className={`navbar ${scrolled?'is-scrolled':''}`} aria-label="Primary navigation">
    <button className="brand" onClick={()=>navigateTo('home')} aria-label="Go to home">NOVAL<span>.</span></button>
    <div className="nav-links">{links.map(([label,id])=><button key={id} onClick={()=>navigateTo(id)}>{label.toUpperCase()}</button>)}</div>
    <button className="menu-button" onClick={onToggle} aria-label={menuOpen?'Close navigation':'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-navigation">{menuOpen?<X/>:<Menu/>}</button>
    <AnimatePresence>{menuOpen&&<motion.div id="mobile-navigation" className="mobile-menu" initial={{opacity:0,y:'-100%'}} animate={{opacity:1,y:0}} exit={{opacity:0,y:'-100%'}} transition={{duration:.55,ease:[.22,1,.36,1]}}>
      <span className="mono">NAVIGATION / 01—04</span>{links.map(([label,id],index)=><button key={id} onClick={()=>navigateTo(id)}><small>0{index+1}</small>{label}</button>)}
      <p>Purwokerto, Indonesia</p>
    </motion.div>}</AnimatePresence>
  </nav>;
}
