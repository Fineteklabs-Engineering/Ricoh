import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";

export default function App() {
  return (
    <Routes>
     <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<ProductsPage />} />
     </Route>
    </Routes>
  );
}