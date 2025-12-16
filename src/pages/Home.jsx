import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Shield,
  Truck,
  RefreshCw,
  Gem,
  Wallet,
  SprayCan,
} from "lucide-react";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const featuredProducts = [
    {
      uid: 1,
      name: "Diamond Solitaire Ring",
      price: 1999.99,
      oldPrice: 2499.99,
      category: "Rings",
      rating: 4.9,
      reviews: 128,
      discount: 20,
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
    },
    {
      uid: 2,
      name: "Gold Pendant Necklace",
      price: 899.99,
      category: "Pendants",
      rating: 4.7,
      reviews: 89,
      image:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop",
    },
    {
      uid: 3,
      name: "Premium Leather Wallet",
      price: 129.99,
      category: "Wallets",
      rating: 4.7,
      reviews: 120,
      image:
        "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?w=500&h=500&fit=crop",
    },
    {
      uid: 4,
      name: "Floral Eau de Parfum",
      price: 129.99,
      category: "Perfumes",
      rating: 4.8,
      reviews: 256,
      image:
        "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=500&fit=crop",
    },
  ];

  const features = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Free Shipping",
      description: "On orders over $100",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Authenticity",
      description: "100% genuine products",
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: "Easy Returns",
      description: "30-day return policy",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Premium Quality",
      description: "Luxury guaranteed",
    },
  ];

  const perfumeScents = [
    { name: "Floral", icon: "🌺", color: "from-pink-100 to-rose-100" },
    { name: "Woody", icon: "🌲", color: "from-amber-100 to-yellow-100" },
    { name: "Fresh", icon: "🍃", color: "from-green-100 to-emerald-100" },
    { name: "Oriental", icon: "🕌", color: "from-orange-100 to-red-100" },
    { name: "Citrus", icon: "🍊", color: "from-yellow-100 to-orange-100" },
    { name: "Gourmand", icon: "🍰", color: "from-brown-100 to-amber-100" },
    { name: "Aquatic", icon: "🌊", color: "from-blue-100 to-cyan-100" },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gold py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0 text-white">
              <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6">
                Discover <span className="text-gold">Luxury</span> Redefined
              </h1>
              <p className="text-xl mb-8 text-gray-300">
                Exquisite jewelry, premium wallets, and captivating perfumes.
                Elevate your style with our curated collection.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center bg-gold text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition shadow-lg"
              >
                Shop Collection
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            <div className="lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                {featuredProducts.slice(0, 4).map((product) => (
                  <div
                    key={product.uid}
                    className="bg-white rounded-xl p-4 shadow-2xl transform hover:-translate-y-1 transition"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-sm mb-1 truncate">
                      {product.name}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gold">
                        ${product.price}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {product.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gold text-white rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Banners Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-playfair font-bold text-center mb-12">
            Explore Our Collections
          </h2>

          {/* Jewelry Banner - Rings & Pendants */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-gold/10 to-bronze/20 rounded-3xl overflow-hidden">
              <div className="flex flex-col lg:flex-row items-center">
                <div className="lg:w-2/5 p-8 lg:p-12">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-gold to-bronze rounded-full flex items-center justify-center mr-4">
                      <Gem className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-playfair font-bold">
                      Jewelry Collection
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Discover timeless elegance with our exquisite rings and
                    pendants. Crafted with precision and passion, each piece
                    tells a story of luxury.
                  </p>
                  <div className="flex flex-wrap gap-4 mb-8">
                    <Link
                      to="/category/jewelry/rings"
                      className="px-6 py-3 bg-gold text-white rounded-full hover:bg-yellow-600 transition font-semibold"
                    >
                      Shop Rings
                    </Link>
                    <Link
                      to="/category/jewelry/pendants"
                      className="px-6 py-3 bg-white text-gold border border-gold rounded-full hover:bg-gray-50 transition font-semibold"
                    >
                      Shop Pendants
                    </Link>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="font-semibold mr-2">Starting from:</span>
                    <span className="text-2xl font-bold text-gold">
                      $499.99
                    </span>
                  </div>
                </div>
                <div className="lg:w-3/5 relative h-64 lg:h-96">
                  <div className="absolute inset-0 flex">
                    <div className="w-1/2">
                      <img
                        src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=400&fit=crop"
                        alt="Rings Collection"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-1/2">
                      <img
                        src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=400&fit=crop"
                        alt="Pendants Collection"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent lg:from-transparent"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Wallets Banner */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl overflow-hidden">
              <div className="flex flex-col lg:flex-row-reverse items-center">
                <div className="lg:w-2/5 p-8 lg:p-12 text-white">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center mr-4">
                      <Wallet className="w-6 h-6 text-gray-900" />
                    </div>
                    <h3 className="text-3xl font-playfair font-bold">
                      Premium Wallets
                    </h3>
                  </div>
                  <p className="text-gray-300 mb-6">
                    Elevate your everyday essentials with our collection of
                    premium wallets. From classic leather to modern RFID
                    protection, find your perfect companion.
                  </p>
                  <div className="flex flex-wrap gap-4 mb-8">
                    <Link
                      to="/category/wallets/leather"
                      className="px-6 py-3 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition font-semibold"
                    >
                      Shop Leather
                    </Link>
                    <Link
                      to="/category/wallets/designer"
                      className="px-6 py-3 bg-transparent text-white border border-white rounded-full hover:bg-white/10 transition font-semibold"
                    >
                      Shop Designer
                    </Link>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2 text-gray-300">
                      Starting from:
                    </span>
                    <span className="text-2xl font-bold">$89.99</span>
                  </div>
                </div>
                <div className="lg:w-3/5 relative h-64 lg:h-96">
                  <img
                    src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=500&fit=crop"
                    alt="Wallets Collection"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-gray-900/50 to-transparent lg:from-transparent"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Perfumes Banner */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl overflow-hidden border border-purple-100">
              <div className="flex flex-col lg:flex-row items-center">
                <div className="lg:w-2/5 p-8 lg:p-12">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mr-4">
                      <SprayCan className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-playfair font-bold">
                      Signature Scents
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Experience luxury in every breath with our exclusive perfume
                    collection. 7 distinct scent families, each telling a unique
                    olfactory story.
                  </p>
                  <div className="flex flex-wrap gap-4 mb-8">
                    <Link
                      to="/category/perfumes/floral"
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:opacity-90 transition font-semibold"
                    >
                      Shop Perfumes
                    </Link>
                    <Link
                      to="/category/perfumes"
                      className="px-6 py-3 bg-white text-purple-600 border border-purple-300 rounded-full hover:bg-purple-50 transition font-semibold"
                    >
                      View All Scents
                    </Link>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="font-semibold mr-2">Starting from:</span>
                    <span className="text-2xl font-bold text-purple-600">
                      $99.99
                    </span>
                  </div>
                </div>
                <div className="lg:w-3/5 relative h-64 lg:h-96">
                  <img
                    src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=500&fit=crop"
                    alt="Perfumes Collection"
                    className="w-full h-full object-cover"
                  />
                  {/* Perfume scent categories overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                      <div className="grid grid-cols-7 gap-2">
                        {perfumeScents.map((scent) => (
                          <Link
                            key={scent.name}
                            to={`/category/perfumes/${scent.name.toLowerCase()}`}
                            className="text-center group"
                          >
                            <div
                              className={`w-8 h-8 ${scent.color} rounded-full mx-auto mb-1 flex items-center justify-center group-hover:scale-110 transition`}
                            >
                              <span className="text-lg">{scent.icon}</span>
                            </div>
                            <span className="text-xs font-medium group-hover:text-purple-600 transition">
                              {scent.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-playfair font-bold">
              Featured Products
            </h2>
            <Link
              to="/shop"
              className="text-gold hover:text-yellow-600 font-semibold flex items-center"
            >
              View All
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.uid} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Perfume Scents Grid */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold mb-4">
              Discover 7 Signature Scents
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From floral to aquatic, explore our curated collection of premium
              perfumes
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {perfumeScents.map((scent) => (
              <Link
                key={scent.name}
                to={`/category/perfumes/${scent.name.toLowerCase()}`}
                className="bg-white p-4 rounded-xl text-center hover:shadow-xl transition hover:-translate-y-2 group"
              >
                <div
                  className={`w-16 h-16 ${scent.color} rounded-full mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition`}
                >
                  <span className="text-2xl">{scent.icon}</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">
                  {scent.name}
                </h4>
                <p className="text-xs text-gray-500">View Collection</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-gold to-bronze rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
              Limited Time Offer
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get 25% off on your first purchase. Use code:{" "}
              <span className="font-bold">WELCOME25</span>
            </p>
            <Link
              to="/shop"
              className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
