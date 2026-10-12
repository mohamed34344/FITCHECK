import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthContext } from "../../context/AuthContext";
import EditProfileModal from "../../components/User/EditProfileModal";
import AccountSwitcher from "../../components/AccountSwitcher/AccountSwitcher";
import { selectOrders } from "../../store/ordersSlice";


function Profile() {
    const {
        user,
        logout,
        savedAccounts,
        switchAccount,
    } = useContext(AuthContext);

    const orders = useSelector(selectOrders);
    const userOrders = orders.filter((order) => order.customer?.userEmail === user?.email);


    const navigate = useNavigate();
    const userKey = user?.email
        ? `user_${user.email.toLowerCase()}`
        : "user_default";
    const [profileImage, setProfileImage] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [userData, setUserData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: "",
        address: "",
        paymentMethod: "",
        cardholderName: "",
        cardLast4: "",
        expiryDate: "",
    });
    useEffect(() => {
        if (!user?.email) {
            return;
        }
        try {
            const savedData =
                JSON.parse(
                    localStorage.getItem(`${userKey}_data`)
                ) || {};
            const savedImg = localStorage.getItem(`${userKey}_img`);
            setUserData({
                name: savedData.name || user.name || "User",
                email: user.email,
                phone: savedData.phone || "Not provided",
                address: savedData.address || "Not provided",
                paymentMethod: savedData.paymentMethod || "Not provided",
                cardholderName: savedData.cardholderName || "Not provided",
                cardLast4: savedData.cardLast4 || "",
                expiryDate: savedData.expiryDate || "",
            });
            setProfileImage(savedImg || null);
        } catch (error) {
            console.error("Error reading user data:", error);
        }
    }, [user, userKey]);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file || !user?.email) {
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = 200;
                canvas.height = 200;
                ctx.drawImage(img, 0, 0, 200, 200);
                const compressedBase64 =
                    canvas.toDataURL("image/jpeg", 0.8);
                setProfileImage(compressedBase64);
                localStorage.setItem(
                    `${userKey}_img`,
                    compressedBase64
                );
            };
        };
        reader.readAsDataURL(file);
    };
    const handleSaveChanges = (updatedData) => {
        const newData = {
            ...userData,
            ...updatedData,
            email: userData.email,
        };
        setUserData(newData);
        localStorage.setItem(
            `${userKey}_data`,
            JSON.stringify(newData)
        );
    };
    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    if (!user) {
        return null;
    }
    return (
        <div className="container my-5">
            <div className="row g-4">
                {/* Sidebar */}
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm rounded-4 text-center p-4">
                        <div className="position-relative d-inline-block mx-auto mb-3">
                            {profileImage ? (
                                <img
                                    src={profileImage}
                                    alt="Profile"
                                    className="rounded-circle shadow-sm border border-2 border-white object-fit-cover"
                                    style={{
                                        width: "90px",
                                        height: "90px",
                                    }}
                                />
                            ) : (
                                <div
                                    className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                                    style={{
                                        width: "90px",
                                        height: "90px",
                                        fontSize: "2.2rem",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {userData.name
                                        ? userData.name
                                            .charAt(0)
                                            .toUpperCase()
                                        : "U"}
                                </div>
                            )}
                            <label
                                htmlFor="profile-upload"
                                className="position-absolute bottom-0 end-0 bg-success text-white rounded-circle d-flex align-items-center justify-content-center p-2 shadow"
                                style={{
                                    cursor: "pointer",
                                    width: "32px",
                                    height: "32px",
                                }}
                                title="Change Photo"
                            >
                                <i className="bi bi-camera-fill"></i>
                            </label>
                            <input
                                type="file"
                                id="profile-upload"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="d-none"
                            />
                        </div>
                        <h4 className="fw-bold mb-1">
                            {userData.name}
                        </h4>
                        <p className="text-muted small mb-2">
                            {userData.email}
                        </p>
                        <div className="mb-3">
                            <span className="badge bg-dark px-3 py-2 rounded-pill fw-normal">
                                <i className="bi bi-person-badge me-1"></i>
                                {user.role || "Customer"}
                            </span>
                        </div>
                        <div className="d-flex justify-content-center mb-3">
                            <AccountSwitcher />
                        </div>
                        <hr className="my-2 text-muted opacity-25" />
                        <div className="d-grid gap-2 mt-3">
                            <button
                                type="button"
                                className="btn btn-light rounded-3 text-start px-3 py-2 border-0 text-dark fw-semibold"
                                onClick={() => setShowEditModal(true)}
                            >
                                <i className="bi bi-person me-2"></i>
                                Account Details
                            </button>
                            <button
                                type="button"
                                className="btn btn-light rounded-3 text-start px-3 py-2 border-0 text-dark fw-semibold"
                                onClick={() => setShowEditModal(true)}
                            >
                                <i className="bi bi-pencil-square me-2"></i>
                                Edit Profile
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger rounded-3 text-start px-3 py-2 border-0 bg-danger-subtle text-danger fw-semibold mt-2"
                                onClick={handleLogout}
                            >
                                <i className="bi bi-box-arrow-right me-2"></i>
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
                {/* Main Content */}
                <div className="col-lg-8">
                    {/* Account Summary */}
                    <div className="row g-3 mb-4">
                        <div className="col-sm-6">
                            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="bg-success-subtle text-success p-3 rounded-3">
                                        <i className="bi bi-person-fill fs-4"></i>
                                    </div>
                                    <div>
                                        <h6 className="text-muted mb-0 small">
                                            Account Type
                                        </h6>
                                        <h5 className="fw-bold mb-0">
                                            {user.role || "Customer"}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="dropdown h-100">
                                <button
                                    type="button"
                                    className="card border-0 shadow-sm rounded-4 p-3 bg-white w-100 h-100 text-start"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="bg-primary-subtle text-primary p-3 rounded-3">
                                            <i className="bi bi-people-fill fs-4"></i>
                                        </div>
                                        <div>
                                            <h6 className="text-muted mb-0 small">
                                                Saved Accounts
                                            </h6>
                                            <h5 className="fw-bold mb-0">
                                                {savedAccounts.length}
                                            </h5>
                                        </div>
                                    </div>
                                </button>
                                <div
                                    className="dropdown-menu dropdown-menu-end shadow border-0 rounded-4 p-3 w-100"
                                    style={{ minWidth: "280px" }}
                                >
                                    <h6 className="fw-bold mb-3">
                                        Saved Accounts
                                    </h6>
                                    {savedAccounts.length === 0 ? (
                                        <p className="text-muted small mb-0">
                                            No saved accounts.
                                        </p>
                                    ) : (
                                        savedAccounts.map((account) => (
                                            <button
                                                key={account.email}
                                                type="button"
                                                className="dropdown-item rounded-3 p-2 mb-1"
                                                onClick={() =>
                                                    switchAccount(account.email)
                                                }
                                            >
                                                <div className="d-flex align-items-center gap-2">
                                                    <div
                                                        className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold"
                                                        style={{
                                                            width: "38px",
                                                            height: "38px",
                                                            flexShrink: 0,
                                                        }}
                                                    >
                                                        {account.name
                                                            ? account.name
                                                                .charAt(0)
                                                                .toUpperCase()
                                                            : "U"}
                                                    </div>
                                                    <div className="text-start">
                                                        <div className="fw-semibold">
                                                            {account.name || "User"}
                                                        </div>
                                                        <div className="text-muted small">
                                                            {account.email}
                                                        </div>
                                                    </div>
                                                    {user?.email?.toLowerCase() ===
                                                        account.email.toLowerCase() && (
                                                        <i className="bi bi-check-circle-fill text-success ms-auto"></i>
                                                    )}
                                                </div>
                                            </button>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Personal Details */}
                    <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="fw-bold mb-0">
                                Personal Details
                            </h5>
                            <button
                                type="button"
                                className="btn btn-dark btn-sm rounded-pill px-3"
                                onClick={() => setShowEditModal(true)}
                            >
                                <i className="bi bi-pencil-square me-1"></i>
                                Edit Profile
                            </button>
                        </div>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <div className="p-3 bg-light rounded-3">
                                    <small className="text-muted d-block mb-1">
                                        Full Name
                                    </small>
                                    <span className="fw-semibold text-dark">
                                        {userData.name}
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="p-3 bg-light rounded-3">
                                    <small className="text-muted d-block mb-1">
                                        Email Address
                                    </small>
                                    <span className="fw-semibold text-dark">
                                        {userData.email}
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="p-3 bg-light rounded-3">
                                    <small className="text-muted d-block mb-1">
                                        Phone Number
                                    </small>
                                    <span className="fw-semibold text-dark">
                                        {userData.phone}
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="p-3 bg-light rounded-3">
                                    <small className="text-muted d-block mb-1">
                                        Shipping Address
                                    </small>
                                    <span className="fw-semibold text-dark">
                                        {userData.address}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Payment Details */}
                    <div className="card border-0 shadow-sm rounded-4 p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="fw-bold mb-0">
                                Payment Details
                            </h5>
                            <button
                                type="button"
                                className="btn btn-dark btn-sm rounded-pill px-3"
                                onClick={() => setShowEditModal(true)}
                            >
                                <i className="bi bi-pencil-square me-1"></i>
                                Edit Payment
                            </button>
                        </div>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <div className="p-3 bg-light rounded-3">
                                    <small className="text-muted d-block mb-1">
                                        Payment Method
                                    </small>
                                    <span className="fw-semibold text-dark">
                                        {userData.paymentMethod}
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="p-3 bg-light rounded-3">
                                    <small className="text-muted d-block mb-1">
                                        Cardholder Name
                                    </small>
                                    <span className="fw-semibold text-dark">
                                        {userData.cardholderName}
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="p-3 bg-light rounded-3">
                                    <small className="text-muted d-block mb-1">
                                        Card Number
                                    </small>
                                    <span className="fw-semibold text-dark">
                                        {userData.cardLast4
                                            ? `•••• •••• •••• ${userData.cardLast4}`
                                            : "Not provided"}
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="p-3 bg-light rounded-3">
                                    <small className="text-muted d-block mb-1">
                                        Expiry Date
                                    </small>
                                    <span className="fw-semibold text-dark">
                                        {userData.expiryDate || "Not provided"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Order History */}
                    <div className="card border-0 shadow-sm p-4 mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="fw-bold mb-0">
                                <i className="bi bi-box-seam me-2"></i>
                                Order History
                            </h5>

                            <span className="badge bg-primary">
                                {userOrders.length} Orders
                            </span>
                        </div>

                        {userOrders.length === 0 ? (
                            <div className="text-center py-4">
                                <i className="bi bi-bag-x fs-1 text-muted"></i>
                                <p className="text-muted mt-3 mb-0">
                                    You haven't placed any orders yet.
                                </p>
                            </div>
                        ) : (
                            <div className="list-group">
                                {userOrders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="list-group-item border rounded mb-3 p-3"
                                    >
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 className="fw-bold mb-1">
                                                    Order {order.id}
                                                </h6>

                                                <small className="text-muted">
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </small>
                                            </div>

                                            <span
                                                className={`badge ${
                                                    order.cancelled
                                                        ? "bg-danger"
                                                        : "bg-success"
                                                }`}
                                            >
                                                {order.cancelled ? "Cancelled" : "Placed"}
                                            </span>
                                        </div>

                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <span className="text-muted">
                                                {order.items?.length || 0} item(s)
                                            </span>

                                            <strong>
                                                ${order.totals?.total?.toFixed(2) || "0.00"}
                                            </strong>
                                        </div>

                                        <Link
                                            to={`/order-tracking/${order.id}`}
                                            className="btn btn-outline-primary btn-sm mt-3"
                                        >
                                            View Order
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <EditProfileModal
                show={showEditModal}
                handleClose={() => setShowEditModal(false)}
                user={userData}
                onSave={handleSaveChanges}
            />
        </div>
    );
}
export default Profile;