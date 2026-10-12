import { createSlice, current } from "@reduxjs/toolkit";

const GUEST_KEY = "fitcheck_cart";

const normalize = (email) => (email ? email.toLowerCase() : null);

export const getCartKey = (email) =>
  email ? `${GUEST_KEY}_${normalize(email)}` : GUEST_KEY;

const readItems = (key) => {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
};

const getActiveEmail = () => {
  try {
    return normalize(JSON.parse(localStorage.getItem("active_user"))?.email);
  } catch {
    return null;
  }
};

const initialEmail = getActiveEmail();

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: readItems(getCartKey(initialEmail)), userEmail: initialEmail },
  reducers: {
    setCartUser(state, { payload }) {
      const email = normalize(payload);
      if (email === state.userEmail) return;

      const next = readItems(getCartKey(email));

      if (email && state.userEmail === null) {
        for (const g of current(state.items)) {
          const ex = next.find((i) => i.id === g.id);
          if (ex) ex.quantity = Math.min(ex.quantity + g.quantity, ex.stock);
          else next.push(g);
        }
        localStorage.removeItem(GUEST_KEY);
      }

      state.userEmail = email;
      state.items = next;
    },
    // payload: { product, quantity? }
    addToCart(state, { payload }) {
      const { product, quantity = 1 } = payload;
      const stock = product.quantity ?? 99;
      const existing = state.items.find((i) => i.id === product.id);
      if (existing) {
        existing.quantity = Math.min(existing.quantity + quantity, stock);
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.imageCover || product.images?.[0],
          stock,
          quantity: Math.min(quantity, stock),
        });
      }
    },
    removeFromCart(state, { payload: id }) {
      state.items = state.items.filter((i) => i.id !== id);
    },
    // payload: { id, quantity }
    setQuantity(state, { payload }) {
      const item = state.items.find((i) => i.id === payload.id);
      if (!item) return;
      item.quantity = Math.max(1, Math.min(payload.quantity, item.stock));
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { setCartUser, addToCart, removeFromCart, setQuantity, clearCart } = cartSlice.actions;

export const selectCartItems = (s) => s.cart.items;
export const selectCartCount = (s) => s.cart.items.reduce((n, i) => n + i.quantity, 0);
export const selectCartSubtotal = (s) =>
  s.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

export const CART_KEY = GUEST_KEY;
export default cartSlice.reducer;