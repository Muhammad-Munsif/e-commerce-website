import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'

const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  } catch (error) {
    console.error('Error loading cart from storage:', error)
    return []
  }
}

const initialState = {
  items: loadCartFromStorage(),
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.uid === action.payload.uid)
      
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1
        toast.success(`Updated quantity for ${action.payload.name}`)
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1
        })
        toast.success(`${action.payload.name} added to cart!`)
      }
      
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.uid !== action.payload)
      localStorage.setItem('cart', JSON.stringify(state.items))
      toast.success('Item removed from cart')
    },
    
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item.uid === action.payload.id)
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity)
        localStorage.setItem('cart', JSON.stringify(state.items))
      }
    },
    
    clearCart: (state) => {
      state.items = []
      localStorage.removeItem('cart')
      toast.success('Cart cleared')
    },
    
    incrementQuantity: (state, action) => {
      const item = state.items.find(item => item.uid === action.payload)
      if (item) {
        item.quantity += 1
        localStorage.setItem('cart', JSON.stringify(state.items))
      }
    },
    
    decrementQuantity: (state, action) => {
      const item = state.items.find(item => item.uid === action.payload)
      if (item && item.quantity > 1) {
        item.quantity -= 1
        localStorage.setItem('cart', JSON.stringify(state.items))
      }
    },
  },
})

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart,
  incrementQuantity,
  decrementQuantity 
} = cartSlice.actions

export const selectCartItems = (state) => state.cart.items
export const selectCartCount = (state) => 
  state.cart.items.reduce((count, item) => count + item.quantity, 0)
export const selectCartTotal = (state) => 
  state.cart.items.reduce((total, item) => {
    const price = item.discount ? item.price * (1 - item.discount / 100) : item.price
    return total + (price * item.quantity)
  }, 0)

export default cartSlice.reducer




// import { createSlice } from '@reduxjs/toolkit';
// import { toast } from 'react-hot-toast';

// const loadCartFromStorage = () => {
//   try {
//     const savedCart = localStorage.getItem('cart');
//     return savedCart ? JSON.parse(savedCart) : [];
//   } catch (error) {
//     console.error('Error loading cart from storage:', error);
//     return [];
//   }
// };

// const initialState = {
//   items: loadCartFromStorage(),
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const existingItem = state.items.find(item => item.uid === action.payload.uid);
      
//       if (existingItem) {
//         existingItem.quantity += action.payload.quantity || 1;
//         toast.success(`Updated quantity for ${action.payload.name}`);
//       } else {
//         state.items.push({
//           ...action.payload,
//           quantity: action.payload.quantity || 1
//         });
//         toast.success(`${action.payload.name} added to cart!`);
//       }
      
//       localStorage.setItem('cart', JSON.stringify(state.items));
//     },
    
//     removeFromCart: (state, action) => {
//       state.items = state.items.filter(item => item.uid !== action.payload);
//       localStorage.setItem('cart', JSON.stringify(state.items));
//       toast.success('Item removed from cart');
//     },
    
//     updateQuantity: (state, action) => {
//       const item = state.items.find(item => item.uid === action.payload.id);
//       if (item) {
//         item.quantity = Math.max(1, action.payload.quantity);
//         localStorage.setItem('cart', JSON.stringify(state.items));
//       }
//     },
    
//     clearCart: (state) => {
//       state.items = [];
//       localStorage.removeItem('cart');
//       toast.success('Cart cleared');
//     },
    
//     incrementQuantity: (state, action) => {
//       const item = state.items.find(item => item.uid === action.payload);
//       if (item) {
//         item.quantity += 1;
//         localStorage.setItem('cart', JSON.stringify(state.items));
//       }
//     },
    
//     decrementQuantity: (state, action) => {
//       const item = state.items.find(item => item.uid === action.payload);
//       if (item && item.quantity > 1) {
//         item.quantity -= 1;
//         localStorage.setItem('cart', JSON.stringify(state.items));
//       }
//     },
//   },
// });

// export const { 
//   addToCart, 
//   removeFromCart, 
//   updateQuantity, 
//   clearCart,
//   incrementQuantity,
//   decrementQuantity 
// } = cartSlice.actions;

// export const selectCartItems = (state) => state.cart.items;
// export const selectCartCount = (state) => 
//   state.cart.items.reduce((count, item) => count + item.quantity, 0);
// export const selectCartTotal = (state) => 
//   state.cart.items.reduce((total, item) => {
//     const price = item.discount ? item.price * (1 - item.discount / 100) : item.price;
//     return total + (price * item.quantity);
//   }, 0);

// export default cartSlice.reducer;