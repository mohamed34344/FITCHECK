export const STATUS_STEPS = [
  { key: "placed", label: "Order Placed", icon: "bi-receipt" },
  { key: "processing", label: "Processing", icon: "bi-box-seam" },
  { key: "shipped", label: "Shipped", icon: "bi-truck" },
  { key: "out_for_delivery", label: "Out for Delivery", icon: "bi-geo-alt" },
  { key: "delivered", label: "Delivered", icon: "bi-check-circle" },
];

const STEP_MS = 60 * 1000; 

export const getOrderStatus = (order) => {
  if (order.cancelled) return { key: "cancelled", label: "Cancelled", index: -1 };
  const elapsed = Date.now() - new Date(order.createdAt).getTime();
  const index = Math.min(Math.floor(elapsed / STEP_MS), STATUS_STEPS.length - 1);
  return { ...STATUS_STEPS[index], index };
};

export const canCancel = (order) => {
  const s = getOrderStatus(order);
  return s.index === 0 || s.index === 1;
};

export const FREE_SHIPPING_OVER = 100;
export const SHIPPING_FEE = 10;

export const calcTotals = (subtotal) => {
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FEE;
  return { subtotal, shipping, total: subtotal + shipping };
};

export const money = (n) => `$${Number(n).toFixed(2)}`;
