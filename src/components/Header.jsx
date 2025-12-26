import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaHome, FaUtensils, FaPhone, FaShieldAlt, FaUserCircle, FaBoxOpen, FaSignOutAlt, FaTrophy, FaShareAlt } from "react-icons/fa";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";
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
  const [profileOpen, setProfileOpen] = useState(false);
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
    const handleClickOutside = (e) => {
      if (profileOpen && !e.target.closest('.profile-container')) {
        setProfileOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileOpen]);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
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
          {isAdmin && (
            <Link to="/admin" className="nav-link admin-link">
              Admin panel
            </Link>
          )}
        </nav>

        {/* User Actions */}
        <div className="nav-actions">
          {currentUser ? (
            <div className="profile-container">
              <button
                className="profile-btn"
                onClick={() => setProfileOpen(!profileOpen)}
                aria-label="User Profile"
              >
                <FaUserCircle size={28} />
                <HiChevronDown className={`chevron-icon ${profileOpen ? 'rotate' : ''}`} />
              </button>

              {profileOpen && (
                <div className="profile-dropdown">
                  <Link
                    to="/orders"
                    className="dropdown-item"
                    onClick={() => {
                      setProfileOpen(false);
                      scrollToTop();
                    }}
                  >
                    <FaBoxOpen className="dropdown-icon" /> My Orders
                  </Link>
                  <Link
                    to="/rewards"
                    className="dropdown-item"
                    onClick={() => {
                      setProfileOpen(false);
                      scrollToTop();
                    }}
                  >
                    <FaTrophy className="dropdown-icon" /> My Rewards
                  </Link>
                  <Link
                    to="/referral"
                    className="dropdown-item"
                    onClick={() => {
                      setProfileOpen(false);
                      scrollToTop();
                    }}
                  >
                    <FaShareAlt className="dropdown-icon" /> Referral
                  </Link>
                  <button onClick={handleLogout} className="dropdown-item logout-item">
                    <FaSignOutAlt className="dropdown-icon" /> Logout
                  </button>
                </div>
              )}
            </div>
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
          <Link to="/" className="nav-link" onClick={() => { setMenuOpen(false); scrollToTop(); }}>Home</Link>
          <Link to="/products" className="nav-link" onClick={() => { setMenuOpen(false); scrollToTop(); }}>Products</Link>
          <Link to="/terms" className="nav-link" onClick={() => { setMenuOpen(false); scrollToTop(); }}>Terms & Conditions</Link>
          <Link to="/contact" className="nav-link" onClick={() => { setMenuOpen(false); scrollToTop(); }}>Contact</Link>
          <Link to="/partner" className="nav-link" onClick={() => { setMenuOpen(false); scrollToTop(); }}>Partner with us</Link>
          {currentUser && (
            <>
              <Link to="/orders" className="nav-link" onClick={() => { setMenuOpen(false); scrollToTop(); }}>My Orders</Link>
              <Link to="/rewards" className="nav-link" onClick={() => { setMenuOpen(false); scrollToTop(); }}>My Rewards</Link>
              <Link to="/referral" className="nav-link" onClick={() => { setMenuOpen(false); scrollToTop(); }}>Referral</Link>
            </>
          )}
          {isAdmin && (
            <Link to="/admin" className="nav-link admin-link" onClick={() => { setMenuOpen(false); scrollToTop(); }}>
              Admin panel
            </Link>
          )}
        </div>
      </div>

    </header>
  );
};

export default Header;
