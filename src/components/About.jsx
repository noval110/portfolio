import { motion } from "framer-motion";
import workspacePhoto from "../assets/about-workspace.jpeg";
import Portrait from "./Portrait";
const facts = [
  ["EDUCATION", "Telkom University Purwokerto"],
  ["MAJOR", "Informatics Engineering"],
  ["FOCUS", "Web Development"],
  ["LOCATION", "Purwokerto, Indonesia"],
  ["STATUS", "Learning & Building"],
  ["INTEREST", "Software Development"],
];
export default function About() {
  return (
    <section className="about section" id="about" aria-labelledby="about-title">
      <div className="section-header mono">
        <p>02 / ABOUT</p>
        <span>WHO I AM</span>
      </div>
      <div className="about-content compact">
        <motion.h2
          id="about-title"
          className="about-big-text"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          I TURN IDEAS
          <br />
          INTO DIGITAL
          <br />
          <span>EXPERIENCES.</span>
        </motion.h2>
        <div className="about-editorial compact">
          <Portrait
            src={workspacePhoto}
            alt="Laptop displaying code beside a drink"
            variant="detail"
          />
          <div className="about-copy">
            <p>
              I’m an Informatics Engineering student at Telkom University
              Purwokerto with a strong interest in web and software development.
            </p>
            <p>
              I enjoy turning ideas into responsive, functional, and
              thoughtfully designed digital experiences while continuously
              learning new technologies.
            </p>
          </div>
          <dl className="about-facts">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt className="mono">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
