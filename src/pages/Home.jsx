import { Link } from "react-router-dom"
import { ChevronRight, Star, Truck, Shield, RotateCcw } from "lucide-react"

export default function Home() {
  return (
    <div className="w-full">
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Timeless Style,
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Infinite Possibilities
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 font-light">
            Discover our curated collection of premium fashion designed for the modern individual.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="px-10 py-4 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition flex items-center justify-center gap-2 group"
            >
              Explore Now <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </Link>
            <Link
              to="/shop"
              className="px-10 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-gray-900 transition"
            >
              View Collections
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Featured Collections</h2>
            <p className="text-xl text-gray-600">Hand-picked styles for every occasion</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                category: "womens",
                title: "Women's Essentials",
                image: "https://images.unsplash.com/photo-1687275159654-13e292177bfc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFdvbWVuJ3MlMjBFc3NlbnRpYWxzJTIwY2xvdGhpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
                description: "Elegant and timeless pieces for every wardrobe",
              },
              {
                category: "mens",
                title: "Men's Collection",
                image: "https://images.unsplash.com/photo-1620812112510-ea35f4cc7875?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fFVuaXZlcnNhbCUyMFN0eWxlJTIwY2xvdGhpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
                description: "Modern sophistication meets comfort",
              },
              {
                category: "unisex",
                title: "Universal Style",
                image: "https://images.unsplash.com/photo-1678553370169-b4f5a88603ee?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8VW5pdmVyc2FsJTIwU3R5bGUlMjBjbG90aGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
                description: "Fashion without boundaries",
              },
            ].map((col) => (
              <Link key={col.category} to={`/shop?category=${col.category}`} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl mb-6 h-80 bg-gray-200">
                  <img
                    src={col.image || "/placeholder.svg"}
                    alt={col.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                  {col.title}
                </h3>
                <p className="text-gray-600">{col.description}</p>
                <div className="flex items-center mt-4 text-blue-600 font-semibold group-hover:translate-x-2 transition">
                  Shop Now <ChevronRight className="w-4 h-4 ml-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-2">New Arrivals</h2>
              <p className="text-gray-600">Fresh styles just dropped</p>
            </div>
            <Link to="/shop" className="text-blue-600 font-bold hover:underline hidden md:block">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                img: "https://images.unsplash.com/photo-1551283279-166ab6d719af?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UHJlbWl1bSUyMEphY2tldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
                name: "Premium Jacket",
                price: "$199",
              },
              {
                img: "https://images.unsplash.com/photo-1759346617233-9c57f44535fd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q2xhc3NpYyUyMFRlZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
                name: "Classic Tee",
                price: "$49",
              },
              {
                img: "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2xpbSUyMEZpdCUyMEplYW5zfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
                name: "Slim Fit Jeans",
                price: "$89",
              },
              {
                img: "https://plus.unsplash.com/premium_photo-1688497831384-e40b2e5615cd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmFzaGlvbiUyMHNuZWFrZXJzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
                name: "Fashion Sneaker",
                price: "$129",
              },
            ].map((product, idx) => (
              <div key={idx} className="group">
                <div className="relative overflow-hidden rounded-xl bg-gray-200 h-80 mb-4">
                  <img
                    src={product.img || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">{product.name}</h4>
                <p className="text-blue-600 font-bold">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-300 text-lg mb-4 leading-relaxed">
                Founded in 2020, we believe that fashion should be accessible, sustainable, and expressive. Our mission
                is to create timeless pieces that empower individuals to express their authentic selves.
              </p>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Every item is carefully curated and crafted with attention to quality, comfort, and style. We partner
                with ethical manufacturers and sustainable suppliers to ensure our products reflect our values.
              </p>
              <Link
                to="/shop"
                className="inline-block px-8 py-4 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition"
              >
                Discover More
              </Link>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=500&fit=crop"
                alt="Brand Story"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 text-center mb-16">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On orders over $100" },
              { icon: Shield, title: "Secure Checkout", desc: "100% secure payment" },
              { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
              { icon: Star, title: "Premium Quality", desc: "Handpicked items" },
            ].map((feature, idx) => {
              const IconComponent = feature.icon
              return (
                <div key={idx} className="text-center p-8 rounded-xl bg-gray-50 hover:bg-blue-50 transition">
                  <IconComponent className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 text-lg">Real reviews from real fashion lovers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Fashion Blogger",
                text: "The quality is exceptional and the shipping was incredibly fast. I'm already planning my next order!",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
              },
              {
                name: "Michael Chen",
                role: "Tech Entrepreneur",
                text: "Finally found a store that understands modern style. The customer service is outstanding.",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
              },
              {
                name: "Emma Davis",
                role: "Creative Director",
                text: "The collection perfectly balances minimalism with trendy pieces. Highly recommend!",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
                <div className="flex gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">Stay Updated</h2>
          <p className="text-gray-300 text-lg mb-10">
            Subscribe to get special offers and new collection updates delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-4 rounded-lg w-full sm:w-80 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
