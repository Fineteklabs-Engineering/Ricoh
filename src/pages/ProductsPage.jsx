import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiChevronDown,
  FiGrid,
  FiList,
  FiX,
  FiEye,
  FiHeart,
  FiSliders,
} from "react-icons/fi";
import { PRODUCTS } from "../data/products";
import "../styles/product-page.css";

const parsePrice = (p) => Number(String(p).replace(/[^\d]/g, ""));
const formatKSh = (n) => "KSh " + n.toLocaleString();
const uniq = (arr) => [...new Set(arr)];

const ALL_OPTIONS = ["All"];
const CONDITIONS = uniq(PRODUCTS.map((p) => p.condition));
const FUNCTIONS = uniq(PRODUCTS.map((p) => p.function));
const TYPES = uniq(PRODUCTS.map((p) => p.type));
const MODELS = uniq(PRODUCTS.map((p) => p.model));
const SPEEDS = uniq(PRODUCTS.map((p) => p.printSpeed)).sort(
  (a, b) => parseInt(a) - parseInt(b)
);
const PRICE_MIN = Math.min(...PRODUCTS.map((p) => parsePrice(p.price)));
const PRICE_MAX = Math.max(...PRODUCTS.map((p) => parsePrice(p.price)));
const PRICE_STEP = 5000;

function FilterGroup({ title, field, options, selected, onToggle, open, onOpen }) {
  return (
    <div className="pp-filter">
      <button
        type="button"
        className="pp-filter__head"
        onClick={onOpen}
        aria-expanded={open}
      >
        <span>{title}</span>
        <FiChevronDown className={`pp-filter__chev ${open ? "is-open" : ""}`} />
      </button>
      {open && (
        <div className="pp-filter__body">
          {options.map((opt) => (
            <label className="pp-check" key={opt}>
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => onToggle(field, opt)}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [sel, setSel] = useState(() => ({
    category: [],
    condition: searchParams.get("condition")
      ? [searchParams.get("condition")]
      : [],
    printSpeed: [],
    model: [],
    type: searchParams.get("type") ? [searchParams.get("type")] : [],
    function: [],
  }));
  const [price, setPrice] = useState({ min: PRICE_MIN, max: PRICE_MAX });
  const [draft, setDraft] = useState({ min: PRICE_MIN, max: PRICE_MAX });
  const [sort, setSort] = useState("relevance");
  const [view, setView] = useState("grid");
  const [open, setOpen] = useState({
    category: true,
    condition: true,
    printSpeed: false,
    model: false,
    type: true,
    function: true,
    price: true,
  });
  const [showFilters, setShowFilters] = useState(false);

  // Keep the condition/type filters in sync with the URL query — e.g. the
  // navbar "New Printers" / "Mono Laser" links. Also covers clicking those
  // links while already on this page (the query changes without a remount).
  useEffect(() => {
    const condition = searchParams.get("condition");
    const type = searchParams.get("type");
    setSel((s) => ({
      ...s,
      condition: condition ? [condition] : [],
      type: type ? [type] : [],
    }));
  }, [searchParams]);

  const toggle = (field, value) =>
    setSel((s) => ({
      ...s,
      [field]: s[field].includes(value) ? [] : [value],
    }));

  const toggleOpen = (key) => setOpen((o) => ({ ...o, [key]: !o[key] }));

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      // "All" matches every product, so the category filter never excludes
      if (sel.category.length && !sel.category.includes("All")) return false;
      if (sel.condition.length && !sel.condition.includes(p.condition)) return false;
      if (sel.printSpeed.length && !sel.printSpeed.includes(p.printSpeed)) return false;
      if (sel.model.length && !sel.model.includes(p.model)) return false;
      if (sel.type.length && !sel.type.includes(p.type)) return false;
      if (sel.function.length && !sel.function.includes(p.function)) return false;
      const pr = parsePrice(p.price);
      if (pr < price.min || pr > price.max) return false;
      return true;
    });
    if (sort === "price-asc")
      list = [...list].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    else if (sort === "price-desc")
      list = [...list].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    return list;
  }, [sel, price, sort]);

  const hasFilters =
    sel.category.length ||
    sel.condition.length ||
    sel.printSpeed.length ||
    sel.model.length ||
    sel.type.length ||
    sel.function.length ||
    price.min !== PRICE_MIN ||
    price.max !== PRICE_MAX;

  const clearFilters = () => {
    setSel({
      category: [],
      condition: [],
      printSpeed: [],
      model: [],
      type: [],
      function: [],
    });
    setPrice({ min: PRICE_MIN, max: PRICE_MAX });
    setDraft({ min: PRICE_MIN, max: PRICE_MAX });
    setSort("relevance");
    setSearchParams({});
  };

  const minPct = ((draft.min - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  const maxPct = ((draft.max - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  return (
    <section className="pp">
      <h1 className="pp__title">Ricoh Printers</h1>

      <button
        type="button"
        className="pp__filters-toggle"
        onClick={() => setShowFilters((v) => !v)}
      >
        <FiSliders /> Filters
      </button>

      <div className="pp__body">
        {/*  Sidebar  */}
        <aside className={`pp__sidebar ${showFilters ? "is-open" : ""}`}>
          <h2 className="pp__filters-title">Filters</h2>

          <FilterGroup
            title="All"
            field="category"
            options={ALL_OPTIONS}
            selected={sel.category}
            onToggle={toggle}
            open={open.category}
            onOpen={() => toggleOpen("category")}
          />
          <FilterGroup
            title="Condition"
            field="condition"
            options={CONDITIONS}
            selected={sel.condition}
            onToggle={toggle}
            open={open.condition}
            onOpen={() => toggleOpen("condition")}
          />
          <FilterGroup
            title="Print Speed"
            field="printSpeed"
            options={SPEEDS}
            selected={sel.printSpeed}
            onToggle={toggle}
            open={open.printSpeed}
            onOpen={() => toggleOpen("printSpeed")}
          />
          <FilterGroup
            title="Model"
            field="model"
            options={MODELS}
            selected={sel.model}
            onToggle={toggle}
            open={open.model}
            onOpen={() => toggleOpen("model")}
          />
          <FilterGroup
            title="Type"
            field="type"
            options={TYPES}
            selected={sel.type}
            onToggle={toggle}
            open={open.type}
            onOpen={() => toggleOpen("type")}
          />
          <FilterGroup
            title="Function"
            field="function"
            options={FUNCTIONS}
            selected={sel.function}
            onToggle={toggle}
            open={open.function}
            onOpen={() => toggleOpen("function")}
          />

          {/* Price */}
          <div className="pp-filter">
            <button
              type="button"
              className="pp-filter__head"
              onClick={() => toggleOpen("price")}
              aria-expanded={open.price}
            >
              <span>Filter by price</span>
              <FiChevronDown
                className={`pp-filter__chev ${open.price ? "is-open" : ""}`}
              />
            </button>
            {open.price && (
              <div className="pp-filter__body">
                <div className="pp-price__inputs">
                  <label>
                    <span>Min price</span>
                    <input
                      type="number"
                      min={PRICE_MIN}
                      max={draft.max}
                      value={draft.min}
                      onChange={(e) =>
                        setDraft((d) => ({
                          ...d,
                          min: Math.min(
                            Number(e.target.value) || PRICE_MIN,
                            d.max - PRICE_STEP
                          ),
                        }))
                      }
                    />
                  </label>
                  <span className="pp-price__dash">–</span>
                  <label>
                    <span>Max price</span>
                    <input
                      type="number"
                      min={draft.min}
                      max={PRICE_MAX}
                      value={draft.max}
                      onChange={(e) =>
                        setDraft((d) => ({
                          ...d,
                          max: Math.max(
                            Number(e.target.value) || PRICE_MAX,
                            d.min + PRICE_STEP
                          ),
                        }))
                      }
                    />
                  </label>
                </div>

                <div className="pp-price__slider">
                  <div className="pp-price__track" />
                  <div
                    className="pp-price__fill"
                    style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
                  />
                  <input
                    type="range"
                    className="pp-price__range"
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    step={PRICE_STEP}
                    value={draft.min}
                    onChange={(e) =>
                      setDraft((d) => ({
                        ...d,
                        min: Math.min(Number(e.target.value), d.max - PRICE_STEP),
                      }))
                    }
                    aria-label="Minimum price"
                  />
                  <input
                    type="range"
                    className="pp-price__range"
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    step={PRICE_STEP}
                    value={draft.max}
                    onChange={(e) =>
                      setDraft((d) => ({
                        ...d,
                        max: Math.max(Number(e.target.value), d.min + PRICE_STEP),
                      }))
                    }
                    aria-label="Maximum price"
                  />
                </div>

                <button
                  type="button"
                  className="pp-price__btn"
                  onClick={() => setPrice({ min: draft.min, max: draft.max })}
                >
                  Filter
                </button>
                <p className="pp-price__label">
                  Price: {formatKSh(draft.min)} — {formatKSh(draft.max)}
                </p>
              </div>
            )}
          </div>
        </aside>

        {/* ---------- Main ---------- */}
        <div className="pp__main">
          <div className="pp__toolbar">
            <div className="pp__toolbar-left">
              {hasFilters ? (
                <button type="button" className="pp__clear" onClick={clearFilters}>
                  <FiX /> Clear filters
                </button>
              ) : null}
              <span className="pp__count">
                {filtered.length > 0
                  ? `Showing 1–${filtered.length} of ${filtered.length} results`
                  : "No products match your filters"}
              </span>
            </div>

            <div className="pp__toolbar-right">
              <div className="pp__views">
                <button
                  type="button"
                  className={`pp__view ${view === "grid" ? "is-active" : ""}`}
                  onClick={() => setView("grid")}
                  aria-label="Grid view"
                >
                  <FiGrid />
                </button>
                <button
                  type="button"
                  className={`pp__view ${view === "list" ? "is-active" : ""}`}
                  onClick={() => setView("list")}
                  aria-label="List view"
                >
                  <FiList />
                </button>
              </div>
              <label className="pp__sort">
                <span>Sort:</span>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="relevance">Relevance</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </label>
            </div>
          </div>

          <motion.div
            className={`pp__grid ${view === "list" ? "pp__grid--list" : ""}`}
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
          >
            {filtered.map((p) => (
              <motion.article
                key={p.id}
                className="pp-card"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
              >
                <div className="pp-card__img">
                  <button className="pp-card__eye" type="button" aria-label="Quick view">
                    <FiEye />
                  </button>
                  {/* Image links to the product page */}
                  <Link
                    to={`/products/${p.id}`}
                    className="pp-card__img-link"
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
                  <button className="pp-card__cart" type="button">
                    Add to cart
                  </button>
                </div>
                <div className="pp-card__body">
                  <div className="pp-card__meta">
                    <span className="pp-card__cat">All</span>
                    <button
                      className="pp-card__heart"
                      type="button"
                      aria-label="Add to wishlist"
                    >
                      <FiHeart />
                    </button>
                  </div>
                  {/* Title links to the product page */}
                  <Link to={`/products/${p.id}`} className="pp-card__name-link">
                    <h3 className="pp-card__name">{p.name}</h3>
                  </Link>
                  <span className="pp-card__price">{p.price}</span>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}