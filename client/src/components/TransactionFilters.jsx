import { expenseCategories, incomeCategories } from "../utils/categories";

const TransactionFilters = ({
    filters,
    onChange,
    onReset,
}) => {
    const allCategories = [
        ...incomeCategories,
        ...expenseCategories,
    ];

    const uniqueCategories = [...new Set(allCategories)];

    const handleChange = (e) => {
        const { name, value } = e.target;

        onChange({
            ...filters,
            [name]: value,
            page: 1,
        });
    };

    return (
        <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <h3 className="text-lg font-bold text-slate-900">
                        Search & Filters
                    </h3>

                    <p className="text-sm text-slate-500">
                        Narrow down your transaction history.
                    </p>
                </div>

                <button
                    onClick={onReset}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                    Reset
                </button>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700">
                        Search
                    </label>

                    <input
                        type="text"
                        name="search"
                        value={filters.search}
                        onChange={handleChange}
                        placeholder="Lunch, salary, rent..."
                        className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">
                        Type
                    </label>

                    <select
                        name="type"
                        value={filters.type}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-900"
                    >
                        <option value="">All Types</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">
                        Category
                    </label>

                    <select
                        name="category"
                        value={filters.category}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-900"
                    >
                        <option value="">All Categories</option>
                        {uniqueCategories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">
                        Sort
                    </label>

                    <select
                        name="sort"
                        value={filters.sort}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-900"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="highest">Highest Amount</option>
                        <option value="lowest">Lowest Amount</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">
                        Start Date
                    </label>

                    <input
                        type="date"
                        name="startDate"
                        value={filters.startDate}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">
                        End Date
                    </label>

                    <input
                        type="date"
                        name="endDate"
                        value={filters.endDate}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">
                        Per Page
                    </label>

                    <select
                        name="limit"
                        value={filters.limit}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-900"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default TransactionFilters;