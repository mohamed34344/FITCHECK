import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function AccountSwitcher() {
    const {
        user,
        savedAccounts,
        switchAccount,
        removeSavedAccount,
        logout,
    } = useContext(AuthContext);

    const navigate = useNavigate();

    if (!user) {
        return null;
    }

    return (
        <div className="dropdown">
            <button
                className="btn bg-transparent border-0 p-0 d-flex align-items-center gap-2"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <div
                    className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm"
                    style={{ width: "38px", height: "38px" }}
                >
                    {user.name
                        ? user.name.charAt(0).toUpperCase()
                        : "U"}
                </div>
            </button>

            <div
                className="dropdown-menu dropdown-menu-end shadow border-0 rounded-4 p-3"
                style={{ width: "280px" }}
            >
                <div className="mb-3">
                    <div className="fw-bold">
                        {user.name || "User"}
                    </div>

                    <div className="text-muted small">
                        {user.email}
                    </div>
                </div>

                <hr />

                <div className="small fw-semibold mb-2">
                    Switch Account
                </div>

                {savedAccounts.map((account) => (
                    <div
                        key={account.email}
                        className="d-flex align-items-center justify-content-between gap-2 mb-2"
                    >
                        <button
                            type="button"
                            className="btn btn-light flex-grow-1 text-start"
                            onClick={() => switchAccount(account.email)}
                        >
                            <div className="fw-semibold">
                                {account.name || "User"}
                            </div>

                            <div className="text-muted small">
                                {account.email}
                            </div>
                        </button>

                        <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() =>
                                removeSavedAccount(account.email)
                            }
                            aria-label="Remove account"
                        >
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>
                ))}

                <hr />

                <button
                    type="button"
                    className="btn btn-outline-dark w-100 mb-2"
                    onClick={() => navigate("/login")}
                >
                    <i className="bi bi-person-plus me-2"></i>
                    Add Another Account
                </button>

                <button
                    type="button"
                    className="btn btn-danger w-100"
                    onClick={logout}
                >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Sign Out
                </button>
            </div>
        </div>
    );
}

export default AccountSwitcher;