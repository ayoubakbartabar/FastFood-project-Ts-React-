import React from "react";
import type {FC} from "react";

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

// Types
interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  // Animate all elements with class .fade-up-init
  useIntersectionAnimation(".fade-up-init");

  return (
    <footer className="footer-bg">
      <section className="footer-section">
        {/* Brand & Address */}
        <div className="footer-company fade-up-init">
          <h2 className="footer-title">
            Elevate bites, build community, deliver culinary excellence with
            FastFood TNC
          </h2>
          <address className="footer-address">
            <div className="footer-location">
              <FaHome /> 4XX7 Washington Ave. Manchester, Kentucky 39495.
            </div>
            <div className="footer-phone">
              <FaPhone /> (406) 5XX-012X
            </div>
            <div className="footer-email">
              <MdEmail /> exampleX@gmail.com
            </div>
          </address>
        </div>

        {/* Navigation Links */}
        <nav className="footer-links fade-up-init" aria-label="Quick Links">
          <h3 className="footer-heading">Quick Links</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/shop">Shop</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
            <li>
              <a href="/contact-us">Contact US</a>
            </li>
          </ul>
        </nav>

        {/* Business Hours */}
        <div className="footer-hours fade-up-init">
          <h3 className="footer-heading">Opening Hours</h3>
          <p>Monday to Friday</p>
          <p className="footer-subtext">10:00 AM to 12:00 PM</p>
          <p>Saturday</p>
          <p className="footer-subtext">12:00 PM to 6:00 PM</p>
        </div>

        {/* Newsletter Subscription */}
        <div className="footer-newsletter fade-up-init">
          <h3 className="footer-heading">Newsletter Subscribe</h3>
          <p className="footer-subscribe-text">
            Stay in the loop: unlock exclusive offers, culinary insights, and
            more.
          </p>
          <form
            className="footer-input-group"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
              e.preventDefault()
            }
          >
            <input
              type="email"
              placeholder="Your Email"
              required
              aria-label="Email input for newsletter subscription"
            />
            <button type="submit" aria-label="Subscribe to newsletter">
              ✉
            </button>
          </form>
          <div className="footer-social-icons" aria-label="Social media links">
            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Pinterest">
              <FaPinterestP />
            </a>
            <a href="#" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-copy fade-up-init">
          © {new Date().getFullYear()} FastFood TNC | Designed by{" "}
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
