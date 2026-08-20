import { useState } from "react";
import "../styles/additional-info.css";

const TABS = ["Description", "Additional information", "Reviews (0)"];

export default function AdditionalInfo({ product }) {
  const [tab, setTab] = useState("Description");

  // Some specs come from the product; the rest are shared defaults (not in the
  // data file yet) — add them per-product in products.js if you want them exact.
  const specs = [
    { label: "Brand", value: "Ricoh" },
    { label: "Model", value: product.model },
    { label: "Condition", value: product.condition },
    { label: "Type", value: product.type },
    { label: "Print Speed", value: product.printSpeed },
    { label: "Function", value: product.function },
    { label: "Paper Size", value: "SRA3/A3/A4/A5/A6" },
    { label: "Adf", value: "YES" },
    { label: "Duplex", value: "YES" },
    { label: "Connectivity", value: "Network/USB" },
    { label: "Resolution", value: "1200×1200" },
  ];

  const description = `The ${product.name} is a versatile office machine built to simplify how teams handle everyday document management. It delivers ${product.type.toLowerCase()} output at ${product.printSpeed}, combining ${product.function.toLowerCase()} in a single device — reliable, efficient, and ready for any workspace.`;

  const SpecTable = ({ striped }) => (
    <table className={`ai__table ${striped ? "ai__table--striped" : ""}`}>
      <tbody>
        {specs.map((s) => (
          <tr key={s.label}>
            <th>{s.label}</th>
            <td>{s.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <section className="ai">
      <div className="ai__tabs">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            className={`ai__tab ${tab === t ? "is-active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="ai__panel">
        {tab === "Description" && (
          <>
            <h2 className="ai__heading">Specifications</h2>
            <SpecTable />
            <h3 className="ai__subhead">{product.name} for sale in Kenya</h3>
            <p className="ai__desc">{description}</p>
          </>
        )}

        {tab === "Additional information" && <SpecTable striped />}

        {tab === "Reviews (0)" && (
          <p className="ai__empty">There are no reviews yet.</p>
        )}
      </div>
    </section>
  );
}