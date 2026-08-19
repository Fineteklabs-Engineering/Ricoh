import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import "../styles/more-than-printer.css";


const SLIDES = [
  {
    image: "https://res.cloudinary.com/gjpfbvzb/image/upload/v1786956844/mimi-thian-zMcBf-n6qrs-unsplash_lthxu5.jpg",
    kicker: "Create",
    title: "It starts long before the first page",
    desc: "Design, draft and prepare documents with tools that plug straight into the way your team already works.",
  },
  {
    image: "https://res.cloudinary.com/gjpfbvzb/image/upload/v1786956922/stanislav-staritsyn-j7cOdWrbKUI-unsplash_tb0084.jpg",
    kicker: "Print",
    title: "Flawless output on every run",
    desc: "Crisp, consistent, professional results at speed - from a single page to a thousand.",
  },
  {
    image: "https://res.cloudinary.com/gjpfbvzb/image/upload/v1786956953/olena-kholina-CHisgnotgwk-unsplash_vvza55.jpg",
    kicker: "Scan",
    title: "Paper to digital in a single pass",
    desc: "Turn stacks of documents into searchable files instantly, scanning both sides at once.",
  },
  {
    image: "https://res.cloudinary.com/gjpfbvzb/image/upload/v1786957020/gorilla-roi-data-connector-KYlqBrKQ-i4-unsplash_zidm3o.jpg",
    kicker: "Share",
    title: "Straight to the cloud",
    desc: "Send scans directly to Dropbox, SharePoint or email - no desktop detour required.",
  },
  {
    image: "https://res.cloudinary.com/gjpfbvzb/image/upload/v1786957071/gorilla-roi-data-connector-9fZuqBYlV1w-unsplash_j8tm3q.jpg",
    kicker: "Manage",
    title: "Control of the whole fleet",
    desc: "Monitor usage, secure every job and manage every device from one place.",
  },
];

export default function MoreThanPrinter() {
  const sectionRef = useRef(null);
  const [index, setIndex] = useState(0);

  // Track how far we've scrolled through the tall section (0 → 1)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Convert scroll progress into the active slide index
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(SLIDES.length - 1, Math.floor(v * SLIDES.length));
    setIndex(i);
  });

  const slide = SLIDES[index];

  return (
    <section
      className="mtp"
      ref={sectionRef}
      /* height creates the scroll distance: one screenful per slide */
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
          <p className="mtp__eyebrow">More than a printer</p>
        </div>

        {/* Bottom row: changing title + desc (left), pink CTA (right) */}
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

          {/* 📝 Change the label / link as needed */}
          <a href="products" className="mtp__cta">
            Explore the range <FiArrowRight />
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