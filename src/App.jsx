import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// --- Contexts ---
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// --- Components ---
import Header from './components/Header';
import AuthModal from './components/AuthModal';
import CartSidebar from './components/CartSidebar';
import Footer from './components/Footer';

// --- Pages ---
import Home from './Pages/Home';
import Products from './Pages/Products';
import Product from './Pages/Product';
import Orders from './Pages/Orders';

import AdminDashboard from './Pages/AdminDashboard';

import Contact from './Pages/Contact';
import Terms from './Pages/Terms';
import Partner from './Pages/Partner';
import ReviewsSection from './components/ReviewsSection';
// --- Styles ---
import './styles/App.css';

// --- Protected Route Component (Regular Users) ---
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return <div className="loading-screen">Loading...</div>;

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// --- Admin Route Component (Admin Access) ---
const AdminRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return <div className="loading-screen">Loading...</div>;

  // Check based on specific email for single-user admin access
  const isAdmin = currentUser && (
    (currentUser.email === 'admin@snazo.com') ||
    (currentUser.user && currentUser.user.email === 'admin@snazo.com')
  );

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Extracted Inner Component to use Router Hooks
const AppContent = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const location = useLocation();

  // Hide global elements on admin routes
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app">
      {/* Global Toast Notification Config */}
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {/* Conditionally Render Header & Sidenav */}
      {!isAdminRoute && (
        <>
          <Header setIsAuthOpen={setIsAuthOpen} />
          <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
          <CartSidebar />
        </>
      )}

      <main style={isAdminRoute ? { paddingTop: 0 } : {}}>
        <Routes>

          {/* --- Public Routes --- */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />

          {/* This is the route for Single Product Details */}
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<CartSidebar />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/review" element={<ReviewsSection />} />

          {/* --- User Protected Route --- */}
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          {/* --- Admin Protected Route --- */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;