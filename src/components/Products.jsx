import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { PRODUCTS } from "../data/products";
import "../styles/products.css";

export default function Products() {
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scrollByPage = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const card = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="products">
      <div className="products__inner">
        {/* Header + prev/next controls */}
        <motion.div
          className="products__head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div>
            <p className="products__eyebrow">Our range</p>
            <h2 className="products__title">Explore our Ricoh printers</h2>
          </div>
          <div className="products__nav">
            <button
              className="products__arrow"
              onClick={() => scrollByPage(-1)}
              disabled={atStart}
              aria-label="Previous products"
            >
              <FiChevronLeft />
            </button>
            <button
              className="products__arrow"
              onClick={() => scrollByPage(1)}
              disabled={atEnd}
              aria-label="Next products"
            >
              <FiChevronRight />
            </button>
          </div>
        </motion.div>

        {/* Scrollable card track */}
        <motion.div
          className="products__track"
          ref={trackRef}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {PRODUCTS.map((p, i) => (
            <motion.article
              className={`products__card ${i === 0 ? "products__card--peek" : ""}`}
              key={p.id}
              variants={card}
            >
              <div className="products__card-img">
                {/* Image links to the product page */}
                <Link
                  to={`/products/${p.id}`}
                  className="products__card-img-link"
                  aria-label={p.name}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    onError={(e) => {
                      e.currentTarget.style.opacity = 0;
                    }}
                  />
                </Link>
                <button className="products__card-cart" type="button">
                  Add to Cart
                </button>
              </div>
              <div className="products__card-body">
                {/* Title links to the product page */}
                <Link to={`/products/${p.id}`} className="products__card-name-link">
                  <h3 className="products__card-name">{p.name}</h3>
                </Link>
                <span className="products__card-price">{p.price}</span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}