import { motion } from "framer-motion";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";
import "../styles/footer.css";

const LINKS = ["Solutions", "products", "Services", "Support", "Contact"];
const SOCIALS = [
  { Icon: FiFacebook, label: "Facebook", href: "#" },
  { Icon: FiTwitter, label: "Twitter", href: "#" },
  { Icon: FiInstagram, label: "Instagram", href: "#" },
  { Icon: FiLinkedin, label: "LinkedIn", href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <motion.div
        className="footer__inner"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#" className="footer__logo">
              <img src="https://res.cloudinary.com/gjpfbvzb/image/upload/v1786967459/b2fbfd8b-17a0-4b9b-8052-11bcc13b0aa8-removebg-preview_awlat9.png" alt="Ricoh" className="footer__logo__img" />
            </a>
            <p className="footer__tagline">Print smarter. Work better.</p>
          </div>

          <nav className="footer__links" aria-label="Footer">
            {LINKS.map((l) => (
              <a href="" key={l}>
                {l}
              </a>
            ))}
          </nav>
        </div>



        <div className="footer__divider" />

        <div className="footer__bottom">
          <p className="footer__copy">
            © {year} Ricoh Printers. All rights reserved.
          </p>
          <div className="footer__socials">
            {SOCIALS.map(({ Icon, label, href }) => (
              <a
                href={href}
                key={label}
                aria-label={label}
                className="footer__social"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
}