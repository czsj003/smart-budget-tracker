const Pagination = ({ pagination, onPageChange }) => {
    if (!pagination || pagination.totalPages <= 1) {
        return null;
    }

    const {
        currentPage,
        totalPages,
        totalTransactions,
        hasNextPage,
        hasPrevPage,
    } = pagination;

    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="mt-6 flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-slate-500">
                Showing page {currentPage} of {totalPages} • {totalTransactions} records
            </p>

            <div className="flex flex-wrap items-center gap-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={!hasPrevPage}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Previous
                </button>

                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`rounded-lg px-3 py-2 text-sm font-medium ${page === currentPage
                                ? "bg-slate-900 text-white"
                                : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                            }`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={!hasNextPage}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;