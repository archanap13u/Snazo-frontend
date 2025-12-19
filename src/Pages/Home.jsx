import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api'; // Use centralized API
import ProductCard from '../components/ProductCard'; // Use reusable card
import './Home.css'; // Import CSS
import ReviewsSection from '../components/ReviewsSection';
import { FaStar, FaCompass } from 'react-icons/fa';
const Home = () => {
  const [products, setProducts] = useState([]);
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const { data } = await API.get('/promos');
        // Filter only active promos if needed, assuming backend returns all
        // The backend model has 'active' field now.
        const activePromos = data.filter(p => p.active !== false);
        setPromos(activePromos);
      } catch (err) {
        console.error("Error fetching promos:", err);
      }
    };
    fetchPromos();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Use API instance (Base URL is handled in services/api.js)
        const { data } = await API.get('/allproducts');

        // Handle data safely
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Logic: Show 'Best Sellers' first, otherwise recent products
  const bestSellers = products.filter(p => p.isBestSeller);
  const displayProducts = bestSellers.length > 0 ? bestSellers.slice(0, 8) : products.slice(0, 8);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate('/products', { state: { searchQuery: searchTerm } });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (

    <div className="home-page">
      {/* --- Hero Section --- */}
      <section className="hero-section  section" style={{ backgroundColor: '' }}>
        <div className="hero-container ">
          <div className="hero-content">
            {/* <span className="hero-badge">New Collection 2025</span> */}
            <h1 className="hero-title">Freeze <span className="highlight">Fry</span> Feast</h1>
            <p className="hero-desc">
              Experience gourmet quality Ready to eat foods crafted with premium ingredients.
              No preservatives, just pure deliciousness delivered to your door.            </p>
            <div className="hero-search-container animate-slide-up" style={{ animationDelay: '0.6s', opacity: 0, animationFillMode: 'forwards' }}>
              <input
                type="text"
                className="hero-search-input"
                placeholder="Search for happiness..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button className="hero-search-btn" onClick={handleSearch}>Search</button>
            </div>

            <div className="hero-buttons" style={{ backgroundColor: '' }}>
              <Link to="/products" className="btn btn-outline" style={{ padding: '30px 35px' }}>Explore Menu <FaCompass size={24} color="#007bff" /></Link>
              <Link to="/review" className="btn btn-outline">View Reviews <FaStar size={24} color="gold" /> {/* Basic filled star */}</Link>
            </div>


            {/* <div className="hero-stats"> */}
            {/* <div className="stat">
                <span className="stat-label">Products</span>
              </div>
              <div className="stat">
                <span className="stat-label">Happy Customers</span>
              </div> */}
          </div>
          <div class="hero-showcase">
            <div class="product-3d">
              <div class="product-circle"></div>
              <div class="product-main">
                <img src="https://i.pinimg.com/1200x/60/42/49/604249c513b50ade35a405c272fd5c44.jpg" alt="Premium Food" />
              </div>
              <div class="floating-element elem-1">✅ 100% Fresh</div>
              <div class="floating-element elem-2">⭐ 4.9 Rating</div>
              <div class="floating-element elem-3">🔥 Hot Deal</div>
            </div>
          </div>
          {/* <div className="hero-visual">
             <div className="hero-circle"></div>
             <img 
               src="https://i.pinimg.com/1200x/60/42/49/604249c513b50ade35a405c272fd5c44.jpg" 
               alt="Fashion Model" 
               className="hero-img"
             />
          </div> */}
        </div>
      </section>

      <section className="features-section">
        <div className="features-content">
          <div className="feature-item">
            <span className="f-icon">🚀</span>
            <div>
              <h4>Free Shipping</h4>
              <p>On orders over ₹499</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="f-icon">💳</span>
            <div>
              <h4>Secure Payment</h4>
              <p>100% protected payments</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="f-icon">↩️</span>
            <div>
              <h4>100% Fresh</h4>
              <p>Ready to eat</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Featured Section --- */}
      <section className="products-section">
        <div class="section-header scroll-reveal">
          <div class="section-label">Our Specialties</div>
          <h2 class="section-title">Featured Menu</h2>
          <p class="section-subtitle">Handcrafted with love, served with excellence</p>
        </div>

        {loading ? (
          <div className="loading-spinner">Loading top picks...</div>
        ) : (
          <>
            {displayProducts.length > 0 ? (
              <div className="products-grid">
                {displayProducts.map(product => (
                  <ProductCard key={product._id || product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No products available yet.</p>
                <p className="small">Admins: Add products in the Dashboard.</p>
              </div>
            )}
          </>
        )}
      </section>

      {/* --- Banner Section --- */}
      <section className="promo-banner scroll-reveal">
        {promos.length > 0 ? (
          <div className="promo-content">
            <h2>🎉 Limited Time Offer!</h2>
            <p>Get ₹{promos[0].discountValue} OFF on your order!</p>
            <div className="promo-code" style={{ marginBottom: '10px', marginTop: '10px' }}>{promos[0].code}</div>
            <p>⏰ Hurry! Offer expires soon</p>
          </div>
        ) : (
          <div className="promo-content">
            <h2>🎉 Welcome to Snazo!</h2>
            <p>Delicious food delivered to your doorstep.</p>
          </div>
        )}
      </section>
      <ReviewsSection />

    </div>
  );
};

export default Home;