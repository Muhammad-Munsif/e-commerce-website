import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "./redux/slices/themeSlice";
import { selectTheme } from "./redux/slices/themeSlice";
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
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  useEffect(() => {
    // Set initial theme
    const savedTheme = localStorage.getItem("theme") || "light";
    dispatch(setTheme(savedTheme));
  }, [dispatch]);

  return (
    <Router>
      <div
        className={`min-h-screen flex flex-col transition-colors duration-300 ${
          theme === "dark" ? "dark:bg-gray-900 dark:text-white" : ""
        }`}
      >
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<LoadingSpinner />}>
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
                      <h1 className="text-3xl font-bold mb-4">
                        Page Not Found
                      </h1>
                      <p className="text-gray-600 dark:text-gray-300 mb-8">
                        The page you're looking for doesn't exist or has been
                        moved.
                      </p>
                      <a href="/" className="btn-primary inline-block">
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
      </div>
    </Router>
  );
};

export default App;

// import React, { lazy, Suspense } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { CartProvider } from "./context/CartContext";
// import { WishlistProvider } from "./context/WishlistContext";
// import { AuthProvider } from "./context/AuthContext";
// import { ThemeProvider } from "./context/ThemeContext";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import LoadingSpinner from "./components/LoadingSpinner";

// // Lazy load pages for better performance
// const Home = lazy(() => import("./pages/Home"));
// const About = lazy(() => import("./pages/About"));
// const Shop = lazy(() => import("./pages/Shop"));
// const Categories = lazy(() => import("./pages/Categories"));
// const ProductDetail = lazy(() => import("./pages/ProductDetail"));
// const Contact = lazy(() => import("./pages/Contact"));
// const Cart = lazy(() => import("./pages/Cart"));
// const Checkout = lazy(() => import("./pages/Checkout"));
// const Wishlist = lazy(() => import("./pages/Wishlist"));
// const Account = lazy(() => import("./pages/Account"));
// const OrderTracking = lazy(() => import("./pages/OrderTracking"));

// const App = () => {
//   return (
//     <ThemeProvider>
//       <AuthProvider>
//         <CartProvider>
//           <WishlistProvider>
//             <Router>
//               <div className="min-h-screen flex flex-col">
//                 <Navbar />
//                 <main className="flex-grow">
//                   <Suspense fallback={<LoadingSpinner />}>
//                     <Routes>
//                       <Route path="/" element={<Home />} />
//                       <Route path="/about" element={<About />} />
//                       <Route path="/shop" element={<Shop />} />
//                       <Route
//                         path="/category/:category"
//                         element={<Categories />}
//                       />
//                       <Route
//                         path="/category/:category/:subcategory"
//                         element={<Categories />}
//                       />
//                       <Route path="/contact" element={<Contact />} />
//                       <Route path="/product/:id" element={<ProductDetail />} />
//                       <Route path="/cart" element={<Cart />} />
//                       <Route path="/checkout" element={<Checkout />} />
//                       <Route path="/wishlist" element={<Wishlist />} />
//                       <Route path="/account" element={<Account />} />
//                       <Route path="/orders" element={<OrderTracking />} />
//                       <Route
//                         path="/orders/:orderId"
//                         element={<OrderTracking />}
//                       />

//                       {/* 404 Page */}
//                       <Route
//                         path="*"
//                         element={
//                           <div className="min-h-[70vh] flex items-center justify-center px-4">
//                             <div className="text-center max-w-md">
//                               <div className="text-9xl font-playfair font-bold text-gold mb-4 animate-bounce">
//                                 404
//                               </div>
//                               <h1 className="text-3xl font-bold mb-4">
//                                 Page Not Found
//                               </h1>
//                               <p className="text-gray-600 dark:text-gray-300 mb-8">
//                                 The page you're looking for doesn't exist or has
//                                 been moved.
//                               </p>
//                               <a
//                                 href="/"
//                                 className="inline-block bg-gold text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-all duration-300 transform hover:-translate-y-1 font-medium shadow-lg hover:shadow-xl"
//                               >
//                                 Return Home
//                               </a>
//                             </div>
//                           </div>
//                         }
//                       />
//                     </Routes>
//                   </Suspense>
//                 </main>
//                 <Footer />
//                 <ToastContainer
//                   position="bottom-right"
//                   autoClose={3000}
//                   hideProgressBar={false}
//                   newestOnTop
//                   closeOnClick
//                   rtl={false}
//                   pauseOnFocusLoss
//                   draggable
//                   pauseOnHover
//                   theme="light"
//                 />
//               </div>
//             </Router>
//           </WishlistProvider>
//         </CartProvider>
//       </AuthProvider>
//     </ThemeProvider>
//   );
// };

// export default App;

// // import React from "react";
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import Navbar from "./components/Navbar";
// // import Footer from "./components/Footer";
// // import Home from "./pages/Home";
// // import About from "./pages/About";
// // import Shop from "./pages/Shop";
// // import Categories from "./pages/Categories";
// // import Contact from "./pages/Contact";
// // import ProductDetail from "./pages/ProductDetail";

// // function App() {
// //   return (
// //     <Router>
// //       <div className="min-h-screen flex flex-col">
// //         <Navbar />
// //         <main className="flex-grow">
// //           <Routes>
// //             <Route path="/" element={<Home />} />
// //             <Route path="/about" element={<About />} />
// //             <Route path="/shop" element={<Shop />} />
// //             <Route path="/category/:category" element={<Categories />} />
// //             <Route
// //               path="/category/:category/:subcategory"
// //               element={<Categories />}
// //             />
// //             <Route path="/contact" element={<Contact />} />
// //             <Route path="/product/:id" element={<ProductDetail />} />

// //             {/* 404 Page */}
// //             <Route
// //               path="*"
// //               element={
// //                 <div className="min-h-screen flex items-center justify-center">
// //                   <div className="text-center">
// //                     <h1 className="text-4xl font-playfair font-bold mb-4">
// //                       404 - Page Not Found
// //                     </h1>
// //                     <p className="text-gray-600">
// //                       The page you are looking for doesn't exist.
// //                     </p>
// //                   </div>
// //                 </div>
// //               }
// //             />
// //           </Routes>
// //         </main>
// //         <Footer />
// //       </div>
// //     </Router>
// //   );
// // }

// // export default App;
