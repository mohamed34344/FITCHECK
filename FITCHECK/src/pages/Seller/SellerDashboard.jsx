import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getProducts } from "../../api/api";
import { allowedCategories } from "../../utils/categories";

function SellerDashboard() {
    const { user, login } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState("products");

    const [products, setProducts] = useState([]);

    const [editingId, setEditingId] = useState(null);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("mens-shirts");
    const [image, setImage] = useState("");
    const [stock, setStock] = useState(10);
    const [description, setDescription] = useState("");

    const [sellerName, setSellerName] = useState(user?.name || "");
    const [storeName, setStoreName] = useState(user?.storeName || `${user?.name || "My"} Store`);
    const [phone, setPhone] = useState(user?.phone || "");
    const [storeDesc, setStoreDesc] = useState(user?.storeDescription || "");
    const [profileMsg, setProfileMsg] = useState("");

    useEffect(() => {
        if (user) {
            setSellerName(user.name || "");
            setStoreName(user.storeName || `${user.name || "My"} Store`);
            setPhone(user.phone || "");
            setStoreDesc(user.storeDescription || "");
        }
    }, [user]);

    useEffect(() => {
        const customProds = JSON.parse(localStorage.getItem("fitcheck_custom_products")) || [];
        const editedProds = JSON.parse(localStorage.getItem("fitcheck_edited_products")) || {};
        const deletedIds = JSON.parse(localStorage.getItem("fitcheck_deleted_products")) || [];

        getProducts()
            .then((apiProds) => {
                const storeProds = apiProds.filter((p) =>
                    allowedCategories.includes(p.category)
                );

                const merged = [...customProds, ...storeProds]
                    .filter((p) => !deletedIds.includes(p.id))
                    .map((p) => (editedProds[p.id] ? { ...p, ...editedProds[p.id] } : p));

                setProducts(merged);
            })
            .catch(() => {
                setProducts(customProds);
            });
    }, []);

    const defaultImg =
        "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/2.webp";

    const handleSaveProduct = (e) => {
        e.preventDefault();
        if (!title || !price) return;

        const finalImg = image || defaultImg;
        const customProds = JSON.parse(localStorage.getItem("fitcheck_custom_products")) || [];
        const editedProds = JSON.parse(localStorage.getItem("fitcheck_edited_products")) || {};

        if (editingId) {
            const updatedData = {
                title: title,
                price: Number(price),
                category: category,
                image: finalImg,
                thumbnail: finalImg,
                stock: Number(stock),
                description: description,
            };

            const updatedList = products.map((item) =>
                item.id === editingId ? { ...item, ...updatedData } : item
            );
            setProducts(updatedList);

            editedProds[editingId] = updatedData;
            localStorage.setItem("fitcheck_edited_products", JSON.stringify(editedProds));

            const updatedCustom = customProds.map((item) =>
                item.id === editingId ? { ...item, ...updatedData } : item
            );
            localStorage.setItem("fitcheck_custom_products", JSON.stringify(updatedCustom));

            setEditingId(null);
        } else {
            const newProduct = {
                id: Date.now(),
                title: title,
                price: Number(price),
                category: category,
                image: finalImg,
                thumbnail: finalImg,
                stock: Number(stock),
                description: description,
                sellerEmail: user?.email,
            };

            setProducts([newProduct, ...products]);
            localStorage.setItem(
                "fitcheck_custom_products",
                JSON.stringify([newProduct, ...customProds])
            );
        }

        setTitle("");
        setPrice("");
        setImage("");
        setStock(10);
        setDescription("");
    };

    const handleEditClick = (product) => {
        setEditingId(product.id);
        setTitle(product.title);
        setPrice(product.price);
        setCategory(product.category);
        setImage(product.thumbnail || product.image || "");
        setStock(product.stock || 0);
        setDescription(product.description || "");
    };

    const handleDeleteProduct = (id) => {
        setProducts(products.filter((item) => item.id !== id));

        const customProds = JSON.parse(localStorage.getItem("fitcheck_custom_products")) || [];
        localStorage.setItem(
            "fitcheck_custom_products",
            JSON.stringify(customProds.filter((item) => item.id !== id))
        );

        const deletedIds = JSON.parse(localStorage.getItem("fitcheck_deleted_products")) || [];
        localStorage.setItem(
            "fitcheck_deleted_products",
            JSON.stringify([...deletedIds, id])
        );
    };

    const updateStock = (id, newStock) => {
        if (newStock < 0) return;
        const stockNum = Number(newStock);

        setProducts(
            products.map((item) =>
                item.id === id ? { ...item, stock: stockNum } : item
            )
        );

        const editedProds = JSON.parse(localStorage.getItem("fitcheck_edited_products")) || {};
        editedProds[id] = { ...(editedProds[id] || {}), stock: stockNum };
        localStorage.setItem("fitcheck_edited_products", JSON.stringify(editedProds));

        const customProds = JSON.parse(localStorage.getItem("fitcheck_custom_products")) || [];
        const updatedCustom = customProds.map((item) =>
            item.id === id ? { ...item, stock: stockNum } : item
        );
        localStorage.setItem("fitcheck_custom_products", JSON.stringify(updatedCustom));
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        const updatedUser = {
            ...user,
            name: sellerName,
            storeName: storeName,
            phone: phone,
            storeDescription: storeDesc,
            role: "seller",
        };
        login(updatedUser);
        setProfileMsg("Seller profile updated successfully!");
        setTimeout(() => setProfileMsg(""), 3000);
    };

    const totalStockCount = products.reduce((sum, item) => sum + Number(item.stock || 0), 0);
    const lowStockCount = products.filter((item) => item.stock > 0 && item.stock <= 5).length;
    const outOfStockCount = products.filter((item) => Number(item.stock) === 0).length;

    const currentRole = (user?.role || "customer").toLowerCase();
    if (currentRole !== "seller" && currentRole !== "admin") {
        return (
            <div className="container py-5 text-center">
                <div
                    className="card border-0 shadow-sm rounded-4 p-5 mx-auto"
                    style={{ maxWidth: "500px" }}
                >
                    <i className="bi bi-shield-exclamation text-danger display-4 mb-3"></i>
                    <h4 className="fw-bold">Seller Access Only</h4>
                    <p className="text-muted small mb-4">
                        Your current account role is <strong>{user?.role || "Customer"}</strong>. Customers are not allowed to manage products or inventory.
                    </p>
                    <a href="/seller-register" className="btn btn-primary w-100">
                        Register as a Seller
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            {/* Header */}
            <div className="d-flex flex-wrap align-items-center justify-content-between bg-primary text-white p-4 rounded-4 shadow-sm mb-4">
                <div>
                    <h3 className="fw-bold mb-1">
                        <i className="bi bi-shop me-2"></i>
                        {storeName}
                    </h3>
                    <p className="text-white-50 small mb-0">
                        Seller: {user?.name || "Seller"} ({user?.email})
                    </p>
                </div>

                <div className="d-flex flex-wrap gap-2 mt-3 mt-md-0">
                    <button
                        className={`btn btn-sm ${activeTab === "products"
                            ? "btn-light text-primary fw-bold"
                            : "btn-outline-light"
                            }`}
                        onClick={() => setActiveTab("products")}
                    >
                        <i className="bi bi-box-seam me-1"></i> Add / Manage Products
                    </button>

                    <button
                        className={`btn btn-sm ${activeTab === "inventory"
                            ? "btn-light text-primary fw-bold"
                            : "btn-outline-light"
                            }`}
                        onClick={() => setActiveTab("inventory")}
                    >
                        <i className="bi bi-clipboard-data me-1"></i> Inventory
                    </button>

                    <button
                        className={`btn btn-sm ${activeTab === "profile"
                            ? "btn-light text-primary fw-bold"
                            : "btn-outline-light"
                            }`}
                        onClick={() => setActiveTab("profile")}
                    >
                        <i className="bi bi-person-badge me-1"></i> Seller Profile
                    </button>
                </div>
            </div>

            {/* TAB 1: ADD / EDIT / DELETE PRODUCTS */}
            {activeTab === "products" && (
                <div className="row g-4">
                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm rounded-4 p-4">
                            <h5 className="fw-bold mb-3">
                                {editingId ? "Edit Product" : "Add New Product"}
                            </h5>

                            <form onSubmit={handleSaveProduct}>
                                <div className="mb-3">
                                    <label className="form-label small fw-semibold">Product Title *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Product name"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="row">
                                    <div className="col-6 mb-3">
                                        <label className="form-label small fw-semibold">Price ($) *</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="form-control"
                                            placeholder="49.99"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="col-6 mb-3">
                                        <label className="form-label small fw-semibold">Stock *</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={stock}
                                            onChange={(e) => setStock(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label small fw-semibold">Category</label>
                                    <select
                                        className="form-select"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option value="mens-shirts">Men's Fit</option>
                                        <option value="womens-dresses">Women's Fit</option>
                                        <option value="mens-shoes">Shoes</option>
                                        <option value="mens-watches">Watches</option>
                                        <option value="womens-bags">Bags</option>
                                        <option value="sunglasses">Accessories</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label small fw-semibold">Image URL</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="https://..."
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label small fw-semibold">Description</label>
                                    <textarea
                                        className="form-control"
                                        rows="2"
                                        placeholder="Product details..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary w-100">
                                    {editingId ? "Update Product" : "Add Product"}
                                </button>

                                {editingId && (
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary w-100 mt-2"
                                        onClick={() => {
                                            setEditingId(null);
                                            setTitle("");
                                            setPrice("");
                                            setImage("");
                                            setDescription("");
                                        }}
                                    >
                                        Cancel Edit
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>

                    <div className="col-lg-8">
                        <div className="card border-0 shadow-sm rounded-4 p-4">
                            <h5 className="fw-bold mb-3">Store Products ({products.length})</h5>

                            <div className="table-responsive" style={{ maxHeight: "500px" }}>
                                <table className="table align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Product</th>
                                            <th>Category</th>
                                            <th>Price</th>
                                            <th>Stock</th>
                                            <th className="text-end">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((item) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <img
                                                            src={item.thumbnail || item.image}
                                                            alt={item.title}
                                                            style={{
                                                                width: "45px",
                                                                height: "45px",
                                                                objectFit: "contain",
                                                            }}
                                                            className="border rounded p-1 bg-white"
                                                        />
                                                        <span className="fw-semibold small">{item.title}</span>
                                                    </div>
                                                </td>
                                                <td className="small text-muted">{item.category}</td>
                                                <td className="fw-bold">${item.price}</td>
                                                <td>
                                                    <span className="badge bg-primary">{item.stock}</span>
                                                </td>
                                                <td className="text-end">
                                                    <button
                                                        className="btn btn-outline-primary btn-sm me-2"
                                                        onClick={() => handleEditClick(item)}
                                                    >
                                                        <i className="bi bi-pencil"></i>
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-danger btn-sm"
                                                        onClick={() => handleDeleteProduct(item.id)}
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
            )}

            {/* TAB 2: INVENTORY */}
            {activeTab === "inventory" && (
                <>
                    <div className="row g-3 mb-4">
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm rounded-4 p-3 text-center">
                                <h6 className="text-muted small mb-1">Total Units in Stock</h6>
                                <h3 className="fw-bold text-primary mb-0">{totalStockCount} pcs</h3>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm rounded-4 p-3 text-center">
                                <h6 className="text-muted small mb-1">Low Stock Alert (&le; 5)</h6>
                                <h3 className="fw-bold text-warning mb-0">{lowStockCount} Products</h3>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm rounded-4 p-3 text-center">
                                <h6 className="text-muted small mb-1">Out of Stock (0)</h6>
                                <h3 className="fw-bold text-danger mb-0">{outOfStockCount} Products</h3>
                            </div>
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm rounded-4 p-4">
                        <h5 className="fw-bold mb-3">Inventory & Stock Management ({products.length})</h5>
                        <div className="table-responsive" style={{ maxHeight: "500px" }}>
                            <table className="table align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>Product</th>
                                        <th>Current Stock</th>
                                        <th>Status</th>
                                        <th>Adjust Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((item) => (
                                        <tr key={item.id}>
                                            <td className="fw-semibold">{item.title}</td>
                                            <td className="fw-bold">{item.stock} pcs</td>
                                            <td>
                                                {Number(item.stock) === 0 ? (
                                                    <span className="badge bg-danger">Out of Stock</span>
                                                ) : item.stock <= 5 ? (
                                                    <span className="badge bg-warning text-dark">Low Stock</span>
                                                ) : (
                                                    <span className="badge bg-success">In Stock</span>
                                                )}
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center gap-2">
                                                    <button
                                                        className="btn btn-outline-primary btn-sm"
                                                        onClick={() => updateStock(item.id, item.stock - 1)}
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="number"
                                                        className="form-control form-control-sm text-center"
                                                        style={{ width: "70px" }}
                                                        value={item.stock}
                                                        onChange={(e) => updateStock(item.id, e.target.value)}
                                                    />
                                                    <button
                                                        className="btn btn-primary btn-sm"
                                                        onClick={() => updateStock(item.id, Number(item.stock) + 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            {/* TAB 3: SELLER PROFILE */}
            {activeTab === "profile" && (
                <div className="row g-4">
                    <div className="col-md-5">
                        <div className="card border-0 shadow-sm rounded-4 p-4 text-center">
                            <div
                                className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-3 fw-bold fs-3"
                                style={{ width: "70px", height: "70px" }}
                            >
                                {storeName ? storeName.charAt(0).toUpperCase() : "S"}
                            </div>
                            <h5 className="fw-bold mb-1">{storeName}</h5>
                            <p className="text-muted small mb-3">
                                {storeDesc || "No description added yet."}
                            </p>
                            <hr />
                            <div className="text-start small">
                                <p className="mb-2">
                                    <strong>Seller Name:</strong> {sellerName || user?.name}
                                </p>
                                <p className="mb-2">
                                    <strong>Email:</strong> {user?.email}
                                </p>
                                <p className="mb-2">
                                    <strong>Phone:</strong> {phone || "Not set"}
                                </p>
                                <p className="mb-0">
                                    <strong>Total Store Products:</strong> {products.length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-7">
                        <div className="card border-0 shadow-sm rounded-4 p-4">
                            <h5 className="fw-bold mb-3">Edit Seller Profile</h5>
                            {profileMsg && (
                                <div className="alert alert-success py-2 small">{profileMsg}</div>
                            )}
                            <form onSubmit={handleSaveProfile}>
                                <div className="mb-3">
                                    <label className="form-label small fw-semibold">Seller Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={sellerName}
                                        onChange={(e) => setSellerName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label small fw-semibold">Store Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={storeName}
                                        onChange={(e) => setStoreName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label small fw-semibold">Phone Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label small fw-semibold">Store Description</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={storeDesc}
                                        onChange={(e) => setStoreDesc(e.target.value)}
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Save Profile Changes
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SellerDashboard;