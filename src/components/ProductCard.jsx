import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';
import swiggyLogo from '../assets/logos/swiggy-logo.png';
import blinkitLogo from '../assets/logos/blinkit-logo.png';
import zomatoLogo from '../assets/logos/zomato-logo.png';
import zeptoLogo from '../assets/logos/zepto-logo.png';

const ProductCard = ({ product }) => {

  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  const [isWishlist, setIsWishlist] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  // Use 'id' (custom) or '_id' (mongo)
  const productId = product.id || product._id;

  // Get current quantity from context
  const cartItem = cart.get(productId);
  const quantity = cartItem ? cartItem.quantity : 0;

  // Calculate Discount Percentage
  const isDiscounted = product.old_price > product.new_price;
  const discountPercent = isDiscounted
    ? Math.round(((product.old_price - product.new_price) / product.old_price) * 100)
    : 0;

  // Rating Default
  const rating = product.rating || 4.2;

  // Handlers
  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity === 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, -1);
    }
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlist(!isWishlist);
  };

  const description = product.description || "Experience the taste of premium quality food. Made with love and fresh ingredients.";
  const isLongDesc = description.length > 40;

  return (
    <div className="product-card">
      {/* Image Wrapper - Clickable */}
      <div className="product-img-wrapper">
        <Link to={`/product/${productId}`}>
          <img src={product.image} alt={product.name} loading="lazy" />
        </Link>

        {/* Floating Badges */}
        {isDiscounted && <span className="badge discount-badge">{discountPercent}% OFF</span>}
        {product.isBestSeller && <span className="badge bestseller-badge">#1 Best</span>}

        {/* Floating Wishlist Button */}
        <button
          className={`wishlist-btn ${isWishlist ? 'active' : ''}`}
          onClick={toggleWishlist}
          title="Add to Wishlist"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={isWishlist ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      {/* Product Info */}
      <div className="product-info">
        <Link to={`/product/${productId}`} className="product-link">
          <h3 className="product-name">{product.name}</h3>
        </Link>

        <div className="product-meta">
          <div className="rating-badge">
            <span className="rating-value">{rating} ★</span>
          </div>
          {/* Replaced Time with Weight/Quantity - Only show if weight exists */}
          {product.weight && (
            <span className="product-weight-badge" style={{ fontSize: '0.85rem', color: '#555', background: '#f0f0f0', padding: '2px 8px', borderRadius: '4px' }}>
              {product.weight}
            </span>
          )}
        </div>

        <div className="product-desc-container">
          <p className="product-desc">
            {showFullDesc ? description : (isLongDesc ? `${description.slice(0, 40)}...` : description)}
            {isLongDesc && (
              <span
                onClick={(e) => { e.preventDefault(); setShowFullDesc(!showFullDesc); }}
                style={{ color: '#22c55e', cursor: 'pointer', marginLeft: '5px', fontWeight: '600', fontSize: '0.8rem' }}
              >
                {showFullDesc ? 'Show Less' : 'Read More'}
              </span>
            )}
          </p>
        </div>

        {/* Footer: Price & Smart Action */}
        <div className="product-footer">
          <div className="price-box">
            <span className="price-current">₹{product.new_price}</span>
            {isDiscounted && (
              <span className="price-old">₹{product.old_price}</span>
            )}
            {/* Weight removed from here */}
          </div>

          <div className="action-container">
            {quantity === 0 ? (
              <button
                className="add-btn"
                onClick={handleAdd}
              >
                ADD
              </button>
            ) : (
              <div className="qty-control">
                <button className="qty-btn" onClick={handleDecrement}>−</button>
                <span className="qty-value">{quantity}</span>
                <button className="qty-btn" onClick={handleIncrement}>+</button>
              </div>
            )}
          </div>
        </div>

        {/* Delivery Partners Section */}
        <div className="delivery-partners">
          <span className="partners-label">Also available on</span>
          <div className="partners-logos">
            <img src={swiggyLogo} alt="Swiggy" title="Swiggy" />
            <img src={zomatoLogo} alt="Zomato" title="Zomato" />
            <img src={blinkitLogo} alt="Blinkit" title="Blinkit" />
            <img src={zeptoLogo} alt="Zepto" title="Zepto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
