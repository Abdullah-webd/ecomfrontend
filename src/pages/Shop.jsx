"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const API_URL = "https://ecombackend-6xca.onrender.com/api";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "";
  const gender = searchParams.get("gender") || "";
  const size = searchParams.get("size") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const search = searchParams.get("search") || "";
  const page = Number.parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (category) params.append("category", category);
        if (gender) params.append("gender", gender);
        if (size) params.append("size", size);
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);
        if (search) params.append("search", search);
        params.append("page", page);

        const response = await axios.get(`${API_URL}/products?${params}`);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, gender, size, minPrice, maxPrice, search, page]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Shop</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg sticky top-20">
            <h3 className="font-bold text-lg mb-4">Filters</h3>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setSearchParams({
                    ...Object.fromEntries(searchParams),
                    category: e.target.value,
                  });
                }}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">All</option>
                <option value="mens">Men</option>
                <option value="womens">Women</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Gender</label>
              <select
                value={gender}
                onChange={(e) =>
                  setSearchParams({
                    ...Object.fromEntries(searchParams),
                    gender: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Price Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) =>
                    setSearchParams({
                      ...Object.fromEntries(searchParams),
                      minPrice: e.target.value,
                    })
                  }
                  className="w-1/2 border border-gray-300 rounded px-3 py-2 text-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) =>
                    setSearchParams({
                      ...Object.fromEntries(searchParams),
                      maxPrice: e.target.value,
                    })
                  }
                  className="w-1/2 border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="md:col-span-3">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
