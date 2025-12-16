import React from 'react';
import { Award, Users, Globe, Heart, Sparkles } from 'lucide-react';

const About = () => {
  const values = [
    { icon: <Award className="w-8 h-8" />, title: 'Quality First', description: 'Only premium materials and craftsmanship' },
    { icon: <Heart className="w-8 h-8" />, title: 'Customer Love', description: 'Your satisfaction is our priority' },
    { icon: <Sparkles className="w-8 h-8" />, title: 'Excellence', description: 'Striving for perfection in every detail' },
    { icon: <Globe className="w-8 h-8" />, title: 'Global Standards', description: 'World-class products and service' },
  ];

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">
            About <span className="text-gold">Luxury Haven</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Where elegance meets excellence. We curate the finest jewelry, wallets, and perfumes for the discerning customer.
          </p>
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-playfair font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2010, Luxury Haven began as a small boutique dedicated to bringing exceptional quality 
              jewelry to our community. What started with a passion for exquisite craftsmanship has grown into 
              a premier destination for luxury accessories.
            </p>
            <p className="text-gray-600 mb-4">
              Today, we've expanded our collection to include premium wallets and an exclusive line of perfumes, 
              each carefully selected to embody sophistication and quality.
            </p>
            <p className="text-gray-600">
              Every piece in our collection tells a story - of tradition, innovation, and timeless elegance.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
              alt="Our Store"
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-gold text-white p-6 rounded-lg shadow-xl">
              <div className="text-3xl font-bold">13+</div>
              <div className="text-sm">Years of Excellence</div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-playfair font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gold text-white rounded-full mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Collections */}
        <div className="bg-gradient-to-r from-gray-50 to-gold/10 rounded-2xl p-12">
          <h2 className="text-3xl font-playfair font-bold text-center mb-8">Our Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-gold mb-2">500+</div>
              <div className="text-xl font-semibold">Jewelry Pieces</div>
              <p className="text-gray-600 mt-2">Rings, pendants & more</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gold mb-2">200+</div>
              <div className="text-xl font-semibold">Wallets</div>
              <p className="text-gray-600 mt-2">Leather & designer</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gold mb-2">7</div>
              <div className="text-xl font-semibold">Perfume Scents</div>
              <p className="text-gray-600 mt-2">Exclusive collections</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

