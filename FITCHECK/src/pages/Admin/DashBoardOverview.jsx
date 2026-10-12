function DashboardOverview({ users, products, orders, totalRevenue }) {
    return (
        <div className="row g-4">
            <div className="col-12 col-sm-6 col-lg-3">
                <div className="card border-0 shadow-sm rounded-4 p-4 text-center h-100">
                    <i className="bi bi-people-fill text-primary fs-1 mb-2"></i>
                    <h6 className="text-muted">Total Users</h6>
                    <h3 className="fw-bold">{users.length}</h3>
                </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
                <div className="card border-0 shadow-sm rounded-4 p-4 text-center h-100">
                    <i className="bi bi-box-seam-fill text-primary fs-1 mb-2"></i>
                    <h6 className="text-muted">Total Products</h6>
                    <h3 className="fw-bold">{products.length}</h3>
                </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
                <div className="card border-0 shadow-sm rounded-4 p-4 text-center h-100">
                    <i className="bi bi-bag-check-fill text-primary fs-1 mb-2"></i>
                    <h6 className="text-muted">Total Orders</h6>
                    <h3 className="fw-bold">{orders.length}</h3>
                </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
                <div className="card border-0 shadow-sm rounded-4 p-4 text-center h-100">
                    <i className="bi bi-currency-dollar text-primary fs-1 mb-2"></i>
                    <h6 className="text-muted">Total Revenue</h6>
                    <h3 className="fw-bold">
                        ${totalRevenue.toFixed(2)}
                    </h3>
                </div>
            </div>
        </div>
    );
}

export default DashboardOverview;