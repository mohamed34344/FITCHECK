function CategoryManagement({
    categories,
    newCategory,
    setNewCategory,
    editCatIndex,
    setEditCatIndex,
    handleSaveCategory,
    handleDeleteCategory,
}) {
    return (
        <div className="row g-4">
            <div className="col-12 col-md-5">
                <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                    <h5 className="fw-bold mb-3">
                        {editCatIndex !== null
                            ? "Edit Category"
                            : "Add New Category"}
                    </h5>

                    <form onSubmit={handleSaveCategory}>
                        <div className="mb-3">
                            <label className="form-label small fw-semibold">
                                Category Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="e.g. Winter Collection"
                                value={newCategory}
                                onChange={(e) =>
                                    setNewCategory(e.target.value)
                                }
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                        >
                            {editCatIndex !== null
                                ? "Update Category"
                                : "Add Category"}
                        </button>
                    </form>
                </div>
            </div>

            <div className="col-12 col-md-7">
                <div className="card border-0 shadow-sm rounded-4 p-4">
                    <h5 className="fw-bold mb-3">
                        Available Categories ({categories.length})
                    </h5>

                    <ul className="list-group list-group-flush">
                        {categories.map((cat, index) => (
                            <li
                                key={index}
                                className="list-group-item d-flex justify-content-between align-items-center py-3"
                            >
                                <span className="fw-semibold">{cat}</span>

                                <div>
                                    <button
                                        className="btn btn-outline-primary btn-sm me-2"
                                        onClick={() => {
                                            setEditCatIndex(index);
                                            setNewCategory(cat);
                                        }}
                                    >
                                        <i className="bi bi-pencil"></i>
                                    </button>

                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() =>
                                            handleDeleteCategory(index)
                                        }
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CategoryManagement;