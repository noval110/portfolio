import { motion, useReducedMotion } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';
export default function CustomCursor(){const {x,y}=useMousePosition();const reduce=useReducedMotion();if(reduce)return null;return <><motion.div className="cursor-dot" animate={{x,y}} transition={{type:'spring',mass:.05,stiffness:900,damping:45}} aria-hidden="true"/><motion.div className="cursor-ring" animate={{x,y}} transition={{type:'spring',mass:.15,stiffness:280,damping:28}} aria-hidden="true"/></>}
