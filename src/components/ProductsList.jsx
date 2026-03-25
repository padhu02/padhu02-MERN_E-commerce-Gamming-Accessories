import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import useFetch from "./coustomHook/useFetch";
import { Riple } from "react-loading-indicators";

import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";

const ProductsList = () => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const { products, error, isLoading } = useFetch(
    `${API_URL}/api/products`
  );

  const { addToCart } = useCart();
  const { search } = useSearch();

  // Filter products by search query
  const filteredProducts = search
    ? products.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      )
    : products;

  if (isLoading) {
    return (
      <div className="loading-container">
        <Riple
          color="#667eea"
          size="medium"
          text="Loading Products..."
          textColor="#2d3748"
        />
      </div>
    );
  }

  return (
    <div className="products-list-container">
      <div className="products-list-header">
        <h1>Our Products</h1>
        <p>Shop the best collection at amazing prices</p>
      </div>

      {error && (
        <div className="error-message">
          <p>⚠️ {error}</p>
        </div>
      )}

      {filteredProducts.length === 0 && !error ? (
        <div className="no-products">
          <h2>No Products Found</h2>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => {
            const discount = product.discount !== undefined && product.discount !== null
              ? product.discount
              : 15;
            const originalPrice = (
              product.price *
              (1 + discount / 100)
            ).toFixed(2);

            return (
              <Card key={product.id} className="product-card">
                <div className="product-card-badge">{discount}% OFF</div>

                <div className="product-image-container">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    className="product-image"
                    alt={product.title}
                  />
                </div>

                <Card.Body className="product-card-body">
                  <Card.Title className="product-title">
                    {product.title}
                  </Card.Title>
                  <Card.Text className="product-description">
                    {product.description}
                  </Card.Text>
                </Card.Body>

                <Card.Footer className="product-card-footer">
                  <div className="product-price-container">
                    <div className="text-red-600 font-bold text-2xl ">
                      ₹{product.price}
                      <span className="original-price">₹{originalPrice}</span>
                    </div>
                    <small className="savings-text">
                      Save ₹{(originalPrice - product.price).toFixed(2)}
                    </small>
                  </div>
                  <Button
                    variant="primary"
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </Card.Footer>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductsList;
