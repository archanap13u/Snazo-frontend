import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import API from '../services/api'; // Use centralized API
import ProductCard from '../components/ProductCard'; // Use reusable component
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [promos, setPromos] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const { data } = await API.get('/promos');
        const activePromos = data.filter(p => p.active !== false);
        setPromos(activePromos);
      } catch (err) {
        console.error("Error fetching promos:", err);
      }
    };
    fetchPromos();
  }, []);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const categories = ['All', 'Veg', 'Non-Veg'];

  useEffect(() => {
    const loadData = async () => {
      try {
        // Use the centralized API instance
        const { data } = await API.get('/allproducts');

        const productList = Array.isArray(data) ? data : [];
        setProducts(productList);
        setFilteredProducts(productList);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Handle Incoming Search from Home Page
  useEffect(() => {
    if (location.state?.searchQuery) {
      setSearchTerm(location.state.searchQuery);
      // Clear state so it doesn't persist on refresh if desired, 
      // but for now keeping it is fine.
    }
  }, [location.state]);

  // Handle Search & Filter
  useEffect(() => {
    let result = products;

    // Filter by Category
    if (activeCategory !== 'All') {
      result = result.filter(p =>
        p.category && p.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // Filter by Search Term
    if (searchTerm) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredProducts(result);
  }, [activeCategory, searchTerm, products]);

  const handleFilter = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="products-page">
      <section className="promo-banner scroll-reveal">
        {promos.length > 0 ? (
          <div className="promo-content">
            <h2>❄️ Ready to eat</h2>
            <p> Get ₹{promos[0].discountValue} OFF on all frozen delights</p>
            <div className="promo-code">{promos[0].code}</div>
            {/* <p>⏰ Hurry! Offer expires at midnight</p> */}
          </div>
        ) : (
          <div className="promo-content">
            <h2>❄️ Ready to eat</h2>
            <p>Delicious frozen food delivered to you.</p>
          </div>
        )}
      </section>

      {/* Header Section */}
      <div class="section-header">
        <div class="section-label">Premium Collection</div>
        <h2 class="section-title hero-title">Frozen Delights</h2>
        <p class="section-subtitle">Experience the freshness locked in every bite</p>
      </div>

      {/* Search & Filter Section */}
      <div className="controls-container" style={{ maxWidth: '1200px', margin: '0 auto 40px', padding: '0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        {/* Search Bar */}
        <div className="search-wrapper" style={{ width: '100%', maxWidth: '500px', position: 'relative' }}>
          <input
            type="text"
            placeholder="Search for your favorite food..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '16px 24px',
              borderRadius: '50px',
              border: '2px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              fontSize: '1rem',
              backdropFilter: 'blur(10px)',
              outline: 'none',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}
          />
          <span style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)' }}>🔍</span>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => handleFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading Fresh Items...</p>
        </div>
      ) : (
        <>
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <h3>No items found matching your search.</h3>
              <button onClick={() => { setSearchTerm(''); setActiveCategory('All'); }} className="reset-btn">Reset Filters</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products;