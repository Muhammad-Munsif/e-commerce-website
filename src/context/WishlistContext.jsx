import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-toastify';

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      if (state.items.some(item => item.id === action.payload.id)) {
        return state;
      }
      const newItems = [...state.items, action.payload];
      localStorage.setItem('wishlist', JSON.stringify(newItems));
      return { ...state, items: newItems };

    case 'REMOVE_FROM_WISHLIST':
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('wishlist', JSON.stringify(filteredItems));
      return { ...state, items: filteredItems };

    case 'LOAD_WISHLIST':
      return { ...state, items: action.payload };

    case 'CLEAR_WISHLIST':
      localStorage.removeItem('wishlist');
      return { ...state, items: [] };

    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      dispatch({ type: 'LOAD_WISHLIST', payload: JSON.parse(savedWishlist) });
    }
  }, []);

  const addToWishlist = (product) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    toast.success(`${product.name} added to wishlist!`);
  };

  const removeFromWishlist = (productId, productName) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
    toast.info(`${productName} removed from wishlist`);
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
    toast.info('Wishlist cleared');
  };

  const isInWishlist = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist: state,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);