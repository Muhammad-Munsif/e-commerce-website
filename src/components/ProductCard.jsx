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
              <span className="px-4 py-2 font-medium min-w-[50px] text-center border-x border-gray-300">
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
              className="flex-1 flex items-center justify-center  py-2.5 px-4 rounded-lg  transition-colors font-medium"
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
