"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useStore } from "../store/store"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { cart, user, logout } = useStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">ELEGANCE</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/shop" className="text-gray-700 hover:text-gray-900 transition">
              Shop
            </Link>
            <Link to="/shop?category=womens" className="text-gray-700 hover:text-gray-900 transition">
              Women
            </Link>
            <Link to="/shop?category=mens" className="text-gray-700 hover:text-gray-900 transition">
              Men
            </Link>
          </div>

          {/* Right Items */}
          <div className="flex items-center gap-6">
            {user ? (
              <div className="hidden md:flex items-center gap-4">
                <Link to="/profile" className="text-gray-700 hover:text-gray-900">
                  {user.firstName || user.email}
                </Link>
                {user.isAdmin && (
                  <Link to="/admin" className="px-3 py-1 bg-gray-900 text-white rounded text-sm">
                    Admin
                  </Link>
                )}
                <button onClick={handleLogout} className="text-gray-700 hover:text-gray-900">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/auth" className="hidden md:block text-gray-700 hover:text-gray-900">
                Login
              </Link>
            )}

            {/* Cart */}
            <Link to="/cart" className="relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <Link to="/shop" className="block py-2 text-gray-700 hover:text-gray-900">
              Shop
            </Link>
            <Link to="/shop?category=womens" className="block py-2 text-gray-700 hover:text-gray-900">
              Women
            </Link>
            <Link to="/shop?category=mens" className="block py-2 text-gray-700 hover:text-gray-900">
              Men
            </Link>
            {user ? (
              <>
                <Link to="/profile" className="block py-2 text-gray-700 hover:text-gray-900">
                  Profile
                </Link>
                {user.isAdmin && (
                  <Link to="/admin" className="block py-2 text-gray-700 hover:text-gray-900">
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-gray-700 hover:text-gray-900"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/auth" className="block py-2 text-gray-700 hover:text-gray-900">
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
