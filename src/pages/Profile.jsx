"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useStore } from "../store/store"

const API_URL = "http://localhost:5000/api"

export default function Profile() {
  const { user, token } = useStore()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedOrder, setExpandedOrder] = useState(null) // track expanded order

  useEffect(() => {
    if (!user) {
      navigate("/auth")
      return
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_URL}/orders/my-orders`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setOrders(response.data)
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user, token, navigate])

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        `${API_URL}/orders/${orderId}/status`,
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

  if (!user) return null

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Account Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-gray-900">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Account Type</p>
                <p className="font-semibold text-gray-900">{user.isAdmin ? "Admin" : "Customer"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Order History</h2>

          {loading ? (
            <p className="text-gray-600">Loading orders...</p>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center">
              <p className="text-gray-600 mb-4">No orders yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div
                    className="p-6 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition"
                    onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                  >
                    <div>
                      <p className="text-sm text-gray-600">Order ID</p>
                      <p className="font-semibold text-gray-900">{order._id}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                      <p className="font-bold text-gray-900 mb-3">${order.totalPrice.toFixed(2)}</p>
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

                  {expandedOrder === order._id && (
                    <div className="border-t border-gray-200 p-6 bg-gray-50">
                      <div className="mb-6">
                        <p className="text-sm text-gray-600 mb-2">Payment Status</p>
                        <span
                          className={`px-3 py-1 rounded text-sm font-semibold inline-block ${
                            order.paymentStatus === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </div>

                      <div className="bg-gray-100 p-4 rounded mb-6">
                        <p className="text-sm font-semibold text-gray-900 mb-2">Items</p>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {order.items.map((item, idx) => (
                            <li key={idx}>
                              {item.title} ({item.size}) × {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">Tracking</h3>
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <p className="text-sm text-gray-600">Current Status</p>
                            <p className="font-semibold text-gray-900 capitalize">{order.orderStatus}</p>
                          </div>
                          <p className="text-sm text-gray-600">
                            {order.orderStatus === "delivered"
                              ? "Your order has been delivered!"
                              : order.orderStatus === "shipped"
                                ? "Your order is on the way!"
                                : order.orderStatus === "processing"
                                  ? "We are processing your order"
                                  : "Your order has been cancelled"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
