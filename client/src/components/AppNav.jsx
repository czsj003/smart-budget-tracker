import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AppNav = () => {
    const { user, logout } = useAuth();

    const linkClass = ({ isActive }) => {
        return `rounded-lg px-3 py-2 text-sm font-medium transition ${isActive
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`;
    };

    return (
        <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="mx-auto max-w-6xl px-4 py-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <Link to="/dashboard">
                            <h1 className="text-xl font-bold text-slate-900">
                                Smart Budget Tracker
                            </h1>
                        </Link>

                        <p className="text-sm text-slate-500">
                            Welcome, {user?.name}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <NavLink to="/dashboard" className={linkClass}>
                            Dashboard
                        </NavLink>

                        <NavLink to="/transactions" className={linkClass}>
                            Transactions
                        </NavLink>

                        <NavLink to="/budgets" className={linkClass}>
                            Budgets
                        </NavLink>

                        <NavLink to="/subscriptions" className={linkClass}>
                            Subscriptions
                        </NavLink>

                        <button
                            onClick={logout}
                            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default AppNav;