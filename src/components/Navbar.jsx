import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, Link } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { PRODUCTS } from "../data/products";
import "../styles/navbar.css";

const LOGO =
  "https://res.cloudinary.com/gjpfbvzb/image/upload/v1786967459/b2fbfd8b-17a0-4b9b-8052-11bcc13b0aa8-removebg-preview_awlat9.png";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Solutions", to: null },
  { label: "Products", to: "/products" },
  { label: "Features", to: null },
  { label: "Contact", to: null },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
  };

  // Shadow / solid background once the user scrolls past the hero top
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the drawer or search overlay is open
  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, searchOpen]);

  // Close search on Escape
  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeSearch();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  const q = query.trim().toLowerCase();
  const results = q
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.model.toLowerCase().includes(q)
      )
    : [];

  return (
    <header className="nav-root">
      {/* Main bar */}
      <motion.nav
        className={`nav-bar ${scrolled ? "nav-bar--scrolled" : ""}`}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Link to="/" className="nav-logo">
          <img src={LOGO} alt="Ricoh" className="nav-logo__img" />
        </Link>

        <ul className="nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              {link.to ? (
                <NavLink to={link.to} end={link.to === "/"}>
                  {link.label}
                </NavLink>
              ) : (
                <a href="#">{link.label}</a>
              )}
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button
            className="nav-icon"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
          >
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

      {/* Search overlay (drops from the top) */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              className="nav-search-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSearch}
            />
            <motion.div
              className="nav-search"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            >
              <div className="nav-search__bar">
                <input
                  className="nav-search__input"
                  type="text"
                  placeholder="Search printers..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                />
                <button
                  className="nav-search__close"
                  onClick={closeSearch}
                  aria-label="Close search"
                >
                  <FiX />
                </button>
              </div>

              {q && (
                <div className="nav-search__results">
                  {results.length > 0 ? (
                    results.map((p) => (
                      <Link
                        key={p.id}
                        to={`/products/${p.id}`}
                        className="nav-search__result"
                        onClick={closeSearch}
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          onError={(e) => {
                            e.currentTarget.style.opacity = 0;
                          }}
                        />
                        <div className="nav-search__result-info">
                          <span className="nav-search__result-name">{p.name}</span>
                          <span className="nav-search__result-price">{p.price}</span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="nav-search__empty">
                      No products found for &ldquo;{query}&rdquo;
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
                <Link
                  to="/"
                  className="nav-logo"
                  onClick={() => setMenuOpen(false)}
                >
                  <img src={LOGO} alt="Ricoh" className="nav-logo__img" />
                </Link>
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
                    {link.to ? (
                      <NavLink
                        to={link.to}
                        end={link.to === "/"}
                        onClick={() => setMenuOpen(false)}
                      >
                        {link.label}
                      </NavLink>
                    ) : (
                      <a href="#" onClick={() => setMenuOpen(false)}>
                        {link.label}
                      </a>
                    )}
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