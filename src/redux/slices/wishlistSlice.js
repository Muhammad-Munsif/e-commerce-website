// import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-hot-toast";

// const loadWishlistFromStorage = () => {
//   try {
//     const savedWishlist = localStorage.getItem("wishlist");
//     return savedWishlist ? JSON.parse(savedWishlist) : [];
//   } catch (error) {
//     console.error("Error loading wishlist from storage:", error);
//     return [];
//   }
// };

// const initialState = {
//   items: loadWishlistFromStorage(),
// };

// const wishlistSlice = createSlice({
//   name: "wishlist",
//   initialState,
//   reducers: {
//     toggleWishlist: (state, action) => {
//       const exists = state.items.some(
//         (item) => item.uid === action.payload.uid
//       );

//       if (exists) {
//         state.items = state.items.filter(
//           (item) => item.uid !== action.payload.uid
//         );
//         toast.success(`${action.payload.name} removed from wishlist`);
//       } else {
//         state.items.push(action.payload);
//         toast.success(`${action.payload.name} added to wishlist!`);
//       }

//       localStorage.setItem("wishlist", JSON.stringify(state.items));
//     },

//     removeFromWishlist: (state, action) => {
//       state.items = state.items.filter((item) => item.uid !== action.payload);
//       localStorage.setItem("wishlist", JSON.stringify(state.items));
//     },

//     clearWishlist: (state) => {
//       state.items = [];
//       localStorage.removeItem("wishlist");
//       toast.success("Wishlist cleared");
//     },
//   },
// });

// export const { toggleWishlist, removeFromWishlist, clearWishlist } =
//   wishlistSlice.actions;

// export const selectWishlistItems = (state) => state.wishlist.items;
// export const selectIsInWishlist = (state, productId) =>
//   state.wishlist.items.some((item) => item.uid === productId);

// export default wishlistSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const loadWishlistFromStorage = () => {
  try {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  } catch (error) {
    console.error("Error loading wishlist from storage:", error);
    return [];
  }
};

const initialState = {
  items: loadWishlistFromStorage(),
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const exists = state.items.some(
        (item) => item.uid === action.payload.uid
      );

      if (exists) {
        state.items = state.items.filter(
          (item) => item.uid !== action.payload.uid
        );
        toast.success(`${action.payload.name} removed from wishlist`);
      } else {
        state.items.push(action.payload);
        toast.success(`${action.payload.name} added to wishlist!`);
      }

      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },

    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.uid !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.items));
      toast.success("Item removed from wishlist");
    },

    clearWishlist: (state) => {
      state.items = [];
      localStorage.removeItem("wishlist");
      toast.success("Wishlist cleared");
    },
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export const selectWishlistItems = (state) => state.wishlist.items;
export const selectIsInWishlist = (state, productId) =>
  state.wishlist.items.some((item) => item.uid === productId);

export default wishlistSlice.reducer;
