import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [confirmationSent, setConfirmationSent] = useState(false);

    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !formData.name ||
            !formData.email ||
            !formData.phone ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            setError("Please fill in all fields");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const userData = {
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
            phone: formData.phone.trim(),
            role: "Customer",
        };

        setError("");
        setConfirmationSent(true);

        setTimeout(() => {
            register(userData);
            navigate("/profile");
        }, 2000);
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">

                    <div className="card shadow-sm border-0 rounded-4 p-4">

                        <h3 className="text-center mb-4 fw-bold">
                            Create Account
                        </h3>

                        {error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )}

                        {confirmationSent && (
                            <div className="alert alert-success">
                                <i className="bi bi-check-circle-fill me-2"></i>

                                Account created! A confirmation email has
                                been sent to{" "}
                                <strong>{formData.email}</strong>.
                                Redirecting...
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label className="form-label">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Enter full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    disabled={confirmationSent}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={confirmationSent}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    className="form-control"
                                    placeholder="Enter phone number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={confirmationSent}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    disabled={confirmationSent}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label">
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="form-control"
                                    placeholder="Confirm password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    disabled={confirmationSent}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-dark w-100 py-2"
                                disabled={confirmationSent}
                            >
                                {confirmationSent
                                    ? "Processing..."
                                    : "Register"}
                            </button>

                        </form>

                        <div className="text-center mt-3">
                            Already have an account?{" "}
                            <Link to="/login">
                                Login
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;