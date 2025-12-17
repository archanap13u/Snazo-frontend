import React, { useState } from 'react';
import './Terms.css';
import FaqSection from '../components/FaqSection';
import CookingSection from '../components/CookingSection';
const Terms = () => {
  const [activeTab, setActiveTab] = useState('privacy');

  const handleTabClick = (category) => {
    setActiveTab(category);
  };

  return (
    <section className="section legal-section" id="legal">
      <CookingSection/>
      <FaqSection/>
      <div className="section-header">
        <div className="section-label">Legal Information</div>
        <h2 className="section-title">Policies & Terms</h2>
        <p className="section-subtitle">Important information about our services and your rights</p>
      </div>
     
      <div className="legal-tabs">
        <button 
          className={`legal-tab ${activeTab === 'privacy' ? 'active' : ''}`} 
          data-category="privacy"
          onClick={() => handleTabClick('privacy')}
        >
          Privacy Policy
        </button>
        <button 
          className={`legal-tab ${activeTab === 'terms' ? 'active' : ''}`} 
          data-category="terms"
          onClick={() => handleTabClick('terms')}
        >
          Terms of Service
        </button>
        <button 
          className={`legal-tab ${activeTab === 'refund' ? 'active' : ''}`} 
          data-category="refund"
          onClick={() => handleTabClick('refund')}
        >
          Refund Policy
        </button>
        <button 
          className={`legal-tab ${activeTab === 'cookies' ? 'active' : ''}`} 
          data-category="cookies"
          onClick={() => handleTabClick('cookies')}
        >
          Cookie Policy
        </button>
      </div>
     
      <div className={`legal-content ${activeTab === 'privacy' ? 'active' : ''}`} id="privacy">
        <div className="legal-card">
          <h3>Privacy Policy</h3>
          <p>At Snazo, we are committed to protecting your privacy and personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our website and services.</p>
         
          <h4>Information We Collect</h4>
          <p>We may collect the following types of information:</p>
          <ul>
            <li>Personal identification information (Name, email address, phone number, etc.)</li>
            <li>Payment information (credit card details, billing address)</li>
            <li>Delivery information (shipping address, delivery preferences)</li>
            <li>Usage data (how you interact with our website and services)</li>
            <li>Device information (IP address, browser type, operating system)</li>
          </ul>
         
          <h4>How We Use Your Information</h4>
          <p>We use your information to:</p>
          <ul>
            <li>Process and fulfill your orders</li>
            <li>Provide customer support</li>
            <li>Improve our products and services</li>
            <li>Send you marketing communications (with your consent)</li>
            <li>Comply with legal obligations</li>
          </ul>
         
          <h4>Data Protection</h4>
          <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
         
          <h4>Your Rights</h4>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your personal information</li>
            <li>Object to processing of your personal information</li>
            <li>Data portability</li>
          </ul>
        </div>
      </div>
     
      <div className={`legal-content ${activeTab === 'terms' ? 'active' : ''}`} id="terms">
        <div className="legal-card">
          <h3 >Terms of Service</h3>
          <p>These Terms of Service govern your use of the Snazo website and our services. By accessing or using our services, you agree to be bound by these terms.</p>
         
          <h4>Account Registration</h4>
          <p>To access certain features of our website, you must register for an account. You agree to:</p>
          <ul>
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain and update your account information</li>
            <li>Maintain the security of your password</li>
            <li>Accept responsibility for all activities under your account</li>
          </ul>
         
          <h4>Product Information</h4>
          <p>We strive to be as accurate as possible in the descriptions of our products. However, we do not warrant that product descriptions, colors, or other content are accurate, complete, reliable, current, or error-free.</p>
         
          <h4>Pricing and Payment</h4>
          <p>All prices are displayed in your local currency and are subject to change without notice. We accept various payment methods as listed on our website. By providing payment information, you represent that you are authorized to use the payment method.</p>
         
          <h4>Delivery</h4>
          <p>Delivery times are estimates and cannot be guaranteed. We are not liable for any delays in shipments. Risk of loss for products passes to you upon our delivery to the carrier.</p>
         
          <h4>Intellectual Property</h4>
          <p>All content on this website, including text, graphics, logos, images, and software, is the property of Snazo or its content suppliers and is protected by intellectual property laws.</p>
        </div>
      </div>
     
      <div className={`legal-content ${activeTab === 'refund' ? 'active' : ''}`} id="refund">
        <div className="legal-card">
          <h3>Refund Policy</h3>
          <p>At Snazo, we want you to be completely satisfied with your purchase. If for any reason you are not satisfied, we offer a straightforward refund policy.</p>
         
          <h4>Eligibility for Refunds</h4>
          <p>You may be eligible for a refund if:</p>
          <ul>
            <li>Your order arrives damaged or spoiled</li>
            <li>You receive the wrong products</li>
            <li>There is a quality issue with the food</li>
            <li>Your order is significantly delayed</li>
          </ul>
         
          <h4>How to Request a Refund</h4>
          <p>To request a refund, please:</p>
          <ul>
            <li>Contact our customer service within 24 hours of delivery</li>
            <li>Provide your order number and a description of the issue</li>
            <li>Include photos of the damaged or incorrect products if applicable</li>
          </ul>
         
          <h4>Refund Process</h4>
          <p>Once your refund request is approved:</p>
          <ul>
            <li>We will process your refund within 5-7 business days</li>
            <li>The refund will be issued to your original payment method</li>
            <li>You will receive a confirmation email once the refund is processed</li>
          </ul>
         
          <h4>Non-Refundable Items</h4>
          <p>The following items are not eligible for refunds:</p>
          <ul>
            <li>Items returned after 24 hours of delivery</li>
            <li>Items damaged due to improper storage or handling after delivery</li>
            <li>Items returned without proper packaging or in unsellable condition</li>
          </ul>
        </div>
      </div>
     
      <div className={`legal-content ${activeTab === 'cookies' ? 'active' : ''}`} id="cookies">
        <div className="legal-card">
          <h3>Cookie Policy</h3>
          <p>This Cookie Policy explains how Snazo uses cookies and similar technologies on our website to recognize you when you visit our site.</p>
         
          <h4>What Are Cookies?</h4>
          <p>Cookies are small text files that are placed on your computer or mobile device when you visit a website. They allow the website to recognize your device and store some information about your preferences or past actions.</p>
         
          <h4>How We Use Cookies</h4>
          <p>We use cookies for the following purposes:</p>
          <ul>
            <li>Essential cookies: Required for the website to function properly</li>
            <li>Performance cookies: Collect information about how you use our website</li>
            <li>Functionality cookies: Remember your preferences and choices</li>
            <li>Targeting cookies: Deliver content relevant to your interests</li>
          </ul>
         
          <h4>Managing Cookies</h4>
          <p>You can control and/or delete cookies as you wish. You can:</p>
          <ul>
            <li>Delete all cookies that are already on your device</li>
            <li>Set most browsers to prevent cookies from being placed</li>
            <li>Set your browser to notify you when you receive a cookie</li>
            <li>Opt-out of third-party cookies through our cookie consent tool</li>
          </ul>
         
          <h4>Cookie Duration</h4>
          <p>Session cookies expire when you close your browser, while persistent cookies remain on your device for a set period or until you delete them.</p>
        </div>
      </div>
    </section>
  );
};

export default Terms;