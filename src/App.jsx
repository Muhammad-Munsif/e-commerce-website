import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Shop = lazy(() => import('./pages/Shop'));
const Categories = lazy(() => import('./pages/Categories'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Account = lazy(() => import('./pages/Account'));
const OrderTracking = lazy(() => import('./pages/OrderTracking'));

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/category/:category" element={<Categories />} />
                      <Route path="/category/:category/:subcategory" element={<Categories />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/wishlist" element={<Wishlist />} />
                      <Route path="/account" element={<Account />} />
                      <Route path="/orders" element={<OrderTracking />} />
                      <Route path="/orders/:orderId" element={<OrderTracking />} />
                      
                      {/* 404 Page */}
                      <Route
                        path="*"
                        element={
                          <div className="min-h-[70vh] flex items-center justify-center px-4">
                            <div className="text-center max-w-md">
                              <div className="text-9xl font-playfair font-bold text-gold mb-4 animate-bounce">
                                404
                              </div>
                              <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
                              <p className="text-gray-600 dark:text-gray-300 mb-8">
                                The page you're looking for doesn't exist or has been moved.
                              </p>
                              <a
                                href="/"
                                className="inline-block bg-gold text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-all duration-300 transform hover:-translate-y-1 font-medium shadow-lg hover:shadow-xl"
                              >
                                Return Home
                              </a>
                            </div>
                          </div>
                        }
                      />
                    </Routes>
                  </Suspense>
                </main>
                <Footer />
                <ToastContainer
                  position="bottom-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
              </div>
            </Router>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;


// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Shop from "./pages/Shop";
// import Categories from "./pages/Categories";
// import Contact from "./pages/Contact";
// import ProductDetail from "./pages/ProductDetail";

// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen flex flex-col">
//         <Navbar />
//         <main className="flex-grow">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/shop" element={<Shop />} />
//             <Route path="/category/:category" element={<Categories />} />
//             <Route
//               path="/category/:category/:subcategory"
//               element={<Categories />}
//             />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/product/:id" element={<ProductDetail />} />

//             {/* 404 Page */}
//             <Route
//               path="*"
//               element={
//                 <div className="min-h-screen flex items-center justify-center">
//                   <div className="text-center">
//                     <h1 className="text-4xl font-playfair font-bold mb-4">
//                       404 - Page Not Found
//                     </h1>
//                     <p className="text-gray-600">
//                       The page you are looking for doesn't exist.
//                     </p>
//                   </div>
//                 </div>
//               }
//             />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;
// import { Minus, Plus, ShoppingCart, Star } from "lucide-react";
// import { useState } from "react";

// const ProductListItem = ({ product }) => {
//   const [quantity, setQuantity] = useState(1);

//   const increaseQuantity = () => setQuantity((prev) => prev + 1);
//   const decreaseQuantity = () =>
//     setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

//   // Calculate total price with discount
//   const calculateTotalPrice = () => {
//     let price = product.price;
//     if (product.discount && product.discount > 0) {
//       price = price * (1 - product.discount / 100);
//     }
//     return (price * quantity).toFixed(2);
//   };

//   const discountedPrice =
//     product.discount && product.discount > 0
//       ? (product.price * (1 - product.discount / 100)).toFixed(2)
//       : product.price.toFixed(2);

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       if (i <= Math.floor(rating || 4.5)) {
//         stars.push(
//           <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//         );
//       } else {
//         stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
//       }
//     }
//     return stars;
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row hover:shadow-lg transition-all duration-300">
//       {/* Product Image */}
//       <div className="w-full md:w-48 h-48 mb-4 md:mb-0 md:mr-6 relative">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="w-full h-full object-cover rounded-lg"
//         />
//         {product.discount > 0 && (
//           <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
//             -{product.discount}%
//           </div>
//         )}
//       </div>

//       {/* Product Details */}
//       <div className="flex-1">
//         <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
//           <div className="mb-4 md:mb-0 md:mr-6">
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               {product.name}
//             </h3>

//             {/* Category Tags */}
//             <div className="flex flex-wrap gap-2 mb-3">
//               {product.mainCategory && (
//                 <span className="px-3 py-1 bg-gold bg-opacity-10 text-gold rounded-full text-xs font-medium">
//                   {product.mainCategory}
//                 </span>
//               )}
//               {product.subCategory && (
//                 <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
//                   {product.subCategory}
//                 </span>
//               )}
//             </div>

//             {/* Description */}
//             <p className="text-gray-600 mb-3 line-clamp-2">
//               {product.description ||
//                 "Premium quality with authentic materials"}
//             </p>

//             {/* Rating */}
//             <div className="flex items-center">
//               <div className="flex mr-2">{renderStars(product.rating)}</div>
//               <span className="text-gray-500 text-sm">
//                 ({product.reviews || 0} reviews)
//               </span>
//             </div>
//           </div>

//           {/* Price */}
//           <div className="text-right mb-4 md:mb-0">
//             <div className="text-2xl font-bold text-gray-900">
//               ${discountedPrice}
//             </div>
//             {product.discount > 0 && (
//               <div className="text-lg text-gray-400 line-through">
//                 ${product.price.toFixed(2)}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Quantity Selector and Actions */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between pt-4 border-t">
//           <div className="flex items-center mb-4 md:mb-0">
//             <span className="text-gray-700 mr-3 font-medium">Quantity:</span>
//             <div className="flex items-center border border-gray-300 rounded-lg">
//               <button
//                 onClick={decreaseQuantity}
//                 disabled={quantity <= 1}
//                 className={`px-3 py-2 ${
//                   quantity <= 1
//                     ? "text-gray-300 cursor-not-allowed"
//                     : "text-gray-700 hover:text-gold"
//                 }`}
//               >
//                 <Minus className="w-4 h-4" />
//               </button>
//               <span className="px-4 py-2 font-medium min-w-[50px] text-center border-x border-gray-300">
//                 {quantity}
//               </span>
//               <button
//                 onClick={increaseQuantity}
//                 className="px-3 py-2 text-gray-700 hover:text-gold"
//               >
//                 <Plus className="w-4 h-4" />
//               </button>
//             </div>

//             {/* Total Price Display */}
//             {quantity > 1 && (
//               <div className="ml-6 px-6 border-l">
//                 <div className="text-xs text-gray-500">Total Price:</div>
//                 <div className="text-lg font-bold text-gold">
//                   ${calculateTotalPrice()}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Action Buttons */}
//           <div className="flex space-x-3">
//             <button className="border border-gold text-nowrap ml-3 px-4 py-2 rounded-lg hover:bg-gold transition-colors font-medium">
//               Add to Wishlist
//             </button>
//             <button className="flex items-center bg-gold text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors font-medium">
//               <ShoppingCart className="w-5 h-5 mr-2" />
//               Add to Cart ({quantity})
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductListItem;

// import React, { useState } from "react";
// import { ShoppingCart, Heart, Plus, Minus, Star } from "lucide-react";
// import { Link } from "react-router-dom";

// const ProductCard = ({ product }) => {
//   const [quantity, setQuantity] = useState(1);
//   const [isWishlisted, setIsWishlisted] = useState(false);

//   const increaseQuantity = () => setQuantity((prev) => prev + 1);
//   const decreaseQuantity = () =>
//     setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

//   // Calculate total price
//   const calculateTotalPrice = () => {
//     let price = product.price;

//     // Apply discount if exists
//     if (product.discount && product.discount > 0) {
//       price = price * (1 - product.discount / 100);
//     }

//     return (price * quantity).toFixed(2);
//   };

//   const handleAddToCart = () => {
//     // Add product with selected quantity to cart
//     console.log(`Added ${quantity} of ${product.name} to cart`);
//     // You would typically dispatch to Redux or update context here
//   };

//   const toggleWishlist = () => {
//     setIsWishlisted(!isWishlisted);
//   };

//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 >= 0.5;

//     for (let i = 1; i <= 5; i++) {
//       if (i <= fullStars) {
//         stars.push(
//           <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//         );
//       } else if (i === fullStars + 1 && hasHalfStar) {
//         stars.push(
//           <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//         );
//       } else {
//         stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
//       }
//     }
//     return stars;
//   };

//   // Calculate discounted price
//   const discountedPrice =
//     product.discount && product.discount > 0
//       ? (product.price * (1 - product.discount / 100)).toFixed(2)
//       : product.price.toFixed(2);

//   return (
//     <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
//       {/* Product Image with Actions */}
//       <div className="relative overflow-hidden h-64">
//         <Link to={`/product/${product.uid}`}>
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//           />
//         </Link>

//         {/* Badges */}
//         <div className="absolute top-3 left-3 space-y-2">
//           {product.discount && product.discount > 0 && (
//             <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
//               -{product.discount}%
//             </div>
//           )}
//           {/* {product.freeDelivery && (
//             <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
//               Free Delivery
//             </div>
//           )} */}
//         </div>

//         {/* Quick Actions */}
//         <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <button
//             onClick={toggleWishlist}
//             className={`p-2 rounded-full bg-white shadow-lg ${
//               isWishlisted ? "text-red-500" : "text-gray-600 hover:text-red-500"
//             }`}
//           >
//             <Heart
//               className={`w-5 h-5 ${isWishlisted ? "fill-red-500" : ""}`}
//             />
//           </button>
//         </div>
//       </div>

//       {/* Product Info */}
//       <div className="p-5">
//         {/* Category & Material Tags */}
//         <div className="flex flex-wrap gap-2 mb-3">
//           {product.mainCategory && (
//             <span className="px-3 py-1 bg-gold bg-opacity-10 text-gold rounded-full text-xs font-medium">
//               {product.mainCategory}
//             </span>
//           )}
//           {product.material && (
//             <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
//               {Array.isArray(product.material)
//                 ? product.material[0]
//                 : product.material}
//             </span>
//           )}
//         </div>

//         {/* Product Name */}
//         <Link to={`/product/${product.uid}`}>
//           <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-gold transition-colors line-clamp-1">
//             {product.name}
//           </h3>
//         </Link>

//         {/* Product Description */}
//         <p className="text-gray-500 text-sm mb-4 line-clamp-2 min-h-[40px]">
//           {product.description ||
//             "Premium quality product with authentic materials and craftsmanship"}
//         </p>

//         {/* Rating */}
//         <div className="flex items-center mb-4">
//           <div className="flex mr-2">{renderStars(product.rating || 4.5)}</div>
//           <span className="text-gray-500 text-sm">
//             ({product.reviews || Math.floor(Math.random() * 100) + 1})
//           </span>
//         </div>

//         {/* Price and Quantity Section */}
//         <div className="space-y-3">
//           {/* Price Display */}
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <span className="text-2xl font-bold text-gray-900">
//                 ${discountedPrice}
//               </span>
//               {product.discount && product.discount > 0 && (
//                 <span className="text-lg text-gray-400 line-through">
//                   ${product.price.toFixed(2)}
//                 </span>
//               )}
//             </div>

//             {/* Total Price Display (only shows when quantity > 1) */}
//             {quantity > 1 && (
//               <div className="text-right">
//                 <div className="text-xs text-gray-500">Total</div>
//                 <div className="text-lg font-bold text-gold">
//                   ${calculateTotalPrice()}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Quantity Selector and Add to Cart */}
//           <div className="flex items-center justify-between gap-3">
//             {/* Quantity Selector */}
//             <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
//               <button
//                 onClick={decreaseQuantity}
//                 disabled={quantity <= 1}
//                 className={`px-3 py-2 transition-colors ${
//                   quantity <= 1
//                     ? "text-gray-300 cursor-not-allowed"
//                     : "text-gray-700 hover:bg-gray-50 hover:text-gold"
//                 }`}
//               >
//                 <Minus className="w-4 h-4" />
//               </button>
//               <span className="px-4 py-2 font-medium min-w-[30px] text-center border-x border-gray-300">
//                 {quantity}
//               </span>
//               <button
//                 onClick={increaseQuantity}
//                 className="px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-gold transition-colors"
//               >
//                 <Plus className="w-4 h-4" />
//               </button>
//             </div>

//             {/* Add to Cart Button */}
//             <button
//               onClick={handleAddToCart}
//               className="flex-1 flex items-center justify-center text-nowrap border-1 border-gray-300 py-2.5 px-4 rounded-lg  transition-colors font-medium"
//             >
//               {/* <ShoppingCart className="w-5 h-5 mr-2" /> */}
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

// import React, { useState, useEffect, useRef } from "react";
// import { Link, NavLink } from "react-router-dom";
// import {
//   Menu,
//   X,

//   Search,
//   User,
//   Heart,
//   ChevronDown,
//   ChevronRight,
//   ShoppingCart,
// } from "lucide-react";

// const Navbar = ({ cartItems = 3 }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isCategoryOpen, setIsCategoryOpen] = useState(false);
//   const [openSubmenu, setOpenSubmenu] = useState(null);
//   const categoryRef = useRef(null);
//   const submenuRef = useRef(null);

//   // Menu structure as requested
//   const menuItems = [
//     { name: "Home", path: "/" },
//     { name: "About", path: "/about" },
//     { name: "Shop", path: "/shop" },
//     { name: "Contact", path: "/contact" },
//   ];

//   // Category structure
//   const categories = [
//     {
//       name: "Jewelry",
//       submenu: [
//         { name: "Rings", path: "/category/jewelry/rings" },
//         { name: "Pendants", path: "/category/jewelry/pendants" },
//       ],
//     },
//     {
//       name: "Wallets",
//       submenu: [
//         { name: "Leather Wallets", path: "/category/wallets/leather" },
//         { name: "Designer Wallets", path: "/category/wallets/designer" },
//         { name: "RFID Wallets", path: "/category/wallets/rfid" },
//       ],
//     },
//     {
//       name: "Perfumes",
//       submenu: [
//         { name: "Floral Scents", path: "/category/perfumes/floral" },
//         { name: "Woody Scents", path: "/category/perfumes/woody" },
//         { name: "Fresh Scents", path: "/category/perfumes/fresh" },
//         { name: "Oriental Scents", path: "/category/perfumes/oriental" },
//         { name: "Citrus Scents", path: "/category/perfumes/citrus" },
//         { name: "Gourmand Scents", path: "/category/perfumes/gourmand" },
//         { name: "Aquatic Scents", path: "/category/perfumes/aquatic" },
//       ],
//     },
//   ];

//   // Handle category click
//   const handleCategoryClick = () => {
//     setIsCategoryOpen(!isCategoryOpen);
//     if (isCategoryOpen) {
//       setOpenSubmenu(null);
//     }
//   };

//   // Handle submenu toggle
//   const handleSubmenuToggle = (categoryName, e) => {
//     e.stopPropagation(); // Prevent event bubbling
//     setOpenSubmenu(openSubmenu === categoryName ? null : categoryName);
//   };

//   // Close all menus
//   const closeAllMenus = () => {
//     setIsMenuOpen(false);
//     setIsCategoryOpen(false);
//     setOpenSubmenu(null);
//   };

//   // Close menus when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (categoryRef.current && !categoryRef.current.contains(event.target)) {
//         setIsCategoryOpen(false);
//         setOpenSubmenu(null);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Close mobile menu when clicking a link
//   const handleMobileLinkClick = () => {
//     setIsMenuOpen(false);
//     setIsCategoryOpen(false);
//     setOpenSubmenu(null);
//   };

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center h-20">
//           {/* Logo */}
//           <Link
//             to="/"
//             className="flex items-center space-x-2"
//             onClick={closeAllMenus}
//           >
//             <div className="relative">
//               <div className="w-10 h-10 bg-gradient-to-r from-gold to-bronze rounded-full flex items-center justify-center">
//                 <ShoppingCart className="w-6 h-6 text-white" />
//               </div>
//               <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
//             </div>
//             <div>
//               <span className="text-2xl font-playfair font-bold text-gray-800">
//                 Luxury
//               </span>
//               <span className="text-2xl font-playfair font-bold text-gold">
//                 Haven
//               </span>
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center space-x-8">
//             {menuItems.map((item) => (
//               <NavLink
//                 key={item.name}
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `font-medium transition-colors py-2 ${
//                     isActive
//                       ? "text-gold border-b-2 border-gold"
//                       : "text-gray-700 hover:text-gold"
//                   }`
//                 }
//                 onClick={closeAllMenus}
//               >
//                 {item.name}
//               </NavLink>
//             ))}

//             {/* Category Dropdown */}
//             <div className="relative" ref={categoryRef}>
//               <button
//                 onClick={handleCategoryClick}
//                 className="flex items-center font-medium text-gray-700 hover:text-gold transition-colors py-2"
//               >
//                 Category
//                 <ChevronDown
//                   className={`ml-1 w-4 h-4 transition-transform duration-200 ${
//                     isCategoryOpen ? "rotate-180" : ""
//                   }`}
//                 />
//               </button>

//               {/* Category Dropdown Menu */}
//               {isCategoryOpen && (
//                 <div className="absolute left-0 mt-2 w-56 bg-white shadow-xl rounded-lg border border-gray-100 z-50">
//                   <div className="p-2">
//                     {categories.map((category) => (
//                       <div key={category.name} className="relative group">
//                         <button
//                           onClick={(e) => handleSubmenuToggle(category.name, e)}
//                           className="flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-gray-50 transition text-left"
//                         >
//                           <span className="font-medium text-gray-700">
//                             {category.name}
//                           </span>
//                           <ChevronRight
//                             className={`w-4 h-4 transition-transform duration-200 ${
//                               openSubmenu === category.name ? "rotate-90" : ""
//                             }`}
//                           />
//                         </button>

//                         {/* Submenu - Fixed position */}
//                         {openSubmenu === category.name && (
//                           <div className="absolute left-full top-0 ml-1 w-56 bg-white shadow-xl rounded-lg border border-gray-100 z-50">
//                             <div className="p-3">
//                               <div className="text-sm font-semibold text-gray-500 mb-2 px-2">
//                                 {category.name}
//                               </div>
//                               <div className="space-y-1">
//                                 {category.submenu.map((subItem) => (
//                                   <Link
//                                     key={subItem.name}
//                                     to={subItem.path}
//                                     className="block px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gold transition"
//                                     onClick={closeAllMenus}
//                                   >
//                                     {subItem.name}
//                                   </Link>
//                                 ))}
//                               </div>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Icons */}
//           <div className="flex items-center space-x-6">
//             <div className="hidden md:block relative">
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 className="px-4 py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent w-64"
//               />
//               <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
//             </div>

//             <Link
//               to="/wishlist"
//               className="relative group"
//               onClick={closeAllMenus}
//             >
//               <Heart className="w-6 h-6 text-gray-700 group-hover:text-red-500 transition-colors" />
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                 3
//               </span>
//             </Link>

//             <Link to="/cart" className="relative group" onClick={closeAllMenus}>
//               <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-gold transition-colors" />
//               <span className="absolute -top-2 -right-2  text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                 {cartItems}
//               </span>
//             </Link>

//             <Link to="/account" onClick={closeAllMenus}>
//               <User className="w-6 h-6 text-gray-700 hover:text-gold transition-colors" />
//             </Link>

//             {/* Mobile menu button */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="lg:hidden p-2 rounded-md text-gray-700"
//             >
//               {isMenuOpen ? (
//                 <X className="w-6 h-6" />
//               ) : (
//                 <Menu className="w-6 h-6" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="lg:hidden py-4 border-t">
//             <div className="space-y-1">
//               {/* Main Menu Items */}
//               {menuItems.map((item) => (
//                 <NavLink
//                   key={item.name}
//                   to={item.path}
//                   onClick={handleMobileLinkClick}
//                   className={({ isActive }) =>
//                     `block py-3 px-4 font-medium rounded-lg ${
//                       isActive
//                         ? "text-gold bg-gold bg-opacity-10"
//                         : "text-gray-700 hover:text-gold hover:bg-gray-50"
//                     }`
//                   }
//                 >
//                   {item.name}
//                 </NavLink>
//               ))}

//               {/* Mobile Category Dropdown */}
//               <div>
//                 <button
//                   onClick={() => setIsCategoryOpen(!isCategoryOpen)}
//                   className="flex items-center justify-between w-full py-3 px-4 font-medium text-gray-700 hover:text-gold hover:bg-gray-50 rounded-lg"
//                 >
//                   <span>Category</span>
//                   <ChevronDown
//                     className={`w-4 h-4 transition-transform duration-200 ${
//                       isCategoryOpen ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>

//                 {/* Mobile Category Menu */}
//                 {isCategoryOpen && (
//                   <div className="pl-6 mt-1 space-y-1">
//                     {categories.map((category) => (
//                       <div key={category.name}>
//                         <button
//                           onClick={() => handleSubmenuToggle(category.name)}
//                           className="flex items-center justify-between w-full py-2 px-3 text-gray-600 hover:text-gold rounded-lg"
//                         >
//                           <div className="flex items-center">
//                             {category.name}
//                           </div>
//                           <ChevronRight
//                             className={`w-4 h-4 transition-transform duration-200 ${
//                               openSubmenu === category.name ? "rotate-90" : ""
//                             }`}
//                           />
//                         </button>

//                         {/* Mobile Submenu */}
//                         {openSubmenu === category.name && (
//                           <div className="pl-6 mt-1 space-y-1">
//                             {category.submenu.map((subItem) => (
//                               <Link
//                                 key={subItem.name}
//                                 to={subItem.path}
//                                 onClick={handleMobileLinkClick}
//                                 className="block py-2 px-3 text-gray-500 hover:text-gold rounded-lg"
//                               >
//                                 {subItem.name}
//                               </Link>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Mobile Search */}
//               <div className="relative mt-4 px-4">
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   className="w-full px-4 py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold"
//                 />
//                 <Search className="absolute left-8 top-2.5 w-5 h-5 text-gray-400" />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React from "react";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

// const Layout = ({ children }) => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-grow">{children}</main>
//       <Footer />
//     </div>
//   );
// };

// export default Layout;

// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   Facebook,
//   Twitter,
//   Instagram,
//   Youtube,
//   Mail,
//   Phone,
//   MapPin,
//   CreditCard,
// } from "lucide-react";

// const Footer = () => {
//   const categories = [
//     { name: "Rings", path: "/category/jewelry/rings" },
//     { name: "Pendants", path: "/category/jewelry/pendants" },
//     { name: "Leather Wallets", path: "/category/wallets/leather" },
//     { name: "Floral Perfumes", path: "/category/perfumes/floral" },
//     { name: "Designer Wallets", path: "/category/wallets/designer" },
//     { name: "Woody Perfumes", path: "/category/perfumes/woody" },
//   ];

//   const perfumes = [
//     "Floral Scents",
//     "Woody Scents",
//     "Fresh Scents",
//     "Oriental Scents",
//     "Citrus Scents",
//     "Gourmand Scents",
//     "Aquatic Scents",
//   ];

//   return (
//     <footer className="bg-gray-900 text-white">
//       <div className="container mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* Company Info */}
//           <div>
//             <div className="flex items-center mb-6">
//               <div className="w-12 h-12 bg-gradient-to-r from-gold to-bronze rounded-full flex items-center justify-center mr-3">
//                 <CreditCard className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <span className="text-2xl font-playfair font-bold">Luxury</span>
//                 <span className="text-2xl font-playfair font-bold text-gold">
//                   Haven
//                 </span>
//               </div>
//             </div>
//             <p className="text-gray-400 mb-6">
//               Premium jewelry, luxury wallets, and exquisite perfumes.
//               Experience elegance redefined.
//             </p>
//             <div className="flex space-x-4">
//               <a
//                 href="#"
//                 className="bg-gray-800 p-2 rounded-full hover:bg-gold transition"
//               >
//                 <Facebook className="w-5 h-5" />
//               </a>
//               <a
//                 href="#"
//                 className="bg-gray-800 p-2 rounded-full hover:bg-gold transition"
//               >
//                 <Instagram className="w-5 h-5" />
//               </a>
//               <a
//                 href="#"
//                 className="bg-gray-800 p-2 rounded-full hover:bg-gold transition"
//               >
//                 <Twitter className="w-5 h-5" />
//               </a>
//               <a
//                 href="#"
//                 className="bg-gray-800 p-2 rounded-full hover:bg-gold transition"
//               >
//                 <Youtube className="w-5 h-5" />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-800">
//               Shop Categories
//             </h3>
//             <ul className="space-y-3">
//               {categories.map((category) => (
//                 <li key={category.name}>
//                   <Link
//                     to={category.path}
//                     className="text-gray-400 hover:text-gold transition"
//                   >
//                     {category.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Perfume Scents */}
//           <div>
//             <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-800">
//               Perfume Scents
//             </h3>
//             <ul className="space-y-3">
//               {perfumes.map((scent) => (
//                 <li key={scent}>
//                   <Link
//                     to={`/category/perfumes/${scent
//                       .toLowerCase()
//                       .replace(" ", "-")}`}
//                     className="text-gray-400 hover:text-gold transition"
//                   >
//                     {scent}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-800">
//               Contact Us
//             </h3>
//             <div className="space-y-4">
//               <div className="flex items-center">
//                 <Phone className="w-5 h-5 text-gold mr-3" />
//                 <div>
//                   <p className="font-medium">+1 (555) 123-4567</p>
//                   <p className="text-sm text-gray-400">Mon-Fri 9am-6pm</p>
//                 </div>
//               </div>
//               <div className="flex items-center">
//                 <Mail className="w-5 h-5 text-gold mr-3" />
//                 <div>
//                   <p className="font-medium">support@luxuryhaven.com</p>
//                   <p className="text-sm text-gray-400">24/7 Support</p>
//                 </div>
//               </div>
//               <div className="flex items-center">
//                 <MapPin className="w-5 h-5 text-gold mr-3" />
//                 <div>
//                   <p className="font-medium">123 Luxury Avenue</p>
//                   <p className="text-sm text-gray-400">New York, NY 10001</p>
//                 </div>
//               </div>
//             </div>

//             {/* Newsletter */}
//             <div className="mt-8">
//               <h4 className="font-semibold mb-3">Newsletter</h4>
//               <div className="flex">
//                 <input
//                   type="email"
//                   placeholder="Your email"
//                   className="flex-1 px-4 py-2 rounded-l-lg text-gray-900"
//                 />
//                 <button className="bg-gold px-4 py-2 rounded-r-lg hover:bg-yellow-600 transition">
//                   Subscribe
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <p>
//               &copy; {new Date().getFullYear()} Luxury Haven. All rights
//               reserved.
//             </p>
//             <div className="flex space-x-6 mt-4 md:mt-0">
//               <Link to="/privacy" className="hover:text-white">
//                 Privacy Policy
//               </Link>
//               <Link to="/terms" className="hover:text-white">
//                 Terms of Service
//               </Link>
//               <Link to="/shipping" className="hover:text-white">
//                 Shipping Policy
//               </Link>
//               <Link to="/returns" className="hover:text-white">
//                 Return Policy
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// import React from "react";
// import { Award, Users, Globe, Heart, Sparkles } from "lucide-react";

// const About = () => {
//   const values = [
//     {
//       icon: <Award className="w-8 h-8" />,
//       title: "Quality First",
//       description: "Only premium materials and craftsmanship",
//     },
//     {
//       icon: <Heart className="w-8 h-8" />,
//       title: "Customer Love",
//       description: "Your satisfaction is our priority",
//     },
//     {
//       icon: <Sparkles className="w-8 h-8" />,
//       title: "Excellence",
//       description: "Striving for perfection in every detail",
//     },
//     {
//       icon: <Globe className="w-8 h-8" />,
//       title: "Global Standards",
//       description: "World-class products and service",
//     },
//   ];

//   return (
//     <div className="py-12">
//       <div className="container mx-auto px-4">
//         {/* Hero */}
//         <div className="text-center mb-16">
//           <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">
//             About <span className="text-gold">Luxury Haven</span>
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Where elegance meets excellence. We curate the finest jewelry,
//             wallets, and perfumes for the discerning customer.
//           </p>
//         </div>

//         {/* Story */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
//           <div>
//             <h2 className="text-3xl font-playfair font-bold mb-6">Our Story</h2>
//             <p className="text-gray-600 mb-4">
//               Founded in 2010, Luxury Haven began as a small boutique dedicated
//               to bringing exceptional quality jewelry to our community. What
//               started with a passion for exquisite craftsmanship has grown into
//               a premier destination for luxury accessories.
//             </p>
//             <p className="text-gray-600 mb-4">
//               Today, we've expanded our collection to include premium wallets
//               and an exclusive line of perfumes, each carefully selected to
//               embody sophistication and quality.
//             </p>
//             <p className="text-gray-600">
//               Every piece in our collection tells a story - of tradition,
//               innovation, and timeless elegance.
//             </p>
//           </div>
//           <div className="relative">
//             <img
//               src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
//               alt="Our Store"
//               className="rounded-lg shadow-2xl"
//             />
//             <div className="absolute -bottom-6 -right-6 bg-gold text-white p-6 rounded-lg shadow-xl">
//               <div className="text-3xl font-bold">13+</div>
//               <div className="text-sm">Years of Excellence</div>
//             </div>
//           </div>
//         </div>

//         {/* Values */}
//         <div className="mb-20">
//           <h2 className="text-3xl font-playfair font-bold text-center mb-12">
//             Our Values
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {values.map((value, index) => (
//               <div
//                 key={index}
//                 className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition"
//               >
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gold text-white rounded-full mb-4">
//                   {value.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
//                 <p className="text-gray-600">{value.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Collections */}
//         <div className="bg-gradient-to-r from-gray-50 to-gold/10 rounded-2xl p-12">
//           <h2 className="text-3xl font-playfair font-bold text-center mb-8">
//             Our Collections
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="text-center">
//               <div className="text-5xl font-bold text-gold mb-2">500+</div>
//               <div className="text-xl font-semibold">Jewelry Pieces</div>
//               <p className="text-gray-600 mt-2">Rings, pendants & more</p>
//             </div>
//             <div className="text-center">
//               <div className="text-5xl font-bold text-gold mb-2">200+</div>
//               <div className="text-xl font-semibold">Wallets</div>
//               <p className="text-gray-600 mt-2">Leather & designer</p>
//             </div>
//             <div className="text-center">
//               <div className="text-5xl font-bold text-gold mb-2">7</div>
//               <div className="text-xl font-semibold">Perfume Scents</div>
//               <p className="text-gray-600 mt-2">Exclusive collections</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;

// import React from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { ChevronRight, Star } from 'lucide-react';
// import { categoryData } from '../data/data';


// const Categories = () => {
//   const { category, subcategory } = useParams();

  

//   const currentCategory = categoryData[category] || categoryData.jewelry;
//   const currentSubcategory = subcategory ? currentCategory.subcategories[subcategory] : null;

//   return (
//     <div className="py-12">
//       <div className="container mx-auto px-4">
//         {/* Breadcrumb */}
//         <div className="flex items-center text-sm text-gray-600 mb-8">
//           <Link to="/" className="hover:text-gold">Home</Link>
//           <ChevronRight className="w-4 h-4 mx-2" />
//           <Link to="/shop" className="hover:text-gold">Shop</Link>
//           <ChevronRight className="w-4 h-4 mx-2" />
//           <Link to={`/category/${category}`} className="hover:text-gold">{currentCategory.name}</Link>
//           {currentSubcategory && (
//             <>
//               <ChevronRight className="w-4 h-4 mx-2" />
//               <span className="text-gray-900 font-medium">{currentSubcategory.name}</span>
//             </>
//           )}
//         </div>

//         {/* Category Header */}
//         <div className="mb-12">
//           <h1 className="text-4xl font-playfair font-bold text-gray-900 mb-4">
//             {currentSubcategory ? currentSubcategory.name : currentCategory.name}
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl">
//             {currentSubcategory ? `${currentSubcategory.name} - ${currentCategory.description}` : currentCategory.description}
//           </p>
//         </div>

//         {/* Subcategories Grid */}
//         {!currentSubcategory && (
//           <div className="mb-12">
//             <h2 className="text-2xl font-semibold mb-6">Browse Collections</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {Object.entries(currentCategory.subcategories).map(([key, subcat]) => (
//                 <Link
//                   key={key}
//                   to={`/category/${category}/${key}`}
//                   className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group"
//                 >
//                   <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
//                     <div className="text-center">
//                       <div className="text-3xl mb-2">✨</div>
//                       <h3 className="text-xl font-semibold">{subcat.name}</h3>
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <div className="flex justify-between items-center">
//                       <span className="text-gold font-semibold">View Collection</span>
//                       <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Products */}
//         {currentSubcategory && currentSubcategory.products && currentSubcategory.products.length > 0 ? (
//           <>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//               {currentSubcategory.products.map((product) => (
//                 <div key={product.uid} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-full h-64 object-cover"
//                   />
//                   <div className="p-6">
//                     <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
//                     <div className="flex items-center mb-4">
//                       <div className="flex text-yellow-400">
//                         {[...Array(5)].map((_, i) => (
//                           <Star
//                             key={i}
//                             className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
//                           />
//                         ))}
//                       </div>
//                       <span className="ml-2 text-gray-600">{product.rating}</span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="text-2xl font-bold text-gold">${product.price}</span>
//                       <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         ) : currentSubcategory && (
//           <div className="text-center py-12 bg-gray-50 rounded-2xl">
//             <div className="text-5xl mb-4">🌟</div>
//             <h3 className="text-xl font-semibold mb-2">Coming Soon!</h3>
//             <p className="text-gray-600">This collection is currently being curated</p>
//           </div>
//         )}

//         {/* All Categories Navigation */}
//         <div className="mt-16 bg-gradient-to-r from-gray-50 to-gold/10 rounded-2xl p-8">
//           <h2 className="text-2xl font-playfair font-bold text-center mb-8">Explore All Categories</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {Object.entries(categoryData).map(([key, cat]) => (
//               <Link
//                 key={key}
//                 to={`/category/${key}`}
//                 className={`p-6 rounded-xl text-center transition ${
//                   category === key
//                     ? 'bg-gold text-white'
//                     : 'bg-white text-gray-800 hover:shadow-lg'
//                 }`}
//               >
//                 <h3 className="text-xl font-semibold mb-2">{cat.name}</h3>
//                 <p className="text-sm opacity-75">{cat.description}</p>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Categories;

// import React, { useState } from "react";
// import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react";

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const contactInfo = [
//     {
//       icon: <Phone className="w-6 h-6" />,
//       title: "Phone",
//       details: "+1 (555) 123-4567",
//       subtitle: "Mon-Fri 9am-6pm EST",
//     },
//     {
//       icon: <Mail className="w-6 h-6" />,
//       title: "Email",
//       details: "support@luxuryhaven.com",
//       subtitle: "Response within 24 hours",
//     },
//     {
//       icon: <MapPin className="w-6 h-6" />,
//       title: "Store Location",
//       details: "123 Luxury Avenue",
//       subtitle: "New York, NY 10001",
//     },
//     {
//       icon: <Clock className="w-6 h-6" />,
//       title: "Business Hours",
//       details: "Monday - Friday",
//       subtitle: "9:00 AM - 6:00 PM EST",
//     },
//   ];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//     alert("Thank you for your message! We will get back to you soon.");
//     setFormData({ name: "", email: "", subject: "", message: "" });
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div className="py-12">
//       <div className="container mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">
//             Contact <span className="text-gold">Us</span>
//           </h1>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Have questions about our jewelry, wallets, or perfumes? We're here
//             to help.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
//           {/* Contact Information */}
//           <div>
//             <h2 className="text-2xl font-playfair font-bold mb-8">
//               Get in Touch
//             </h2>
//             <div className="space-y-8">
//               {contactInfo.map((info, index) => (
//                 <div key={index} className="flex items-start">
//                   <div className="bg-gold text-white p-3 rounded-lg mr-4">
//                     {info.icon}
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-lg mb-1">{info.title}</h3>
//                     <p className="text-gray-800 font-medium">{info.details}</p>
//                     <p className="text-gray-600">{info.subtitle}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* FAQ Section */}
//             <div className="mt-12">
//               <h3 className="text-xl font-semibold mb-6 flex items-center">
//                 <MessageSquare className="w-5 h-5 mr-2" />
//                 Quick Questions
//               </h3>
//               <div className="space-y-4">
//                 <div className="border-b pb-4">
//                   <h4 className="font-semibold mb-1">
//                     What is your return policy?
//                   </h4>
//                   <p className="text-gray-600 text-sm">
//                     30-day return policy for unused items with original
//                     packaging.
//                   </p>
//                 </div>
//                 <div className="border-b pb-4">
//                   <h4 className="font-semibold mb-1">
//                     Do you offer international shipping?
//                   </h4>
//                   <p className="text-gray-600 text-sm">
//                     Yes, we ship to over 50 countries worldwide.
//                   </p>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold mb-1">
//                     Can I customize jewelry?
//                   </h4>
//                   <p className="text-gray-600 text-sm">
//                     Yes, we offer customization services for select jewelry
//                     items.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Contact Form */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-2xl shadow-xl p-8">
//               <h2 className="text-2xl font-playfair font-bold mb-6">
//                 Send Us a Message
//               </h2>
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-gray-700 mb-2">
//                       Full Name *
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
//                       placeholder="John Doe"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 mb-2">
//                       Email Address *
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
//                       placeholder="john@example.com"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 mb-2">Subject *</label>
//                   <select
//                     name="subject"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
//                   >
//                     <option value="">Select a subject</option>
//                     <option value="jewelry">Jewelry Inquiry</option>
//                     <option value="wallets">Wallets Inquiry</option>
//                     <option value="perfumes">Perfumes Inquiry</option>
//                     <option value="order">Order Status</option>
//                     <option value="custom">Customization</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 mb-2">Message *</label>
//                   <textarea
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     required
//                     rows="6"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
//                     placeholder="Please describe your inquiry in detail..."
//                   ></textarea>
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-gradient-to-r from-gold to-bronze text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center"
//                 >
//                   <Send className="w-5 h-5 mr-2" />
//                   Send Message
//                 </button>
//               </form>
//             </div>

//             {/* Map */}
//             <div className="mt-8 bg-white rounded-2xl shadow-xl overflow-hidden">
//               <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
//                 <div className="text-center">
//                   <MapPin className="w-12 h-12 text-gold mx-auto mb-4" />
//                   <h3 className="text-xl font-semibold mb-2">
//                     Visit Our Flagship Store
//                   </h3>
//                   <p className="text-gray-600">
//                     123 Luxury Avenue, New York, NY 10001
//                   </p>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <h4 className="font-semibold text-lg mb-2">
//                   Store Information
//                 </h4>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
//                   <div>
//                     <strong>Parking:</strong> Available in building garage
//                   </div>
//                   <div>
//                     <strong>Metro:</strong> 5 min walk from station
//                   </div>
//                   <div>
//                     <strong>Accessibility:</strong> Wheelchair accessible
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Support Section */}
//         <div className="mt-16 bg-gradient-to-r from-gold/10 to-bronze/10 rounded-2xl p-8 text-center">
//           <h2 className="text-2xl font-playfair font-bold mb-4">
//             Need Immediate Assistance?
//           </h2>
//           <p className="text-gray-600 mb-6">
//             Our customer support team is ready to help you.
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
//             <a
//               href="tel:+15551234567"
//               className="inline-flex items-center justify-center bg-gold text px-6 py-3 rounded-lg hover:bg-yellow-600 transition shadow-lg"
//             >
//               <Phone className="w-5 h-5 mr-2" />
//               Call Now: (555) 123-4567
//             </a>
//             <a
//               href="mailto:support@luxuryhaven.com"
//               className="inline-flex items-center justify-center bg-white text-gold px-6 py-3 rounded-lg hover:bg-gray-50 transition border-2 border-gold"
//             >
//               <Mail className="w-5 h-5 mr-2" />
//               Email Support
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight, Sparkles, Shield, Truck, RefreshCw, Gem, Wallet, SprayCan } from 'lucide-react';
// import ProductCard from '../components/ProductCard';

// const Home = () => {
//   const featuredProducts = [
//     { uid: 1, name: 'Diamond Solitaire Ring', price: 1999.99, oldPrice: 2499.99, category: 'Rings', rating: 4.9, reviews: 128, discount: 20, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop' },
//     { uid: 2, name: 'Gold Pendant Necklace', price: 899.99, category: 'Pendants', rating: 4.7, reviews: 89, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop' },
//     { uid: 3, name: 'Premium Leather Wallet', price: 129.99, category: 'Wallets', rating: 4.7, reviews: 120, image: 'https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?w=500&h=500&fit=crop' },
//     { uid: 4, name: 'Floral Eau de Parfum', price: 129.99, category: 'Perfumes', rating: 4.8, reviews: 256, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=500&fit=crop' },
//   ];

//   const features = [
//     { icon: <Truck className="w-8 h-8" />, title: 'Free Shipping', description: 'On orders over $100' },
//     { icon: <Shield className="w-8 h-8" />, title: 'Authenticity', description: '100% genuine products' },
//     { icon: <RefreshCw className="w-8 h-8" />, title: 'Easy Returns', description: '30-day return policy' },
//     { icon: <Sparkles className="w-8 h-8" />, title: 'Premium Quality', description: 'Luxury guaranteed' },
//   ];

//   const perfumeScents = [
//     { name: 'Floral', icon: '🌺', color: 'from-pink-100 to-rose-100' },
//     { name: 'Woody', icon: '🌲', color: 'from-amber-100 to-yellow-100' },
//     { name: 'Fresh', icon: '🍃', color: 'from-green-100 to-emerald-100' },
//     { name: 'Oriental', icon: '🕌', color: 'from-orange-100 to-red-100' },
//     { name: 'Citrus', icon: '🍊', color: 'from-yellow-100 to-orange-100' },
//     { name: 'Gourmand', icon: '🍰', color: 'from-brown-100 to-amber-100' },
//     { name: 'Aquatic', icon: '🌊', color: 'from-blue-100 to-cyan-100' },
//   ];

//   return (
//     <div className="bg-gray-50">
//       {/* Hero Section */}
//       <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gold py-20 overflow-hidden">
//         <div className="absolute inset-0 bg-black opacity-50"></div>
//         <div className="container mx-auto px-4 relative z-10">
//           <div className="flex flex-col lg:flex-row items-center">
//             <div className="lg:w-1/2 mb-12 lg:mb-0 text-white">
//               <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6">
//                 Discover <span className="text-gold">Luxury</span> Redefined
//               </h1>
//               <p className="text-xl mb-8 text-gray-300">
//                 Exquisite jewelry, premium wallets, and captivating perfumes. Elevate your style with our curated collection.
//               </p>
//               <Link
//                 to="/shop"
//                 className="inline-flex items-center bg-gold text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition shadow-lg"
//               >
//                 Shop Collection
//                 <ArrowRight className="ml-2 w-5 h-5" />
//               </Link>
//             </div>
//             <div className="lg:w-1/2">
//               <div className="grid grid-cols-2 gap-4">
//                 {featuredProducts.slice(0, 4).map((product) => (
//                   <div key={product.uid} className="bg-white rounded-xl p-4 shadow-2xl transform hover:-translate-y-1 transition">
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="w-full h-40 object-cover rounded-lg mb-3"
//                     />
//                     <h3 className="font-semibold text-sm mb-1 truncate">{product.name}</h3>
//                     <div className="flex justify-between items-center">
//                       <span className="text-lg font-bold text-gold">${product.price}</span>
//                       <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{product.category}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features */}
//       <section className="py-16">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {features.map((feature, index) => (
//               <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gold text-white rounded-full mb-4">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Category Banners Section */}
//       <section className="py-16">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-playfair font-bold text-center mb-12">Explore Our Collections</h2>
          
//           {/* Jewelry Banner - Rings & Pendants */}
//           <div className="mb-12">
//             <div className="bg-gradient-to-r from-gold/10 to-bronze/20 rounded-3xl overflow-hidden">
//               <div className="flex flex-col lg:flex-row items-center">
//                 <div className="lg:w-2/5 p-8 lg:p-12">
//                   <div className="flex items-center mb-6">
//                     <div className="w-12 h-12 bg-gradient-to-r from-gold to-bronze rounded-full flex items-center justify-center mr-4">
//                       <Gem className="w-6 h-6 text-white" />
//                     </div>
//                     <h3 className="text-3xl font-playfair font-bold">Jewelry Collection</h3>
//                   </div>
//                   <p className="text-gray-600 mb-6">
//                     Discover timeless elegance with our exquisite rings and pendants. 
//                     Crafted with precision and passion, each piece tells a story of luxury.
//                   </p>
//                   <div className="flex flex-wrap gap-4 mb-8">
//                     <Link
//                       to="/category/jewelry/rings"
//                       className="px-6 py-3 bg-gold text-white rounded-full hover:bg-yellow-600 transition font-semibold"
//                     >
//                       Shop Rings
//                     </Link>
//                     <Link
//                       to="/category/jewelry/pendants"
//                       className="px-6 py-3 bg-white text-gold border border-gold rounded-full hover:bg-gray-50 transition font-semibold"
//                     >
//                       Shop Pendants
//                     </Link>
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <span className="font-semibold mr-2">Starting from:</span>
//                     <span className="text-2xl font-bold text-gold">$499.99</span>
//                   </div>
//                 </div>
//                 <div className="lg:w-3/5 relative h-64 lg:h-96">
//                   <div className="absolute inset-0 flex">
//                     <div className="w-1/2">
//                       <img
//                         src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=400&fit=crop"
//                         alt="Rings Collection"
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <div className="w-1/2">
//                       <img
//                         src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=400&fit=crop"
//                         alt="Pendants Collection"
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                   </div>
//                   <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent lg:from-transparent"></div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Wallets Banner */}
//           <div className="mb-12">
//             <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl overflow-hidden">
//               <div className="flex flex-col lg:flex-row-reverse items-center">
//                 <div className="lg:w-2/5 p-8 lg:p-12 text-white">
//                   <div className="flex items-center mb-6">
//                     <div className="w-12 h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center mr-4">
//                       <Wallet className="w-6 h-6 text-gray-900" />
//                     </div>
//                     <h3 className="text-3xl font-playfair font-bold">Premium Wallets</h3>
//                   </div>
//                   <p className="text-gray-300 mb-6">
//                     Elevate your everyday essentials with our collection of premium wallets. 
//                     From classic leather to modern RFID protection, find your perfect companion.
//                   </p>
//                   <div className="flex flex-wrap gap-4 mb-8">
//                     <Link
//                       to="/category/wallets/leather"
//                       className="px-6 py-3 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition font-semibold"
//                     >
//                       Shop Leather
//                     </Link>
//                     <Link
//                       to="/category/wallets/designer"
//                       className="px-6 py-3 bg-transparent text-white border border-white rounded-full hover:bg-white/10 transition font-semibold"
//                     >
//                       Shop Designer
//                     </Link>
//                   </div>
//                   <div className="flex items-center">
//                     <span className="font-semibold mr-2 text-gray-300">Starting from:</span>
//                     <span className="text-2xl font-bold">$89.99</span>
//                   </div>
//                 </div>
//                 <div className="lg:w-3/5 relative h-64 lg:h-96">
//                   <img
//                     src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=500&fit=crop"
//                     alt="Wallets Collection"
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-l from-gray-900/50 to-transparent lg:from-transparent"></div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Perfumes Banner */}
//           <div className="mb-12">
//             <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl overflow-hidden border border-purple-100">
//               <div className="flex flex-col lg:flex-row items-center">
//                 <div className="lg:w-2/5 p-8 lg:p-12">
//                   <div className="flex items-center mb-6">
//                     <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mr-4">
//                       <SprayCan className="w-6 h-6 text-white" />
//                     </div>
//                     <h3 className="text-3xl font-playfair font-bold">Signature Scents</h3>
//                   </div>
//                   <p className="text-gray-600 mb-6">
//                     Experience luxury in every breath with our exclusive perfume collection. 
//                     7 distinct scent families, each telling a unique olfactory story.
//                   </p>
//                   <div className="flex flex-wrap gap-4 mb-8">
//                     <Link
//                       to="/category/perfumes/floral"
//                       className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:opacity-90 transition font-semibold"
//                     >
//                       Shop Perfumes
//                     </Link>
//                     <Link
//                       to="/category/perfumes"
//                       className="px-6 py-3 bg-white text-purple-600 border border-purple-300 rounded-full hover:bg-purple-50 transition font-semibold"
//                     >
//                       View All Scents
//                     </Link>
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <span className="font-semibold mr-2">Starting from:</span>
//                     <span className="text-2xl font-bold text-purple-600">$99.99</span>
//                   </div>
//                 </div>
//                 <div className="lg:w-3/5 relative h-64 lg:h-96">
//                   <img
//                     src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=500&fit=crop"
//                     alt="Perfumes Collection"
//                     className="w-full h-full object-cover"
//                   />
//                   {/* Perfume scent categories overlay */}
//                   <div className="absolute bottom-4 left-4 right-4 flex justify-center">
//                     <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
//                       <div className="grid grid-cols-7 gap-2">
//                         {perfumeScents.map((scent) => (
//                           <Link
//                             key={scent.name}
//                             to={`/category/perfumes/${scent.name.toLowerCase()}`}
//                             className="text-center group"
//                           >
//                             <div className={`w-8 h-8 ${scent.color} rounded-full mx-auto mb-1 flex items-center justify-center group-hover:scale-110 transition`}>
//                               <span className="text-lg">{scent.icon}</span>
//                             </div>
//                             <span className="text-xs font-medium group-hover:text-purple-600 transition">{scent.name}</span>
//                           </Link>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Featured Products */}
//       <section className="py-16 bg-white">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center mb-12">
//             <h2 className="text-3xl font-playfair font-bold">Featured Products</h2>
//             <Link to="/shop" className="text-gold hover:text-yellow-600 font-semibold flex items-center">
//               View All
//               <ArrowRight className="ml-2 w-4 h-4" />
//             </Link>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             {featuredProducts.map((product) => (
//               <ProductCard key={product.uid} product={product} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Perfume Scents Grid */}
//       <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-playfair font-bold mb-4">Discover 7 Signature Scents</h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               From floral to aquatic, explore our curated collection of premium perfumes
//             </p>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
//             {perfumeScents.map((scent) => (
//               <Link
//                 key={scent.name}
//                 to={`/category/perfumes/${scent.name.toLowerCase()}`}
//                 className="bg-white p-4 rounded-xl text-center hover:shadow-xl transition hover:-translate-y-2 group"
//               >
//                 <div className={`w-16 h-16 ${scent.color} rounded-full mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition`}>
//                   <span className="text-2xl">{scent.icon}</span>
//                 </div>
//                 <h4 className="font-semibold text-gray-800 mb-1">{scent.name}</h4>
//                 <p className="text-xs text-gray-500">View Collection</p>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Banner */}
//       <section className="py-16">
//         <div className="container mx-auto px-4">
//           <div className="bg-gradient-to-r from-gold to-bronze rounded-3xl p-8 md:p-12 text-center text-white">
//             <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">Limited Time Offer</h2>
//             <p className="text-xl mb-8 max-w-2xl mx-auto">
//               Get 25% off on your first purchase. Use code: <span className="font-bold">WELCOME25</span>
//             </p>
//             <Link
//               to="/shop"
//               className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg"
//             >
//               Shop Now
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   Star,
//   ShoppingBag,
//   Heart,
//   Truck,
//   Shield,
//   RefreshCw,
//   ChevronRight,
//   Package,
// } from "lucide-react";

// const ProductDetail = () => {
//   const [quantity, setQuantity] = useState(1);
//   const [selectedImage, setSelectedImage] = useState(0);

//   const product = {
//     uid: 1,
//     name: "Diamond Solitaire Engagement Ring",
//     price: 1999.99,
//     oldPrice: 2499.99,
//     category: "Rings",
//     description:
//       "A stunning solitaire diamond engagement ring featuring a brilliant 1-carat center stone set in 18K white gold. Perfect for that special proposal moment.",
//     rating: 4.9,
//     reviews: 128,
//     inStock: true,
//     sku: "RING-001-GOLD",
//     images: [
//       "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop",
//     ],
//     features: [
//       "1-carat brilliant cut diamond",
//       "18K white gold setting",
//       "Expertly crafted by master jewelers",
//       "Certified conflict-free diamond",
//       "Lifetime warranty on setting",
//       "Free resizing within first year",
//     ],
//     specifications: {
//       Material: "18K White Gold",
//       "Diamond Carat": "1.00 ct",
//       "Diamond Color": "D (Colorless)",
//       "Diamond Clarity": "VS1",
//       "Ring Size": "4-9 (Resizable)",
//       Weight: "3.2g",
//       Certification: "GIA Certified",
//     },
//   };

//   const relatedProducts = [
//     {
//       uid: 2,
//       name: "Sapphire Halo Ring",
//       price: 3499.99,
//       image:
//         "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
//       category: "Rings",
//     },
//     {
//       uid: 3,
//       name: "Gold Pendant Necklace",
//       price: 899.99,
//       image:
//         "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
//       category: "Pendants",
//     },
//     {
//       uid: 4,
//       name: "Premium Leather Wallet",
//       price: 129.99,
//       image:
//         "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?w=400&h=400&fit=crop",
//       category: "Wallets",
//     },
//   ];

//   return (
//     <div className="py-12">
//       <div className="container mx-auto px-4">
//         {/* Breadcrumb */}
//         <div className="flex items-center text-sm text-gray-600 mb-8">
//           <Link to="/" className="hover:text-gold">
//             Home
//           </Link>
//           <ChevronRight className="w-4 h-4 mx-2" />
//           <Link to="/shop" className="hover:text-gold">
//             Shop
//           </Link>
//           <ChevronRight className="w-4 h-4 mx-2" />
//           <Link to="/category/jewelry" className="hover:text-gold">
//             Jewelry
//           </Link>
//           <ChevronRight className="w-4 h-4 mx-2" />
//           <Link to="/category/jewelry/rings" className="hover:text-gold">
//             Rings
//           </Link>
//           <ChevronRight className="w-4 h-4 mx-2" />
//           <span className="text-gray-900 font-medium">{product.name}</span>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Product Images */}
//           <div>
//             <div className="mb-4 rounded-2xl overflow-hidden">
//               <img
//                 src={product.images[selectedImage]}
//                 alt={product.name}
//                 className="w-full h-auto"
//               />
//             </div>
//             <div className="flex space-x-4">
//               {product.images.map((image, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedImage(index)}
//                   className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
//                     selectedImage === index ? "border-gold" : "border-gray-200"
//                   }`}
//                 >
//                   <img
//                     src={image}
//                     alt={`Product view ${index + 1}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Product Info */}
//           <div>
//             <div className="mb-2">
//               <span className="text-gold font-semibold">
//                 {product.category}
//               </span>
//             </div>

//             <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-4">
//               {product.name}
//             </h1>

//             <div className="flex items-center mb-6">
//               <div className="flex items-center">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`w-5 h-5 ${
//                       i < Math.floor(product.rating)
//                         ? "text-yellow-400 fill-yellow-400"
//                         : "text-gray-300"
//                     }`}
//                   />
//                 ))}
//               </div>
//               <span className="ml-2 text-gray-600">
//                 ({product.reviews} reviews)
//               </span>
//               <span className="ml-4 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
//                 {product.inStock ? "In Stock" : "Out of Stock"}
//               </span>
//             </div>

//             <p className="text-gray-600 mb-6">{product.description}</p>

//             {/* Price */}
//             <div className="mb-8">
//               <div className="flex items-center">
//                 <span className="text-4xl font-bold text-gray-900">
//                   ${product.price}
//                 </span>
//                 <span className="ml-4 text-2xl text-gray-500 line-through">
//                   ${product.oldPrice}
//                 </span>
//                 <span className="ml-4 px-3 py-1 bg-red-100 text-red-800 rounded-full font-semibold">
//                   Save ${(product.oldPrice - product.price).toFixed(2)}
//                 </span>
//               </div>
//             </div>

//             {/* Features */}
//             <div className="mb-8">
//               <h3 className="font-semibold text-lg mb-4">Key Features:</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 {product.features.map((feature, index) => (
//                   <div key={index} className="flex items-center">
//                     <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
//                     <span>{feature}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Quantity & Add to Cart */}
//             <div className="mb-8">
//               <div className="flex items-center space-x-6 mb-6">
//                 <div className="flex items-center">
//                   <span className="mr-4 font-medium">Quantity:</span>
//                   <div className="flex items-center border border-gray-300 rounded-lg">
//                     <button
//                       onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                       className="px-4 py-2 hover:bg-gray-100"
//                     >
//                       -
//                     </button>
//                     <span className="px-6 py-2 border-x border-gray-300">
//                       {quantity}
//                     </span>
//                     <button
//                       onClick={() => setQuantity(quantity + 1)}
//                       className="px-4 py-2 hover:bg-gray-100"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//                 <div className="text-gray-600">
//                   SKU: <span className="font-semibold">{product.sku}</span>
//                 </div>
//               </div>

//               <div className="flex space-x-4">
//                 <button className="flex-1 bg-gradient-to-r from-gold to-bronze text-white py-3 rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center">
//                   <ShoppingBag className="w-5 h-5 mr-2 bg-red-800" />
//                   Add to Cart
//                 </button>
//                 <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
//                   <Heart className="w-6 h-6 text-gray-600 hover:text-red-500" />
//                 </button>
//               </div>
//             </div>

//             {/* Delivery Info */}
//             <div className="bg-gray-50 rounded-xl p-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <div className="flex items-center">
//                   <Truck className="w-8 h-8 text-gold mr-3" />
//                   <div>
//                     <div className="font-semibold">Free Shipping</div>
//                     <div className="text-sm text-gray-600">
//                       On orders over $100
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center">
//                   <Package className="w-8 h-8 text-gold mr-3" />
//                   <div>
//                     <div className="font-semibold">Lifetime Warranty</div>
//                     <div className="text-sm text-gray-600">
//                       On diamond setting
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center">
//                   <Shield className="w-8 h-8 text-gold mr-3" />
//                   <div>
//                     <div className="font-semibold">GIA Certified</div>
//                     <div className="text-sm text-gray-600">
//                       Authenticity guaranteed
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center">
//                   <RefreshCw className="w-8 h-8 text-gold mr-3" />
//                   <div>
//                     <div className="font-semibold">Free Resizing</div>
//                     <div className="text-sm text-gray-600">
//                       Within first year
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Specifications */}
//         <div className="mt-16">
//           <div className="border-b border-gray-200 mb-8">
//             <h2 className="text-2xl font-playfair font-bold mb-4">
//               Specifications
//             </h2>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {Object.entries(product.specifications).map(([key, value]) => (
//               <div key={key} className="border-b pb-4">
//                 <span className="text-gray-600">{key}:</span>
//                 <span className="ml-2 font-semibold">{value}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Related Products */}
//         <div className="mt-16">
//           <h2 className="text-2xl font-playfair font-bold mb-8">
//             You May Also Like
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {relatedProducts.map((related) => (
//               <Link
//                 key={related.id}
//                 to={`/product/${related.id}`}
//                 className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group"
//               >
//                 <img
//                   src={related.image}
//                   alt={related.name}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-6">
//                   <div className="mb-2">
//                     <span className="text-sm text-gold font-semibold">
//                       {related.category}
//                     </span>
//                   </div>
//                   <h3 className="font-semibold mb-2">{related.name}</h3>
//                   <div className="flex justify-between items-center">
//                     <span className="text-xl font-bold text-gray-900">
//                       ${related.price}
//                     </span>
//                     <div className="flex items-center text-gold group-hover:translate-x-1 transition">
//                       <span className="mr-1">View</span>
//                       <ChevronRight className="w-4 h-4" />
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;

// import React, { useState, useEffect } from "react";
// import {
//   Filter,
//   Grid,
//   List,
//   ChevronDown,
//   Plus,
//   Minus,
//   ShoppingCart,
//   Star,
// } from "lucide-react";
// import ProductCard from "../components/ProductCard";
// import ProductListItem from "../components/ProductListItem";
// import { categoryData } from "../data/data";

// // Separate component for list view items

// const Shop = () => {
//   const [viewMode, setViewMode] = useState("grid");
//   const [sortBy, setSortBy] = useState("featured");
//   const [priceRange, setPriceRange] = useState([0, 5000]);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [selectedMaterials, setSelectedMaterials] = useState([]);
//   const [allProducts, setAllProducts] = useState([]);

//   // Extract all products from categoryData
//   useEffect(() => {
//     const extractedProducts = [];

//     Object.values(categoryData).forEach((category) => {
//       Object.values(category.subcategories).forEach((subcategory) => {
//         if (subcategory.products && subcategory.products.length > 0) {
//           const enhancedProducts = subcategory.products.map((product) => ({
//             ...product,
//             mainCategory: category.name,
//             subCategory: subcategory.name,
//             discount: product.discount,
//             freeDelivery:
//               product.freeDelivery !== undefined ? product.freeDelivery : true,
//             rating: product.rating || 4.5,
//             reviews: product.reviews || Math.floor(Math.random() * 100) + 1,
//           }));
//           extractedProducts.push(...enhancedProducts);
//         }
//       });
//     });

//     setAllProducts(extractedProducts);
//   }, []);

//   // Get all unique main categories
//   const getCategories = () => {
//     const categories = { All: allProducts.length };

//     allProducts.forEach((product) => {
//       if (product.mainCategory) {
//         if (!categories[product.mainCategory]) {
//           categories[product.mainCategory] = 0;
//         }
//         categories[product.mainCategory]++;
//       }
//     });

//     return Object.entries(categories).map(([name, count]) => ({
//       name,
//       count,
//     }));
//   };

//   // Get unique materials
//   const getMaterials = () => {
//     const materials = new Set();
//     allProducts.forEach((product) => {
//       if (product.material) {
//         if (Array.isArray(product.material)) {
//           product.material.forEach((m) => materials.add(m));
//         } else {
//           materials.add(product.material);
//         }
//       }
//     });
//     return Array.from(materials).sort();
//   };

//   const categories = getCategories();
//   const materials = getMaterials();

//   const sortOptions = [
//     { value: "featured", label: "Featured" },
//     { value: "price-low", label: "Price: Low to High" },
//     { value: "price-high", label: "Price: High to Low" },
//     { value: "rating", label: "Highest Rated" },
//     { value: "newest", label: "Newest Arrivals" },
//   ];

//   // Handle material selection
//   const handleMaterialToggle = (material) => {
//     setSelectedMaterials((prev) =>
//       prev.includes(material)
//         ? prev.filter((m) => m !== material)
//         : [...prev, material]
//     );
//   };

//   // Filter products
//   const filteredProducts = allProducts.filter((product) => {
//     const inPriceRange =
//       product.price >= priceRange[0] && product.price <= priceRange[1];
//     const inCategory =
//       selectedCategory === "All" || product.mainCategory === selectedCategory;
//     const hasMaterial =
//       selectedMaterials.length === 0 ||
//       (product.material &&
//         (Array.isArray(product.material)
//           ? product.material.some((m) => selectedMaterials.includes(m))
//           : selectedMaterials.includes(product.material)));

//     return inPriceRange && inCategory && hasMaterial;
//   });

//   // Sort products
//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     switch (sortBy) {
//       case "price-low":
//         return a.price - b.price;
//       case "price-high":
//         return b.price - a.price;
//       case "rating":
//         return (b.rating || 0) - (a.rating || 0);
//       case "newest":
//         return b.uid - a.uid;
//       default:
//         return 0;
//     }
//   });

//   // Clear all filters
//   const clearAllFilters = () => {
//     setSelectedCategory("All");
//     setSelectedMaterials([]);
//     setPriceRange([0, 5000]);
//   };

//   return (
//     <div className="py-12 ">
//       <div className="container mx-auto px-4">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-playfair font-bold text-gray-900 mb-2">
//             Shop Our Collection
//           </h1>
//           <p className="text-gray-600">Discover luxury in every detail</p>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Sidebar */}
//           <div className="lg:w-1/4">
//             <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
//               {/* Categories */}
//               <div className="mb-8">
//                 <h3 className="text-lg font-semibold mb-4 flex items-center">
//                   <Filter className="w-5 h-5 mr-2" />
//                   Categories
//                 </h3>
//                 <div className="space-y-3">
//                   {categories.map((category) => (
//                     <button
//                       key={category.name}
//                       onClick={() => setSelectedCategory(category.name)}
//                       className={`flex items-center justify-between w-full text-left p-3 rounded-lg transition ${
//                         selectedCategory === category.name
//                           ? "bg-gray-200 text-gray-700"
//                           : "hover:bg-gray-50 text-gray-700"
//                       }`}
//                     >
//                       <span className="font-medium">{category.name}</span>
//                       <span
//                         className={`${
//                           selectedCategory === category.name
//                             ? "text-black"
//                             : "text-gray-500"
//                         }`}
//                       >
//                         ({category.count})
//                       </span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Price Range */}
//               <div className="mb-8">
//                 <h3 className="text-lg font-semibold mb-4">Price Range</h3>
//                 <div className="space-y-4">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">${priceRange[0]}</span>
//                     <span className="text-gray-600">${priceRange[1]}</span>
//                   </div>
//                   <input
//                     type="range"
//                     min="0"
//                     max="5000"
//                     step="100"
//                     value={priceRange[1]}
//                     onChange={(e) =>
//                       setPriceRange([priceRange[0], parseInt(e.target.value)])
//                     }
//                     className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold"
//                   />
//                 </div>
//               </div>

//               {/* Materials */}
//               {materials.length > 0 && (
//                 <div className="mb-8">
//                   <h3 className="text-lg font-semibold mb-4">Material</h3>
//                   <div className="space-y-2">
//                     {materials.map((material) => (
//                       <label
//                         key={material}
//                         className="flex items-center cursor-pointer"
//                       >
//                         <input
//                           type="checkbox"
//                           checked={selectedMaterials.includes(material)}
//                           onChange={() => handleMaterialToggle(material)}
//                           className="rounded text-gold focus:ring-gold cursor-pointer"
//                         />
//                         <span className="ml-2 text-gray-700">{material}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Clear All Button */}
//               <button
//                 onClick={clearAllFilters}
//                 className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
//               >
//                 Clear All Filters
//               </button>
//             </div>
//           </div>

//           {/* Products */}
//           <div className="lg:w-3/4">
//             {/* Toolbar */}
//             <div className="bg-white rounded-xl shadow-md p-4 mb-6">
//               <div className="flex flex-col md:flex-row justify-between items-center">
//                 <div className="flex items-center space-x-4 mb-4 md:mb-0">
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={() => setViewMode("grid")}
//                       className={`p-2 rounded-lg ${
//                         viewMode === "grid"
//                           ? "bg-gold text-white"
//                           : "text-gray-600 hover:bg-gray-100"
//                       }`}
//                     >
//                       <Grid className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={() => setViewMode("list")}
//                       className={`p-2 rounded-lg ${
//                         viewMode === "list"
//                           ? "bg-gold text-white"
//                           : "text-gray-600 hover:bg-gray-100"
//                       }`}
//                     >
//                       <List className="w-5 h-5" />
//                     </button>
//                   </div>
//                   <span className="text-gray-600">
//                     {sortedProducts.length}{" "}
//                     {sortedProducts.length === 1 ? "product" : "products"} found
//                     {selectedCategory !== "All" && ` in ${selectedCategory}`}
//                   </span>
//                 </div>

//                 <div className="flex items-center space-x-4">
//                   <span className="text-gray-600">Sort by:</span>
//                   <div className="relative">
//                     <select
//                       value={sortBy}
//                       onChange={(e) => setSortBy(e.target.value)}
//                       className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer min-w-[180px]"
//                     >
//                       {sortOptions.map((option) => (
//                         <option key={option.value} value={option.value}>
//                           {option.label}
//                         </option>
//                       ))}
//                     </select>
//                     <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Products Grid/List */}
//             {sortedProducts.length > 0 ? (
//               viewMode === "grid" ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                   {sortedProducts.map((product) => (
//                     <ProductCard key={product.uid} product={product} />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="space-y-6">
//                   {sortedProducts.map((product) => (
//                     <ProductListItem key={product.uid} product={product} />
//                   ))}
//                 </div>
//               )
//             ) : (
//               <div className="text-center py-12 bg-gray-50 rounded-xl">
//                 <div className="text-5xl mb-4">🔍</div>
//                 <h3 className="text-xl font-semibold mb-2">
//                   No products found
//                 </h3>
//                 <p className="text-gray-600 mb-6">
//                   Try adjusting your filters or search criteria
//                 </p>
//                 <button
//                   onClick={clearAllFilters}
//                   className="bg-gold text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition"
//                 >
//                   Clear All Filters
//                 </button>
//               </div>
//             )}

//             {/* Pagination */}
//             {sortedProducts.length > 0 && (
//               <div className="flex justify-center mt-12">
//                 <div className="flex space-x-2">
//                   {[1, 2, 3, 4, 5].map((page) => (
//                     <button
//                       key={page}
//                       className={`w-10 h-10 rounded-lg transition ${
//                         page === 1
//                           ? "bg-gold text-white"
//                           : "bg-white text-gray-700 hover:bg-gray-100 border"
//                       }`}
//                     >
//                       {page}
//                     </button>
//                   ))}
//                   <button className="w-10 h-10 rounded-lg bg-white border text-gray-700 hover:bg-gray-100 transition">
//                     →
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Shop;
