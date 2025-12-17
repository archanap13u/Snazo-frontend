import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ✅ FIXED IMPORTS (Up 2 levels to reach src folder)
import API, { ordersAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

import './AdminDashboard.css';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // --- STATE ---
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [pincodes, setPincodes] = useState([]);
  const [promos, setPromos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [productDetails, setProductDetails] = useState({
    name: "", image: "",
    new_price: '',
    old_price: '',
    category: 'veg',
    rating: '',
    weight: '', // Added for Quantity
    isBestSeller: false
  });

  const [pincodeInput, setPincodeInput] = useState({ code: '', area: '' });
  const [promoInput, setPromoInput] = useState({ code: '', discountValue: '' });

  // Order Modal State
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // --- FETCH DATA ---
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (activeTab === 'orders') fetchOrders();
    if (activeTab === 'pincodes') fetchPincodes();
    if (activeTab === 'promos') fetchPromos();
  }, [activeTab]);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get('/allproducts');
      setProducts(data);
    } catch (error) { console.error('Error fetching products', error); }
  };

  const fetchOrders = async () => {
    try {
      const { data } = await API.get('/orders');
      setOrders(data);
    } catch (error) { console.error(error); }
  };

  const fetchPincodes = async () => {
    try {
      const { data } = await API.get('/pincodes');
      setPincodes(data);
    } catch (error) { console.error(error); }
  };

  const fetchPromos = async () => {
    try {
      const { data } = await API.get('/promos');
      setPromos(data);
    } catch (error) { console.error(error); }
  };

  // --- HANDLERS ---
  const productChangeHandler = (e) => {
    if (e.target.name === "image") {
      setImageFile(e.target.files[0]);
    } else if (e.target.name === "isBestSeller") {
      setProductDetails({ ...productDetails, isBestSeller: e.target.checked });
    } else {
      setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    }
  };

  const handleAddProduct = async () => {
    if (!imageFile) return alert("Please upload an image");
    setIsLoading(true);

    try {
      let formData = new FormData();
      formData.append('product', imageFile);

      // Note: Ensure your backend server.js has app.post('/api/upload', ...)
      const uploadRes = await API.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (uploadRes.data.success) {
        const product = {
          ...productDetails,
          image: uploadRes.data.image_url,
          new_price: Number(productDetails.new_price),
          old_price: productDetails.old_price ? Number(productDetails.old_price) : 0,
          rating: Number(productDetails.rating)
        };

        const addProductRes = await API.post('/addproduct', product);
        if (addProductRes.data.success) {
          alert("Product Added Successfully");
          resetForm();
          fetchProducts();
          setActiveTab('products');
        } else { alert("Failed to add product"); }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProduct = async () => {
    setIsLoading(true);
    try {
      let productURL = productDetails.image;

      if (imageFile) {
        let formData = new FormData();
        formData.append('product', imageFile);
        const uploadRes = await API.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (uploadRes.data.success) productURL = uploadRes.data.image_url;
      }

      const updateData = {
        id: editId,
        ...productDetails,
        new_price: Number(productDetails.new_price),
        old_price: Number(productDetails.old_price),
        rating: Number(productDetails.rating),
        image: productURL
      };

      const res = await API.post('/editproduct', updateData);
      if (res.data.success) {
        alert("Product Updated Successfully");
        resetForm();
        fetchProducts();
        setActiveTab('products');
      } else { alert("Update Failed"); }
    } catch (error) { console.error("Update Error", error); }
    finally { setIsLoading(false); }
  };

  const startEdit = (product) => {
    setIsEditing(true);
    setEditId(product.id || product._id);
    setProductDetails({
      name: product.name,
      image: product.image,
      category: product.category,
      new_price: product.new_price || product.price || "",
      old_price: product.old_price || "",
      description: product.description || "",
      rating: product.rating || 4,
      isBestSeller: product.isBestSeller || false
    });
    setImageFile(null);
    setActiveTab('addproduct');
  };

  const resetForm = () => {
    setProductDetails({ name: "", image: "", category: "veg", new_price: "", old_price: "", description: "", rating: 4, isBestSeller: false });
    setImageFile(null);
    setIsEditing(false);
    setEditId(null);
  }

  const handleStatusChange = async (id, newStatus) => {
    try {
      await API.put(`/orders/${id}/status`, { status: newStatus });
      fetchOrders();
    } catch (e) {
      alert('Error updating status');
    }
  };

  const openOrderModal = (order) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
    setSelectedOrder(null);
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Delete product?')) {
      await API.post(`/removeproduct`, { id: id });
      fetchProducts();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddPincode = async (e) => {
    e.preventDefault();
    const cleanCode = pincodeInput.code.replace(/\D/g, '').trim();
    if (!cleanCode) return alert("Enter valid pincode");

    await API.post(`/pincodes`, { ...pincodeInput, code: cleanCode });
    setPincodeInput({ code: '', area: '' });
    fetchPincodes();
  };
  const handleDeletePincode = async (id) => { await API.delete(`/pincodes/${id}`); fetchPincodes(); };
  const handleAddPromo = async (e) => { e.preventDefault(); await API.post(`/promos`, promoInput); setPromoInput({ code: '', discountValue: '' }); fetchPromos(); };
  const handleDeletePromo = async (id) => { await API.delete(`/promos/${id}`); fetchPromos(); };

  // --- STATE FOR DROPDOWNS ---
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleDropdown = (menu) => {
    setDropdownOpen(dropdownOpen === menu ? null : menu);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.nav-item')) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order? This action cannot be undone.")) {
      try {
        await API.delete(`/orders/${orderId}`);
        toast.success("Order Deleted Successfully");
        setOrders(orders.filter(o => o._id !== orderId));
      } catch (error) {
        console.error("Delete Error:", error);
        toast.error("Failed to delete order");
      }
    }
  };

  // --- RENDER SECTIONS ---
  const renderNavbar = () => (
    <nav className="navbar">
      <div className="navbar-header">
        <h2>Admin Panel</h2>
        <p>SNAZO Dashboard</p>
      </div>
      <ul className="nav-menu">
        <li className="nav-item dropdown">
          <button
            className={`nav-link ${['products', 'addproduct'].includes(activeTab) ? 'active' : ''}`}
            onClick={() => toggleDropdown('products')}
          >
            📦 Products <span className="dropdown-arrow">{dropdownOpen === 'products' ? '▲' : '▼'}</span>
          </button>
          {dropdownOpen === 'products' && (
            <ul className="dropdown-menu">
              <li>
                <button
                  className={activeTab === 'products' ? 'active' : ''}
                  onClick={() => { setActiveTab('products'); resetForm(); setDropdownOpen(null); }}
                >
                  View Products
                </button>
              </li>
              <li>
                <button
                  className={activeTab === 'addproduct' ? 'active' : ''}
                  onClick={() => { setActiveTab('addproduct'); resetForm(); setDropdownOpen(null); }}
                >
                  Add Product
                </button>
              </li>
            </ul>
          )}
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => { setActiveTab('orders'); setDropdownOpen(null); }}
          >
            🛒 Orders
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'pincodes' ? 'active' : ''}`}
            onClick={() => { setActiveTab('pincodes'); setDropdownOpen(null); }}
          >
            📍 Pincodes
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'promos' ? 'active' : ''}`}
            onClick={() => { setActiveTab('promos'); setDropdownOpen(null); }}
          >
            🏷️ Promos
          </button>
        </li>
      </ul>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </nav>
  );

  return (
    <div className="dashboard-container">
      {renderNavbar()}
      <div className="main-content">
        {activeTab === 'products' && (
          <div className="content-section">
            <div className="header-flex">
              <h3>Product Inventory ({products.length})</h3>
              <button className="btn-primary" onClick={() => { resetForm(); setActiveTab('addproduct'); }}>+ Add New</button>
            </div>
            <div className="table-wrapper">
              <table className="admin-table">
                <thead><tr><th>Image</th><th>Details</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {products.map((p) => {
                    const priceToShow = p.new_price || p.price || 0;
                    return (
                      <tr key={p.id || p._id}>
                        <td><img src={p.image} alt="" className="table-img" /></td>
                        <td><div className="fw-bold">{p.name}</div><div className="text-muted">{p.category}</div></td>
                        <td><span className="fw-bold">₹{priceToShow}</span></td>
                        <td>{p.isBestSeller && <span className="badge-gold">Best Seller</span>}</td>
                        <td>
                          <button className="btn-icon" onClick={() => startEdit(p)}>✏️</button>
                          <button className="btn-icon delete" onClick={() => deleteProduct(p.id || p._id)}>🗑️</button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'addproduct' && (
          <div className="content-section">
            <h3>{isEditing ? "Edit Product" : "Add New Product"}</h3>
            <div className="add-form-card">
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Product Name</label>
                  <input value={productDetails.name} onChange={productChangeHandler} type="text" name="name" />
                </div>
                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea value={productDetails.description} onChange={productChangeHandler} name="description" />
                </div>
                <div className="form-group">
                  <label>Old Price</label>
                  <input value={productDetails.old_price} onChange={productChangeHandler} type="number" name="old_price" />
                </div>
                <div className="form-group">
                  <label>New Price</label>
                  <input value={productDetails.new_price} onChange={productChangeHandler} type="number" name="new_price" required />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select value={productDetails.category} onChange={productChangeHandler} name="category">
                    <option value="veg">Veg</option>
                    <option value="non-veg">Non-Veg</option>
                    <option value="frozen">Frozen</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Rating</label>
                  <input value={productDetails.rating} onChange={productChangeHandler} type="number" name="rating" max="5" />
                </div>
                <div className="form-group">
                  <label>Quantity / Weight</label>
                  <input value={productDetails.weight} onChange={productChangeHandler} type="text" name="weight" placeholder="e.g. 1kg, 250g, 1pc" />
                </div>
                <div className="form-group full-width checkbox-group">
                  <input type="checkbox" name="isBestSeller" checked={productDetails.isBestSeller} onChange={productChangeHandler} />
                  <label>Mark as Best Seller</label>
                </div>
                <div className="form-group full-width">
                  <label>Product Image</label>
                  {isEditing && productDetails.image && !imageFile && <img src={productDetails.image} alt="Current" className="preview-img" />}
                  <input onChange={productChangeHandler} type="file" name="image" />
                </div>
                <button onClick={isEditing ? handleUpdateProduct : handleAddProduct} className="btn-primary" disabled={isLoading}>
                  {isLoading ? "Processing..." : (isEditing ? "Update Product" : "Add Product")}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="content-section">
            <h3>Customer Orders</h3>
            <div className="table-wrapper">
              <table className="admin-table">
                <thead><tr><th>Order ID</th><th>Customer</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o._id}>
                      <td><span className="mono">#{o._id.slice(-6)}</span></td>
                      <td>
                        <div className="fw-bold">{o.user ? o.user.name : "Guest"}</div>
                        {/* <div className="text-muted">{o.paymentMethod}</div> */}
                        <div className="text-muted">{new Date(o.date).toLocaleDateString()}</div>
                      </td>
                      <td className="fw-bold">₹{o.totalAmount || o.finalAmount}</td>
                      <td>
                        <select
                          className={`status-select ${o.status}`}
                          value={o.status}
                          onChange={(e) => handleStatusChange(o._id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td>
                        <button className="btn-small" onClick={() => openOrderModal(o)} style={{ marginRight: '5px' }}>View</button>
                        <button className="btn-small btn-danger" onClick={() => handleDeleteOrder(o._id)} title="Delete Order">🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'pincodes' && (
          <div className="content-section">
            <h3>Delivery Pincodes</h3>
            <div className="add-form-card compact">
              <form onSubmit={handleAddPincode} className="inline-form">
                <input value={pincodeInput.code} onChange={(e) => setPincodeInput({ ...pincodeInput, code: e.target.value })} placeholder="Pincode" />
                <input value={pincodeInput.area} onChange={(e) => setPincodeInput({ ...pincodeInput, area: e.target.value })} placeholder="Area Name" />
                <button className="btn-primary">Add</button>
              </form>
            </div>
            <table className="admin-table narrow">
              <thead><tr><th>Code</th><th>Area</th><th>Action</th></tr></thead>
              <tbody>{pincodes.map(p => (<tr key={p._id}><td>{p.code}</td><td>{p.area}</td><td><button className="btn-icon delete" onClick={() => handleDeletePincode(p._id)}>🗑️</button></td></tr>))}</tbody>
            </table>
          </div>
        )}

        {activeTab === 'promos' && (
          <div className="content-section">
            <h3>Promo Codes</h3>
            <div className="add-form-card compact">
              <form onSubmit={handleAddPromo} className="inline-form">
                <input value={promoInput.code} onChange={(e) => setPromoInput({ ...promoInput, code: e.target.value })} placeholder="Promo Code" />
                <input value={promoInput.discountValue} onChange={(e) => setPromoInput({ ...promoInput, discountValue: e.target.value })} placeholder="Discount (₹)" />
                <button className="btn-primary">Add</button>
              </form>
            </div>
            <table className="admin-table narrow">
              <thead><tr><th>Code</th><th>Discount</th><th>Action</th></tr></thead>
              <tbody>{promos.map(p => (<tr key={p._id}><td>{p.code}</td><td>₹{p.discountValue}</td><td><button className="btn-icon delete" onClick={() => handleDeletePromo(p._id)}>🗑️</button></td></tr>))}</tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {isOrderModalOpen && selectedOrder && (
        <div className="modal-overlay">
          <div className="modal-content order-modal">
            <div className="modal-header">
              <h3>Order #{selectedOrder._id.slice(-6)}</h3>
              <button className="close-btn" onClick={closeOrderModal}>&times;</button>
            </div>

            <div className="modal-body-grid">
              <div className="order-info-col">
                <h4>Customer Details</h4>
                <p><strong>Name:</strong> {selectedOrder.user?.name || selectedOrder.details?.name || 'Guest'}</p>
                <p><strong>Phone:</strong> {selectedOrder.details?.phone}</p>
                <p><strong>Email:</strong> {selectedOrder.user?.email}</p>

                <h4 style={{ marginTop: '20px' }}>Shipping Address</h4>
                <p className="address-box">
                  {selectedOrder.details?.address}<br />
                  {selectedOrder.details?.pincode}
                </p>

                <h4 style={{ marginTop: '20px' }}>Order Status</h4>
                <span className={`status-pill ${selectedOrder.status}`}>{selectedOrder.status}</span>
              </div>

              <div className="order-items-col">
                <h4>Ordered Items</h4>
                <div className="order-items-list">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="order-item-row">
                      <img src={item.image} alt="" className="item-thumb" />
                      <div className="item-info">
                        <p className="item-name">{item.name}</p>
                        <p className="item-qty">Qty: {item.quantity} x ₹{item.price}</p>
                      </div>
                      <p className="item-total">₹{item.quantity * item.price}</p>
                    </div>
                  ))}
                </div>

                <div className="order-summary-footer">
                  <div className="summary-row">
                    <span>Payment Method</span>
                    <strong style={{ textTransform: 'capitalize' }}>{selectedOrder.paymentMethod || 'COD'}</strong>
                  </div>
                  {selectedOrder.discountAmount > 0 && (
                    <div className="summary-row" style={{ color: 'green' }}>
                      <span>Discount ({selectedOrder.promoCode})</span>
                      <span>-₹{selectedOrder.discountAmount}</span>
                    </div>
                  )}
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
  );
};

export default AdminDashboard;