import axios from 'axios';

// Use environment variable or fallback to production backend
// Use environment variable or fallback to local/production backend
// FORCE LOCALHOST DEBUGGING
const API_URL = 'http://localhost:5000/api';
// Fallback for production if needed: 'https://snazo-backend-z0hx.onrender.com/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to add Token to requests
api.interceptors.request.use((config) => {
  const user = localStorage.getItem('user_session');
  if (user) {
    try {
      const parsedUser = JSON.parse(user);
      // Check if token exists on user object or user.user object
      const token = parsedUser.token || (parsedUser.user && parsedUser.user.token);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.error("Error parsing user token:", e);
    }
  }
  return config;
}, (error) => Promise.reject(error));


// --- API Collection ---

export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (name, email, password) => api.post('/auth/register', { name, email, password }),
  getProfile: () => api.get('/auth/profile'),
};

export const productsAPI = {
  getAll: async () => {
    try {
      const res = await api.get('/products');
      if (Array.isArray(res.data)) return res.data;
      if (res.data && Array.isArray(res.data.products)) return res.data.products;
      return [];
    } catch (error) {
      console.error("Failed to fetch products:", error);
      return [];
    }
  },
  getOne: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`)
};

export const ordersAPI = {
  create: (orderData) => api.post('/orders', orderData),
  getMyOrders: () => api.get('/orders/myorders'),
  getAllOrders: () => api.get('/orders'),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status })
};

export const adminAPI = {
  getUsers: () => api.get('/users'),
  getStats: () => api.get('/admin/stats')
};

// --- BACKWARDS COMPATIBILITY EXPORTS ---
// These lines fix the error you are seeing by exporting the specific names your Context expects
export const loginAPI = authAPI.login;
export const registerAPI = authAPI.register;

export default api;