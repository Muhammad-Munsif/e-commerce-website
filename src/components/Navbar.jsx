import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,

  Search,
  User,
  Heart,
  ChevronDown,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";

const Navbar = ({ cartItems = 3 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const categoryRef = useRef(null);
  const submenuRef = useRef(null);

  // Menu structure as requested
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Shop", path: "/shop" },
    { name: "Contact", path: "/contact" },
  ];

  // Category structure
  const categories = [
    {
      name: "Jewelry",
      submenu: [
        { name: "Rings", path: "/category/jewelry/rings" },
        { name: "Pendants", path: "/category/jewelry/pendants" },
      ],
    },
    {
      name: "Wallets",
      submenu: [
        { name: "Leather Wallets", path: "/category/wallets/leather" },
        { name: "Designer Wallets", path: "/category/wallets/designer" },
        { name: "RFID Wallets", path: "/category/wallets/rfid" },
      ],
    },
    {
      name: "Perfumes",
      submenu: [
        { name: "Floral Scents", path: "/category/perfumes/floral" },
        { name: "Woody Scents", path: "/category/perfumes/woody" },
        { name: "Fresh Scents", path: "/category/perfumes/fresh" },
        { name: "Oriental Scents", path: "/category/perfumes/oriental" },
        { name: "Citrus Scents", path: "/category/perfumes/citrus" },
        { name: "Gourmand Scents", path: "/category/perfumes/gourmand" },
        { name: "Aquatic Scents", path: "/category/perfumes/aquatic" },
      ],
    },
  ];

  // Handle category click
  const handleCategoryClick = () => {
    setIsCategoryOpen(!isCategoryOpen);
    if (isCategoryOpen) {
      setOpenSubmenu(null);
    }
  };

  // Handle submenu toggle
  const handleSubmenuToggle = (categoryName, e) => {
    e.stopPropagation(); // Prevent event bubbling
    setOpenSubmenu(openSubmenu === categoryName ? null : categoryName);
  };

  // Close all menus
  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsCategoryOpen(false);
    setOpenSubmenu(null);
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
        setOpenSubmenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when clicking a link
  const handleMobileLinkClick = () => {
    setIsMenuOpen(false);
    setIsCategoryOpen(false);
    setOpenSubmenu(null);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2"
            onClick={closeAllMenus}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-gold to-bronze rounded-full flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <span className="text-2xl font-playfair font-bold text-gray-800">
                Luxury
              </span>
              <span className="text-2xl font-playfair font-bold text-gold">
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
                  `font-medium transition-colors py-2 ${
                    isActive
                      ? "text-gold border-b-2 border-gold"
                      : "text-gray-700 hover:text-gold"
                  }`
                }
                onClick={closeAllMenus}
              >
                {item.name}
              </NavLink>
            ))}

            {/* Category Dropdown */}
            <div className="relative" ref={categoryRef}>
              <button
                onClick={handleCategoryClick}
                className="flex items-center font-medium text-gray-700 hover:text-gold transition-colors py-2"
              >
                Category
                <ChevronDown
                  className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                    isCategoryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Category Dropdown Menu */}
              {isCategoryOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white shadow-xl rounded-lg border border-gray-100 z-50">
                  <div className="p-2">
                    {categories.map((category) => (
                      <div key={category.name} className="relative group">
                        <button
                          onClick={(e) => handleSubmenuToggle(category.name, e)}
                          className="flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-gray-50 transition text-left"
                        >
                          <span className="font-medium text-gray-700">
                            {category.name}
                          </span>
                          <ChevronRight
                            className={`w-4 h-4 transition-transform duration-200 ${
                              openSubmenu === category.name ? "rotate-90" : ""
                            }`}
                          />
                        </button>

                        {/* Submenu - Fixed position */}
                        {openSubmenu === category.name && (
                          <div className="absolute left-full top-0 ml-1 w-56 bg-white shadow-xl rounded-lg border border-gray-100 z-50">
                            <div className="p-3">
                              <div className="text-sm font-semibold text-gray-500 mb-2 px-2">
                                {category.name}
                              </div>
                              <div className="space-y-1">
                                {category.submenu.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    to={subItem.path}
                                    className="block px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gold transition"
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

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <div className="hidden md:block relative">
              <input
                type="text"
                placeholder="Search products..."
                className="px-4 py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent w-64"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>

            <Link
              to="/wishlist"
              className="relative group"
              onClick={closeAllMenus}
            >
              <Heart className="w-6 h-6 text-gray-700 group-hover:text-red-500 transition-colors" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Link>

            <Link to="/cart" className="relative group" onClick={closeAllMenus}>
              <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-gold transition-colors" />
              <span className="absolute -top-2 -right-2  text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems}
              </span>
            </Link>

            <Link to="/account" onClick={closeAllMenus}>
              <User className="w-6 h-6 text-gray-700 hover:text-gold transition-colors" />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700"
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
          <div className="lg:hidden py-4 border-t">
            <div className="space-y-1">
              {/* Main Menu Items */}
              {menuItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={handleMobileLinkClick}
                  className={({ isActive }) =>
                    `block py-3 px-4 font-medium rounded-lg ${
                      isActive
                        ? "text-gold bg-gold bg-opacity-10"
                        : "text-gray-700 hover:text-gold hover:bg-gray-50"
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
                  className="flex items-center justify-between w-full py-3 px-4 font-medium text-gray-700 hover:text-gold hover:bg-gray-50 rounded-lg"
                >
                  <span>Category</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isCategoryOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Mobile Category Menu */}
                {isCategoryOpen && (
                  <div className="pl-6 mt-1 space-y-1">
                    {categories.map((category) => (
                      <div key={category.name}>
                        <button
                          onClick={() => handleSubmenuToggle(category.name)}
                          className="flex items-center justify-between w-full py-2 px-3 text-gray-600 hover:text-gold rounded-lg"
                        >
                          <div className="flex items-center">
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
                          <div className="pl-6 mt-1 space-y-1">
                            {category.submenu.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.path}
                                onClick={handleMobileLinkClick}
                                className="block py-2 px-3 text-gray-500 hover:text-gold rounded-lg"
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
              <div className="relative mt-4 px-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <Search className="absolute left-8 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
