// pages/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaTruck, FaShieldAlt, FaStar, FaArrowRight } from "react-icons/fa";
import { MdPayment, MdSupportAgent } from "react-icons/md";
import { BsBoxSeam, BsTagFill } from "react-icons/bs";

import LogIn from "./LogIn";
import SignUp from "./SignUp";
import { useModal } from "../context/ModalContext";

const Home = () => {
  const { showSignUp, setShowSignUp, showLogin, setShowLogin } = useModal();

  const featuredProducts = [
    {
      id: 1,
      name: "Gaming Monitor 144Hz",
      price: 29999,
      oldPrice: 35999,
      image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400",
      category: "Monitors"
    },
    {
      id: 2,
      name: "Wireless Headphones Pro",
      price: 8999,
      oldPrice: 11999,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w-400",
      category: "Audio"
    },
    {
      id: 3,
      name: "Mechanical Keyboard RGB",
      price: 6999,
      oldPrice: 8999,
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400",
      category: "Keyboards"
    },
    {
      id: 4,
      name: "Gaming Mouse Wireless",
      price: 4999,
      oldPrice: 6999,
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400",
      category: "Mice"
    }
  ];

  const categories = [
    { name: "Monitors", icon: "🖥️", count: 45 },
    { name: "Keyboards", icon: "⌨️", count: 32 },
    { name: "Mice", icon: "🖱️", count: 28 },
    { name: "Headsets", icon: "🎧", count: 25 },
    { name: "Webcams", icon: "📷", count: 18 },
    { name: "Speakers", icon: "🔊", count: 22 }
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title" ><span className="gradient-text">Pirate's Products</span></h1>
            <h1 className="hero-title">
              Elevate Your <span className="gradient-text">Gaming</span> Experience
            </h1>
            <p className="hero-subtitle">
              Discover premium gaming gear, monitors, and accessories at unbeatable prices.
              Free shipping on orders over ₹1999.
            </p>
            <div className="hero-buttons">
              <Link to="/products" className="btn-primary">
                Shop Now <FaArrowRight />
              </Link>
              <button 
                className="btn-secondary"
                onClick={() => setShowLogin(true)}
              >
                Sign In
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Products</span>
              </div>
              <div className="stat">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Support</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-card card1">
              <img src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w-300" alt="Gaming Monitor" />
              <div className="card-badge">-25%</div>
            </div>
            <div className="floating-card card2">
              <img src="https://images.unsplash.com/photo-1541140532154-b024d705b90a?w-300" alt="Keyboard" />
              <div className="card-badge">NEW</div>
            </div>
            <div className="floating-card card3">
              <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w-300" alt="Headphones" />
              <div className="card-badge">Best Seller</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Why Choose <span className="gradient-text">MyShop</span></h2>
          <p>Premium shopping experience with unbeatable benefits</p>
        </div>
        <div className="features-grid">
          {[
            { icon: <FaTruck />, title: "Free Shipping", desc: "On orders above ₹1999" },
            { icon: <MdPayment />, title: "Secure Payment", desc: "100% secure transactions" },
            { icon: <FaShieldAlt />, title: "2-Year Warranty", desc: "On all products" },
            { icon: <BsBoxSeam />, title: "Easy Returns", desc: "30-day return policy" },
            { icon: <MdSupportAgent />, title: "24/7 Support", desc: "Always here to help" },
            { icon: <BsTagFill />, title: "Best Prices", desc: "Price match guarantee" }
          ].map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="section-header">
          <h2>Featured <span className="gradient-text">Products</span></h2>
          <Link to="/products" className="view-all">
            View All <FaArrowRight />
          </Link>
        </div>
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card-home">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-badge">Sale</div>
              </div>
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3>{product.name}</h3>
                <div className="product-price">
                  <span className="current-price">₹{product.price.toLocaleString()}</span>
                  <span className="old-price">₹{product.oldPrice.toLocaleString()}</span>
                  <span className="discount">Save ₹{(product.oldPrice - product.price).toLocaleString()}</span>
                </div>
                <div className="product-rating">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="star filled" />
                  ))}
                  <span>(4.8)</span>
                </div>
                <button className="add-to-cart-btn">
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="section-header">
          <h2>Shop by <span className="gradient-text">Category</span></h2>
          <p>Find exactly what you need</p>
        </div>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <Link to="/products" key={index} className="category-card">
              <div className="category-icon">{category.icon}</div>
              <div className="category-info">
                <h3>{category.name}</h3>
                <p>{category.count} products</p>
              </div>
              <FaArrowRight className="arrow-icon" />
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Level Up Your Setup?</h2>
          <p>Join thousands of gamers who trust us for their gaming gear needs.</p>
          <div className="cta-buttons">
            <Link to="/products" className="btn-primary">
              Start Shopping
            </Link>
            {!showSignUp && (
              <button 
                className="btn-secondary"
                onClick={() => setShowSignUp(true)}
              >
                Create Account
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Auth Modals */}
      {showLogin && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowLogin(false)}>×</button>
            <LogIn onClose={() => setShowLogin(false)} />
          </div>
        </div>
      )}

      {showSignUp && <SignUp onClose={() => setShowSignUp(false)} />}
    </div>
  );
};

export default Home;