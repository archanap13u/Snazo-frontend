import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Load User from LocalStorage on App Start
  useEffect(() => {
    const savedData = localStorage.getItem('user_session');

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);

        // Check if data has the structure we expect
        if (parsedData && parsedData.token) {
          setCurrentUser(parsedData); // Set the whole object
          API.defaults.headers.common['Authorization'] = `Bearer ${parsedData.token}`;
        }
      } catch (e) {
        console.error("Failed to parse user session", e);
        localStorage.removeItem('user_session');
      }
    }
    setLoading(false);
  }, []);

  // 1.1 Auto-refresh profile on load to ensure up-to-date points
  useEffect(() => {
    if (currentUser && !loading) {
      refreshProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  // 2. Login Function
  const login = async (email, password) => {
    try {
      // NOTE: Ensure your server.js /login route returns { user: { role: '...' }, token: '...' }
      const response = await API.post('/auth/login', { email, password });
      const data = response.data;

      if (data.success) {
        // We store the whole response data (token + user info)
        localStorage.setItem('user_session', JSON.stringify(data));
        setCurrentUser(data);

        API.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        return { success: true };
      } else {
        alert(data.errors || "Login Failed");
        return { success: false };
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.response?.data?.errors || "Login failed");
      throw error;
    }
  };

  // 3. Register Function
  const register = async (name, email, password) => {
    try {
      const response = await API.post('/auth/register', { name, email, password });
      const data = response.data;

      if (data.success) {
        // NOTE: Registration often returns ONLY token. 
        // The user object might be missing the role here.
        // We save what we have, but the user might need to re-login to see Admin features.
        localStorage.setItem('user_session', JSON.stringify(data));
        setCurrentUser(data);

        API.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        return { success: true };
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert(error.response?.data?.errors || "Registration failed");
      throw error;
    }
  };

  // 4. Logout Function
  const logout = () => {
    localStorage.removeItem('user_session');
    setCurrentUser(null);
    delete API.defaults.headers.common['Authorization'];
    // Optional: window.location.href = '/'; 
  };

  // 5. Refresh Profile (to update reward points, etc.)
  const refreshProfile = async () => {
    if (!currentUser) return;
    try {
      const response = await API.get('/auth/profile');
      if (response.data.success) {
        // Updated user state with fresh data from backend
        const updatedUser = { ...currentUser, user: response.data.user };
        setCurrentUser(updatedUser);
        localStorage.setItem('user_session', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error("Failed to refresh profile:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, loading, refreshProfile }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; 