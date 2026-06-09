import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
            <div className="max-w-md rounded-xl bg-white p-8 text-center shadow-sm">
                <p className="text-sm font-medium text-slate-500">
                    404
                </p>

                <h1 className="mt-2 text-3xl font-bold text-slate-900">
                    Page not found
                </h1>

                <p className="mt-4 text-slate-600">
                    The page you are looking for does not exist or has been moved.
                </p>

                <Link
                    to="/dashboard"
                    className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-700"
                >
                    Back to Dashboard
                </Link>
            </div>
        </main>
    );
};

export default NotFound;