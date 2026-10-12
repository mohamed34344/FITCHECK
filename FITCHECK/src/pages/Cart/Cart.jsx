import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, removeFromCart, setQuantity, clearCart } from "../../store/cartSlice";
import OrderSummary from "../../components/Order/OrderSummary";
import { money } from "../../utils/orders";

function Cart() {
  const items = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <i className="bi bi-cart-x display-1 text-muted"></i>
        <h2 className="mt-3">Your cart is empty</h2>
        <p className="text-muted">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="btn btn-primary rounded-5 px-4">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Shopping Cart</h2>
        <button className="btn btn-link text-danger" onClick={() => dispatch(clearCart())}>Clear cart</button>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          {items.map((item) => (
            <div key={item.id} className="card border-0 shadow-sm mb-3 p-3" style={{ borderRadius: "15px" }}>
              <div className="d-flex flex-wrap align-items-center gap-3">
                <img src={item.image} alt={item.title} width="90" height="90" style={{ objectFit: "contain" }} />

                <div className="flex-grow-1">
                  <Link to={`/products/${item.id}`} className="text-decoration-none text-dark fw-semibold">{item.title}</Link>
                  <div className="text-muted">{money(item.price)}</div>
                </div>

                {/* Quantity */}
                <div className="input-group" style={{ width: "130px" }}>
                  <button className="btn btn-outline-secondary" disabled={item.quantity <= 1}
                    onClick={() => dispatch(setQuantity({ id: item.id, quantity: item.quantity - 1 }))}>
                    <i className="bi bi-dash"></i>
                  </button>
                  <span className="form-control text-center">{item.quantity}</span>
                  <button className="btn btn-outline-secondary" disabled={item.quantity >= item.stock}
                    onClick={() => dispatch(setQuantity({ id: item.id, quantity: item.quantity + 1 }))}>
                    <i className="bi bi-plus"></i>
                  </button>
                </div>

                <div className="fw-bold" style={{ minWidth: "80px", textAlign: "right" }}>
                  {money(item.price * item.quantity)}
                </div>

                {/* Remove */}
                <button className="btn btn-outline-danger btn-sm" onClick={() => dispatch(removeFromCart(item.id))} aria-label="Remove">
                  <i className="bi bi-trash"></i>
                </button>
              </div>
              {item.quantity >= item.stock && <small className="text-warning mt-2">Maximum available quantity reached</small>}
            </div>
          ))}
          <Link to="/products" className="text-decoration-none"><i className="bi bi-arrow-left me-1"></i>Continue shopping</Link>
        </div>

        <div className="col-lg-4">
          <OrderSummary items={items} showItems={false}>
            <button className="btn btn-primary w-100 rounded-5" onClick={() => navigate("/checkout")}>
              Proceed to Checkout
            </button>
          </OrderSummary>
        </div>
      </div>
    </div>
  );
}
export default Cart;
