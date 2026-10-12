import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function SellerRegister() {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [storeName, setStoreName] = useState("");
    const [storeDescription, setStoreDescription] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();

        if (!name || !email || !phone || !storeName || !password) {
            setError("Please fill in all required fields.");
            return;
        }

        const cleanEmail = email.trim().toLowerCase();

        const newSeller = {
            id: Date.now(),
            name: name.trim(),
            email: cleanEmail,
            phone: phone.trim(),
            storeName: storeName.trim(),
            storeDescription: storeDescription.trim(),
            password: password,
            role: "Seller",
        };

        localStorage.setItem(
            `user_${cleanEmail}_data`,
            JSON.stringify({
                name: name.trim(),
                email: cleanEmail,
                phone: phone.trim(),
                address: `${storeName.trim()} - ${storeDescription.trim() || "Seller Store"}`,
            })
        );

        register(newSeller);
        navigate("/seller");
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-6">
                    <div className="card border-0 shadow-sm rounded-4 p-4">
                        <div className="text-center mb-4">
                            <div
                                className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow-sm"
                                style={{ width: "55px", height: "55px" }}
                            >
                                <i className="bi bi-shop fs-4"></i>
                            </div>
                            <h3 className="fw-bold text-primary">Become a Seller</h3>
                            <p className="text-muted small">
                                Create your seller account on FITCHECK Store
                            </p>
                        </div>

                        {error && (
                            <div className="alert alert-danger py-2 small">{error}</div>
                        )}

                        <form onSubmit={handleRegister}>
                            <div className="mb-3">
                                <label className="form-label small fw-semibold">Full Name *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label small fw-semibold">Email *</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="seller@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label small fw-semibold">Phone *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="01012345678"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label small fw-semibold">Store Name *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="e.g. FitCheck Official"
                                    value={storeName}
                                    onChange={(e) => setStoreName(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label small fw-semibold">
                                    Store Description
                                </label>
                                <textarea
                                    className="form-control"
                                    rows="2"
                                    placeholder="Tell customers about your store..."
                                    value={storeDescription}
                                    onChange={(e) => setStoreDescription(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="mb-4">
                                <label className="form-label small fw-semibold">Password *</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="********"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold">
                                Register as Seller
                            </button>
                        </form>

                        <div className="text-center mt-3 small text-muted">
                            Already have an account?{" "}
                            <Link to="/login" className="text-primary fw-semibold">
                                Login here
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SellerRegister;