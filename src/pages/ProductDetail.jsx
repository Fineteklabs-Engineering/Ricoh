import { useParams, Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import Detail from "../components/Detail";
import AdditionalInfo from "../components/AdditionalInfo";
import RelatedProducts from "../components/RelatedProducts";

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <section
        style={{
          textAlign: "center",
          padding: "clamp(60px, 12vh, 140px) clamp(16px, 4vw, 40px)",
          fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        }}
      >
        <h1 style={{ color: "#0b0d12", margin: "0 0 10px" }}>Product not found</h1>
        <p style={{ color: "#6b7280", margin: "0 0 20px" }}>
          We couldn&apos;t find that printer.
        </p>
        <Link to="/products" style={{ color: "#00aeef", fontWeight: 600, textDecoration: "none" }}>
          ← Back to all products
        </Link>
      </section>
    );
  }

  return (
    <>
      <Detail product={product} />
      <AdditionalInfo product={product} />
      <RelatedProducts key={product.id} currentId={product.id} />
    </>
  );
}