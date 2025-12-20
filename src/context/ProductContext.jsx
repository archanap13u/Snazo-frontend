import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import API from '../services/api';

const ProductContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lastFetched, setLastFetched] = useState(null);

    // Cache timeout (e.g., 5 minutes)
    const CACHE_TIMEOUT = 5 * 60 * 1000;

    const fetchProducts = useCallback(async (forceRefresh = false) => {
        const now = Date.now();

        // Return cached data if available and not expired
        if (!forceRefresh && products.length > 0 && lastFetched && (now - lastFetched < CACHE_TIMEOUT)) {
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const { data } = await API.get('/allproducts');
            const productList = Array.isArray(data) ? data : [];
            setProducts(productList);
            setLastFetched(now);
        } catch (err) {
            console.error("Failed to fetch products:", err);
            setError("Failed to load products. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [products.length, lastFetched]);

    // Initial fetch
    useEffect(() => {
        if (products.length === 0) {
            fetchProducts();
        }
    }, [fetchProducts, products.length]);

    const value = {
        products,
        loading,
        error,
        fetchProducts,
        lastFetched
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductContext;
