import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Star } from 'lucide-react';
import { categoryData } from '../data/data';

const Categories = () => {
  const { category, subcategory } = useParams();

  const currentCategory = categoryData[category] || categoryData.jewelry;
  const currentSubcategory = subcategory ? currentCategory.subcategories[subcategory] : null;

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-gold">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link to="/shop" className="hover:text-gold">Shop</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link to={`/category/${category}`} className="hover:text-gold">{currentCategory.name}</Link>
          {currentSubcategory && (
            <>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-gray-900 font-medium">{currentSubcategory.name}</span>
            </>
          )}
        </div>

        {/* Category Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-playfair font-bold text-gray-900 mb-4">
            {currentSubcategory ? currentSubcategory.name : currentCategory.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            {currentSubcategory ? `${currentSubcategory.name} - ${currentCategory.description}` : currentCategory.description}
          </p>
        </div>

        {/* Subcategories Grid */}
        {!currentSubcategory && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Browse Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(currentCategory.subcategories).map(([key, subcat]) => (
                <Link
                  key={key}
                  to={`/category/${category}/${key}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group"
                >
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl mb-2">✨</div>
                      <h3 className="text-xl font-semibold">{subcat.name}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gold font-semibold">View Collection</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Products */}
        {currentSubcategory && currentSubcategory.products && currentSubcategory.products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentSubcategory.products.map((product) => (
                <div key={product.uid} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-gray-600">{product.rating}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-gold">${product.price}</span>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : currentSubcategory && (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <div className="text-5xl mb-4">🌟</div>
            <h3 className="text-xl font-semibold mb-2">Coming Soon!</h3>
            <p className="text-gray-600">This collection is currently being curated</p>
          </div>
        )}

        {/* All Categories Navigation */}
        <div className="mt-16 bg-gradient-to-r from-gray-50 to-gold/10 rounded-2xl p-8">
          <h2 className="text-2xl font-playfair font-bold text-center mb-8">Explore All Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(categoryData).map(([key, cat]) => (
              <Link
                key={key}
                to={`/category/${key}`}
                className={`p-6 rounded-xl text-center transition ${
                  category === key
                    ? 'bg-gold text-white'
                    : 'bg-white text-gray-800 hover:shadow-lg'
                }`}
              >
                <h3 className="text-xl font-semibold mb-2">{cat.name}</h3>
                <p className="text-sm opacity-75">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
