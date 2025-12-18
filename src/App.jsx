import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Categories from "./pages/Categories";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/category/:category" element={<Categories />} />
            <Route
              path="/category/:category/:subcategory"
              element={<Categories />}
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<ProductDetail />} />

            {/* 404 Page */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-playfair font-bold mb-4">
                      404 - Page Not Found
                    </h1>
                    <p className="text-gray-600">
                      The page you are looking for doesn't exist.
                    </p>
                  </div>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
import { Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";

const ProductListItem = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Calculate total price with discount
  const calculateTotalPrice = () => {
    let price = product.price;
    if (product.discount && product.discount > 0) {
      price = price * (1 - product.discount / 100);
    }
    return (price * quantity).toFixed(2);
  };

  const discountedPrice =
    product.discount && product.discount > 0
      ? (product.price * (1 - product.discount / 100)).toFixed(2)
      : product.price.toFixed(2);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating || 4.5)) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        );
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row hover:shadow-lg transition-all duration-300">
      {/* Product Image */}
      <div className="w-full md:w-48 h-48 mb-4 md:mb-0 md:mr-6 relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg"
        />
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
            -{product.discount}%
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
          <div className="mb-4 md:mb-0 md:mr-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {product.name}
            </h3>

            {/* Category Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {product.mainCategory && (
                <span className="px-3 py-1 bg-gold bg-opacity-10 text-gold rounded-full text-xs font-medium">
                  {product.mainCategory}
                </span>
              )}
              {product.subCategory && (
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                  {product.subCategory}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-3 line-clamp-2">
              {product.description ||
                "Premium quality with authentic materials"}
            </p>

            {/* Rating */}
            <div className="flex items-center">
              <div className="flex mr-2">{renderStars(product.rating)}</div>
              <span className="text-gray-500 text-sm">
                ({product.reviews || 0} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="text-right mb-4 md:mb-0">
            <div className="text-2xl font-bold text-gray-900">
              ${discountedPrice}
            </div>
            {product.discount > 0 && (
              <div className="text-lg text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </div>
            )}
          </div>
        </div>

        {/* Quantity Selector and Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pt-4 border-t">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-gray-700 mr-3 font-medium">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className={`px-3 py-2 ${
                  quantity <= 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-700 hover:text-gold"
                }`}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 font-medium min-w-[50px] text-center border-x border-gray-300">
                {quantity}
              </span>
              <button
                onClick={increaseQuantity}
                className="px-3 py-2 text-gray-700 hover:text-gold"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Total Price Display */}
            {quantity > 1 && (
              <div className="ml-6 px-6 border-l">
                <div className="text-xs text-gray-500">Total Price:</div>
                <div className="text-lg font-bold text-gold">
                  ${calculateTotalPrice()}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button className="border border-gold text-nowrap ml-3 px-4 py-2 rounded-lg hover:bg-gold transition-colors font-medium">
              Add to Wishlist
            </button>
            <button className="flex items-center bg-gold text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors font-medium">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart ({quantity})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;

import React, { useState } from "react";
import { ShoppingCart, Heart, Plus, Minus, Star } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Calculate total price
  const calculateTotalPrice = () => {
    let price = product.price;

    // Apply discount if exists
    if (product.discount && product.discount > 0) {
      price = price * (1 - product.discount / 100);
    }

    return (price * quantity).toFixed(2);
  };

  const handleAddToCart = () => {
    // Add product with selected quantity to cart
    console.log(`Added ${quantity} of ${product.name} to cart`);
    // You would typically dispatch to Redux or update context here
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        );
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  // Calculate discounted price
  const discountedPrice =
    product.discount && product.discount > 0
      ? (product.price * (1 - product.discount / 100)).toFixed(2)
      : product.price.toFixed(2);

  return (
    <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
      {/* Product Image with Actions */}
      <div className="relative overflow-hidden h-64">
        <Link to={`/product/${product.uid}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 space-y-2">
          {product.discount && product.discount > 0 && (
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
              -{product.discount}%
            </div>
          )}
          {/* {product.freeDelivery && (
            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
              Free Delivery
            </div>
          )} */}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={toggleWishlist}
            className={`p-2 rounded-full bg-white shadow-lg ${
              isWishlisted ? "text-red-500" : "text-gray-600 hover:text-red-500"
            }`}
          >
            <Heart
              className={`w-5 h-5 ${isWishlisted ? "fill-red-500" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        {/* Category & Material Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {product.mainCategory && (
            <span className="px-3 py-1 bg-gold bg-opacity-10 text-gold rounded-full text-xs font-medium">
              {product.mainCategory}
            </span>
          )}
          {product.material && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
              {Array.isArray(product.material)
                ? product.material[0]
                : product.material}
            </span>
          )}
        </div>

        {/* Product Name */}
        <Link to={`/product/${product.uid}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-gold transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Product Description */}
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 min-h-[40px]">
          {product.description ||
            "Premium quality product with authentic materials and craftsmanship"}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex mr-2">{renderStars(product.rating || 4.5)}</div>
          <span className="text-gray-500 text-sm">
            ({product.reviews || Math.floor(Math.random() * 100) + 1})
          </span>
        </div>

        {/* Price and Quantity Section */}
        <div className="space-y-3">
          {/* Price Display */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">
                ${discountedPrice}
              </span>
              {product.discount && product.discount > 0 && (
                <span className="text-lg text-gray-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Total Price Display (only shows when quantity > 1) */}
            {quantity > 1 && (
              <div className="text-right">
                <div className="text-xs text-gray-500">Total</div>
                <div className="text-lg font-bold text-gold">
                  ${calculateTotalPrice()}
                </div>
              </div>
            )}
          </div>

          {/* Quantity Selector and Add to Cart */}
          <div className="flex items-center justify-between gap-3">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className={`px-3 py-2 transition-colors ${
                  quantity <= 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gold"
                }`}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 font-medium min-w-[30px] text-center border-x border-gray-300">
                {quantity}
              </span>
              <button
                onClick={increaseQuantity}
                className="px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-gold transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center text-nowrap border-1 border-gray-300 py-2.5 px-4 rounded-lg  transition-colors font-medium"
            >
              {/* <ShoppingCart className="w-5 h-5 mr-2" /> */}
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,

  Search,
  User,
  Heart,
  ChevronDown,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";

const Navbar = ({ cartItems = 3 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const categoryRef = useRef(null);
  const submenuRef = useRef(null);

  // Menu structure as requested
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Shop", path: "/shop" },
    { name: "Contact", path: "/contact" },
  ];

  // Category structure
  const categories = [
    {
      name: "Jewelry",
      submenu: [
        { name: "Rings", path: "/category/jewelry/rings" },
        { name: "Pendants", path: "/category/jewelry/pendants" },
      ],
    },
    {
      name: "Wallets",
      submenu: [
        { name: "Leather Wallets", path: "/category/wallets/leather" },
        { name: "Designer Wallets", path: "/category/wallets/designer" },
        { name: "RFID Wallets", path: "/category/wallets/rfid" },
      ],
    },
    {
      name: "Perfumes",
      submenu: [
        { name: "Floral Scents", path: "/category/perfumes/floral" },
        { name: "Woody Scents", path: "/category/perfumes/woody" },
        { name: "Fresh Scents", path: "/category/perfumes/fresh" },
        { name: "Oriental Scents", path: "/category/perfumes/oriental" },
        { name: "Citrus Scents", path: "/category/perfumes/citrus" },
        { name: "Gourmand Scents", path: "/category/perfumes/gourmand" },
        { name: "Aquatic Scents", path: "/category/perfumes/aquatic" },
      ],
    },
  ];

  // Handle category click
  const handleCategoryClick = () => {
    setIsCategoryOpen(!isCategoryOpen);
    if (isCategoryOpen) {
      setOpenSubmenu(null);
    }
  };

  // Handle submenu toggle
  const handleSubmenuToggle = (categoryName, e) => {
    e.stopPropagation(); // Prevent event bubbling
    setOpenSubmenu(openSubmenu === categoryName ? null : categoryName);
  };

  // Close all menus
  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsCategoryOpen(false);
    setOpenSubmenu(null);
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
        setOpenSubmenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when clicking a link
  const handleMobileLinkClick = () => {
    setIsMenuOpen(false);
    setIsCategoryOpen(false);
    setOpenSubmenu(null);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2"
            onClick={closeAllMenus}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-gold to-bronze rounded-full flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <span className="text-2xl font-playfair font-bold text-gray-800">
                Luxury
              </span>
              <span className="text-2xl font-playfair font-bold text-gold">
                Haven
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `font-medium transition-colors py-2 ${
                    isActive
                      ? "text-gold border-b-2 border-gold"
                      : "text-gray-700 hover:text-gold"
                  }`
                }
                onClick={closeAllMenus}
              >
                {item.name}
              </NavLink>
            ))}

            {/* Category Dropdown */}
            <div className="relative" ref={categoryRef}>
              <button
                onClick={handleCategoryClick}
                className="flex items-center font-medium text-gray-700 hover:text-gold transition-colors py-2"
              >
                Category
                <ChevronDown
                  className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                    isCategoryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Category Dropdown Menu */}
              {isCategoryOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white shadow-xl rounded-lg border border-gray-100 z-50">
                  <div className="p-2">
                    {categories.map((category) => (
                      <div key={category.name} className="relative group">
                        <button
                          onClick={(e) => handleSubmenuToggle(category.name, e)}
                          className="flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-gray-50 transition text-left"
                        >
                          <span className="font-medium text-gray-700">
                            {category.name}
                          </span>
                          <ChevronRight
                            className={`w-4 h-4 transition-transform duration-200 ${
                              openSubmenu === category.name ? "rotate-90" : ""
                            }`}
                          />
                        </button>

                        {/* Submenu - Fixed position */}
                        {openSubmenu === category.name && (
                          <div className="absolute left-full top-0 ml-1 w-56 bg-white shadow-xl rounded-lg border border-gray-100 z-50">
                            <div className="p-3">
                              <div className="text-sm font-semibold text-gray-500 mb-2 px-2">
                                {category.name}
                              </div>
                              <div className="space-y-1">
                                {category.submenu.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    to={subItem.path}
                                    className="block px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gold transition"
                                    onClick={closeAllMenus}
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <div className="hidden md:block relative">
              <input
                type="text"
                placeholder="Search products..."
                className="px-4 py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent w-64"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>

            <Link
              to="/wishlist"
              className="relative group"
              onClick={closeAllMenus}
            >
              <Heart className="w-6 h-6 text-gray-700 group-hover:text-red-500 transition-colors" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Link>

            <Link to="/cart" className="relative group" onClick={closeAllMenus}>
              <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-gold transition-colors" />
              <span className="absolute -top-2 -right-2  text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems}
              </span>
            </Link>

            <Link to="/account" onClick={closeAllMenus}>
              <User className="w-6 h-6 text-gray-700 hover:text-gold transition-colors" />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="space-y-1">
              {/* Main Menu Items */}
              {menuItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={handleMobileLinkClick}
                  className={({ isActive }) =>
                    `block py-3 px-4 font-medium rounded-lg ${
                      isActive
                        ? "text-gold bg-gold bg-opacity-10"
                        : "text-gray-700 hover:text-gold hover:bg-gray-50"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              {/* Mobile Category Dropdown */}
              <div>
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="flex items-center justify-between w-full py-3 px-4 font-medium text-gray-700 hover:text-gold hover:bg-gray-50 rounded-lg"
                >
                  <span>Category</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isCategoryOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Mobile Category Menu */}
                {isCategoryOpen && (
                  <div className="pl-6 mt-1 space-y-1">
                    {categories.map((category) => (
                      <div key={category.name}>
                        <button
                          onClick={() => handleSubmenuToggle(category.name)}
                          className="flex items-center justify-between w-full py-2 px-3 text-gray-600 hover:text-gold rounded-lg"
                        >
                          <div className="flex items-center">
                            {category.name}
                          </div>
                          <ChevronRight
                            className={`w-4 h-4 transition-transform duration-200 ${
                              openSubmenu === category.name ? "rotate-90" : ""
                            }`}
                          />
                        </button>

                        {/* Mobile Submenu */}
                        {openSubmenu === category.name && (
                          <div className="pl-6 mt-1 space-y-1">
                            {category.submenu.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.path}
                                onClick={handleMobileLinkClick}
                                className="block py-2 px-3 text-gray-500 hover:text-gold rounded-lg"
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Search */}
              <div className="relative mt-4 px-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <Search className="absolute left-8 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
