import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ordersAPI } from '../services/api';
import API from '../services/api';
import { toast } from 'react-toastify';
import './CartSidebar.css';

const CartSidebar = () => {
  const {
    cart, isCartOpen, isCheckoutOpen,
    closeCart, openCheckout, closeCheckout,
    updateQuantity, removeFromCart, getCartTotal, clearCart
  } = useCart();
  const navigate = useNavigate();

  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [serviceablePincodes, setServiceablePincodes] = useState([]);
  const [pincodeAvailability, setPincodeAvailability] = useState(null); // null, 'available', 'unavailable'
  const [checkingPincode, setCheckingPincode] = useState(false);

  const [deliveryDetails, setDeliveryDetails] = useState({
    address: '', phone: '', pincode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');

  // Promo Code State
  const [promoCode, setPromoCode] = useState('');
  const [discountDetails, setDiscountDetails] = useState(null); // { amount: 0, code: '' }
  const [promoError, setPromoError] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  // Fetch serviceable pincodes from backend
  useEffect(() => {
    const fetchPincodes = async () => {
      try {
        const { data } = await API.get('/pincodes');
        setServiceablePincodes(data.map(p => p.code));
      } catch (error) {
        console.error('Error fetching pincodes:', error);
      }
    };
    if (isCartOpen) {
      fetchPincodes();
      fetchLatestOrder();
    }
  }, [isCartOpen]);

  const [latestOrder, setLatestOrder] = useState(null);

  const fetchLatestOrder = async () => {
    if (!currentUser) return;
    try {
      const { data } = await ordersAPI.getMyOrders();
      if (data && data.length > 0) {
        setLatestOrder(data[0]); // Assuming API returns sorted by date desc
      }
    } catch (e) {
      console.error("Failed to fetch latest order", e);
    }
  };

  // Load saved pincode from localStorage
  useEffect(() => {
    const savedPincode = localStorage.getItem('userPincode');
    if (savedPincode) {
      setDeliveryDetails(prev => ({ ...prev, pincode: savedPincode }));
      if (serviceablePincodes.length > 0) {
        const isAvailable = serviceablePincodes.includes(savedPincode);
        setPincodeAvailability(isAvailable ? 'available' : 'unavailable');
      }
    }
  }, [serviceablePincodes]);

  if (!isCartOpen) return null;

  const handlePincodeCheck = () => {
    const pincode = deliveryDetails.pincode;
    if (pincode.length !== 6) return;

    setCheckingPincode(true);
    setPincodeAvailability(null);

    setTimeout(() => {
      // Robust check: Ensure types match (string vs string) and trim whitespace
      const isAvailable = serviceablePincodes.some(p => p.toString().trim() === pincode.toString().trim());
      setPincodeAvailability(isAvailable ? 'available' : 'unavailable');
      setCheckingPincode(false);

      if (isAvailable) {
        localStorage.setItem('userPincode', pincode);
      }
    }, 300);
  };

  const handlePincodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setDeliveryDetails({ ...deliveryDetails, pincode: value });
    if (value.length < 6) {
      setPincodeAvailability(null);
    }
  };


  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;
    setIsApplyingPromo(true);
    setPromoError('');
    setDiscountDetails(null);

    try {
      const { data } = await API.post('/promos/apply', {
        code: promoCode,
        cartTotal: getCartTotal()
      });

      if (data.success) {
        setDiscountDetails({
          amount: data.discountAmount,
          code: data.promoCode
        });
        toast.success(`Promo Applied! Saved ₹${data.discountAmount}`);
      }
    } catch (err) {
      setPromoError(err.response?.data?.message || 'Invalid Coupon Code');
      toast.error(err.response?.data?.message || 'Invalid Coupon Code');
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const removePromo = () => {
    setDiscountDetails(null);
    setPromoCode('');
    setPromoError('');
    toast.info('Promo Code Removed');
  };

  const getFinalTotal = () => {
    const total = getCartTotal();
    const discount = discountDetails?.amount || 0;
    return Math.max(0, total - discount);
  };

  const handlePlaceOrder = async () => {
    if (!currentUser) {
      toast.error('Please login to place an order');
      return;
    }

    // Validation
    if (!deliveryDetails.address || !deliveryDetails.phone || !deliveryDetails.pincode) {
      toast.error('Please fill in all delivery details');
      return;
    }

    // Check pincode availability before placing order
    if (pincodeAvailability !== 'available') {
      toast.error('Please enter a valid pincode where delivery is available');
      return;
    }

    setIsLoading(true);

    const orderItems = Array.from(cart.values()).map(item => ({
      product: item.id || item._id,
      name: item.name,
      image: item.image,
      quantity: item.quantity,
      price: item.new_price
    }));

    try {
      await ordersAPI.create({
        items: orderItems,
        totalAmount: getFinalTotal(),
        details: {
          ...deliveryDetails,
          name: currentUser.name
        },
        paymentMethod: paymentMethod,
        promoCode: discountDetails?.code || null,
        discountAmount: discountDetails?.amount || 0
      });

      toast.success('Order Placed Successfully! 🎉');
      clearCart();
      closeCart();
      // closeCheckout(); // No need to call closeCheckout separately if closeCart unmounts/hides everything
    } catch (err) {
      console.error(err);
      toast.error('Order Failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="cart-overlay" onClick={closeCart}></div>

      <div className="cart-sidebar active">
        <div className="cart-header">
          <h2>{isCheckoutOpen ? 'Checkout' : `Shopping Cart (${cart.size})`}</h2>
          <button className="cart-close-btn" onClick={closeCart}>&times;</button>
        </div>

        {/* Latest Order Status Section */}
        {latestOrder && !isCheckoutOpen && (
          <div className="latest-order-status">
            <div className="order-status-header">
              <span className="status-label">Latest Order Status</span>
              <span className={`status-pill ${latestOrder.status}`}>{latestOrder.status}</span>
            </div>
            <button className="btn-small-outline" onClick={() => { closeCart(); navigate('/orders'); }}>
              Check Order Details
            </button>
          </div>
        )}

        {!isCheckoutOpen ? (
          // CART VIEW
          <div className="cart-view">
            {cart.size === 0 ? (
              <div className="empty-cart">
                <span style={{ fontSize: '40px' }}>🛒</span>
                <p>Your cart is empty</p>
                <button className="btn-secondary" onClick={closeCart}>Start Shopping</button>
              </div>
            ) : (
              <>
                <div className="cart-items-container">
                  {Array.from(cart.values()).map((item, index) => (
                    <div
                      className="cart-item"
                      key={item.id}
                      style={{ animationDelay: `${index * 0.1}s` }} // Inline style for dynamic stagger
                    >
                      <img src={item.image} alt={item.name} />
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p className="item-price">₹{item.new_price}</p>

                        <div className="qty-wrapper">
                          <div className="qty-controls">
                            <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                          </div>
                          <button className="remove-link" onClick={() => removeFromCart(item.id)}>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-footer">
                  <div className="total-row">
                    <span>Subtotal</span>
                    <span className="total-price">₹{getCartTotal()}</span>
                  </div>
                  <button className="checkout-btn" onClick={openCheckout}>
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          // CHECKOUT VIEW
          <div className="checkout-view">
            <button className="back-link" onClick={closeCheckout}>← Back to Cart</button>

            <div className="checkout-form">
              <h4>Delivery Details</h4>

              <div className="form-group">
                <label>Address</label>
                <textarea
                  rows="3"
                  placeholder="Street, City, etc."
                  value={deliveryDetails.address}
                  onChange={e => setDeliveryDetails({ ...deliveryDetails, address: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={deliveryDetails.phone}
                  onChange={e => setDeliveryDetails({ ...deliveryDetails, phone: e.target.value })}
                />
              </div>

              {/* Pincode with Availability Check */}
              <div className="form-group">
                <label>Pincode</label>
                <div className="pincode-row">
                  <input
                    type="text"
                    placeholder="6-digit Pincode"
                    value={deliveryDetails.pincode}
                    onChange={handlePincodeChange}
                    maxLength={6}
                    className="pincode-input-checkout"
                  />
                  <button
                    type="button"
                    className="pincode-check-btn-checkout"
                    onClick={handlePincodeCheck}
                    disabled={deliveryDetails.pincode.length !== 6 || checkingPincode}
                  >
                    {checkingPincode ? '...' : 'Check'}
                  </button>
                </div>
                {pincodeAvailability && (
                  <div className={`pincode-status ${pincodeAvailability}`}>
                    {pincodeAvailability === 'available'
                      ? '✓ Delivery Available'
                      : '✗ Delivery Not Available'}
                  </div>
                )}
              </div>

              {/* Payment Methods */}
              <div className="form-group">
                <label>Payment Method</label>
                <div className="payment-methods">
                  <div
                    className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('cod')}
                  >
                    <div className="radio-circle"></div>
                    <span>Cash on Delivery</span>
                  </div>

                  <div className="payment-option disabled" title="Coming Soon">
                    <div className="radio-circle"></div>
                    <span>UPI (GPay/PhonePe)</span>
                    <span className="badge-soon">Soon</span>
                  </div>
                </div>

                {/* Promo Code Section */}
                <div className="form-group">
                  <label>Promo Code</label>
                  {!discountDetails ? (
                    <div className="promo-input-group">
                      <input
                        type="text"
                        placeholder="Enter Coupon Code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        disabled={isApplyingPromo}
                      />
                      <button
                        className="apply-btn"
                        onClick={handleApplyPromo}
                        disabled={!promoCode || isApplyingPromo}
                      >
                        {isApplyingPromo ? '...' : 'APPLY'}
                      </button>
                    </div>
                  ) : (
                    <div className="applied-promo-box">
                      <div className="promo-info">
                        <span className="promo-tag">🏷️ {discountDetails.code}</span>
                        <span className="saved-amount">Saved ₹{discountDetails.amount}</span>
                      </div>
                      <button className="remove-promo-btn" onClick={removePromo}>&times;</button>
                    </div>
                  )}
                  {promoError && <p className="error-text">{promoError}</p>}
                </div>

                <div className="payment-option disabled" title="Coming Soon">
                  <div className="radio-circle"></div>
                  <span>Credit/Debit Card</span>
                  <span className="badge-soon">Soon</span>
                </div>
              </div>
            </div>

            <div className="summary-box">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{getCartTotal()}</span>
              </div>
              {discountDetails && (
                <div className="summary-row discount">
                  <span>Discount ({discountDetails.code})</span>
                  <span>-₹{discountDetails.amount}</span>
                </div>
              )}
              <div className="summary-row total">
                <span>Total Amount</span>
                <span>₹{getFinalTotal()}</span>
              </div>
              <div className="summary-row">
                <span>Payment Method</span>
                <span>{paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod}</span>
              </div>
            </div>

            <button
              className="place-order-btn"
              onClick={handlePlaceOrder}
              disabled={isLoading || pincodeAvailability !== 'available'}
            >
              {isLoading ? 'Placing Order...' : 'Confirm Order'}
            </button>
          </div>
        )}
      </div >
    </>
  );
};

export default CartSidebar;