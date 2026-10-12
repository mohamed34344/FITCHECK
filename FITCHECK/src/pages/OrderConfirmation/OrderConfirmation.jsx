import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectOrderById } from "../../store/ordersSlice";
import { clearCart } from "../../store/cartSlice";

function OrderConfirmation() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const order = useSelector(selectOrderById(id));

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  if (!order) {
    return (
      <div className="container py-5 text-center">
        <h2>Order not found</h2>
        <p className="text-muted">We couldn't find this order.</p>
        <Link to="/products" className="btn btn-primary rounded-5 mt-3">Back to shop</Link>
      </div>
    );
  }

   return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <div className="mb-3">
          <i className="bi bi-check-circle-fill text-success" style={{ fontSize: "70px" }}></i>
        </div>
        <h1 className="fw-bold">Order Confirmed! 🎉</h1>
        <p className="text-muted">Thank you for your order.</p>
        <p><strong>Order ID:</strong> {order.id}</p>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">

          <div className="card border-0 shadow-sm p-4" style={{ borderRadius: "15px" }}>
            <h4 className="fw-bold mb-4">Order Items</h4>

            {order.items.map((item) => (
              <div key={item.id} className="d-flex align-items-center gap-3 border-bottom py-3">
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />

                <div className="flex-grow-1">
                  <h6 className="fw-bold mb-1">{item.name}</h6>
                  <p className="text-muted mb-1">Quantity: {item.quantity}</p>
                  <p className="mb-0">${item.price}</p>
                </div>

                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4" style={{ borderRadius: "15px" }}>
            <h4 className="fw-bold mb-4">Order Summary</h4>
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>${order.totals.subtotal}</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>Shipping</span>
              <span>${order.totals.shipping}</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between mb-4">
              <strong>Total</strong>
              <strong>${order.totals.total}</strong>
            </div>

            <h6 className="fw-bold">Payment Method</h6>
            <p className="text-muted">{order.payment.method}</p>

            {order.payment.last4 && (
              <p className="text-muted">
                Card ending in ****{order.payment.last4}
              </p>
            )}

            <Link to={`/order-tracking/${order.id}`} className="btn btn-primary w-100 rounded-5 mb-2">Track Order</Link>
            <Link to="/products" className="btn btn-outline-secondary w-100 rounded-5">Continue Shopping</Link>
            
          </div>
        </div>
      </div>
    </div>
  );
}
export default OrderConfirmation;
