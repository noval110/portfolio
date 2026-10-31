import { useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { motion } from 'framer-motion';
import { profile } from '../data/profile';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <p className="eyebrow mono">(04) Contact</p>
      <a className="contact-badge" href={`mailto:${profile.email}`} aria-label="Send me an email">
        <svg viewBox="0 0 200 200" aria-hidden="true">
          <defs><path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
          <text><textPath href="#badge-circle" textLength="488" lengthAdjust="spacing">Say hello • Let’s talk • Say hello • Let’s talk • </textPath></text>
        </svg>
        <ArrowUpRight className="contact-badge-arrow" size={40} />
      </a>
      <motion.h2
        id="contact-title"
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        Got an idea?<br /><em>Let’s build it.</em>
      </motion.h2>

      <div className="contact-mail">
        <a href={`mailto:${profile.email}`} className="contact-email">{profile.email}</a>
        <button className="contact-copy mono" onClick={copy} aria-live="polite">
          {copied ? <><Check size={15} /> Copied</> : <><Copy size={15} /> Copy</>}
        </button>
      </div>

      <div className="contact-links">
        <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={18} /></a>
        <a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={18} /></a>
      </div>
    </section>
  );
}
