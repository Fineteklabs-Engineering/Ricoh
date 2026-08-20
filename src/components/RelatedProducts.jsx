import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiEye, FiHeart } from "react-icons/fi";
import { PRODUCTS } from "../data/products";
import "../styles/related-products.css";

const formatPrice = (price) => {
  const n = Number(String(price).replace(/[^\d]/g, ""));
  return "KSh " + n.toLocaleString() + ".00";
};

export default function RelatedProducts({ currentId }) {
  // Show up to 4 other products. Swap this for same-category logic if you like.
  const related = PRODUCTS.filter((p) => p.id !== currentId).slice(0, 4);

  return (
    <section className="rp">
      <h2 className="rp__title">Related products</h2>

      <motion.div
        className="rp__grid"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      >
        {related.map((p) => (
          <motion.article
            className="rp-card"
            key={p.id}
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
          >
            <div className="rp-card__img">
              <button className="rp-card__eye" type="button" aria-label="Quick view">
                <FiEye />
              </button>
              <Link
                to={`/products/${p.id}`}
                className="rp-card__img-link"
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
              <button className="rp-card__cart" type="button">
                Add to cart
              </button>
            </div>
            <div className="rp-card__body">
              <div className="rp-card__meta">
                <span className="rp-card__cat">All</span>
                <button
                  className="rp-card__heart"
                  type="button"
                  aria-label="Add to wishlist"
                >
                  <FiHeart />
                </button>
              </div>
              <Link to={`/products/${p.id}`} className="rp-card__name-link">
                <h3 className="rp-card__name">{p.name}</h3>
              </Link>
              <span className="rp-card__price">{formatPrice(p.price)}</span>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}