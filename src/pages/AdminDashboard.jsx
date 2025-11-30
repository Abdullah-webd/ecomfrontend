"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStore } from "../store/store";

const API_URL = "http://localhost:5000/api";

// 🆕 replace with your own Cloudinary info
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dkdw9jbxm/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "studymasterMedia";

export default function AdminDashboard() {
  const { user, token } = useStore();
  const navigate = useNavigate();
  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null); // 🆕 image state
  const [expandedOrder, setExpandedOrder] = useState(null) // track expanded order for details

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "mens",
    gender: "male",
    sizes: "XS,S,M,L,XL",
    stock: "",
  });

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/auth");
      return;
    }

    if (tab === "products") fetchProducts();
    if (tab === "orders") fetchOrders();
    if (tab === "users") fetchUsers();
  }, [tab, user, navigate]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/products?limit=100`);
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🆕 upload image to Cloudinary
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await axios.post(CLOUDINARY_URL, formData);
    return res.data.secure_url;
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      let imageUrl = "/placeholder.svg";

      // 🆕 Upload image if selected
      if (imageFile) {
        imageUrl = await uploadToCloudinary(imageFile);
      }

      await axios.post(
        `${API_URL}/admin/products`,
        {
          ...formData,
          price: Number.parseFloat(formData.price),
          stock: Number.parseInt(formData.stock),
          sizes: formData.sizes.split(",").map((s) => s.trim()),
          images: [{ secure_url: imageUrl }],
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // reset form
      setFormData({
        title: "",
        description: "",
        price: "",
        category: "mens",
        gender: "male",
        sizes: "XS,S,M,L,XL",
        stock: "",
      });
      setImageFile(null);
      fetchProducts();
      alert("✅ Product added successfully!");
    } catch (error) {
      alert(
        "Error adding product: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${API_URL}/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
      alert("🗑️ Product deleted!");
    } catch (error) {
      alert("Error deleting product");
    }
  };

   const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        `${API_URL}/admin/orders/${orderId}/status`,
        { orderStatus: newStatus },
        { headers: { Authorization: `Bearer ${token}` } },
      )

      // Update the orders list with the new status
      setOrders(orders.map((order) => (order._id === orderId ? response.data : order)))
      alert(`Order status updated to ${newStatus}!`)
    } catch (error) {
      alert("Error updating order status: " + (error.response?.data?.message || error.message))
    }
  }

  if (!user || !user.isAdmin) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b">
        {["products", "orders", "users"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 font-semibold border-b-2 transition ${
              tab === t
                ? "text-gray-900 border-gray-900"
                : "text-gray-600 border-transparent hover:text-gray-900"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      {/* Products Tab */}
      {tab === "products" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Product Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Add Product
              </h2>
              <form onSubmit={handleAddProduct} className="space-y-3">
                <input
                  type="text"
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  rows="3"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  required
                />
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                >
                  <option value="mens">Men</option>
                  <option value="womens">Women</option>
                  <option value="unisex">Unisex</option>
                </select>
                <select
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="unisex">Unisex</option>
                </select>
                <input
                  type="text"
                  placeholder="Sizes (comma-separated)"
                  value={formData.sizes}
                  onChange={(e) =>
                    setFormData({ ...formData, sizes: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  required
                />

                {/* 🆕 Image upload */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />

                <button
                  type="submit"
                  className="w-full py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition text-sm font-semibold"
                >
                  {loading ? "Uploading..." : "Add Product"}
                </button>
              </form>
            </div>
          </div>

          {/* Products List */}
          <div className="lg:col-span-2">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-lg p-4 border border-gray-200 flex justify-between items-start"
                  >
                    <div>
                      <img
                        src={
                          product.images?.[0]?.secure_url || "/placeholder.svg"
                        }
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded mb-2"
                      />
                      <h3 className="font-bold text-gray-900">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        ${product.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Stock: {product.stock}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="text-red-600 hover:text-red-800 text-sm font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {/* Orders Tab */}{" "}
       {tab === "orders" && (
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div
                    className="p-6 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition"
                    onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-bold text-gray-900">
                            {order.user?.firstName} {order.user?.lastName}
                          </p>
                          <p className="text-sm text-gray-600">Order ID: {order._id}</p>
                          <p className="text-sm text-gray-600">Email: {order.user?.email} </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-gray-900">${order.totalPrice.toFixed(2)}</p>
                        <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>

                      <span
                        className={`px-3 py-1 rounded text-sm font-semibold whitespace-nowrap ${
                          order.orderStatus === "delivered"
                            ? "bg-green-100 text-green-800"
                            : order.orderStatus === "shipped"
                              ? "bg-blue-100 text-blue-800"
                              : order.orderStatus === "processing"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>

                  {expandedOrder === order._id && (
                    <div className="border-t border-gray-200 p-6 bg-gray-50">
                      <div className="mb-6">
                        <h3 className="font-bold text-gray-900 mb-3">Order Items</h3>
                        <div className="space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span className="text-gray-600">
                                {item.title} ({item.size}) × {item.quantity}
                              </span>
                              <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h3 className="font-bold text-gray-900 mb-3">Shipping Address</h3>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>{order.shippingAddress.fullName}</p>
                          <p>{order.shippingAddress.address}</p>
                          <p>
                            {order.shippingAddress.city}, {order.shippingAddress.zipCode}
                          </p>
                          <p>{order.shippingAddress.country}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-bold text-gray-900 mb-3">Update Status</h3>
                        <div className="flex flex-wrap gap-2">
                          {["processing", "shipped", "delivered", "cancelled"].map((status) => (
                            <button
                              key={status}
                              onClick={() => handleUpdateOrderStatus(order._id, status)}
                              className={`px-4 py-2 rounded text-sm font-semibold transition ${
                                order.orderStatus === status
                                  ? "bg-gray-900 text-white"
                                  : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                              }`}
                            >
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}{" "}
      {/* Users Tab */}{" "}
      {tab === "users" && (
        <div>
          {" "}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="space-y-4">
              {" "}
              {users.map((u) => (
                <div
                  key={u._id}
                  className="bg-white rounded-lg p-4 border border-gray-200"
                >
                  {" "}
                  <p className="font-bold text-gray-900">{u.email}</p>{" "}
                  <p className="text-sm text-gray-600">
                    {" "}
                    {u.firstName} {u.lastName}{" "}
                  </p>{" "}
                </div>
              ))}{" "}
            </div>
          )}{" "}
        </div>
      )}
    </div>
  );
}
