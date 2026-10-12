import { useEffect, useState } from "react";
function EditProfileModal({ show, handleClose, user, onSave }) {
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        address: user?.address || "",
        paymentMethod: user?.paymentMethod || "",
        cardholderName: user?.cardholderName || "",
        cardLast4: user?.cardLast4 || "",
        expiryDate: user?.expiryDate || "",
    });
    useEffect(() => {
        setFormData({
            name: user?.name || "",
            email: user?.email || "",
            phone: user?.phone || "",
            address: user?.address || "",
            paymentMethod: user?.paymentMethod || "",
            cardholderName: user?.cardholderName || "",
            cardLast4: user?.cardLast4 || "",
            expiryDate: user?.expiryDate || "",
        });
    }, [user]);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        handleClose();
    };
    if (!show) {
        return null;
    }
    return (
        <>
            <div
                className="modal fade show d-block"
                tabIndex="-1"
                role="dialog"
                aria-modal="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold">
                                Edit Profile Details
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={handleClose}
                                aria-label="Close"
                            ></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                {/* Personal Details */}
                                <h6 className="fw-bold mb-3">
                                    Personal Details
                                </h6>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                className="form-control"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Address
                                            </label>
                                            <input
                                                type="text"
                                                name="address"
                                                className="form-control"
                                                value={formData.address}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <hr className="my-4" />
                                {/* Payment Details */}
                                <h6 className="fw-bold mb-3">
                                    Payment Details
                                </h6>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Payment Method
                                    </label>
                                    <select
                                        name="paymentMethod"
                                        className="form-select"
                                        value={formData.paymentMethod}
                                        onChange={handleChange}
                                    >
                                        <option value="">
                                            Select payment method
                                        </option>
                                        <option value="Credit Card">
                                            Credit Card
                                        </option>
                                        <option value="PayPal">
                                            PayPal
                                        </option>
                                        <option value="Wallet">
                                            Wallet
                                        </option>
                                        <option value="Cash on Delivery">
                                            Cash on Delivery
                                        </option>
                                    </select>
                                </div>
                                {formData.paymentMethod === "Credit Card" && (
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Cardholder Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="cardholderName"
                                                    className="form-control"
                                                    placeholder="Name on card"
                                                    value={formData.cardholderName}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Last 4 Digits
                                                </label>
                                                <input
                                                    type="text"
                                                    name="cardLast4"
                                                    className="form-control"
                                                    placeholder="1234"
                                                    maxLength="4"
                                                    value={formData.cardLast4}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Expiry Date
                                                </label>
                                                <input
                                                    type="text"
                                                    name="expiryDate"
                                                    className="form-control"
                                                    placeholder="MM/YY"
                                                    maxLength="5"
                                                    value={formData.expiryDate}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-dark"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    );
}
export default EditProfileModal;