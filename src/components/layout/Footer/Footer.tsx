import React, { FC } from "react";
import "./Footer.css";
import {
  FaHome,
  FaPhone,
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import useIntersectionAnimation from "../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";
import { useFooterData } from "../../../core/hooks/useFooterData/useFooterData";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  useIntersectionAnimation(".fade-up-init");

  const { data, isLoading, isError } = useFooterData();
  const currentYear = new Date().getFullYear();

  if (isLoading) return <div>Loading Footer...</div>;
  if (isError || !data) return <div>Failed to load Footer</div>;

  return (
    <footer className="footer-bg">
      <section className="footer-section">
        {/* Company Info */}
        <div className="footer-company fade-up-init">
          <h2 className="footer-title">{data.company.description}</h2>
          <address className="footer-address">
            <div className="footer-location">
              <FaHome aria-hidden="true" /> {data.company.address}
            </div>
            <div className="footer-phone">
              <FaPhone aria-hidden="true" /> {data.company.phone}
            </div>
            <div className="footer-email">
              <MdEmail aria-hidden="true" /> {data.company.email}
            </div>
          </address>
        </div>

        {/* Navigation Links */}
        <nav className="footer-links fade-up-init" aria-label="Quick Links">
          <h3 className="footer-heading">Quick Links</h3>
          <ul>
            {data.links.map((link) => (
              <li key={link.id}>
                <a href={link.href}>{link.title}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Opening Hours */}
        <div className="footer-hours fade-up-init">
          <h3 className="footer-heading">Opening Hours</h3>
          {data.hours.map((hour, idx) => (
            <React.Fragment key={idx}>
              <p>{hour.day}</p>
              <p className="footer-subtext">{hour.time}</p>
            </React.Fragment>
          ))}
        </div>

        {/* Newsletter */}
        <div className="footer-newsletter fade-up-init">
          <h3 className="footer-heading">Newsletter Subscribe</h3>
          <p className="footer-subscribe-text">{data.newsletter.description}</p>
          <form
            className="footer-input-group"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder={data.newsletter.placeholder}
              required
              aria-label="Email input for newsletter subscription"
            />
            <button type="submit" aria-label="Subscribe to newsletter">
              ✉
            </button>
          </form>

          {/* Social Icons */}
          <div className="footer-social-icons" aria-label="Social media links">
            {data.social.map((item) => {
              let IconComponent;
              switch (item.platform.toLowerCase()) {
                case "facebook":
                  IconComponent = FaFacebookF;
                  break;
                case "twitter":
                  IconComponent = FaTwitter;
                  break;
                case "pinterest":
                  IconComponent = FaPinterestP;
                  break;
                case "youtube":
                  IconComponent = FaYoutube;
                  break;
                default:
                  return null;
              }
              return (
                <a key={item.id} href={item.href} aria-label={item.platform}>
                  <IconComponent />
                </a>
              );
            })}
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-copy fade-up-init">
          © {currentYear} {data.company.name} | Designed by{" "}
          <a
            href="https://github.com/ayoubakbartabar"
            className="developer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ayoub Akbartabar
          </a>{" "}
          | Powered by Webflow
        </div>
      </section>
    </footer>
  );
};

export default Footer;
