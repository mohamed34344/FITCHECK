import { Link } from "react-router-dom";
import { StatusBadge } from "./OrderStatus";

function OrderHistory({ orders = [] }) {
    return (
        <>
            <h5 className="fw-bold my-3">Your recent orders</h5>

            {orders.length === 0 ? (
                <div className="alert alert-info">
                    You don't have any orders yet.
                </div>
            ) : (
                <div className="list-group">
                    {orders.map((o) => (
                        <Link
                            key={o.id}
                            to={`/order-tracking/${o.id}`}
                            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                        >
                            <div>
                                <div className="fw-semibold">{o.id}</div>

                                <small className="text-muted">
                                    {new Date(o.createdAt).toLocaleDateString()}
                                    {" - "}
                                    {o.items.length} item(s)
                                    {" - "}
                                    ${o.totals.total.toFixed(2)}
                                </small>
                            </div>

                            <StatusBadge order={o} />
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
}

export default OrderHistory;