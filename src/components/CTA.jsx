import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import "../styles/cta.css";

export default function CTA() {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  return (
    <section className="cta">
      {/* giant faint R + accent glow behind the cards */}
      <span className="cta__ghost" aria-hidden="true">
        R
      </span>
      <div className="cta__glow" aria-hidden="true" />

      <motion.div
        className="cta__inner"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Left — contact */}
        <motion.div className="cta__card cta__card--contact" variants={item}>
          <h3 className="cta__card-title">Get in touch</h3>
          <ul className="cta__contact">
            <li>
              <span className="cta__contact-key">Address</span>
              <a
                href="https://maps.google.com/?q=35+Busia+Road+Nairobi"
                target="_blank"
                rel="noreferrer"
              >
                35 Busia Road, Nairobi
              </a>
            </li>
            <li>
              <span className="cta__contact-key">Phone</span>
              <a href="tel:+254743233925">+254 743 233 925</a>
            </li>
            <li>
              <span className="cta__contact-key">Email</span>
              <a href="mailto:info@abmltd.co.ke">info@abmltd.co.ke</a>
            </li>
          </ul>
        </motion.div>

        {/* Right — call to action */}
        <motion.div className="cta__card cta__card--action" variants={item}>
          <h2 className="cta__title">Ready to upgrade the way you print?</h2>
          <p className="cta__subtitle">
            Find the right Ricoh solution for your workplace.
          </p>
          <div className="cta__actions">
            <a href="#quote" className="cta__btn cta__btn--primary">
              Talk to an Expert <FiArrowRight />
            </a>
            <a href="products" className="cta__btn cta__btn--ghost">
              Explore Printers
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}