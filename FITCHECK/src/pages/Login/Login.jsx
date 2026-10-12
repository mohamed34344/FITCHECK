import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        const result = login(email, password);

        if (!result.success) {
            setError(result.message);
            return;
        }

        navigate("/profile");
    };

    return (
        <div className="container d-flex align-items-center justify-content-center py-5">
            <div
                className="card border-0 shadow-sm rounded-4 p-4"
                style={{ width: "100%", maxWidth: "420px" }}
            >

                <p className=" text-center small mb-4">
                    Sign in or create/switch your account
                </p>

                {error && (
                    <div className="alert alert-danger py-2 small">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label small fw-semibold">
                            Full Name (Optional)
                        </label>

                        <input
                            type="text"
                            className="form-control rounded-3"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label small fw-semibold">
                            Email Address
                        </label>

                        <input
                            type="email"
                            className="form-control rounded-3"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label small fw-semibold">
                            Password
                        </label>

                        <input
                            type="password"
                            className="form-control rounded-3"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-dark w-100 rounded-pill py-2 fw-semibold"
                    >
                        Sign In / Access Account
                    </button>
                </form>

                <div className="text-center mt-3 small">
                    Don't have an account?{" "}
                    <Link to="/register">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;