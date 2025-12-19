import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Partner.css';
import PartnerModal from '../components/PartnerModal';

const Partner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="partner-page">
      <PartnerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* Hero Section */}
      <section className="partner-hero">
        <div className="hero-content">
          <span className="hero-badge" style={{ backgroundColor: 'orange', color: 'white' }}>🚀 BECOME A PARTNER</span>
          <h1>Grow Your Business With <span className="highlight">SNAZO</span></h1>
          <p className="hero-subtitle">Join India's fastest-growing Ready to eat food network. Get access to premium products,
            dedicated support, and unlimited growth potential.</p>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">1000+</span>
              <span className="stat-label">Partners</span>
            </div>
            <div className="stat">
              <span className="stat-number">₹20Cr+</span>
              <span className="stat-label">Revenue</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Cities</span>
            </div>
          </div>

          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => setIsModalOpen(true)}>Start Partnership</button>
            <Link to="/contact" className="btn-secondary">Talk to Sales</Link>
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="why-partner">
        <h2>Why Partner With Us?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">📈</div>
            <h3>High Margins</h3>
            <p>Earn attractive margins on every order with our competitive pricing structure.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🚚</div>
            <h3>Free Delivery</h3>
            <p>We handle all logistics with our cold chain network at no extra cost.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">📱</div>
            <h3>Easy Dashboard</h3>
            <p>Manage orders, track sales, and grow your business with our simple app.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🎯</div>
            <h3>Marketing Support</h3>
            <p>Get featured on our platform and reach thousands of customers daily.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>Get Started in 3 Easy Steps</h2>
        <div className="steps-row">
          <div className="step-card">
            <div className="step-number">1</div>
            <h4>Apply Online</h4>
            <p>Fill a quick form with your business details</p>
          </div>
          <div className="step-divider">→</div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h4>Get Verified</h4>
            <p>Our team verifies your documents in 24 hours</p>
          </div>
          <div className="step-divider">→</div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h4>Start Earning</h4>
            <p>Go live and start receiving orders immediately</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="partner-cta">
        <div className="cta-box">
          <h2>Ready to Partner?</h2>
          <p>Join the SNAZO family and take your business to the next level.</p>
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>Apply Now - It's Free</button>
        </div>
      </section>
    </div>
  );
};

export default Partner;