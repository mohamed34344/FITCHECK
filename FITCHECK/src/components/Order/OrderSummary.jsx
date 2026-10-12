import { calcTotals, money, FREE_SHIPPING_OVER } from "../../utils/orders";

// items: [{id,title,price,image,quantity}]
function OrderSummary({ items, showItems = true, children }) {
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const { shipping, total } = calcTotals(subtotal);

  return (
    <div className="card shadow-sm border-0 p-3" style={{ borderRadius: "15px" }}>
      <h5 className="fw-bold mb-3">Order Summary</h5>

      {showItems && (
        <ul className="list-unstyled mb-3">
          {items.map((i) => (
            <li key={i.id} className="d-flex align-items-center gap-2 mb-2">
              <img src={i.image} alt={i.title} width="48" height="48" style={{ objectFit: "contain" }} />
              <div className="flex-grow-1 small">
                <div className="text-truncate" style={{ maxWidth: "170px" }}>{i.title}</div>
                <span className="text-muted">Qty {i.quantity}</span>
              </div>
              <span className="small fw-semibold">{money(i.price * i.quantity)}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="d-flex justify-content-between mb-1">
        <span>Subtotal</span><span>{money(subtotal)}</span>
      </div>
      <div className="d-flex justify-content-between mb-1">
        <span>Shipping</span>
        <span>{shipping === 0 ? "Free" : money(shipping)}</span>
      </div>
      {shipping > 0 && (
        <small className="text-muted">Free shipping on orders over ${FREE_SHIPPING_OVER}</small>
      )}
      <hr />
      <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
        <span>Total</span><span>{money(total)}</span>
      </div>
      {children}
    </div>
  );
}
export default OrderSummary;
