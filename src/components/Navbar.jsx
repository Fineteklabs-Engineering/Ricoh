import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiShoppingCart,
  FiMenu,
  FiX,
  FiChevronDown,
} from "react-icons/fi";
import "../styles/navbar.css";

const NAV_LINKS = [
  { label: "Home", hasMenu: false },
  { label: "Solutions", hasMenu: false },
  { label: "Products", hasMenu: true },
  { label: "Features", hasMenu: false },
  { label: "Contact", hasMenu: false },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Shadow / solid background once the user scrolls past the hero top
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent the page from scrolling behind the open mobile drawer
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="nav-root">
      {/* Main bar */}
      <motion.nav
        className={`nav-bar ${scrolled ? "nav-bar--scrolled" : ""}`}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <a href="#" className="nav-logo">
          <img src="https://res.cloudinary.com/gjpfbvzb/image/upload/v1786967459/b2fbfd8b-17a0-4b9b-8052-11bcc13b0aa8-removebg-preview_awlat9.png" alt="Ricoh" className="nav-logo__img" />
        </a>

        <ul className="nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a href="#">
                {link.label}
                {link.hasMenu && <FiChevronDown className="nav-links__caret" />}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button className="nav-icon" aria-label="Search">
            <FiSearch />
          </button>
          <button className="nav-icon nav-icon--cart" aria-label="Cart">
            <FiShoppingCart />
            <span className="nav-icon__badge">0</span>
          </button>
          <a href="#quote" className="nav-cta">
            Get a Quote
          </a>
          <button
            className="nav-burger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <FiMenu />
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="nav-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              className="nav-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            >
              <div className="nav-drawer__top">
                <span className="nav-logo">
                  <img src="https://res.cloudinary.com/gjpfbvzb/image/upload/v1786967459/b2fbfd8b-17a0-4b9b-8052-11bcc13b0aa8-removebg-preview_awlat9.png" alt="Ricoh" className="nav-logo__img" />
                </span>
                <button
                  className="nav-icon"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <FiX />
                </button>
              </div>

              <ul className="nav-drawer__links">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                  >
                    <a href="#" onClick={() => setMenuOpen(false)}>
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <a
                href="#quote"
                className="nav-cta nav-cta--block"
                onClick={() => setMenuOpen(false)}
              >
                Get a Quote
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}