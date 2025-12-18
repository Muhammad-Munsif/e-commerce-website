import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  User,
  Heart,
  ChevronDown,
  ChevronRight,
  ShoppingCart,
  Sun,
  Moon,
  LogOut,
  UserCircle,
} from "lucide-react";
import {
  CartContext,
  WishlistContext,
  AuthContext,
  ThemeContext,
} from "../App";

const Navbar = () => {
  //   import React, { useState, useEffect, useRef, useContext } from "react";
  // import { Link, NavLink, useNavigate } from "react-router-dom";
  // import {
  //   Menu,
  //   X,
  //   Search,
  //   User,
  //   Heart,
  //   ChevronDown,
  //   ChevronRight,
  //   ShoppingCart,
  //   Sun,
  //   Moon,
  //   LogOut,
  //   UserCircle,
  // } from "lucide-react";
  // import { useCart } from "../context/CartContext";
  // import { useWishlist } from "../context/WishlistContext";
  // import { useAuth } from "../context/AuthContext";
  // import { useTheme } from "../context/ThemeContext";

  // const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const categoryRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const { cartCount } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Shop", path: "/shop" },
    { name: "Contact", path: "/contact" },
  ];

  const categories = [
    {
      name: "Jewelry",
      icon: "💎",
      submenu: [
        { name: "Rings", path: "/category/jewelry/rings" },
        { name: "Pendants", path: "/category/jewelry/pendants" },
        { name: "Necklaces", path: "/category/jewelry/necklaces" },
        { name: "Bracelets", path: "/category/jewelry/bracelets" },
      ],
    },
    {
      name: "Wallets",
      icon: "👛",
      submenu: [
        { name: "Leather Wallets", path: "/category/wallets/leather" },
        { name: "Designer Wallets", path: "/category/wallets/designer" },
        { name: "RFID Wallets", path: "/category/wallets/rfid" },
        { name: "Card Holders", path: "/category/wallets/card-holders" },
      ],
    },
    {
      name: "Perfumes",
      icon: "🌸",
      submenu: [
        { name: "Floral Scents", path: "/category/perfumes/floral" },
        { name: "Woody Scents", path: "/category/perfumes/woody" },
        { name: "Fresh Scents", path: "/category/perfumes/fresh" },
        { name: "Oriental Scents", path: "/category/perfumes/oriental" },
        { name: "Citrus Scents", path: "/category/perfumes/citrus" },
      ],
    },
  ];

  // Mock search function
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setShowSearchResults(false);
    }
  };

  const handleCategoryClick = () => {
    setIsCategoryOpen(!isCategoryOpen);
    if (isCategoryOpen) {
      setOpenSubmenu(null);
    }
  };

  const handleSubmenuToggle = (categoryName, e) => {
    e.stopPropagation();
    setOpenSubmenu(openSubmenu === categoryName ? null : categoryName);
  };

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsCategoryOpen(false);
    setOpenSubmenu(null);
    setShowSearchResults(false);
  };

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
        setOpenSubmenu(null);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 shadow-lg transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="hidden md:flex justify-between items-center py-2 text-sm border-b dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <span>🔥 25% OFF on First Order</span>
            <span>🚚 Free Shipping over $100</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            {user ? (
              <>
                <span>Welcome, {user.name}</span>
                <button
                  onClick={logout}
                  className="flex items-center hover:text-gold"
                >
                  <LogOut className="w-4 h-4 mr-1" /> Logout
                </button>
              </>
            ) : (
              <Link to="/account" className="hover:text-gold">
                Login / Register
              </Link>
            )}
          </div>
        </div>

        {/* Main Nav */}
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2"
            onClick={closeAllMenus}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-gold to-bronze rounded-full flex items-center justify-center animate-pulse">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-playfair font-bold">Luxury</span>
              <span className="text-xl font-playfair font-bold text-gold">
                Haven
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `font-medium transition-all duration-300 py-2 relative group ${
                    isActive ? "text-gold" : "hover:text-gold"
                  }`
                }
                onClick={closeAllMenus}
              >
                {item.name}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gold transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                    isActive ? "scale-x-100" : ""
                  }`}
                ></span>
              </NavLink>
            ))}

            {/* Category Dropdown */}
            <div className="relative" ref={categoryRef}>
              <button
                onClick={handleCategoryClick}
                className="flex items-center font-medium hover:text-gold transition-colors py-2 group"
              >
                Categories
                <ChevronDown
                  className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                    isCategoryOpen ? "rotate-180" : ""
                  } group-hover:rotate-180`}
                />
              </button>

              {isCategoryOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-800 shadow-2xl rounded-xl border dark:border-gray-700 z-50 animate-fadeIn">
                  <div className="p-2">
                    {categories.map((category) => (
                      <div key={category.name} className="relative group">
                        <button
                          onClick={(e) => handleSubmenuToggle(category.name, e)}
                          className="flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 text-left"
                        >
                          <div className="flex items-center">
                            <span className="mr-3">{category.icon}</span>
                            <span className="font-medium">{category.name}</span>
                          </div>
                          <ChevronRight
                            className={`w-4 h-4 transition-transform duration-200 ${
                              openSubmenu === category.name ? "rotate-90" : ""
                            }`}
                          />
                        </button>

                        {openSubmenu === category.name && (
                          <div className="absolute left-full top-0 ml-1 w-56 bg-white dark:bg-gray-800 shadow-2xl rounded-xl border dark:border-gray-700 z-50">
                            <div className="p-3">
                              <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 px-2">
                                {category.name}
                              </div>
                              <div className="space-y-1">
                                {category.submenu.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    to={subItem.path}
                                    className="block px-3 py-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gold transition-all duration-300"
                                    onClick={closeAllMenus}
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Icons & Search */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden md:block" ref={searchRef}>
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSearchResults(true)}
                  className="px-4 py-2 pl-10 pr-4 rounded-full border dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent w-64 transition-all duration-300"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </form>
            </div>

            {/* Action Icons */}
            <Link
              to="/wishlist"
              className="relative group p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={closeAllMenus}
            >
              <Heart className="w-6 h-6 group-hover:text-red-500 transition-colors" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishlist.items.length}
              </span>
            </Link>

            <Link
              to="/cart"
              className="relative group p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={closeAllMenus}
            >
              <ShoppingCart className="w-6 h-6 group-hover:text-gold transition-colors" />
              <span className="absolute -top-1 -right-1 bg-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            </Link>

            <Link
              to="/account"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={closeAllMenus}
            >
              {user ? (
                <UserCircle className="w-6 h-6 text-gold" />
              ) : (
                <User className="w-6 h-6 hover:text-gold transition-colors" />
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t dark:border-gray-700 animate-slideDown">
            <div className="space-y-1">
              {/* Main Menu Items */}
              {menuItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={closeAllMenus}
                  className={({ isActive }) =>
                    `block py-3 px-4 font-medium rounded-lg transition-all duration-300 ${
                      isActive
                        ? "text-gold bg-gold bg-opacity-10"
                        : "hover:text-gold hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              {/* Mobile Category Dropdown */}
              <div>
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="flex items-center justify-between w-full py-3 px-4 font-medium rounded-lg hover:text-gold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isCategoryOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Mobile Category Menu */}
                {isCategoryOpen && (
                  <div className="pl-6 mt-1 space-y-1 animate-fadeIn">
                    {categories.map((category) => (
                      <div key={category.name}>
                        <button
                          onClick={() => handleSubmenuToggle(category.name)}
                          className="flex items-center justify-between w-full py-2 px-3 rounded-lg hover:text-gold transition-all duration-300"
                        >
                          <div className="flex items-center">
                            <span className="mr-2">{category.icon}</span>
                            {category.name}
                          </div>
                          <ChevronRight
                            className={`w-4 h-4 transition-transform duration-200 ${
                              openSubmenu === category.name ? "rotate-90" : ""
                            }`}
                          />
                        </button>

                        {/* Mobile Submenu */}
                        {openSubmenu === category.name && (
                          <div className="pl-10 mt-1 space-y-1 animate-fadeIn">
                            {category.submenu.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.path}
                                onClick={closeAllMenus}
                                className="block py-2 px-3 text-sm rounded-lg hover:text-gold transition-all duration-300"
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Search */}
              <div className="mt-4 px-4">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 pr-4 rounded-full border dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
