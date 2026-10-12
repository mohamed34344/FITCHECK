import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { getCartKey } from "./cartSlice";
import ordersReducer, { ORDERS_KEY } from "./ordersSlice";
import wishlistReducer from "./wishlistSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    orders: ordersReducer,
    wishlist: wishlistReducer,
  },
});

store.subscribe(() => {
  try {
    const { cart, orders, wishlist } = store.getState();

    localStorage.setItem(getCartKey(cart.userEmail), JSON.stringify(cart.items));
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders.list));

    if (wishlist.userEmail) {
      localStorage.setItem(
        `fitcheck_wishlist_${wishlist.userEmail.toLowerCase()}`,
        JSON.stringify(wishlist.ids)
      );
    }
  } catch {}
});