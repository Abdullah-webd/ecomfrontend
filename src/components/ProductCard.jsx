"use client"

import { Link } from "react-router-dom"
import { useStore } from "../store/store"
import { useState } from "react"

export default function ProductCard({ product }) {
  const [selectedSize, setSelectedSize] = useState("")
  const { addToCart, addToWishlist, wishlist } = useStore()
  const isWishlisted = wishlist.some((item) => item._id === product._id)


  console.log("Product in ProductCard:", product)

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size")
      return
    }
    addToCart({
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.images[0]?.secure_url,
      size: selectedSize,
    })
    alert("Added to cart!")
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition group">
      {/* Image */}
      <div className="relative bg-gray-100 overflow-hidden h-64">
        <img
          src={product.images[0].secure_url || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition"
        />
        <button
          onClick={() => addToWishlist(product)}
          className={`absolute top-4 right-4 p-2 rounded-full transition ${
            isWishlisted ? "bg-red-500 text-white" : "bg-white text-gray-600"
          }`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <Link to={`/product/${product._id}`} className="block">
          <h3 className="font-bold text-lg text-gray-900 hover:text-gray-700 mb-2">{product.title}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

        {/* Price */}
        <p className="text-xl font-bold text-gray-900 mb-4">${product.price.toFixed(2)}</p>

        {/* Sizes */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-700 block mb-2">Size</label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="">Select size</option>
            {product.sizes &&
              product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
          </select>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
