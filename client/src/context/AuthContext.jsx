import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios"

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    const register = async (formData) => {
        const response = await api.post("/auth/register", formData);

        const { user, token } = response.data;

        localStorage.setItem("token", token);
        setUser(user);

        return response.data;
    };

    const login = async (formData) => {
        const response = await api.post("/auth/login", formData);

        const {  user, token } = response.data;

        localStorage.setItem("token", token);
        setUser(user);

        return response.data
    };

    const logout = () => {
        localStorage.removeItem("token")
        setUser(null)
    }

    const fetchCurrentUser = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setUser(null);
                return;
            }

            const response = await api.get("/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUser(response.data.user);
        } catch (error) {
            console.error("Fetch current user failed:", error);
            localStorage.removeItem("token");
            setUser(null);
        } finally {
            setAuthLoading(false);
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    const value = {
        user,
        authLoading,
        register,
        login,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}