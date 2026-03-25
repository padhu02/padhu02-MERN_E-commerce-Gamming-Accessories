// pages/CartPage.js
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  
  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;
  
  return (
    <div className="cart-page-container">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <Link to="/products" className="continue-shopping">
          ← Continue Shopping
        </Link>
      </div>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <Link to="/products" className="shop-now-btn">
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items-section">
            <div className="cart-items-header">
              <h2>Cart Items ({cartItems.length})</h2>
              <button onClick={clearCart} className="clear-cart-btn">
                Clear All
              </button>
            </div>
            
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  
                  <div className="cart-item-details">
                    <h3>{item.title}</h3>
                    <p className="cart-item-price">₹{item.price.toFixed(2)}</p>
                    
                    <div className="cart-item-quantity">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="cart-item-total">
                    <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="remove-item-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="cart-summary">
            <div className="summary-card">
              <h2>Order Summary</h2>
              
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}</span>
              </div>
              
              <div className="summary-row total">
                <span>Total</span>
                <span className="total-price">₹{total.toFixed(2)}</span>
              </div>
              
              <div className="shipping-note">
                {shipping === 0 ? 
                  "🎉 You've qualified for FREE shipping!" : 
                  "Add ₹" + (500 - subtotal).toFixed(2) + " more for FREE shipping"
                }
              </div>
              
              <button className="checkout-btn">
                Proceed to Checkout
              </button>
              
              <div className="payment-methods">
                <p>We accept:</p>
                <div className="payment-icons">
                  <span>💳</span>
                  <span>📱</span>
                  <span>🏦</span>
                  <span>💎</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;