"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useStore } from "../store/store"

const API_URL = "http://localhost:5000/api"

export default function Checkout() {
  const navigate = useNavigate()
  const { cart, user, clearCart, token } = useStore()
  const [formData, setFormData] = useState({
    fullName: user?.firstName ? `${user.firstName} ${user.lastName}` : "",
    email: user?.email || "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>
        <p className="text-gray-600 mb-8">Your cart is empty</p>
      </div>
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const orderItems = cart.map((item) => ({
        product: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        image: item.image,
      }))

      await axios.post(
        `${API_URL}/orders/demo`,
        {
          items: orderItems,
          totalPrice: total,
          shippingAddress: {
            fullName: formData.fullName,
            email: formData.email,
            address: formData.address,
            city: formData.city,
            zipCode: formData.zipCode,
            country: formData.country,
          },
        },
        {
          headers: user?.email ? { Authorization: `Bearer ${token}` } : {},
        },
      )

      clearCart()
      navigate("/", { state: { message: "Order placed successfully!" } })
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-12">Checkout</h1>

      {/* Demo Mode Warning */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-bold text-yellow-800">DEMO MODE — DO NOT USE REAL CARDS</p>
            <p className="text-sm text-yellow-700 mt-1">
              Use Stripe test card: 4242 4242 4242 4242 | Any expiry | Any CVC
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

            {/* Shipping Address */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-4 py-2"
                    required
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP Code"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-4 py-2"
                    required
                  />
                </div>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  required
                />
              </div>
            </div>

            {/* Payment */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Information</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-4 py-2"
                    required
                  />
                  <input
                    type="text"
                    name="cvc"
                    placeholder="CVC"
                    value={formData.cvc}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-4 py-2"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gray-900 text-white rounded hover:bg-gray-800 transition disabled:bg-gray-400"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.title} ({item.size}) × {item.quantity}
                  </span>
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
