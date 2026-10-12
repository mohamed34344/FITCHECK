import { createSlice } from "@reduxjs/toolkit";

const KEY = "fitcheck_orders";

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
};

const ordersSlice = createSlice({
  name: "orders",
  initialState: { list: load() },
  reducers: {
    placeOrder: {
      prepare(order) {
        const id = `FC-${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random() * 90 + 10)}`;

        return {
          payload: {
            ...order,
            id,
            createdAt: new Date().toISOString(),
            cancelled: false,
          },
        };
      },

      reducer(state, { payload }) {
        state.list.unshift(payload);
        localStorage.setItem(KEY, JSON.stringify(state.list));
      },
    },

    cancelOrder(state, { payload: id }) {
      const order = state.list.find((o) => o.id === id);

      if (order) {
        order.cancelled = true;
        localStorage.setItem(KEY, JSON.stringify(state.list));
      }
    },

    updateShippingStatus(state, { payload }) {
      const { id, status } = payload;

      const order = state.list.find((o) => o.id === id);

      if (order) {
        order.shippingStatus = status;
        order.cancelled = status === "Cancelled";

        localStorage.setItem(KEY, JSON.stringify(state.list));
      }
    },
  },
});

export const {
  placeOrder,
  cancelOrder,
  updateShippingStatus,
} = ordersSlice.actions;

export const selectOrders = (s) => s.orders.list;

export const selectOrderById = (id) => (s) =>
  s.orders.list.find((o) => o.id === id);

export const ORDERS_KEY = KEY;

export default ordersSlice.reducer;