import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Truck,
  Shield,
  CreditCard,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import Breadcrumb from "../components/Breadcrumb";
import { toast } from "react-toastify";

const Cart = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount,
  } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  const coupons = {
    WELCOME25: { discount: 0.25, minAmount: 0 },
    SUMMER15: { discount: 0.15, minAmount: 100 },
    FREESHIP: { discount: 0, shipping: 0, minAmount: 50 },
  };

  useEffect(() => {
    // Fetch suggested products based on cart items
    const fetchSuggestions = async () => {
      // Mock API call
      const suggestions = [
        {
          id: 101,
          name: "Matching Diamond Earrings",
          price: 899.99,
          image:
            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
          category: "jewelry",
        },
        {
          id: 102,
          name: "Leather Keychain",
          price: 29.99,
          image:
            "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop",
          category: "wallets",
        },
      ];
      setSuggestedProducts(suggestions);
    };
    fetchSuggestions();
  }, [cart]);

  const applyCoupon = () => {
    const coupon = coupons[couponCode.toUpperCase()];
    if (coupon && cartTotal >= coupon.minAmount) {
      setAppliedCoupon({
        code: couponCode.toUpperCase(),
        ...coupon,
      });
      toast.success(`Coupon "${couponCode.toUpperCase()}" applied!`);
    } else {
      toast.error("Invalid coupon code or minimum amount not reached");
    }
  };

  const calculateDiscount = () => {
    if (!appliedCoupon || appliedCoupon.discount === 0) return 0;
    return cartTotal * appliedCoupon.discount;
  };

  const shipping =
    appliedCoupon && appliedCoupon.shipping === 0
      ? 0
      : cartTotal >= 100
      ? 0
      : 9.99;

  const subtotal = cartTotal - calculateDiscount();
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Cart", path: "/cart" },
  ];

  if (cartCount === 0) {
    return (
      <>
        <Breadcrumb items={breadcrumbItems} />
        <div className="section-padding">
          <div className="container-custom">
            <div className="max-w-md mx-auto text-center">
              <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link to="/shop" className="btn-primary inline-flex items-center">
                Start Shopping
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="section-padding">
        <div className="container-custom">
          <h1 className="text-4xl font-playfair font-bold mb-8">
            Shopping Cart
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Items ({cartCount})</h2>
                  <button
                    onClick={() => {
                      clearCart();
                      toast.info("Cart cleared");
                    }}
                    className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Clear All
                  </button>
                </div>

                <div className="space-y-6">
                  {cart.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row items-center gap-6 p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <Link
                        to={`/product/${item.id}`}
                        className="flex-shrink-0"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                          <div className="mb-4 sm:mb-0 sm:mr-4">
                            <Link to={`/product/${item.id}`}>
                              <h3 className="font-semibold text-lg mb-2 hover:text-gold transition-colors">
                                {item.name}
                              </h3>
                            </Link>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                              {item.material && item.material.join(" • ")}
                            </p>
                            {item.discount > 0 && (
                              <span className="inline-block bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                                -{item.discount}% OFF
                              </span>
                            )}
                          </div>

                          <div className="text-right">
                            <p className="text-2xl font-bold text-gold mb-2">
                              $
                              {(
                                (item.discount
                                  ? item.price * (1 - item.discount / 100)
                                  : item.price) * item.quantity
                              ).toFixed(2)}
                            </p>
                            {item.discount > 0 && (
                              <p className="text-sm text-gray-500 line-through">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center border dark:border-gray-700 rounded-lg overflow-hidden">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-4 py-2 border-x dark:border-gray-700 min-w-[40px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.id, item.name)}
                              className="text-red-500 hover:text-red-700 flex items-center"
                            >
                              <Trash2 className="w-5 h-5 mr-1" />
                              Remove
                            </button>
                          </div>

                          <div className="text-sm text-gray-500">
                            $
                            {(item.discount
                              ? item.price * (1 - item.discount / 100)
                              : item.price
                            ).toFixed(2)}{" "}
                            each
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggested Products */}
              {suggestedProducts.length > 0 && (
                <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-6">
                    Frequently bought together
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {suggestedProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-4 p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{product.name}</h4>
                          <p className="text-gold font-bold mb-2">
                            ${product.price.toFixed(2)}
                          </p>
                          <button className="text-sm text-blue-600 hover:text-blue-800">
                            + Add to cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Order Summary
                </h2>

                {/* Coupon Code */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Coupon Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon"
                      className="input-field"
                    />
                    <button
                      onClick={applyCoupon}
                      className="bg-gray-900 text-white px-4 py-3 rounded-lg hover:bg-black transition-colors whitespace-nowrap"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedCoupon && (
                    <div className="mt-2 text-green-600 text-sm">
                      Coupon "{appliedCoupon.code}" applied!
                    </div>
                  )}
                  <div className="mt-3 text-xs text-gray-500">
                    Try: WELCOME25 (25% off), SUMMER15 (15% off over $100),
                    FREESHIP (free shipping)
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartCount} items)</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>

                  {appliedCoupon && appliedCoupon.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedCoupon.code})</span>
                      <span>-${calculateDiscount().toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <div className="border-t dark:border-gray-700 pt-3">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Including ${tax.toFixed(2)} in taxes
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link
                  to="/checkout"
                  className="btn-primary w-full text-center mb-4 flex items-center justify-center"
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>

                <Link
                  to="/shop"
                  className="btn-secondary w-full text-center block"
                >
                  Continue Shopping
                </Link>

                {/* Security & Benefits */}
                <div className="mt-8 space-y-4 text-sm">
                  <div className="flex items-center">
                    <Truck className="w-5 h-5 text-gold mr-3 flex-shrink-0" />
                    <span>Free shipping on orders over $100</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-gold mr-3 flex-shrink-0" />
                    <span>Secure checkout & 30-day return policy</span>
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 text-gold mr-3 flex-shrink-0" />
                    <span>All major credit cards accepted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

// import React, { useContext, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Shield } from 'lucide-react';
// import { CartContext } from './App';
// import { toast } from 'react-toastify';

// const Cart = () => {
//   const { cart, cartDispatch, cartTotal, cartCount } = useContext(CartContext);
//   const [couponCode, setCouponCode] = useState('');
//   const [appliedCoupon, setAppliedCoupon] = useState(null);

//   const updateQuantity = (id, quantity) => {
//     if (quantity < 1) return;
//     cartDispatch({
//       type: 'UPDATE_QUANTITY',
//       payload: { id, quantity },
//     });
//   };

//   const removeItem = (item) => {
//     cartDispatch({
//       type: 'REMOVE_FROM_CART',
//       payload: item,
//     });
//   };

//   const applyCoupon = () => {
//     const coupons = {
//       WELCOME25: 0.25,
//       SUMMER15: 0.15,
//       FREESHIP: 0,
//     };

//     if (coupons[couponCode.toUpperCase()]) {
//       setAppliedCoupon({
//         code: couponCode.toUpperCase(),
//         discount: coupons[couponCode.toUpperCase()],
//       });
//       toast.success(`Coupon "${couponCode.toUpperCase()}" applied!`);
//     } else {
//       toast.error('Invalid coupon code');
//     }
//   };

//   const calculateDiscount = () => {
//     if (!appliedCoupon) return 0;
//     if (appliedCoupon.discount === 0) return 0; // Free shipping case
//     return cartTotal * appliedCoupon.discount;
//   };

//   const shipping = cartTotal >= 100 || (appliedCoupon && appliedCoupon.code === 'FREESHIP') ? 0 : 9.99;
//   const subtotal = cartTotal - calculateDiscount();
//   const total = subtotal + shipping;

//   if (cartCount === 0) {
//     return (
//       <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
//         <div className="text-center max-w-md">
//           <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
//           <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
//           <p className="text-gray-600 dark:text-gray-300 mb-8">
//             Looks like you haven't added any items to your cart yet.
//           </p>
//           <Link
//             to="/shop"
//             className="inline-block bg-gold text-white px-8 py-3 rounded-lg hover:bg-yellow-600 transition-all duration-300 transform hover:-translate-y-1 font-medium shadow-lg hover:shadow-xl"
//           >
//             Start Shopping
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="py-12">
//       <div className="container mx-auto px-4">
//         <h1 className="text-4xl font-playfair font-bold mb-8">Shopping Cart</h1>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Cart Items */}
//           <div className="lg:col-span-2">
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-semibold">Items ({cartCount})</h2>
//                 <button
//                   onClick={() => {
//                     cartDispatch({ type: 'CLEAR_CART' });
//                     toast.info('Cart cleared');
//                   }}
//                   className="text-red-500 hover:text-red-700 text-sm font-medium"
//                 >
//                   Clear All
//                 </button>
//               </div>

//               <div className="space-y-6">
//                 {cart.items.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex flex-col sm:flex-row items-center gap-4 p-4 border-b dark:border-gray-700"
//                   >
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-24 h-24 object-cover rounded-lg"
//                     />
//                     <div className="flex-1">
//                       <h3 className="font-semibold mb-2">{item.name}</h3>
//                       <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
//                         {item.mainCategory} • {item.subCategory}
//                       </p>
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-4">
//                           <div className="flex items-center border dark:border-gray-700 rounded-lg">
//                             <button
//                               onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                               className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
//                             >
//                               <Minus className="w-4 h-4" />
//                             </button>
//                             <span className="px-4 py-1 border-x dark:border-gray-700">
//                               {item.quantity}
//                             </span>
//                             <button
//                               onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                               className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
//                             >
//                               <Plus className="w-4 h-4" />
//                             </button>
//                           </div>
//                           <button
//                             onClick={() => removeItem(item)}
//                             className="text-red-500 hover:text-red-700"
//                           >
//                             <Trash2 className="w-5 h-5" />
//                           </button>
//                         </div>
//                         <div className="text-right">
//                           <p className="text-lg font-bold">
//                             ${((item.discount ? item.price * (1 - item.discount / 100) : item.price) * item.quantity).toFixed(2)}
//                           </p>
//                           {item.discount > 0 && (
//                             <p className="text-sm text-gray-500 line-through">
//                               ${(item.price * item.quantity).toFixed(2)}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Order Summary */}
//           <div className="lg:col-span-1">
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24">
//               <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

//               {/* Coupon Code */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium mb-2">Coupon Code</label>
//                 <div className="flex gap-2">
//                   <input
//                     type="text"
//                     value={couponCode}
//                     onChange={(e) => setCouponCode(e.target.value)}
//                     placeholder="Enter coupon"
//                     className="flex-1 px-4 py-2 border dark:border-gray-700 dark:bg-gray-900 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
//                   />
//                   <button
//                     onClick={applyCoupon}
//                     className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-black transition-colors"
//                   >
//                     Apply
//                   </button>
//                 </div>
//                 {appliedCoupon && (
//                   <div className="mt-2 text-green-600 text-sm">
//                     Coupon "{appliedCoupon.code}" applied successfully!
//                   </div>
//                 )}
//               </div>

//               {/* Price Breakdown */}
//               <div className="space-y-4 mb-6">
//                 <div className="flex justify-between">
//                   <span>Subtotal</span>
//                   <span>${cartTotal.toFixed(2)}</span>
//                 </div>
//                 {appliedCoupon && appliedCoupon.discount > 0 && (
//                   <div className="flex justify-between text-green-600">
//                     <span>Discount ({appliedCoupon.code})</span>
//                     <span>-${calculateDiscount().toFixed(2)}</span>
//                   </div>
//                 )}
//                 <div className="flex justify-between">
//                   <span>Shipping</span>
//                   <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
//                 </div>
//                 {appliedCoupon && appliedCoupon.code === 'FREESHIP' && (
//                   <div className="text-green-600 text-sm">
//                     Free shipping applied with coupon
//                   </div>
//                 )}
//                 <div className="border-t dark:border-gray-700 pt-4">
//                   <div className="flex justify-between text-xl font-bold">
//                     <span>Total</span>
//                     <span>${total.toFixed(2)}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Checkout Button */}
//               <Link
//                 to="/checkout"
//                 className="block w-full bg-gradient-to-r from-gold to-bronze text-white text-center py-3 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:-translate-y-1 font-medium shadow-lg hover:shadow-xl mb-4"
//               >
//                 Proceed to Checkout
//                 <ArrowRight className="inline ml-2 w-5 h-5" />
//               </Link>

//               <Link
//                 to="/shop"
//                 className="block w-full text-center py-3 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//               >
//                 Continue Shopping
//               </Link>

//               {/* Benefits */}
//               <div className="mt-8 space-y-4 text-sm">
//                 <div className="flex items-center">
//                   <Truck className="w-5 h-5 text-gold mr-3" />
//                   <span>Free shipping on orders over $100</span>
//                 </div>
//                 <div className="flex items-center">
//                   <Shield className="w-5 h-5 text-gold mr-3" />
//                   <span>30-day return policy</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;
