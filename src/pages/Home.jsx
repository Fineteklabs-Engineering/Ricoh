import Feature from "../components/Feature";
import Products from "../components/Products";
import HeroSection from "../components/HeroSection";
import MoreThanPrinter from "../components/MoreThanPrinter";
import CTA from "../components/CTA";
import WhyRicoh from "../components/WhyRicoh";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Feature />
      <Products />
      <MoreThanPrinter />
      <WhyRicoh />
      <CTA />
    </>
  );
}