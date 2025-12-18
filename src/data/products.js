export const products = [
  {
    id: 1,
    name: "Diamond Solitaire Ring",
    price: 1999.99,
    discount: 20,
    category: "jewelry",
    subCategory: "rings",
    description: "A stunning solitaire diamond engagement ring featuring a brilliant 1-carat center stone set in 18K white gold.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop"
    ],
    rating: 4.9,
    reviews: 128,
    material: ["18K White Gold", "Diamond"],
    inStock: true,
    featured: true,
    tags: ["engagement", "diamond", "luxury"],
    specifications: {
      "Diamond Carat": "1.00 ct",
      "Metal": "18K White Gold",
      "Setting": "Prong",
      "Size": "4-9"
    }
  },
  {
    id: 2,
    name: "Premium Leather Wallet",
    price: 129.99,
    discount: 15,
    category: "wallets",
    subCategory: "leather",
    description: "Handcrafted genuine leather wallet with RFID protection and multiple card slots.",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=800&fit=crop"
    ],
    rating: 4.7,
    reviews: 89,
    material: ["Genuine Leather"],
    inStock: true,
    featured: true,
    tags: ["leather", "wallet", "premium"],
    specifications: {
      "Material": "Full-grain Leather",
      "Color": "Brown",
      "RFID Protection": "Yes",
      "Card Slots": "8"
    }
  },
  {
    id: 3,
    name: "Floral Eau de Parfum",
    price: 89.99,
    category: "perfumes",
    subCategory: "floral",
    description: "Elegant floral fragrance with notes of jasmine, rose, and vanilla.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop"
    ],
    rating: 4.8,
    reviews: 256,
    material: ["Glass", "Perfume"],
    inStock: true,
    featured: true,
    tags: ["floral", "perfume", "fragrance"],
    specifications: {
      "Volume": "100ml",
      "Fragrance Type": "Eau de Parfum",
      "Gender": "Unisex",
      "Longevity": "8-10 hours"
    }
  },
  // Add more products...
];

export const categories = [
  {
    id: "jewelry",
    name: "Jewelry",
    description: "Exquisite jewelry pieces crafted with precision",
    icon: "💎",
    subcategories: [
      { id: "rings", name: "Rings", count: 45 },
      { id: "pendants", name: "Pendants", count: 32 },
      { id: "necklaces", name: "Necklaces", count: 28 },
      { id: "bracelets", name: "Bracelets", count: 24 }
    ]
  },
  {
    id: "wallets",
    name: "Wallets",
    description: "Premium wallets for everyday elegance",
    icon: "👛",
    subcategories: [
      { id: "leather", name: "Leather Wallets", count: 38 },
      { id: "designer", name: "Designer Wallets", count: 22 },
      { id: "rfid", name: "RFID Wallets", count: 18 },
      { id: "card-holders", name: "Card Holders", count: 15 }
    ]
  },
  {
    id: "perfumes",
    name: "Perfumes",
    description: "Signature scents for every occasion",
    icon: "🌸",
    subcategories: [
      { id: "floral", name: "Floral Scents", count: 25 },
      { id: "woody", name: "Woody Scents", count: 18 },
      { id: "fresh", name: "Fresh Scents", count: 22 },
      { id: "oriental", name: "Oriental Scents", count: 16 }
    ]
  }
];