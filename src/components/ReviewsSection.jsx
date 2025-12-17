import React from 'react';
import './ReviewsSection.css';
import { FaHeart } from 'react-icons/fa';
const ReviewsSection = () => {
  return (
    <div id="reviews" className="section">
      <div className="section-header">
        <div className="section-label">Testimonials</div>
        <h2 className="section-title">Customer Love <FaHeart size={28} color="rgb(215, 13, 13)" /></h2>
        <p className="section-subtitle">Hear from our happy customers</p>
      </div>
      <div className="reviews-grid">
        <div className="review-card">
          <div className="review-header">
            <div className="reviewer-avatar">R</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Riya Sharma</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Delhi</div>
            </div>
          </div>
          <div className="stars">⭐⭐⭐⭐⭐</div>
          <p className="review-text">"Absolutely love the spring rolls! So crispy and fresh. My family can't get enough!"</p>
        </div>
        <div className="review-card">
          <div className="review-header">
            <div className="reviewer-avatar">A</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Amit Kumar</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Bangalore</div>
            </div>
          </div>
          <div className="stars">⭐⭐⭐⭐⭐</div>
          <p className="review-text">"Best frozen food ever! Restaurant quality at home. Highly recommend!"</p>
        </div>
        <div className="review-card">
          <div className="review-header">
            <div className="reviewer-avatar">P</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Priya Gupta</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Mumbai</div>
            </div>
          </div>
          <div className="stars">⭐⭐⭐⭐⭐</div>
          <p className="review-text">"Love that they're 100% natural. My kids enjoy them guilt-free!"</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;