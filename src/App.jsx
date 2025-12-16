import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Shop from './pages/Shop';
import Categories from './pages/Categories';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/category/:category" element={<Categories/>} />
            <Route path="/category/:category/:subcategory" element={<Categories />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            
            {/* 404 Page */}
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-playfair font-bold mb-4">404 - Page Not Found</h1>
                  <p className="text-gray-600">The page you are looking for doesn't exist.</p>
                </div>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

