import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import API from '../services/api';
import '../styles/Product.css'; // We will create this CSS next

const Product = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch all products and find the one matching the ID
        // (Ideally, your backend should have a specific endpoint for this, but this works for now)
        const response = await API.get('/allproducts');
        const foundProduct = response.data.find((p) => p.id === Number(id) || p._id === id);
        setProduct(foundProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="loading-screen">Loading Product...</div>;
  if (!product) return <div className="error-screen">Product Not Found</div>;

  return (
    
    <div className="product-display-container">
      
      <div className="product-display">
        
        {/* Left Side - Image */}
        <div className="product-display-left">
          <div className="product-img-list">
            {/* Thumbnails (Placeholders if only 1 image exists) */}
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
          </div>
          <div className="product-display-main-img">
            <img src={product.image} alt={product.name} />
          </div>
        </div>

        {/* Right Side - Details */}
        <div className="product-display-right">
          <h1>{product.name}</h1>
          
          <div className="product-rating">
             {/* Simple Star Display */}
             {'★'.repeat(product.rating || 4)}{'☆'.repeat(5 - (product.rating || 4))}
             <span>(122 reviews)</span>
          </div>

          <div className="product-prices">
            <div className="product-price-old">₹{product.old_price}</div>
            <div className="product-price-new">₹{product.new_price}</div>
          </div>

          <div className="product-description">
            {product.description || "No description available for this product."}
          </div>

          <div className="product-actions">
            <button 
              className="btn-add-cart"
              onClick={() => addToCart(product.id)}
            >
              ADD TO CART
            </button>
          </div>

          <div className="product-meta">
            <p><span>Category:</span> {product.category}</p>
            <p><span>Tags:</span> Modern, Latest</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;