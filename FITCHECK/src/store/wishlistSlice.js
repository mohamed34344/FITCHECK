import { createSlice } from "@reduxjs/toolkit";

export const WISHLIST_KEY = "fitcheck_wishlist";

const getUserKey = (email) => {
  return `${WISHLIST_KEY}_${email.toLowerCase()}`;
};

const loadWishlist = (email) => {
  if (!email) return [];

  try {
    return JSON.parse(localStorage.getItem(getUserKey(email))) || [];
  } catch {
    return [];
  }
};

const wishlistSlice = createSlice({
  name: "wishlist",
  
  initialState: {
    ids: [],
    userEmail: null,
  },

  reducers: {
    setWishlistUser(state, { payload: email }) {
      state.userEmail = email || null;
      state.ids = loadWishlist(email);
    },

    toggleWishlist(state, { payload: id }) {
      state.ids = state.ids.includes(id)
        ? state.ids.filter((i) => i !== id)
        : [...state.ids, id];
    },
  },
});

export const {
  setWishlistUser,
  toggleWishlist,
} = wishlistSlice.actions;

export const selectWishlistIds = (s) => s.wishlist.ids;

export const selectWishlistCount = (s) => s.wishlist.ids.length;

export const getWishlistStorageKey = getUserKey;

export default wishlistSlice.reducer;