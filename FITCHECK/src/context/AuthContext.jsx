import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem("active_user");
            return savedUser ? JSON.parse(savedUser) : null;
        } catch {
            return null;
        }
    });

    const [savedAccounts, setSavedAccounts] = useState(() => {
        try {
            const accounts = localStorage.getItem("app_saved_accounts");
            return accounts ? JSON.parse(accounts) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem("active_user", JSON.stringify(user));
        } else {
            localStorage.removeItem("active_user");
        }
    }, [user]);

    useEffect(() => {
        localStorage.setItem("app_saved_accounts", JSON.stringify(savedAccounts));
    }, [savedAccounts]);

    useEffect(() => {
        setUser((prev) => {
            if (!prev) return prev;
            const acc = savedAccounts.find(
                (a) => a.email.toLowerCase() === prev.email.toLowerCase()
            );
            return acc && acc.role !== prev.role ? { ...prev, role: acc.role } : prev;
        });
    }, [savedAccounts]);

    const login = (email, password) => {
        const account = savedAccounts.find(
            (account) =>
                account.email.toLowerCase() === email.trim().toLowerCase()
        );

        if (!account) {
            return {
                success: false,
                message: "Account not found",
            };
        }

        if (account.password !== password) {
            return {
                success: false,
                message: "Invalid password",
            };
        }

        setUser(account);

        return {
            success: true,
        };
    };

    const logout = () => {
        setUser(null);
    };

    const register = (userData) => {
        setUser(userData);

        setSavedAccounts((prev) => {
            const exists = prev.some(
                (account) =>
                    account.email.toLowerCase() === userData.email.toLowerCase()
            );

            const updated = exists
                ? prev.map((account) =>
                    account.email.toLowerCase() === userData.email.toLowerCase()
                        ? userData
                        : account
                )
                : [...prev, userData];

            localStorage.setItem(
                "app_saved_accounts",
                JSON.stringify(updated)
            );

            return updated;
        });
    };

    const switchAccount = (email) => {
        const account = savedAccounts.find(
            (account) =>
                account.email.toLowerCase() === email.toLowerCase()
        );

        if (account) {
            setUser(account);
        }
    };

    const removeSavedAccount = (email) => {
        const updated = savedAccounts.filter(
            (account) =>
                account.email.toLowerCase() !== email.toLowerCase()
        );

        setSavedAccounts(updated);

        localStorage.setItem(
            "app_saved_accounts",
            JSON.stringify(updated)
        );

        if (user?.email?.toLowerCase() === email.toLowerCase()) {
            setUser(updated[0] || null);
        }
    };

    const addUser = ({ name, email, role }) => {
        const clean = email.trim().toLowerCase();
        if (savedAccounts.some((a) => a.email.toLowerCase() === clean)) {
            return { success: false, message: "A user with this email already exists." };
        }
        setSavedAccounts((prev) => [
            ...prev,
            { id: Date.now(), name: name.trim(), email: clean, password: "123456", role },
        ]);
        return { success: true };
    };

    const updateUserRole = (email, role) => {
        setSavedAccounts((prev) =>
            prev.map((a) =>
                a.email.toLowerCase() === email.toLowerCase() ? { ...a, role } : a
            )
        );
    };
    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                register,
                switchAccount,
                savedAccounts,
                removeSavedAccount,
                addUser,
                updateUserRole,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};