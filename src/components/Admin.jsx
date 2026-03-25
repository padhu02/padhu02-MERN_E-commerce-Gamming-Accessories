import React, { useState, useEffect } from "react";
import { Riple } from "react-loading-indicators";
import { useNavigate } from "react-router-dom";
import useFetch from "./coustomHook/useFetch";

const Admin = () => {
  const navigate = useNavigate();

  const { products: fetchedProducts, error, isLoading } = useFetch(
    "http://localhost:5000/products"
  );

  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setProducts(fetchedProducts);
  }, [fetchedProducts]);

  // 🔓 LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("isAdmin"); // optional if you store login info
    navigate("/"); // go to home page
  };

  const openAddModal = () => {
    setEditProduct(null);
    setFormData({ title: "", description: "", price: "", image: "" });
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.image,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editProduct) {
        const res = await fetch(
          `http://localhost:4000/products/${editProduct.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );
        const updated = await res.json();
        setProducts((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        );
      } else {
        const res = await fetch("http://localhost:4000/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const newProduct = await res.json();
        setProducts((prev) => [newProduct, ...prev]);
      }
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`http://localhost:4000/products/${id}`, { method: "DELETE" });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Riple
          color="#667eea"
          size="medium"
          text="Loading Products..."
          textColor="#2d3748"
        />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="text-center mb-10 relative">
        {/* 🔓 LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="absolute top-0 right-0 px-4 py-2 rounded-lg
          bg-gradient-to-r from-red-500 to-pink-600
          text-white font-semibold shadow-md
          hover:from-pink-600 hover:to-red-500 transition"
        >
          Logout
        </button>

        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          Admin Panel
        </h1>
        <p className="text-gray-600 mt-2">Manage your product catalog</p>
        <div className="mt-4 flex justify-center gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={openAddModal}
            className="px-5 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 transition shadow-lg"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 font-semibold">
            No products found
          </p>
        ) : (
          filteredProducts.map((product) => {
            const discount = product.discount || 15;
            const originalPrice = (product.price * (1 + discount / 100)).toFixed(2);
            return (
              <div
                key={product.id}
                className="relative flex flex-col bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition"
              >
                <div className="absolute top-2 right-2 bg-gradient-to-r from-pink-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                  {discount}% OFF
                </div>
                <div className="flex items-center justify-center h-56 bg-gray-50 p-4 border-b border-gray-200">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-contain max-h-40"
                  />
                </div>
                <div className="flex flex-col p-4 flex-grow">
                  <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {product.title}
                  </h2>
                  {/* DESCRIPTION HEIGHT FIXED TO 50px */}
                  <p
                    className="text-gray-500 text-sm mb-4 overflow-hidden"
                    style={{ height: "50px" }}
                  >
                    {product.description}
                  </p>
                  <div className="mt-auto">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gray-800 font-bold text-lg">
                        ₹{product.price}
                      </span>
                      <span className="text-gray-400 line-through text-sm">
                        ₹{originalPrice}
                      </span>
                    </div>
                    <span className="text-green-600 font-semibold text-sm">
                      Save ₹{(originalPrice - product.price).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between p-3 border-t border-gray-200">
                  <button
                    onClick={() => openEditModal(product)}
                    className="text-white bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded-md text-sm font-medium transition shadow-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-sm font-medium transition shadow-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">
              {editProduct ? "Edit Product" : "Add Product"}
            </h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Product Title"
                value={formData.title}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              ></textarea>
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <button
                type="submit"
                className="mt-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg py-2 font-semibold hover:from-purple-600 hover:to-indigo-500 transition"
              >
                {editProduct ? "Update Product" : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 font-semibold mt-6">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
};

export default Admin;