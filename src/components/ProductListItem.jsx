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
