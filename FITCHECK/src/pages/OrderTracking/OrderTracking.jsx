import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectOrders, cancelOrder } from "../../store/ordersSlice";
import OrderStatus, { StatusBadge } from "../../components/Order/OrderStatus";
import OrderSummary from "../../components/Order/OrderSummary";
import { canCancel } from "../../utils/orders";
import OrderHistory from "../../components/Order/OrderHistory";


function OrderTracking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const [query, setQuery] = useState(id || "");
  const [showHistory, setShowHistory] = useState(false);
  const order = id
    ? orders.find((o) => o.id === id.trim().toUpperCase())
    : null;
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/order-tracking/${query.trim().toUpperCase()}`);
    }
  };
  return (
    <div className="container py-5" style={{ maxWidth: "900px" }}>
      <h2 className="fw-bold mb-4">Track Your Order</h2>
      
      <form onSubmit={handleSearch} className="input-group mb-4">
        <input
          className="form-control"
          placeholder="Enter your order number (e.g. FC-XXXXXXXX)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary px-4" type="submit">
          Track
        </button>
      </form>
      {id && !order && (
        <div className="alert alert-warning">
          No order found with number <strong>{id}</strong>. Check the number and try again.
        </div>
      )}
      {order && (
        <>
          <div
            className="card border-0 shadow-sm p-4 mb-4"
            style={{ borderRadius: "15px" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <div className="fw-bold">Order {order.id}</div>
                <small className="text-muted">
                  Placed on {new Date(order.createdAt).toLocaleString()}
                </small>
              </div>
              <StatusBadge order={order} />
            </div>
            <OrderStatus order={order} />
            {canCancel(order) && (
              <button
                className="btn btn-outline-danger btn-sm mt-4 align-self-start"
                onClick={() =>
                  window.confirm("Cancel this order?") &&
                  dispatch(cancelOrder(order.id))
                }
              >
                Cancel order
              </button>
            )}
          </div>
          <OrderSummary items={order.items} />
          <button
            className="btn btn-outline-primary my-4 flex-end"
            onClick={() => setShowHistory(!showHistory)}
          >
            {showHistory ? "Hide Order History" : "View Order History"}
          </button>
        </>
      )}
      {showHistory && <OrderHistory orders={orders} />}
    </div>
  );
}
export default OrderTracking;

