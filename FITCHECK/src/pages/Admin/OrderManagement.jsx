function OrderManagement({
    orders,
    handleShippingChange,
    handleCreateDemoOrder,
}) {
    return (
        <div className="card border-0 shadow-sm rounded-4 p-4">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-3">
                <h5 className="fw-bold mb-0">
                    Order & Shipping Management ({orders.length})
                </h5>

                <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={handleCreateDemoOrder}
                >
                    + Add Demo Order
                </button>
            </div>

            {orders.length === 0 ? (
                <p className="text-muted text-center py-4">
                    No orders placed yet. Click "+ Add Demo Order" to test
                    shipping management.
                </p>
            ) : (
                <div className="table-responsive">
                    <table className="table align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Date</th>
                                <th>Shipping Status</th>
                                <th>Update Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((o) => (
                                <tr key={o.id}>
                                    <td className="fw-bold">{o.id}</td>

                                    <td>
                                        {o.customer?.name ||
                                            o.customer?.email ||
                                            "Guest Customer"}
                                    </td>

                                    <td>{o.items?.length || 1} items</td>

                                    <td className="fw-bold">
                                        $
                                        {Number(
                                            o.totals?.total ||
                                                o.total ||
                                                0
                                        ).toFixed(2)}
                                    </td>

                                    <td className="small text-muted">
                                        {o.createdAt
                                            ? new Date(
                                                  o.createdAt
                                              ).toLocaleDateString()
                                            : "Today"}
                                    </td>

                                    <td>
                                        <span
                                            className={`badge ${
                                                o.cancelled
                                                    ? "bg-danger"
                                                    : o.shippingStatus ===
                                                      "Delivered"
                                                    ? "bg-success"
                                                    : "bg-primary"
                                            }`}
                                        >
                                            {o.cancelled
                                                ? "Cancelled"
                                                : o.shippingStatus ||
                                                  "Processing"}
                                        </span>
                                    </td>

                                    <td>
                                        <select
                                            className="form-select form-select-sm w-auto"
                                            value={
                                                o.cancelled
                                                    ? "Cancelled"
                                                    : o.shippingStatus ||
                                                      "Processing"
                                            }
                                            onChange={(e) =>
                                                handleShippingChange(
                                                    o.id,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="Pending">
                                                Pending
                                            </option>

                                            <option value="Processing">
                                                Processing
                                            </option>

                                            <option value="Shipped">
                                                Shipped
                                            </option>

                                            <option value="Delivered">
                                                Delivered
                                            </option>

                                            <option value="Cancelled">
                                                Cancelled
                                            </option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default OrderManagement;