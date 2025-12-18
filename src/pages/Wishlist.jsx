import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, X, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import Breadcrumb from '../components/Breadcrumb';
import { toast } from 'react-toastify';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Wishlist', path: '/wishlist' }
  ];

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const handleMoveAllToCart = () => {
    wishlist.items.forEach(product => {
      addToCart(product, 1);
    });
    toast.success('All items moved to cart!');
  };

  if (wishlist.items.length === 0) {
    return (
      <>
        <Breadcrumb items={breadcrumbItems} />
        <div className="section-padding">
          <div className="container-custom">
            <div className="max-w-md mx-auto text-center">
              <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Your wishlist is empty</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Save items you love to your wishlist. Review them anytime and easily move them to the bag.
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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-playfair font-bold mb-2">My Wishlist</h1>
              <p className="text-gray-600 dark:text-gray-300">
                {wishlist.items.length} {wishlist.items.length === 1 ? 'item' : 'items'}
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleMoveAllToCart}
                className="btn-primary flex items-center"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Move All to Cart
              </button>
              <button
                onClick={() => {
                  clearWishlist();
                  toast.info('Wishlist cleared');
                }}
                className="btn-secondary flex items-center"
              >
                <X className="w-5 h-5 mr-2" />
                Clear All
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlist.items.map((product) => (
              <div key={product.id} className="relative group">
                <ProductCard product={product} />
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-gold text-white p-2 rounded-full hover:bg-yellow-600 transition-colors shadow-lg"
                    title="Add to cart"
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => removeFromWishlist(product.id, product.name)}
                    className="bg-white text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors shadow-lg"
                    title="Remove from wishlist"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div className="mt-16">
            <h2 className="text-2xl font-playfair font-bold mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Add recommended products here */}
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <p className="text-gray-500 mb-4">More products coming soon</p>
                <Link to="/shop" className="text-gold hover:underline font-medium">
                  Browse All Products →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;