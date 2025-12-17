import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Orders.css'; // Import CSS

const Orders = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serverDebugId, setServerDebugId] = useState(null);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        // API automatically attaches the user's token
        const response = await API.get('/orders/myorders');

        // Handle new response structure { success, orders, debugUserId }
        if (response.data && response.data.orders) {
          setOrders(response.data.orders);
          setServerDebugId(response.data.debugUserId);
        } else if (Array.isArray(response.data)) {
          // Fallback for old structure
          setOrders(response.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, []);

  if (loading) {
    return <div className="orders-loading">Loading your orders...</div>;
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <h1 className="page-title">My Order History</h1>

        {orders.length === 0 ? (
          <div className="no-orders">
            <div className="empty-icon">📦</div>
            <h2>No orders yet</h2>
            <p>Looks like you haven't made your first purchase.</p>
            <Link to="/products" className="shop-btn">Start Shopping</Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div className="order-card" key={order._id}>
                {/* Header */}
                <div className="order-header">
                  <div>
                    <span className="order-id">Order #{order._id.slice(-6).toUpperCase()}</span>
                    <span className="order-date">
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={`order-status ${order.status}`}>
                    {order.status}
                  </div>
                </div>

                {/* Body (Items) */}
                <div className="order-body">
                  <div className="order-items-preview">
                    {order.items?.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="preview-item">
                        <img src={item.image || 'https://via.placeholder.com/50'} alt={item.name} className="preview-thumb" />
                        <span className="preview-name">{item.name} {order.items.length > 3 && idx === 2 ? `+${order.items.length - 3} more` : ''}</span>
                      </div>
                    ))}
                  </div>
                  <div className="order-summary-text">
                    {order.items?.length || 0} items &bull; {order.paymentMethod || 'COD'}
                  </div>
                </div>

                {/* Footer */}
                <div className="order-footer">
                  <div className="footer-actions">
                    <span className="total-label">Total: <span className="total-price">₹{order.totalAmount || order.finalAmount}</span></span>
                  </div>
                  <div className="footer-buttons">
                    <div className="support-info">
                      <span className="support-label">Need Help?</span>
                      <a href="tel:+919876543210" className="support-link">Talk with us: +91-9876543210</a>
                    </div>
                    <button className="view-btn" onClick={() => { setSelectedOrder(order); setIsModalOpen(true); }}>
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Order Details Modal */}
        {isModalOpen && selectedOrder && (
          <div className="modal-overlay">
            <div className="modal-content order-modal">
              <div className="modal-header">
                <h3>
                  Order Details <span className="mono">#{selectedOrder._id.slice(-6).toUpperCase()}</span>
                </h3>
                <button className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
              </div>

              <div className="modal-body-grid">
                {/* --- Tracking Section (Full Width) --- */}
                <div className="tracking-section" style={{ gridColumn: '1 / -1', marginBottom: '25px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h4 style={{ margin: 0 }}>Order Status</h4>
                    <span className={`status-pill ${selectedOrder.status}`} style={{ fontSize: '0.9rem' }}>{selectedOrder.status}</span>
                  </div>

                  <div className="status-stepper horizontal">
                    {['Pending', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'].map((step, index) => {
                      const statusOrder = ['Pending', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
                      const currentStatusIndex = statusOrder.indexOf(selectedOrder.status);
                      const isCompleted = index <= currentStatusIndex;
                      const isCurrent = index === currentStatusIndex;

                      if (selectedOrder.status === 'Cancelled') return null;

                      return (
                        <div key={step} className={`step-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}>
                          <div className="step-circle">{isCompleted ? '✓' : ''}</div>
                          <div className="step-label">{step}</div>
                          {index < statusOrder.length - 1 && <div className={`step-line ${index < currentStatusIndex ? 'completed' : ''}`}></div>}
                        </div>
                      );
                    })}
                    {selectedOrder.status === 'Cancelled' && (
                      <div className="step-item cancelled current" style={{ width: '100%', justifyContent: 'center' }}>
                        <div className="step-circle">✕</div>
                        <div className="step-label">Order Cancelled</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* --- Left Column: Details --- */}
                <div className="order-info-col">
                  <h4>Delivery Information</h4>
                  <div className="info-group">
                    <p className="info-label">Payment Method</p>
                    <p className="info-value" style={{ textTransform: 'capitalize' }}>{selectedOrder.paymentMethod || 'COD'}</p>
                  </div>
                  <div className="info-group">
                    <p className="info-label">Order Date</p>
                    <p className="info-value">{new Date(selectedOrder.date).toLocaleString()}</p>
                  </div>

                  <h4 style={{ marginTop: '20px' }}>Shipping Address</h4>
                  <div className="address-box">
                    <p className="name">{selectedOrder.details?.name}</p>
                    <p>{selectedOrder.details?.address}</p>
                    <p>Phone: {selectedOrder.details?.phone}</p>
                    <p>PIN: {selectedOrder.details?.pincode}</p>
                  </div>
                </div>

                {/* --- Right Column: Items --- */}
                <div className="order-items-col">
                  <h4>Order Items ({selectedOrder.items?.length || 0})</h4>
                  <div className="order-items-list">
                    {selectedOrder.items?.map((item, idx) => (
                      <div key={idx} className="order-item-row">
                        <img src={item.image || 'https://via.placeholder.com/50'} alt={item.name} className="item-thumb" />
                        <div className="item-info">
                          <p className="item-name">{item.name}</p>
                          <p className="item-qty">{item.quantity} x ₹{item.price}</p>
                        </div>
                        <p className="item-total">₹{item.quantity * item.price}</p>
                      </div>
                    ))}
                  </div>

                  <div className="order-summary-footer">
                    <div className="summary-row total">
                      <span>Total Amount</span>
                      <span>₹{selectedOrder.totalAmount || selectedOrder.finalAmount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;