import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import "../styles/hero-section.css";

/* Each slide has a desktop `image` and a `mobileImage`.
   📱 Put your mobile-framed images in mobileImage (portrait-friendly crops).
   Leave mobileImage out / same as image to reuse the desktop one on mobile. */
const SLIDES = [
  {
    image: "https://res.cloudinary.com/gjpfbvzb/image/upload/v1786947865/ChatGPT_Image_Aug_17_2026_09_24_10_AM_simvop.png",
    mobileImage: "https://res.cloudinary.com/gjpfbvzb/image/upload/v1786970005/Gemini_Generated_Image_jgt6smjgt6smjgt6_yhsydv.jpg",
    name: "Ricoh IM 3500",
    price: "KSh 420,000",
    tag: "New",
  },
  {
    image: "https://res.cloudinary.com/gjpfbvzb/image/upload/v1786947865/ChatGPT_Image_Aug_17_2026_09_24_10_AM_simvop.png",
    mobileImage: "https://res.cloudinary.com/gjpfbvzb/image/upload/v1786970005/Gemini_Generated_Image_jgt6smjgt6smjgt6_yhsydv.jpg",
    name: "Ricoh Pro C5300",
    price: "KSh 780,000",
    tag: "Production",
  },
  {
    image: "https://res.cloudinary.com/gjpfbvzb/image/upload/v1786947865/ChatGPT_Image_Aug_17_2026_09_24_10_AM_simvop.png",
    mobileImage: "https://res.cloudinary.com/gjpfbvzb/image/upload/v1786970005/Gemini_Generated_Image_jgt6smjgt6smjgt6_yhsydv.jpg",
    name: "Ricoh MP 2014",
    price: "KSh 190,000",
    tag: "Office",
  },
];

const AUTO_MS = 5000;

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % SLIDES.length);
  }, []);

  // Auto-advance the background carousel; pause while hovering.
  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, AUTO_MS);
    return () => clearInterval(t);
  }, [paused, next, index]);

  const slide = SLIDES[index];

  // Stagger the overlaid copy in once, on load
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  };
  const item = {
    hidden: { y: 24, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section
      className="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background carousel — images crossfade behind everything.
          CSS picks --hero-bg on desktop and --hero-bg-mobile on mobile. */}
      <div className="hero__bg" aria-hidden="true">
        <AnimatePresence>
          <motion.div
            key={index}
            className="hero__slide"
            style={{
              "--hero-bg": `url("${slide.image}")`,
              "--hero-bg-mobile": `url("${slide.mobileImage || slide.image}")`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
        </AnimatePresence>
        {/* subtle left wash so dark text stays legible over any image */}
        <div className="hero__scrim" />
      </div>

      {/* Overlaid copy (left) */}
      <div className="hero__inner">
        <motion.div
          className="hero__copy"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.span className="hero__badge" variants={item}>
            {slide.tag}
          </motion.span>

          <motion.h1 className="hero__title" variants={item}>
            Print smarter.
            <br />
            Work better.
          </motion.h1>

          <motion.p className="hero__desc" variants={item}>
            High-performance printing solutions designed for modern businesses,
            offices and creative environments.
          </motion.p>

          <motion.div className="hero__actions" variants={item}>
            <a href="#products" className="hero__btn hero__btn--primary">
              Explore Printers <FiArrowRight />
            </a>
            <a href="#quote" className="hero__btn hero__btn--ghost">
              Get a Quote
            </a>
          </motion.div>

          {/* Current printer name + price, swaps with the background */}
          <motion.div className="hero__meta" variants={item}>
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.name}
                className="hero__meta-inner"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <span className="hero__meta-name">{slide.name}</span>
                <span className="hero__meta-price">from {slide.price}</span>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* Vertical slide indicators (right edge) */}
      <div className="hero__dots" role="tablist" aria-label="Slides">
        {SLIDES.map((s, i) => (
          <button
            key={s.name}
            className={`hero__dot ${i === index ? "is-active" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Show ${s.name}`}
            aria-selected={i === index}
          />
        ))}
      </div>

      {/* Quick links (bottom-left) */}
      <div className="hero__quicklinks">
        <a href="#features">Features</a>
        <a href="#reviews">Reviews</a>
        <a href="#specs">Technical Specifications</a>
      </div>
    </section>
  );
}