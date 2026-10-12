function ProductManagement({
    products,
    editProdId,
    setEditProdId,
    newProdTitle,
    setNewProdTitle,
    newProdPrice,
    setNewProdPrice,
    newProdCategory,
    setNewProdCategory,
    newProdImage,
    setNewProdImage,
    handleSaveProduct,
    handleEditProductClick,
    handleDeleteProduct,
}) {
    return (
        <div className="row g-4">
            <div className="col-12 col-lg-4">
                <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                    <h5 className="fw-bold mb-3">
                        {editProdId !== null
                            ? "Edit Product"
                            : "Add New Product"}
                    </h5>

                    <form onSubmit={handleSaveProduct}>
                        <div className="mb-3">
                            <label className="form-label small fw-semibold">
                                Title *
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={newProdTitle}
                                onChange={(e) =>
                                    setNewProdTitle(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-semibold">
                                Price ($) *
                            </label>

                            <input
                                type="number"
                                step="0.01"
                                className="form-control"
                                value={newProdPrice}
                                onChange={(e) =>
                                    setNewProdPrice(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-semibold">
                                Category
                            </label>

                            <select
                                className="form-select"
                                value={newProdCategory}
                                onChange={(e) =>
                                    setNewProdCategory(e.target.value)
                                }
                            >
                                <option value="mens-shirts">
                                    Men's Fit
                                </option>

                                <option value="womens-dresses">
                                    Women's Fit
                                </option>

                                <option value="mens-shoes">
                                    Shoes
                                </option>

                                <option value="mens-watches">
                                    Watches
                                </option>

                                <option value="womens-bags">
                                    Bags
                                </option>

                                <option value="sunglasses">
                                    Accessories
                                </option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-semibold">
                                Image URL
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={newProdImage}
                                onChange={(e) =>
                                    setNewProdImage(e.target.value)
                                }
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                        >
                            {editProdId !== null
                                ? "Update Product"
                                : "Add Product"}
                        </button>

                        {editProdId !== null && (
                            <button
                                type="button"
                                className="btn btn-outline-secondary w-100 mt-2"
                                onClick={() => {
                                    setEditProdId(null);
                                    setNewProdTitle("");
                                    setNewProdPrice("");
                                    setNewProdImage("");
                                }}
                            >
                                Cancel Edit
                            </button>
                        )}
                    </form>
                </div>
            </div>

            <div className="col-12 col-lg-8">
                <div className="card border-0 shadow-sm rounded-4 p-4">
                    <h5 className="fw-bold mb-3">
                        Store Products ({products.length})
                    </h5>

                    <div
                        className="table-responsive"
                        style={{ maxHeight: "450px" }}
                    >
                        <table className="table align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>Product</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.map((p) => (
                                    <tr key={p.id}>
                                        <td>
                                            <div className="d-flex align-items-center gap-2">
                                                <img
                                                    src={
                                                        p.thumbnail ||
                                                        p.image
                                                    }
                                                    alt={p.title}
                                                    style={{
                                                        width: "40px",
                                                        height: "40px",
                                                        objectFit: "contain",
                                                    }}
                                                    className="border rounded p-1 bg-white"
                                                />

                                                <span className="small fw-semibold">
                                                    {p.title}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="small text-muted">
                                            {p.category}
                                        </td>

                                        <td className="fw-bold">
                                            ${p.price}
                                        </td>

                                        <td className="text-end">
                                            <button
                                                className="btn btn-outline-primary btn-sm me-2"
                                                onClick={() =>
                                                    handleEditProductClick(p)
                                                }
                                            >
                                                <i className="bi bi-pencil"></i>
                                            </button>

                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() =>
                                                    handleDeleteProduct(p.id)
                                                }
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductManagement;