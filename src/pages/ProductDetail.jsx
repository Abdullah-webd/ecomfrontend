"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { useStore } from "../store/store"

const API_URL = "http://localhost:5000/api"

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [imageIndex, setImageIndex] = useState(0)
  const { addToCart, addToWishlist } = useStore()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/${id}`)
        setProduct(response.data)
        if (response.data.sizes && response.data.sizes.length > 0) {
          setSelectedSize(response.data.sizes[0])
        }
      } catch (error) {
        console.error("Error fetching product:", error)
      }
    }

    fetchProduct()
  }, [id])

  if (!product) {
    return <div className="text-center py-12">Loading...</div>
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size")
      return
    }
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product._id,
        title: product.title,
        price: product.price,
        image: product.images[0]?.secure_url,
        size: selectedSize,
      })
    }
    alert("Added to cart!")
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="bg-gray-100 h-96 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
            <img
              src={product.images[imageIndex]?.secure_url || "/placeholder.svg"}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setImageIndex(idx)}
                  className={`w-20 h-20 rounded border-2 overflow-hidden ${
                    idx === imageIndex ? "border-gray-900" : "border-gray-200"
                  }`}
                >
                  <img src={img.secure_url || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>

          <p className="text-gray-600 mb-6 text-lg">{product.description}</p>

          <div className="mb-6">
            <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            <span className={`ml-4 text-sm ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <label className="block font-semibold text-gray-900 mb-3">Select Size</label>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes &&
                product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 border-2 rounded transition ${
                      selectedSize === size
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-300 text-gray-900 hover:border-gray-900"
                    }`}
                  >
                    {size}
                  </button>
                ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <label className="block font-semibold text-gray-900 mb-3">Quantity</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                -
              </button>
              <span className="text-xl">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 py-3 bg-gray-900 text-white rounded hover:bg-gray-800 transition disabled:bg-gray-400"
            >
              Add to Cart
            </button>
            <button
              onClick={() => addToWishlist(product)}
              className="px-6 py-3 border-2 border-gray-300 rounded hover:border-gray-900 transition"
            >
              ❤️
            </button>
          </div>

          {/* Product Info */}
          <div className="mt-12 pt-8 border-t">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Category</h3>
                <p className="text-gray-600 capitalize">{product.category}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Gender</h3>
                <p className="text-gray-600 capitalize">{product.gender}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
