import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateShippingStatus, placeOrder, selectOrders } from "../../store/ordersSlice";
import { getProducts } from "../../api/api";
import { allowedCategories } from "../../utils/categories";
import { AuthContext } from "../../context/AuthContext";

import DashboardOverview from "./DashBoardOverview";
import UserManagement from "./UserManagement";
import ProductManagement from "./ProductManagement";
import CategoryManagement from "./CategoryManagement";
import OrderManagement from "./OrderManagement";
import BannerManagement from "./BannerManagement";


function AdminDashboard() {
    const { user, savedAccounts, addUser, updateUserRole, removeSavedAccount } = useContext(AuthContext);
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("dashboard");

    const users = savedAccounts
    const [newUserName, setNewUserName] = useState("");
    const [newUserEmail, setNewUserEmail] = useState("");
    const [newUserRole, setNewUserRole] = useState("Customer");

    const [products, setProducts] = useState([]);
    const [editProdId, setEditProdId] = useState(null);
    const [newProdTitle, setNewProdTitle] = useState("");
    const [newProdPrice, setNewProdPrice] = useState("");
    const [newProdCategory, setNewProdCategory] = useState("mens-shirts");
    const [newProdImage, setNewProdImage] = useState("");

    const [categories, setCategories] = useState(() => {
        try {
            const saved = localStorage.getItem("fitcheck_categories");
            return saved
                ? JSON.parse(saved)
                : ["Men's fit", "Women's fit", "Shoes", "Watches", "bags", "Accessories"];
        } catch {
            return [];
        }
    });
    const [newCategory, setNewCategory] = useState("");
    const [editCatIndex, setEditCatIndex] = useState(null);

    const orders = useSelector(selectOrders);

    const [banners, setBanners] = useState(() => {
        try {
            const saved = localStorage.getItem("fitcheck_home_banners");
            return saved
                ? JSON.parse(saved)
                : [
                    {
                        id: 1,
                        title: "Man Short Sleeve Shirt",
                        subtitle: "It's perfect for a laid-back yet polished look.",
                        image: "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/2.webp",
                    },
                    {
                        id: 2,
                        title: "Women's Dresses",
                        subtitle: "Easy pieces for every day, dressed up or down.",
                        image: "https://cdn.dummyjson.com/product-images/tops/short-frock/2.webp",
                    },
                    {
                        id: 3,
                        title: "Puma Future Rider Trainers",
                        subtitle: "Fashionable and comfortable option for everyday use.",
                        image: "https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/2.webp",
                    },
                    {
                        id: 4,
                        title: "Watches",
                        subtitle: "The finishing touch for every outfit.",
                        image: "https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/1.webp",
                    }
                ];
        } catch {
            return [];
        }
    });

    const [editBannerId, setEditBannerId] = useState(null);
    const [bannerTitle, setBannerTitle] = useState("");
    const [bannerSubtitle, setBannerSubtitle] = useState("");
    const [bannerImage, setBannerImage] = useState("");

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

    const handleAddUser = (e) => {
        e.preventDefault();
        if (!newUserName || !newUserEmail) return;
        const res = addUser({ name: newUserName, email: newUserEmail, role: newUserRole });
        if (!res.success) {
            alert(res.message);
            return;
        }
        setNewUserName("");
        setNewUserEmail("");
    };

    const handleRoleChange = (email, newRole) => {
        updateUserRole(email, newRole);
    };

    const handleDeleteUser = (email) => {
        if (user?.email?.toLowerCase() === email.toLowerCase()) return;
        removeSavedAccount(email);
    };

    const handleSaveProduct = (e) => {
        e.preventDefault();
        if (!newProdTitle || !newProdPrice) return;

        const finalImg =
            newProdImage ||
            "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/2.webp";

        const customProds = JSON.parse(localStorage.getItem("fitcheck_custom_products")) || [];
        const editedProds = JSON.parse(localStorage.getItem("fitcheck_edited_products")) || {};

        if (editProdId !== null) {
            const updatedData = {
                title: newProdTitle,
                price: Number(newProdPrice),
                category: newProdCategory,
                thumbnail: finalImg,
                image: finalImg,
            };

            setProducts(
                products.map((p) => (p.id === editProdId ? { ...p, ...updatedData } : p))
            );

            editedProds[editProdId] = { ...(editedProds[editProdId] || {}), ...updatedData };
            localStorage.setItem("fitcheck_edited_products", JSON.stringify(editedProds));

            const updatedCustom = customProds.map((p) =>
                p.id === editProdId ? { ...p, ...updatedData } : p
            );
            localStorage.setItem("fitcheck_custom_products", JSON.stringify(updatedCustom));

            setEditProdId(null);
        } else {
            const newProd = {
                id: Date.now(),
                title: newProdTitle,
                price: Number(newProdPrice),
                category: newProdCategory,
                thumbnail: finalImg,
                image: finalImg,
                stock: 15,
            };
            setProducts([newProd, ...products]);
            localStorage.setItem(
                "fitcheck_custom_products",
                JSON.stringify([newProd, ...customProds])
            );
        }

        setNewProdTitle("");
        setNewProdPrice("");
        setNewProdImage("");
    };

    const handleEditProductClick = (p) => {
        setEditProdId(p.id);
        setNewProdTitle(p.title);
        setNewProdPrice(p.price);
        setNewProdCategory(p.category);
        setNewProdImage(p.thumbnail || p.image || "");
    };

    const handleDeleteProduct = (id) => {
        setProducts(products.filter((p) => p.id !== id));

        const customProds = JSON.parse(localStorage.getItem("fitcheck_custom_products")) || [];
        localStorage.setItem(
            "fitcheck_custom_products",
            JSON.stringify(customProds.filter((p) => p.id !== id))
        );

        const deletedIds = JSON.parse(localStorage.getItem("fitcheck_deleted_products")) || [];
        localStorage.setItem("fitcheck_deleted_products", JSON.stringify([...deletedIds, id]));
    };

    const handleSaveCategory = (e) => {
        e.preventDefault();
        if (!newCategory.trim()) return;

        let updated;
        if (editCatIndex !== null) {
            updated = categories.map((cat, idx) =>
                idx === editCatIndex ? newCategory : cat
            );
            setEditCatIndex(null);
        } else {
            updated = [...categories, newCategory];
        }

        setCategories(updated);
        localStorage.setItem("fitcheck_categories", JSON.stringify(updated));
        setNewCategory("");
    };

    const handleDeleteCategory = (index) => {
        const updated = categories.filter((_, idx) => idx !== index);
        setCategories(updated);
        localStorage.setItem("fitcheck_categories", JSON.stringify(updated));
    };

    const handleShippingChange = (id, newStatus) => {
        dispatch(updateShippingStatus({ id, status: newStatus }));
    };

    const handleCreateDemoOrder = () => {
        dispatch(
            placeOrder({
                customer: {
                    name: user?.name || "Demo Customer",
                    email: user?.email || "demo@example.com",
                    userEmail: user?.email || null,
                },
                items: [{ id: 1, title: "Man Short Sleeve Shirt", quantity: 2, price: 45 }],
                totals: { subtotal: 90, shipping: 0, total: 90 },
                shippingStatus: "Processing",
            })
        );
    };

    const handleSaveBanner = (e) => {
        e.preventDefault();
        if (!bannerTitle) return;

        const finalImg =
            bannerImage ||
            "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/2.webp";

        let updated;
        if (editBannerId !== null) {
            updated = banners.map((b) =>
                b.id === editBannerId
                    ? {
                        ...b,
                        title: bannerTitle,
                        subtitle: bannerSubtitle,
                        image: finalImg,
                    }
                    : b
            );
            setEditBannerId(null);
        } else {
            const newBanner = {
                id: Date.now(),
                title: bannerTitle,
                subtitle: bannerSubtitle || "Discover our latest collection at FITCHECK.",
                image: finalImg,
            };
            updated = [newBanner, ...banners];
        }

        setBanners(updated);
        localStorage.setItem("fitcheck_home_banners", JSON.stringify(updated));

        setBannerTitle("");
        setBannerSubtitle("");
        setBannerImage("");
    };

    const handleEditBannerClick = (b) => {
        setEditBannerId(b.id);
        setBannerTitle(b.title);
        setBannerSubtitle(b.subtitle);
        setBannerImage(b.image);
    };

    const handleDeleteBanner = (id) => {
        const updated = banners.filter((b) => b.id !== id);
        setBanners(updated);
        localStorage.setItem("fitcheck_home_banners", JSON.stringify(updated));
    };

    const totalRevenue = orders.reduce((sum, o) => {
        if (o.cancelled) return sum;
        return sum + (Number(o.totals?.total) || Number(o.total) || 0);
    }, 0);

    const currentRole = (user?.role || "Customer").toLowerCase();
    if (currentRole !== "admin") {
        return (
            <div className="container py-5 text-center">
                <div
                    className="card border-0 shadow-sm rounded-4 p-5 mx-auto"
                    style={{ maxWidth: "520px" }}
                >
                    <i className="bi bi-shield-lock-fill text-danger display-4 mb-3"></i>
                    <h4 className="fw-bold">Admin Access Only</h4>
                    <p className="text-muted small mb-4">
                        Your current account role is{" "}
                        <span className="badge bg-dark">{user?.role || "Customer"}</span>.
                        Customers and Sellers cannot access the Admin Panel to modify users or store settings.
                    </p>
                    <button
                        className="btn btn-primary w-100"
                        onClick={() => handleRoleChange(user.email, "Admin")}
                    >
                        Switch My Role to Admin (For Testing)
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            {/* Header */}
            <div className="bg-primary text-white p-4 rounded-4 shadow-sm mb-4 d-flex flex-wrap justify-content-between align-items-center">
                <div>
                    <h3 className="fw-bold mb-1">
                        <i className="bi bi-shield-lock me-2"></i>
                        FITCHECK Admin Panel
                    </h3>
                    <p className="mb-0 small text-white-50">
                        Logged in as: {user?.name} ({user?.role || "Admin"})
                    </p>
                </div>

                <div className="d-flex flex-wrap gap-2 mt-3 mt-lg-0">
                    <button
                        className={`btn btn-sm ${activeTab === "dashboard" ? "btn-light text-primary fw-bold" : "btn-outline-light"
                            }`}
                        onClick={() => setActiveTab("dashboard")}
                    >
                        <i className="bi bi-speedometer2 me-1"></i> Dashboard
                    </button>

                    <button
                        className={`btn btn-sm ${activeTab === "users" ? "btn-light text-primary fw-bold" : "btn-outline-light"
                            }`}
                        onClick={() => setActiveTab("users")}
                    >
                        <i className="bi bi-people me-1"></i> Users
                    </button>

                    <button
                        className={`btn btn-sm ${activeTab === "products" ? "btn-light text-primary fw-bold" : "btn-outline-light"
                            }`}
                        onClick={() => setActiveTab("products")}
                    >
                        <i className="bi bi-box-seam me-1"></i> Products
                    </button>

                    <button
                        className={`btn btn-sm ${activeTab === "categories" ? "btn-light text-primary fw-bold" : "btn-outline-light"
                            }`}
                        onClick={() => setActiveTab("categories")}
                    >
                        <i className="bi bi-tags me-1"></i> Categories
                    </button>

                    <button
                        className={`btn btn-sm ${activeTab === "orders" ? "btn-light text-primary fw-bold" : "btn-outline-light"
                            }`}
                        onClick={() => setActiveTab("orders")}
                    >
                        <i className="bi bi-truck me-1"></i> Orders & Shipping
                    </button>

                    <button
                        className={`btn btn-sm ${activeTab === "banners" ? "btn-light text-primary fw-bold" : "btn-outline-light"
                            }`}
                        onClick={() => setActiveTab("banners")}
                    >
                        <i className="bi bi-images me-1"></i> Banners
                    </button>
                </div>
            </div>

            {activeTab === "dashboard" && (
                <DashboardOverview
                    users={users}
                    products={products}
                    orders={orders}
                    totalRevenue={totalRevenue}
                />
            )}

            {activeTab === "users" && (
                <UserManagement
                    users={users}
                    newUserName={newUserName}
                    setNewUserName={setNewUserName}
                    newUserEmail={newUserEmail}
                    setNewUserEmail={setNewUserEmail}
                    newUserRole={newUserRole}
                    setNewUserRole={setNewUserRole}
                    handleAddUser={handleAddUser}
                    handleRoleChange={handleRoleChange}
                    handleDeleteUser={handleDeleteUser}
                />
            )}

            {activeTab === "products" && (
                <ProductManagement
                    products={products}
                    editProdId={editProdId}
                    setEditProdId={setEditProdId}
                    newProdTitle={newProdTitle}
                    setNewProdTitle={setNewProdTitle}
                    newProdPrice={newProdPrice}
                    setNewProdPrice={setNewProdPrice}
                    newProdCategory={newProdCategory}
                    setNewProdCategory={setNewProdCategory}
                    newProdImage={newProdImage}
                    setNewProdImage={setNewProdImage}
                    handleSaveProduct={handleSaveProduct}
                    handleEditProductClick={handleEditProductClick}
                    handleDeleteProduct={handleDeleteProduct}
                />
            )}

            {activeTab === "categories" && (
                <CategoryManagement
                    categories={categories}
                    newCategory={newCategory}
                    setNewCategory={setNewCategory}
                    editCatIndex={editCatIndex}
                    setEditCatIndex={setEditCatIndex}
                    handleSaveCategory={handleSaveCategory}
                    handleDeleteCategory={handleDeleteCategory}
                />
            )}

            {activeTab === "orders" && (
                <OrderManagement
                    orders={orders}
                    handleShippingChange={handleShippingChange}
                    handleCreateDemoOrder={handleCreateDemoOrder}
                />
            )}

            {activeTab === "banners" && (
                <BannerManagement
                    banners={banners}
                    editBannerId={editBannerId}
                    setEditBannerId={setEditBannerId}
                    bannerTitle={bannerTitle}
                    setBannerTitle={setBannerTitle}
                    bannerSubtitle={bannerSubtitle}
                    setBannerSubtitle={setBannerSubtitle}
                    bannerImage={bannerImage}
                    setBannerImage={setBannerImage}
                    handleSaveBanner={handleSaveBanner}
                    handleEditBannerClick={handleEditBannerClick}
                    handleDeleteBanner={handleDeleteBanner}
                />
            )}
        </div>
    );
}

export default AdminDashboard;