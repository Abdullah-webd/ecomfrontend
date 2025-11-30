import { create } from "zustand"

export const useStore = create((set, get) => ({
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  token: localStorage.getItem("token") || null,
  cart: JSON.parse(localStorage.getItem("cart") || "[]"),
  wishlist: JSON.parse(localStorage.getItem("wishlist") || "[]"),

  setUser: (user, token) => {
    set({ user, token })
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("token", token)
  },

  logout: () => {
    set({ user: null, token: null })
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  },

  addToCart: (product) => {
    const cart = get().cart
    const existingItem = cart.find((item) => item.id === product.id && item.size === product.size)

    let newCart
    if (existingItem) {
      newCart = cart.map((item) =>
        item.id === product.id && item.size === product.size ? { ...item, quantity: item.quantity + 1 } : item,
      )
    } else {
      newCart = [...cart, { ...product, quantity: 1 }]
    }

    set({ cart: newCart })
    localStorage.setItem("cart", JSON.stringify(newCart))
  },

  removeFromCart: (productId, size) => {
    const newCart = get().cart.filter((item) => !(item.id === productId && item.size === size))
    set({ cart: newCart })
    localStorage.setItem("cart", JSON.stringify(newCart))
  },

  updateCartQuantity: (productId, size, quantity) => {
    const cart = get().cart
    const newCart = cart
      .map((item) =>
        item.id === productId && item.size === size ? { ...item, quantity: Math.max(0, quantity) } : item,
      )
      .filter((item) => item.quantity > 0)
    set({ cart: newCart })
    localStorage.setItem("cart", JSON.stringify(newCart))
  },

  clearCart: () => {
    set({ cart: [] })
    localStorage.removeItem("cart")
  },

  addToWishlist: (product) => {
    const wishlist = get().wishlist
    if (!wishlist.find((item) => item.id === product.id)) {
      const newWishlist = [...wishlist, product]
      set({ wishlist: newWishlist })
      localStorage.setItem("wishlist", JSON.stringify(newWishlist))
    }
  },

  removeFromWishlist: (productId) => {
    const newWishlist = get().wishlist.filter((item) => item.id !== productId)
    set({ wishlist: newWishlist })
    localStorage.setItem("wishlist", JSON.stringify(newWishlist))
  },
}))
