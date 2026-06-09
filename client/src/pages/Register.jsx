import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { name, email, password } = formData;

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!name || !email || !password) {
        setError("Please fill in all fields.");
        return;
        }

        if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
        }

        try {
        setLoading(true);

        await register({
            name,
            email,
            password,
        });

        navigate("/dashboard");
        } catch (error) {
        setError(
            error.response?.data?.message || "Registration failed. Please try again."
        );
        } finally {
        setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
            <h1 className="text-3xl font-bold text-slate-900 text-center">
            Create Account
            </h1>

            <p className="mt-2 text-center text-slate-600">
            Start tracking your finances today.
            </p>

            {error && (
            <div className="mt-6 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
            </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
                <label className="block text-sm font-medium text-slate-700">
                Name
                </label>
                <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="John Doe"
                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700">
                Email
                </label>
                <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700">
                Password
                </label>
                <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-slate-900 px-5 py-3 text-white font-medium hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading ? "Creating account..." : "Register"}
            </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-slate-900 underline">
                Login
            </Link>
            </p>
        </div>
        </main>
    );
};

export default Register;