function UserManagement({
    users,
    newUserName,
    setNewUserName,
    newUserEmail,
    setNewUserEmail,
    newUserRole,
    setNewUserRole,
    handleAddUser,
    handleRoleChange,
    handleDeleteUser,
}) {
    return (
        <div className="row g-4">
            <div className="col-12 col-lg-4">
                <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                    <h5 className="fw-bold mb-3">Add New User</h5>

                    <form onSubmit={handleAddUser}>
                        <div className="mb-3">
                            <label className="form-label small fw-semibold">
                                Full Name *
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter user name"
                                value={newUserName}
                                onChange={(e) =>
                                    setNewUserName(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-semibold">
                                Email *
                            </label>

                            <input
                                type="email"
                                className="form-control"
                                placeholder="user@fitcheck.com"
                                value={newUserEmail}
                                onChange={(e) =>
                                    setNewUserEmail(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-semibold">
                                Role
                            </label>

                            <select
                                className="form-select"
                                value={newUserRole}
                                onChange={(e) =>
                                    setNewUserRole(e.target.value)
                                }
                            >
                                <option value="Customer">Customer</option>
                                <option value="Seller">Seller</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                        >
                            Add User
                        </button>
                    </form>
                </div>
            </div>

            <div className="col-12 col-lg-8">
                <div className="card border-0 shadow-sm rounded-4 p-4">
                    <h5 className="fw-bold mb-3">
                        All Registered Users ({users.length})
                    </h5>

                    <div className="table-responsive">
                        <table className="table align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Change Role</th>
                                    <th className="text-end">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((u) => {
                                    const roleText = u.role
                                        ? u.role.charAt(0).toUpperCase() +
                                          u.role.slice(1).toLowerCase()
                                        : "Customer";

                                    return (
                                        <tr key={u.email}>
                                            <td className="fw-semibold">
                                                {u.name || "User"}
                                            </td>

                                            <td className="text-muted small">
                                                {u.email}
                                            </td>

                                            <td>
                                                <span className="badge bg-primary">
                                                    {roleText}
                                                </span>
                                            </td>

                                            <td>
                                                <select
                                                    className="form-select form-select-sm w-auto"
                                                    value={roleText}
                                                    onChange={(e) =>
                                                        handleRoleChange(
                                                            u.email,
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="Customer">
                                                        Customer
                                                    </option>
                                                    <option value="Seller">
                                                        Seller
                                                    </option>
                                                    <option value="Admin">
                                                        Admin
                                                    </option>
                                                </select>
                                            </td>

                                            <td className="text-end">
                                                <button
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() =>
                                                        handleDeleteUser(
                                                            u.email
                                                        )
                                                    }
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserManagement;