import React, { useState } from 'react';
import './CookingSection.css';
const CookingSection = () => {
  const [activeTab, setActiveTab] = useState('microwave');

  const handleTabClick = (category) => {
    setActiveTab(category);
  };

  return (
    <section className="section cooking-instructions" id="cooking">
      <div className="section-header">
        <div className="section-label">Cooking Guide</div>
        <h2 className="section-title">Perfect Cooking Every Time</h2>
        <p className="section-subtitle">Follow our simple instructions to enjoy restaurant-quality meals at home</p>
      </div>
     
      <div className="instruction-tabs">
        <button 
          className={`instruction-tab ${activeTab === 'microwave' ? 'active' : ''}`} 
          data-category="microwave"
          onClick={() => handleTabClick('microwave')}
        >
          Microwave
        </button>
        <button 
          className={`instruction-tab ${activeTab === 'oven' ? 'active' : ''}`} 
          data-category="oven"
          onClick={() => handleTabClick('oven')}
        >
          Oven
        </button>
        <button 
          className={`instruction-tab ${activeTab === 'stovetop' ? 'active' : ''}`} 
          data-category="stovetop"
          onClick={() => handleTabClick('stovetop')}
        >
          Stovetop
        </button>
        <button 
          className={`instruction-tab ${activeTab === 'airfryer' ? 'active' : ''}`} 
          data-category="airfryer"
          onClick={() => handleTabClick('airfryer')}
        >
          Air Fryer
        </button>
      </div>
     
      <div className={`instruction-content ${activeTab === 'microwave' ? 'active' : ''}`} id="microwave">
        <div className="instruction-card">
          <div className="instruction-icon">🍕</div>
          <div className="instruction-details">
            <h3>Microwave Instructions</h3>
            <p style={{color:'white'}}>For quick and convenient meals, the microwave is your best friend. Follow these steps for perfect results:</p>
           
            <div className="instruction-steps">
              <div className="instruction-step">
                <div className="step-number">1</div>
                <div className="step-text">Remove packaging and place the food on a microwave-safe plate</div>
              </div>
              <div className="instruction-step">
                <div className="step-number">2</div>
                <div className="step-text">Cover with a microwave-safe lid or paper towel to prevent splattering</div>
              </div>
              <div className="instruction-step">
                <div className="step-number">3</div>
                <div className="step-text">Heat on high power for 3-5 minutes, depending on the item</div>
              </div>
              <div className="instruction-step">
                <div className="step-number">4</div>
                <div className="step-text">Let stand for 1-2 minutes before serving</div>
              </div>
            </div>
           
            <div className="instruction-tips">
              <h4>Pro Tips:</h4>
              <p style={{color:'white'}}>For best results, rotate the dish halfway through cooking. If your microwave doesn't have a turntable, manually rotate the dish 180 degrees.</p>
            </div>
          </div>
        </div>
      </div>
     
      <div className={`instruction-content ${activeTab === 'oven' ? 'active' : ''}`} id="oven">
        <div className="instruction-card">
          <div className="instruction-icon">🍗</div>
          <div className="instruction-details">
            <h3>Oven Instructions</h3>
            <p style={{color:'white'}}>For crispy, golden results, nothing beats an oven. Follow these steps for perfect results:</p>
           
            <div className="instruction-steps">
              <div className="instruction-step">
                <div className="step-number">1</div>
                <div className="step-text">Preheat your oven to 375°F (190°C)</div>
              </div>
              <div className="instruction-step">
                <div className="step-number">2</div>
                <div className="step-text">Remove packaging and place the food on a baking sheet</div>
              </div>
              <div className="instruction-step">
                <div className="step-number">3</div>
                <div className="step-text">Bake for 15-25 minutes, depending on the item</div>
              </div>
              <div className="instruction-step">
                <div className="step-number">4</div>
                <div className="step-text">Let stand for 2-3 minutes before serving</div>
              </div>
            </div>
           
            <div className="instruction-tips">
              <h4>Pro Tips:</h4>
              <p style={{color:'white'}}>For extra crispiness, place the food directly on the oven rack with a baking sheet below to catch any drips.</p>
            </div>
          </div>
        </div>
      </div>
     
      <div className={`instruction-content ${activeTab === 'stovetop' ? 'active' : ''}`} id="stovetop">
        <div className="instruction-card">
          <div className="instruction-icon">🍳</div>
          <div className="instruction-details">
            <h3>Stovetop Instructions</h3>
            <p style={{color:'white'}}>For precise control and delicious results, the stovetop is ideal. Follow these steps for perfect results:</p>
           
            <div className="instruction-steps">
              <div className="instruction-step">
                <div className="step-number">1</div>
                <div className="step-text">Heat a non-stick pan over medium heat</div>
              </div>
              <div className="instruction-step">
                <div className="step-number">2</div>
                <div className="step-text">Add a small amount of oil or butter if desired</div>
              </div>
              <div className="instruction-step">
                <div className="step-number">3</div>
                <div className="step-text">Cook for 5-8 minutes per side, depending on the item</div>
              </div>
              <div className="instruction-step">
                <div className="step-number">4</div>
                <div className="step-text">Ensure internal temperature reaches 165°F (74°C)</div>
              </div>
            </div>
           
            <div className="instruction-tips">
              <h4>Pro Tips:</h4>
              <p style={{color:'white'}}>Don't overcrowd the pan. Cook in batches if necessary to ensure even browning and cooking.</p>
            </div>
          </div>
        </div>
      </div>
     
      <div className={`instruction-content ${activeTab === 'airfryer' ? 'active' : ''}`} id="airfryer">
        <div className="instruction-card">
          <div className="instruction-icon">🍟</div>
          <div className="instruction-details">
            <h3>Air Fryer Instructions</h3>
            <p style={{color:'white'}}>For crispy results with less oil, the air fryer is perfect. Follow these steps for perfect results:</p>
           
            <div className="instruction-steps">
              <div className="instruction-step">
                <div className="step-number">1</div>
                <div className="step-text">Preheat your air fryer to 375°F (190°C)</div>
              </div>
              <div className="instruction-step">
                <div className="step-number">2</div>
                <div className="step-text">Remove packaging and place the food in the basket</div>
              </div>
              <div className="instruction-step">
                <div className="step-number">3</div>
                <div className="step-text">Cook for 10-15 minutes, shaking the basket halfway through</div>
              </div>
              <div className="instruction-step">
                <div className="step-number">4</div>
                <div className="step-text">Let stand for 1-2 minutes before serving</div>
              </div>
            </div>
           
            <div className="instruction-tips">
              <h4>Pro Tips:</h4>
              <p style={{color:'white'}}>Don't overcrowd the basket. Cook in batches if necessary to ensure even cooking and browning.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CookingSection;