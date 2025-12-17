import React, { useState } from 'react';
import './FaqSection.css';
const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How long do your frozen meals last in the freezer?',
      answer: 'Our frozen meals are designed to maintain their quality for up to 6 months when stored properly at 0°F (-18°C) or below. For best taste and texture, we recommend consuming within 3-4 months of purchase. Always check the "best by" date on the packaging.'
    },
    {
      question: 'Are your ingredients natural and preservative-free?',
      answer: 'Yes, we pride ourselves on using only the highest quality natural ingredients. Our meals are free from artificial preservatives, colors, and flavors. We use flash-freezing technology to lock in freshness without the need for artificial preservatives.'
    },
    {
      question: 'Do you offer vegetarian or vegan options?',
      answer: 'Absolutely! We offer a wide range of vegetarian and vegan options, clearly labeled in our product catalog. Our plant-based meals are crafted with the same attention to quality and flavor as our meat dishes, ensuring delicious options for all dietary preferences.'
    },
    {
      question: 'How do I track my order?',
      answer: 'Once your order is dispatched, you\'ll receive a confirmation email with a tracking number. You can use this number on our website or the courier\'s website to track your delivery in real-time. You\'ll also receive SMS updates at key points during the delivery process.'
    },
    {
      question: 'What if my order arrives damaged?',
      answer: 'We apologize if your order arrives damaged. Please contact our customer service within 24 hours of delivery with photos of the damaged items and packaging. We\'ll either send a replacement or issue a full refund, depending on your preference and product availability.'
    },
    {
      question: 'Do you offer subscription services?',
      answer: 'Yes, we offer a convenient subscription service that delivers your favorite meals on a regular schedule. Subscribers enjoy 10% off every order, free delivery, and early access to new products. You can customize your delivery frequency and meal selection, and pause or cancel anytime.'
    }
  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="section faq-section" id="faq">
      <div className="section-header">
        <div className="section-label">Frequently Asked Questions</div>
        <h3 className="section-title">Got Questions? We Have Answers</h3>
        <p className="section-subtitle">Find answers to common questions about our products and services</p>
      </div>
     
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
            <div className="faq-question" onClick={() => toggleFaq(index)}>
              {faq.question}
              <span className="faq-icon">+</span>
            </div>
            <div className="faq-answer">
              <div className="faq-answer-content">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;