import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "../styles/products.css";


const PRODUCTS = [
  { image: "https://res.cloudinary.com/gjpfbvzb/image/upload/v1786955250/9cb19efc-f9a1-430b-9b1d-bb92bac572af-16.jpg_1_sr0dv7.webp", category: "MFP", name: "Ricoh Aficio IM3500 A3 Mono Laser MFP Printer", price: "KSh 420,000" },
  { image: "https://res.cloudinary.com/gjpfbvzb/image/upload/v1786955340/c096f0bc-76c5-486b-9138-8dc455f7cb3e-17.jpg_tab1te.webp", category: "Production", name: "Ricoh Aficio IM4000A A3 Mono Laser MFP Printer", price: "KSh 525,000" },
  { image: "https://res.cloudinary.com/gjpfbvzb/image/upload/v1786955461/a2f91a72-d91f-4732-affa-23253b069eac-10.jpg_lz0ocg.webp", category: "Office", name: "Ricoh Aficio MP C2003 A3 Color Laser MFP Printer", price: "KSh 65,000" },
  { image: "https://res.cloudinary.com/gjpfbvzb/image/upload/v1786955555/35c726ec-6d5d-4e73-a88b-d695701bf2bc-9.jpg_v08hc0.webp", category: "Colour", name: "Ricoh Aficio MP C2504 A3 Color Laser MFP Printer", price: "KSh 75,000" },
  { image: "https://res.cloudinary.com/gjpfbvzb/image/upload/v1786955617/117143d0-d615-4852-969c-1cbcbd91c101-9.jpg_erxwzk.webp", category: "MFP", name: "Ricoh Aficio MP C6003 A3 Color Laser MFP Printer", price: "KSh 135,000" },
  { image: "https://res.cloudinary.com/gjpfbvzb/image/upload/v1786955746/d5f14fce-3a99-43a2-94b5-1a5278f58b97-10.jpg_qwrghr.webp", category: "Desktop", name: "Ricoh Aficio MPC 2051 A3 Color Laser MFP Printer", price: "KSh 70,000" },
  { image: "https://res.cloudinary.com/gjpfbvzb/image/upload/v1786955824/ea9ae4ec-8204-4d13-83c7-8c099a8cf33b-9.jpg_vexz9v.webp", category: "Colour", name: "Ricoh Aficio MPC2004 A3 Color Laser MFP Printer", price: "KSh 70,000" },
  { image: "https://res.cloudinary.com/gjpfbvzb/image/upload/v1786955887/6c07c090-383e-4c3e-84c6-d731d1ec4eea-7-600x600.png_mvwqqf.webp", category: "Production", name: "Ricoh Aficio MPC2503 A3 Color Laser MFP Printer", price: "KSh 70,000" },
  { image: "https://res.cloudinary.com/gjpfbvzb/image/upload/v1786956008/51075a66-3869-4ab4-93ab-6c1d7b5c0c82-10.jpg_cqzqts.webp", category: "Office", name: "Ricoh Aficio MPC2551 A3 Color Laser MFP Printer", price: "KSh 75,000" },
  { image: "https://res.cloudinary.com/gjpfbvzb/image/upload/v1786956071/072138b6-c94b-4c70-b0e7-afaafab313f1-10.jpg_xsyttx.webp", category: "Wide Format", name: "Ricoh Aficio MPC307 A4 Color Laser MFP Printer", price: "KSh 55,000" },
  { image: "https://res.cloudinary.com/gjpfbvzb/image/upload/v1786956224/57851560-1035-4492-a236-17e0861bf440-10.jpg_s9ieuu.webp", category: "Desktop", name: "Ricoh Aficio MPC401 A4 MFP Color Laser Printer", price: "KSh 65,000" },
  { image: "https://res.cloudinary.com/gjpfbvzb/image/upload/v1786956325/b09c567f-7881-4101-ac85-e80c8a33afcc-10.png_yemwls.webp", category: "Colour", name: "Ricoh M2700 A3 Mono Laser MFP Printer", price: "KSh 35,000" },
  { image: "https://res.cloudinary.com/gjpfbvzb/image/upload/v1786956419/0e2eb525-5451-4feb-8c15-a880208ebfec-12.jpg_mlsfwu.webp", category: "MFP", name: "Ricoh IM 6000 A3 Mono Laser MFP", price: "KSh 100,000" },
  { image: "https://res.cloudinary.com/gjpfbvzb/image/upload/v1786956481/2e77ce9d-454f-49c7-ac38-046ba570e3fd-12.png_ycgkzo.webp", category: "Office", name: "Ricoh MP 2555 A3 Mono Multifunction", price: "KSh 38,000" },
];

export default function Products() {
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Dim the arrows at each end so users aren't clicking into nothing
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

  // Page by ~one screenful of cards; scroll-snap lands it on a card edge
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
              key={i}
              variants={card}
            >
              <div className="products__card-img">
                <img
                  src={p.image}
                  alt={p.name}
                  onError={(e) => {
                    e.currentTarget.style.opacity = 0;
                  }}
                />
                {/* Pink Add to Cart — appears on card hover (always shown on the first card) */}
                <button className="products__card-cart" type="button">
                  Add to Cart
                </button>
              </div>
              <div className="products__card-body">
                <h3 className="products__card-name">{p.name}</h3>
                <span className="products__card-price">{p.price}</span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}