import React, { useState, useEffect } from "react";
import { Riple } from "react-loading-indicators";
import { useNavigate } from "react-router-dom";
import useFetch from "./coustomHook/useFetch";

// ✅ API BASE URL
const API = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/+$/, "");

const Admin = () => {
  const navigate = useNavigate();np

  // ✅ Fetch products from backend
  const { products: fetchedProducts, error, isLoading } = useFetch(
    `${API}/api/products`
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
    setProducts(fetchedProducts || []);
  }, [fetchedProducts]);

  // 🔓 Logout
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
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

  // ✅ ADD / UPDATE PRODUCT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editProduct) {
        const res = await fetch(
          `${API}/api/products/${editProduct._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );

        const updated = await res.json();

        setProducts((prev) =>
          prev.map((p) => (p._id === updated._id ? updated : p))
        );
      } else {
        const res = await fetch(`${API}/api/products`, {
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

  // ✅ DELETE PRODUCT
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await fetch(`${API}/api/products/${id}`, {
        method: "DELETE",
      });

      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // 🔍 Search filter
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Riple
          color="#667eea"
          size="medium"
          text="Loading Products..."
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="text-center mb-10 relative">
        <button
          onClick={handleLogout}
          className="absolute top-0 right-0 px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>

        <h1 className="text-4xl font-bold">Admin Panel</h1>

        <div className="mt-4 flex justify-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={openAddModal}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product._id} className="bg-white p-4 shadow rounded">
              <img
                src={product.image}
                alt={product.title}
                className="h-40 object-contain w-full"
              />
              <h2 className="font-bold mt-2">{product.title}</h2>
              <p>{product.description}</p>
              <p className="font-bold">₹{product.price}</p>

              <div className="flex justify-between mt-3">
                <button
                  onClick={() => openEditModal(product)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-xl font-bold mb-4">
              {editProduct ? "Edit Product" : "Add Product"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <input
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
              />
              <input
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
              />
              <input
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleChange}
                required
              />

              <button className="bg-green-500 text-white py-2 rounded">
                {editProduct ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Admin;