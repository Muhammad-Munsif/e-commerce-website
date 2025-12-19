import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Shop = lazy(() => import("./pages/Shop"));
const Categories = lazy(() => import("./pages/Categories"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Account = lazy(() => import("./pages/Account"));
const OrderTracking = lazy(() => import("./pages/OrderTracking"));

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
                      <Route
                        path="/category/:category"
                        element={<Categories />}
                      />
                      <Route
                        path="/category/:category/:subcategory"
                        element={<Categories />}
                      />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/wishlist" element={<Wishlist />} />
                      <Route path="/account" element={<Account />} />
                      <Route path="/orders" element={<OrderTracking />} />
                      <Route
                        path="/orders/:orderId"
                        element={<OrderTracking />}
                      />

                      {/* 404 Page */}
                      <Route
                        path="*"
                        element={
                          <div className="min-h-[70vh] flex items-center justify-center px-4">
                            <div className="text-center max-w-md">
                              <div className="text-9xl font-playfair font-bold text-gold mb-4 animate-bounce">
                                404
                              </div>
                              <h1 className="text-3xl font-bold mb-4">
                                Page Not Found
                              </h1>
                              <p className="text-gray-600 dark:text-gray-300 mb-8">
                                The page you're looking for doesn't exist or has
                                been moved.
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




// import React from "react";
// import Navbar from "./Navbar";
// import Footer from "./Footer";







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
