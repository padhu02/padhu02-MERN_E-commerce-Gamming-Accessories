import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext";

// IMPORT ORDER FIX: Bootstrap FIRST, then your custom CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // ← Now this loads AFTER Bootstrap
import "./index.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </React.StrictMode>
);