import { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiShoppingCart, FiHeart } from "react-icons/fi";
import "../styles/detail.css";

const formatPrice = (price) => {
  const n = Number(String(price).replace(/[^\d]/g, ""));
  return "KSh " + n.toLocaleString() + ".00";
};

export default function Detail({ product }) {
  const [qty, setQty] = useState(1);

  return (
    <section className="pd">
      <div className="pd__top">
       
        <motion.div
          className="pd__media"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.style.opacity = 0;
            }}
          />
        </motion.div>

       
        <motion.div
          className="pd__info"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          <span className="pd__cat">All</span>
          <h1 className="pd__title">{product.name}</h1>

          <div className="pd__divider" />

          <div className="pd__price-row">
            <span className="pd__price">{formatPrice(product.price)}</span>
            <span className="pd__stock">In Stock</span>
          </div>

          <div className="pd__notice">
            <FiShoppingCart />
            <span>
              This product has been added to <strong>2 people&apos;s</strong> carts.
            </span>
          </div>

          <div className="pd__actions">
            <div className="pd__qty">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                <FiChevronLeft />
              </button>
              <span>{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
              >
                <FiChevronRight />
              </button>
            </div>
            <button type="button" className="pd__btn pd__btn--cart">
              Add to cart
            </button>
          </div>

          <div className="pd__buy-row">
            <button type="button" className="pd__btn pd__btn--buy">
              Buy Now
            </button>
            <button type="button" className="pd__wish" aria-label="Add to wishlist">
              <FiHeart />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}