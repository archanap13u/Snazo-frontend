import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaHome, FaUtensils, FaPhone, FaShieldAlt } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { MdRule } from "react-icons/md";
import './Header.css';
// import { GiKnifeFork } from "react-icons/gi";
import { RiFilePaper2Fill } from "react-icons/ri";
import { IoDocumentTextSharp, IoPeopleSharp } from "react-icons/io5";
import { toast } from 'react-toastify';

const Header = ({ setIsAuthOpen }) => {
  const { currentUser, logout } = useAuth();
  const { getCartCount, cart, toggleCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Check Admin Role (Strict: Single User)
  const isAdmin = currentUser && (
    (currentUser.email === 'admin@snazo.com') ||
    (currentUser.user && currentUser.user.email === 'admin@snazo.com')
  );

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCart();
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <img
            src="https://i.pinimg.com/736x/3a/0d/3d/3a0d3d385c468b2d00dbb6a00096533e.jpg"
            alt="Logo"
            className="logo-image"
          />
        </Link>


        {/* Desktop Navigation */}
        <nav className="nav-menu desktop-menu">
          <Link to="/" className="nav-link" onClick={scrollToTop}>Home</Link>
          <Link to="/products" className="nav-link" onClick={scrollToTop}>Products</Link>
          <Link to="/terms" className="nav-link" onClick={scrollToTop}>Terms & Conditions</Link>
          <Link to="/contact" className="nav-link" onClick={scrollToTop}>Contact</Link>
          <Link to="/partner" className="nav-link partner-link" onClick={scrollToTop}>Partner with us</Link>
          {currentUser && (
            <Link to="/orders" className="nav-link" onClick={scrollToTop}>My Orders</Link>
          )}
          {isAdmin && (
            <Link to="/admin" className="nav-link admin-link">
              Admin panel
            </Link>
          )}
        </nav>

        {/* User Actions */}
        <div className="nav-actions">
          {currentUser ? (
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          ) : (
            <button onClick={() => setIsAuthOpen(true)} className="login-btn">
              Login
            </button>
          )}

          {/* Cart Icon */}
          <div className="cart-icon-wrapper" onClick={handleCartClick}>
            <FaShoppingCart className="cartIcon" size={20} />
            <span className="cart-count">{getCartCount() || 0}</span>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-container">
          <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/products" className="nav-link" onClick={() => setMenuOpen(false)}>Products</Link>
          <Link to="/terms" className="nav-link" onClick={() => setMenuOpen(false)}>Terms & Conditions</Link>
          <Link to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link to="/partner" className="nav-link" onClick={() => setMenuOpen(false)}>Partner with us</Link>
          {currentUser && (
            <Link to="/orders" className="nav-link" onClick={() => setMenuOpen(false)}>My Orders</Link>
          )}
          {isAdmin && (
            <Link to="/admin" className="nav-link admin-link" onClick={() => setMenuOpen(false)}>
              Admin panel
            </Link>
          )}
        </div>
      </div>

    </header>
  );
};

export default Header;
