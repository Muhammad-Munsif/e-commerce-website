import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, CreditCard } from 'lucide-react';

const Footer = () => {
  const categories = [
    { name: 'Rings', path: '/category/jewelry/rings' },
    { name: 'Pendants', path: '/category/jewelry/pendants' },
    { name: 'Leather Wallets', path: '/category/wallets/leather' },
    { name: 'Floral Perfumes', path: '/category/perfumes/floral' },
    { name: 'Designer Wallets', path: '/category/wallets/designer' },
    { name: 'Woody Perfumes', path: '/category/perfumes/woody' },
  ];

  const perfumes = [
    'Floral Scents', 'Woody Scents', 'Fresh Scents', 'Oriental Scents',
    'Citrus Scents', 'Gourmand Scents', 'Aquatic Scents'
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-gold to-bronze rounded-full flex items-center justify-center mr-3">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-playfair font-bold">Luxury</span>
                <span className="text-2xl font-playfair font-bold text-gold">Haven</span>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Premium jewelry, luxury wallets, and exquisite perfumes. Experience elegance redefined.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gold transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gold transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gold transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gold transition">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-800">Shop Categories</h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link to={category.path} className="text-gray-400 hover:text-gold transition">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Perfume Scents */}
          <div>
            <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-800">Perfume Scents</h3>
            <ul className="space-y-3">
              {perfumes.map((scent) => (
                <li key={scent}>
                  <Link to={`/category/perfumes/${scent.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-gold transition">
                    {scent}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-800">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-gold mr-3" />
                <div>
                  <p className="font-medium">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-400">Mon-Fri 9am-6pm</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gold mr-3" />
                <div>
                  <p className="font-medium">support@luxuryhaven.com</p>
                  <p className="text-sm text-gray-400">24/7 Support</p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-gold mr-3" />
                <div>
                  <p className="font-medium">123 Luxury Avenue</p>
                  <p className="text-sm text-gray-400">New York, NY 10001</p>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="font-semibold mb-3">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l-lg text-gray-900"
                />
                <button className="bg-gold px-4 py-2 rounded-r-lg hover:bg-yellow-600 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Luxury Haven. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white">Terms of Service</Link>
              <Link to="/shipping" className="hover:text-white">Shipping Policy</Link>
              <Link to="/returns" className="hover:text-white">Return Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
