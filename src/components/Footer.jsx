import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import './Footer.css';
import snazoLogo from '../assets/logos/snazo-footer-logo.png';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const linkStyle = {
    color: "rgba(255, 255, 255, 0.6)",
    lineHeight: "1.8",
    textDecoration: "none",
    display: "block",
    marginBottom: "0.75rem",
    fontSize: "medium",
    transition: "color 0.3s"
  };
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Section 1: Brand Info */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <img
              src={snazoLogo}
              alt="Snazo Logo"
              className="footer-logo-image"
            />
          </div>
          <p className="brand-desc">
            Premium quality products delivered right to your doorstep.
            Experience shopping like never before.
          </p>


          <div className="social-icons">
            <a href="#" className="social-icon"><FaInstagram /></a>
            <a href="#" className="social-icon"><FaTwitter /></a>
            <a href="#" className="social-icon"><FaFacebookF /></a>
            <a href="#" className="social-icon"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Section 2: Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li className='footer-links'><Link to="/" onClick={scrollToTop} style={linkStyle}>Home</Link></li>
            <li><Link to="/products" onClick={scrollToTop} style={linkStyle}>Menu</Link></li>
            <li><Link to="/review" onClick={scrollToTop} style={linkStyle}>Customer Reviews</Link></li>
          </ul>
        </div>

        {/* Section 3: Company */}
        <div className="footer-col">
          <h4>Company</h4>
          <ul>

            <li><Link to="/contact" onClick={scrollToTop} style={linkStyle}>Contact Us</Link></li>
            <li><Link to="/terms" onClick={scrollToTop} style={linkStyle}>Terms & Conditions</Link></li>
            <li><Link to="/partner" onClick={scrollToTop} style={linkStyle}>Partner with us</Link></li>
          </ul>
        </div>

        {/* Section 4: Contact */}
        <div className="footer-col">
          <h4>Get in Touch</h4>
          <p>📍Jig Saw, 5th Floor
            Kandamkulathy Towers
            (Next to Blitz Academy) MG Rd
            Ernakulam, Kerala 682011</p>
          <p>📧 snazosnax@gmail.com</p>
          <p>📞 +91 9539111199</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} SNAZO. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
