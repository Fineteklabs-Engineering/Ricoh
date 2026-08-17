import { motion } from "framer-motion";
import "../styles/feature.css";

export default function Feature() {
  return (
    <section className="feature">
      <div className="feature__content">
        {/* 📝 Swap this paragraph for your own copy */}
        <motion.p
          className="feature__text"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Work effortlessly with the Ricoh IM 3500 - a compact, intelligent
          multifunction printer that delivers sharp, professional output with
          fast, secure workflows, designed to keep pace with any modern office.
        </motion.p>

  
        <motion.div
          className="feature__media"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <img
            src="https://res.cloudinary.com/gjpfbvzb/image/upload/v1786953408/IM3500A504_tcm81-49937-removebg-preview_i3ghdd.png"
            alt="Ricoh printer in a modern workspace"
            onError={(e) => {
              e.currentTarget.style.opacity = 0;
            }}
          />
        </motion.div>
      </div>

      {/* Bottom-left marker + two-line label */}
      <motion.div
        className="feature__marker"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
      >
        <span className="feature__marker-dot" aria-hidden="true" />
        <span className="feature__marker-label">
          Reliable output
          <br />
          every single day
        </span>
      </motion.div>
    </section>
  );
}