import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import "../styles/more-than-printer.css";

/* Each slide = one service. Swap the images for your own service photos. */
const SLIDES = [
  {
    image: "https://res.cloudinary.com/gjpfbvzb/image/upload/v1787293523/samsung-memory-hDIPpFPNJqk-unsplash_yrm85j.jpg",
    kicker: "Installation & Setup",
    title: "Up and running from day one",
    desc: "We deliver, install and configure your machine on-site - connected to your network, tested, and ready to print before we leave.",
  },
  {
    image: "https://pub-96a97c05d26a40e7b33c7ce5e586222f.r2.dev/2150880951.jpg",
    kicker: "Maintenance & Repair",
    title: "Kept running, whatever it takes",
    desc: "Scheduled servicing and fast on-site repairs from trained technicians keep downtime to a minimum and your fleet in top condition.",
  },
  {
    image: "https://res.cloudinary.com/gjpfbvzb/image/upload/v1787293961/office-worker-using-a-modern-multifunction-printer-2025-08-27-10-55-26-utc_vafssv.avif",
    kicker: "Print Leasing",
    title: "The right machine, no upfront cost",
    desc: "Flexible leasing plans put professional-grade printers in your office for a predictable monthly fee - upgrades and support included.",
  },
  {
    image: "https://res.cloudinary.com/gjpfbvzb/image/upload/v1787294143/konica-minolta-tn-328-c250i-c300i-c360i-toner-set-ckmy_snknfi.jpg",
    kicker: "Toner & Supplies",
    title: "Genuine supplies, always in stock",
    desc: "Original Ricoh toners, parts and consumables delivered when you need them - no drop in quality, no waiting around.",
  },
];

export default function MoreThanPrinter() {
  const sectionRef = useRef(null);
  const [index, setIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(SLIDES.length - 1, Math.floor(v * SLIDES.length));
    setIndex(i);
  });

  const slide = SLIDES[index];

  return (
    <section
      className="mtp"
      ref={sectionRef}
      style={{ height: `${SLIDES.length * 100}vh` }}
    >
      <div className="mtp__sticky">
        {/* Background — crossfades + slow zoom as slides change */}
        <div className="mtp__bg-wrap" aria-hidden="true">
          <AnimatePresence>
            <motion.div
              key={index}
              className="mtp__bg"
              style={{ backgroundImage: `url("${slide.image}")` }}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.8, ease: "easeInOut" },
                scale: { duration: 6, ease: "easeOut" },
              }}
            />
          </AnimatePresence>
          <div className="mtp__overlay" />
        </div>

        {/* Persistent section label — top-left */}
        <div className="mtp__top">
          <p className="mtp__eyebrow">Our Services</p>
        </div>

        {/* Bottom row: changing service (left), CTA (right) */}
        <div className="mtp__bottom">
          <div className="mtp__content-inner">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -28 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <span className="mtp__kicker">{slide.kicker}</span>
                <h2 className="mtp__title">{slide.title}</h2>
                <p className="mtp__desc">{slide.desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <a href="#quote" className="mtp__cta">
            Learn More <FiArrowRight />
          </a>
        </div>

        {/* Progress indicators (right) */}
        <div className="mtp__dots" aria-hidden="true">
          {SLIDES.map((s, i) => (
            <span
              key={s.kicker}
              className={`mtp__dot ${i === index ? "is-active" : ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}