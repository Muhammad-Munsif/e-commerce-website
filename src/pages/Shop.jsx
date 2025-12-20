import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Filter,
  Grid,
  List,
  ChevronDown,
  ShoppingCart,
  Star,
} from 'lucide-react'
import ProductCard from '../components/ProductCard'
import ProductListItem from '../components/ProductListItem'
import { categoryData } from '../data/products'
import { selectTheme } from '../redux/slices/themeSlice'

const Shop = () => {
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedMaterials, setSelectedMaterials] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const theme = useSelector(selectTheme)

  // Extract all products from categoryData
  useEffect(() => {
    const extractedProducts = []

    Object.values(categoryData).forEach((category) => {
      Object.values(category.subcategories).forEach((subcategory) => {
        if (subcategory.products && subcategory.products.length > 0) {
          const enhancedProducts = subcategory.products.map((product) => ({
            ...product,
            mainCategory: category.name,
            subCategory: subcategory.name,
            material: ['Premium', 'Luxury'],
            discount: Math.random() > 0.5 ? Math.floor(Math.random() * 40) + 10 : 0,
            freeDelivery: Math.random() > 0.3,
            rating: product.rating || 4.5,
            reviews: product.reviews || Math.floor(Math.random() * 100) + 1,
          }))
          extractedProducts.push(...enhancedProducts)
        }
      })
    })

    setAllProducts(extractedProducts)
  }, [])

  // Get all unique main categories
  const getCategories = () => {
    const categories = { All: allProducts.length }

    allProducts.forEach((product) => {
      if (product.mainCategory) {
        if (!categories[product.mainCategory]) {
          categories[product.mainCategory] = 0
        }
        categories[product.mainCategory]++
      }
    })

    return Object.entries(categories).map(([name, count]) => ({
      name,
      count,
    }))
  }

  const categories = getCategories()
  const materials = ['Leather', 'Gold', 'Silver', 'Diamond', 'Platinum', 'Glass']

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest Arrivals' },
  ]

  // Handle material selection
  const handleMaterialToggle = (material) => {
    setSelectedMaterials((prev) =>
      prev.includes(material)
        ? prev.filter((m) => m !== material)
        : [...prev, material]
    )
  }

  // Filter products
  const filteredProducts = allProducts.filter((product) => {
    const inPriceRange =
      product.price >= priceRange[0] && product.price <= priceRange[1]
    const inCategory =
      selectedCategory === 'All' || product.mainCategory === selectedCategory
    const hasMaterial =
      selectedMaterials.length === 0 ||
      (product.material &&
        product.material.some((m) => selectedMaterials.includes(m)))

    return inPriceRange && inCategory && hasMaterial
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return (b.rating || 0) - (a.rating || 0)
      case 'newest':
        return b.uid - a.uid
      default:
        return 0
    }
  })

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategory('All')
    setSelectedMaterials([])
    setPriceRange([0, 5000])
  }

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 dark:text-white mb-2">
            Shop Our Collection
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Discover luxury in every detail
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-between w-full bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                <span className="font-medium">Filters</span>
              </div>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  showFilters ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {/* Sidebar - Hidden on mobile unless toggled */}
          {(showFilters || window.innerWidth >= 1024) && (
            <div className="lg:w-1/4">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 md:p-6 sticky top-24">
                {/* Categories */}
                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Filter className="w-5 h-5 mr-2" />
                    Categories
                  </h3>
                  <div className="space-y-2 md:space-y-3">
                    {categories.map((category) => (
                      <button
                        key={category.name}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`flex items-center justify-between w-full text-left p-2 md:p-3 rounded-lg transition ${
                          selectedCategory === category.name
                            ? 'bg-gold bg-opacity-10 text-gold'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span className="font-medium">{category.name}</span>
                        <span
                          className={`text-sm ${
                            selectedCategory === category.name
                              ? 'text-gold'
                              : 'text-gray-500'
                          }`}
                        >
                          ({category.count})
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg font-semibold mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        ${priceRange[0]}
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        ${priceRange[1]}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold"
                    />
                  </div>
                </div>

                {/* Materials */}
                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg font-semibold mb-4">Material</h3>
                  <div className="space-y-2">
                    {materials.map((material) => (
                      <label
                        key={material}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedMaterials.includes(material)}
                          onChange={() => handleMaterialToggle(material)}
                          className="rounded text-gold focus:ring-gold cursor-pointer mr-2"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          {material}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear All Button */}
                <button
                  onClick={clearAllFilters}
                  className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}

          {/* Products */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg ${
                        viewMode === 'grid'
                          ? 'bg-gold text-white'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      aria-label="Grid view"
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg ${
                        viewMode === 'list'
                          ? 'bg-gold text-white'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      aria-label="List view"
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                  <span className="text-gray-600 dark:text-gray-300">
                    {sortedProducts.length}{' '}
                    {sortedProducts.length === 1 ? 'product' : 'products'} found
                    {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-gray-600 dark:text-gray-300">Sort by:</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer min-w-[180px]"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {sortedProducts.length > 0 ? (
              viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.uid} product={product} />
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {sortedProducts.map((product) => (
                    <ProductListItem key={product.uid} product={product} />
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-gold text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {sortedProducts.length > 0 && (
              <div className="flex justify-center mt-8 md:mt-12">
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((page) => (
                    <button
                      key={page}
                      className={`w-10 h-10 rounded-lg transition ${
                        page === 1
                          ? 'bg-gold text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border dark:border-gray-700'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 border dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                    →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop

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
