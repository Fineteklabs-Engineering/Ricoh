import { motion } from "framer-motion";
import { FiLayers, FiZap, FiSettings, FiShield } from "react-icons/fi";
import "../styles/why-ricoh.css";

/* 📝 Swap values/labels for your own. React icons are used for the markers. */
const STATS = [
  { value: "5", label: "paper trays", icon: FiLayers },
  { value: "35", label: "pages per minute", icon: FiZap },
  { value: "4", label: "finishing options", icon: FiSettings },
  { value: "3", label: "security modes", icon: FiShield },
];

export default function WhyRicoh() {
  const statsContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };
  const statItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <section className="why">
      <div className="why__inner">
        {/* Far-left heading */}
        <motion.div
          className="why__aside"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="why__title">
            Technology that
            <br />
            works around you
          </h2>
        </motion.div>

        {/* Right content column */}
        <div className="why__main">
          {/* Two-column intro */}
          <motion.div
            className="why__intro"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <p>
              Work smarter with the Ricoh IM 3500 - an intelligent multifunction
              printer built for busy offices, delivering sharp output and fast,
              secure workflows. Choose from several quality modes to match any job.
            </p>
            <p>
              Standard mode balances speed and clarity for everyday work; Best
              mode gives you the finest detail for client-ready documents. Adjust
              everything from the touch panel - no IT ticket required.
            </p>
          </motion.div>

          {/* Chart card (inline SVG — no charting library) */}
          <motion.div
            className="why__chart"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <svg
              className="why__chart-svg"
              viewBox="0 0 800 240"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="Print speed against output quality"
            >
              <text x="24" y="30" className="why__chart-cap">PRINT SPEED</text>

              {/* dark line */}
              <path
                d="M40,120 C130,120 170,175 250,168 C340,160 430,150 560,150 C650,150 720,149 760,149"
                fill="none"
                stroke="#2b2f36"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* accent line */}
              <path
                d="M40,108 C130,108 175,205 255,196 C335,188 380,120 470,120 C570,120 665,148 760,150"
                fill="none"
                stroke="#aebf4e"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* labels */}
              <circle cx="250" cy="196" r="4" fill="#aebf4e" />
              <text x="264" y="200" className="why__chart-lbl">Draft</text>
              <circle cx="470" cy="120" r="4" fill="#aebf4e" />
              <text x="484" y="124" className="why__chart-lbl">Standard</text>
              <rect x="700" y="145" width="8" height="8" fill="#2b2f36" />
              <text x="716" y="153" className="why__chart-lbl">Best</text>

              <text x="776" y="224" textAnchor="end" className="why__chart-cap">
                OUTPUT QUALITY
              </text>
            </svg>
          </motion.div>

          {/* Image — slides in from the RIGHT */}
          <motion.div
            className="why__media"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <img
              src="https://res.cloudinary.com/gjpfbvzb/image/upload/v1786959166/kai-rohweder-9HX7uVUyefg-unsplash_gthhbp.jpg"
              alt="Using the Ricoh printer touch panel"
              onError={(e) => {
                e.currentTarget.style.opacity = 0;
              }}
            />
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="why__stats"
            variants={statsContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            {STATS.map((s) => {
              const IconComponent = s.icon;
              return (
                <motion.div className="why__stat" key={s.label} variants={statItem}>
                  <IconComponent className="why__stat-icon" aria-hidden="true" />
                  <span className="why__stat-text">
                    <strong>{s.value}</strong> {s.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}