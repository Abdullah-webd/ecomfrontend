"use client"

import { Link } from "react-router-dom"
import { useStore } from "../store/store"

export default function Cart() {
  const { cart, removeFromCart, updateCartQuantity } = useStore()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        <p className="text-gray-600 mb-8">Your cart is empty</p>
        <Link to="/shop" className="inline-block px-8 py-4 bg-gray-900 text-white rounded hover:bg-gray-800 transition">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg overflow-hidden">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-4 p-6 border-b last:border-b-0">
                {/* Image */}
                <div className="w-24 h-24 bg-gray-100 rounded flex-shrink-0">
                  <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm">Size: {item.size}</p>
                  <p className="text-gray-900 font-semibold mt-2">${item.price.toFixed(2)}</p>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateCartQuantity(item.id, item.size, item.quantity - 1)}
                    className="px-2 py-1 border rounded hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() => updateCartQuantity(item.id, item.size, item.quantity + 1)}
                    className="px-2 py-1 border rounded hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="text-red-600 hover:text-red-800 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div>
          <div className="bg-white rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">Free</span>
              </div>
            </div>

            <div className="border-t pt-6 mb-6">
              <div className="flex justify-between">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold">${total.toFixed(2)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full block text-center py-3 bg-gray-900 text-white rounded hover:bg-gray-800 transition font-semibold"
            >
              Checkout
            </Link>

            <Link
              to="/shop"
              className="w-full block text-center mt-4 py-3 border-2 border-gray-900 text-gray-900 rounded hover:bg-gray-50 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
