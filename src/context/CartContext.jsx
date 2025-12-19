import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Initialize cart from LocalStorage
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('snazo_cart');
      if (savedCart) {
        return new Map(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Failed to load cart", error);
    }
    return new Map();
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Save to LocalStorage on change
  useEffect(() => {
    const cartArray = Array.from(cart.entries());
    localStorage.setItem('snazo_cart', JSON.stringify(cartArray));
  }, [cart]);

  // --- Actions ---
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  const openCheckout = () => setIsCheckoutOpen(true);
  const closeCheckout = () => setIsCheckoutOpen(false);

  const addToCart = (product) => {
    setCart(prev => {
      const newCart = new Map(prev);
      const productId = product._id || product.id;

      const item = newCart.get(productId);
      if (item) {
        newCart.set(productId, { ...item, quantity: item.quantity + 1 });
      } else {
        newCart.set(productId, {
          id: productId,
          name: product.name,
          image: product.image,
          new_price: Number(product.new_price),
          quantity: 1
        });
      }
      return newCart;
    });

  };

  const updateQuantity = (id, change) => {
    setCart(prev => {
      const newCart = new Map(prev);
      const item = newCart.get(id);
      if (!item) return prev;

      const newQty = item.quantity + change;
      if (newQty <= 0) {
        newCart.delete(id);
      } else {
        newCart.set(id, { ...item, quantity: newQty });
      }
      return newCart;
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const newCart = new Map(prev);
      newCart.delete(id);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart(new Map());
    setIsCheckoutOpen(false);
  };

  const getCartTotal = () => {
    let total = 0;
    for (let item of cart.values()) {
      total += (item.new_price || 0) * item.quantity;
    }
    return total;
  };

  const getCartCount = () => {
    let count = 0;
    for (let item of cart.values()) {
      count += item.quantity;
    }
    return count;
  };

  const value = {
    cart,
    isCartOpen,
    isCheckoutOpen,
    openCart,
    closeCart,
    toggleCart,
    openCheckout,
    closeCheckout,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    // ALIAS to fix the "is not a function" error
    getTotalCartItems: getCartCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;