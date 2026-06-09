const LoadingSpinner = ({ message = "Loading..." }) => {
    return (
        <div className="flex min-h-[200px] items-center justify-center rounded-xl bg-white p-6 shadow-sm">
            <div className="text-center">
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />

                <p className="mt-4 text-sm text-slate-600">
                    {message}
                </p>
            </div>
        </div>
    );
};

export default LoadingSpinner;