import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Heart, Truck, Shield, RefreshCw, ChevronRight, Package } from 'lucide-react';

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = {
    uid: 1,
    name: 'Diamond Solitaire Engagement Ring',
    price: 1999.99,
    oldPrice: 2499.99,
    category: 'Rings',
    description: 'A stunning solitaire diamond engagement ring featuring a brilliant 1-carat center stone set in 18K white gold. Perfect for that special proposal moment.',
    rating: 4.9,
    reviews: 128,
    inStock: true,
    sku: 'RING-001-GOLD',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop',
    ],
    features: [
      '1-carat brilliant cut diamond',
      '18K white gold setting',
      'Expertly crafted by master jewelers',
      'Certified conflict-free diamond',
      'Lifetime warranty on setting',
      'Free resizing within first year'
    ],
    specifications: {
      'Material': '18K White Gold',
      'Diamond Carat': '1.00 ct',
      'Diamond Color': 'D (Colorless)',
      'Diamond Clarity': 'VS1',
      'Ring Size': '4-9 (Resizable)',
      'Weight': '3.2g',
      'Certification': 'GIA Certified'
    }
  };

  const relatedProducts = [
    { uid: 2, name: 'Sapphire Halo Ring', price: 3499.99, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop', category: 'Rings' },
    { uid: 3, name: 'Gold Pendant Necklace', price: 899.99, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop', category: 'Pendants' },
    { uid: 4, name: 'Premium Leather Wallet', price: 129.99, image: 'https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?w=400&h=400&fit=crop', category: 'Wallets' },
  ];

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-gold">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link to="/shop" className="hover:text-gold">Shop</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link to="/category/jewelry" className="hover:text-gold">Jewelry</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link to="/category/jewelry/rings" className="hover:text-gold">Rings</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="mb-4 rounded-2xl overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-auto"
              />
            </div>
            <div className="flex space-x-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-gold' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Product view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-2">
              <span className="text-gold font-semibold">{product.category}</span>
            </div>
            
            <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">({product.reviews} reviews)</span>
              <span className="ml-4 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-center">
                <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                <span className="ml-4 text-2xl text-gray-500 line-through">${product.oldPrice}</span>
                <span className="ml-4 px-3 py-1 bg-red-100 text-red-800 rounded-full font-semibold">
                  Save ${(product.oldPrice - product.price).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-4">Key Features:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="mb-8">
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center">
                  <span className="mr-4 font-medium">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-6 py-2 border-x border-gray-300">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-gray-600">
                  SKU: <span className="font-semibold">{product.sku}</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <button className="flex-1 bg-gradient-to-r from-gold to-bronze text-white py-3 rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 mr-2 bg-red-800" />
                  Add to Cart
                </button>
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Heart className="w-6 h-6 text-gray-600 hover:text-red-500" />
                </button>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex items-center">
                  <Truck className="w-8 h-8 text-gold mr-3" />
                  <div>
                    <div className="font-semibold">Free Shipping</div>
                    <div className="text-sm text-gray-600">On orders over $100</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Package className="w-8 h-8 text-gold mr-3" />
                  <div>
                    <div className="font-semibold">Lifetime Warranty</div>
                    <div className="text-sm text-gray-600">On diamond setting</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Shield className="w-8 h-8 text-gold mr-3" />
                  <div>
                    <div className="font-semibold">GIA Certified</div>
                    <div className="text-sm text-gray-600">Authenticity guaranteed</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <RefreshCw className="w-8 h-8 text-gold mr-3" />
                  <div>
                    <div className="font-semibold">Free Resizing</div>
                    <div className="text-sm text-gray-600">Within first year</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-16">
          <div className="border-b border-gray-200 mb-8">
            <h2 className="text-2xl font-playfair font-bold mb-4">Specifications</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="border-b pb-4">
                <span className="text-gray-600">{key}:</span>
                <span className="ml-2 font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-playfair font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((related) => (
              <Link
                key={related.id}
                to={`/product/${related.id}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group"
              >
                <img
                  src={related.image}
                  alt={related.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-sm text-gold font-semibold">{related.category}</span>
                  </div>
                  <h3 className="font-semibold mb-2">{related.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">${related.price}</span>
                    <div className="flex items-center text-gold group-hover:translate-x-1 transition">
                      <span className="mr-1">View</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
