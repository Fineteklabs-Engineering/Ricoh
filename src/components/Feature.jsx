import { motion } from "framer-motion";
import "../styles/feature.css";

export default function Feature() {
  return (
    <section className="feature">
      <div className="feature__content">
        <motion.h2
          className="feature__title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Color with Clarity, Print with Efficiency
        </motion.h2>

        <motion.p
          className="feature__text"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          Ricoh's colour laser range delivers sharp, true-to-life output and
          fast, reliable printing for any workspace - so every document looks
          professional and every job gets done quicker.
        </motion.p>

        <motion.div
          className="feature__media"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <img
            src="https://res.cloudinary.com/gjpfbvzb/image/upload/v1787232781/geri-sakti-CYrYxz-uvE4-unsplash_hdfvrp.jpg"
            alt="Ricoh printer in a modern workspace"
            onError={(e) => {
              e.currentTarget.style.opacity = 0;
            }}
          />
        </motion.div>
      </div>

      {/* Bottom-left stats (same position as before) */}
      <motion.div
        className="feature__marker"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
      >
        <div className="feature__stat">
          <span className="feature__stat-value">10+ Years</span>
          <span className="feature__stat-label">Industry Experience</span>
        </div>
        <div className="feature__stat">
          <span className="feature__stat-value">500+</span>
          <span className="feature__stat-label">Printers Deployed</span>
        </div>
        <div className="feature__stat">
          <span className="feature__stat-value">Genuine</span>
          <span className="feature__stat-label">Parts &amp; Toners Only</span>
        </div>
      </motion.div>
    </section>
  );
}