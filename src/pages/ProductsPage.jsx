export default function ProductsPage() {
  return (
    <section
      style={{
        minHeight: "70vh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        padding: "clamp(60px, 12vh, 140px) clamp(16px, 4vw, 40px)",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
      }}
    >
      <div>
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            margin: "0 0 12px",
            color: "#0b0d12",
          }}
        >
          Products
        </h1>
        <p style={{ color: "#6b7280", margin: 0 }}>
          
        </p>
      </div>
    </section>
  );
}