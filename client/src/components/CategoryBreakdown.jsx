import { formatCurrency } from "../utils/formatCurrency";

const CategoryBreakdown = ({ categories }) => {
    const totalExpense = categories.reduce((sum, item) => {
        return sum + item.total;
    }, 0);

    return (
        <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">
                    Category Breakdown
                </h3>

                <p className="text-sm text-slate-500">
                    Expense categories
                </p>
            </div>

            <div className="mt-5 space-y-4">
                {categories.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center">
                        <p className="font-medium text-slate-700">
                            No expense data yet
                        </p>
                        <p className="mt-2 text-sm text-slate-500">
                            Add expenses to see category breakdown.
                        </p>
                    </div>
                ) : (
                    categories.map((item) => {
                        const percentage =
                            totalExpense > 0
                                ? Math.round((item.total / totalExpense) * 100)
                                : 0;

                        return (
                            <div key={item.category}>
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="font-medium text-slate-900">
                                            {item.category}
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            {item.count} transaction{item.count > 1 ? "s" : ""}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="font-semibold text-slate-900">
                                            {formatCurrency(item.total)}
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            {percentage}%
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                                    <div
                                        className="h-full rounded-full bg-slate-900"
                                        style={{
                                            width: `${percentage}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default CategoryBreakdown;