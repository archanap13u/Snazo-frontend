import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact-page">
      <div className="contact-container">

        <div className="section-header">
          <div className="section-label">Get in Touch</div>
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle">We'd love to hear from you</p>
        </div>

        <div className="contact-grid">
          {/* Address Card */}
          <div className="contact-card">
            <div className="contact-icon">📍</div>
            <div className="contact-title">Our Address</div>
            <div className="contact-content">
              Jig Saw, 5th Floor<br />
              Kandamkulathy Towers <br />
              (Next to Blitz Academy) MG Rd<br />
              Ernakulam, Kerala 682011
            </div>
          </div>

          {/* Phone Card */}
          <div className="contact-card">
            <div className="contact-icon">📞</div>
            <div className="contact-title">Phone Number</div>
            <div className="contact-content">
              <a href="tel:+919876543210" className="contact-link">+91 98765 43210</a><br />
              <a href="tel:+918765432109" className="contact-link">+91 87654 32109</a><br />
              <small className="contact-small">Mon–Sat: 9AM–8PM</small>
            </div>
          </div>

          {/* Email Card */}
          <div className="contact-card">
            <div className="contact-icon">📧</div>
            <div className="contact-title">Email Us</div>
            <div className="contact-content">
              <a href="mailto:hello@snazo.com" className="contact-link">hello@snazo.com</a><br />
              <a href="mailto:orders@snazo.com" className="contact-link">orders@snazo.com</a><br />
              <small className="contact-small">We reply within 24 hours</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;