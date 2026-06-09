import { formatCurrency } from "../utils/formatCurrency";

const statusConfig = {
    normal: {
        label: "Normal",
        badgeClass: "bg-green-50 text-green-700",
        barClass: "bg-green-600",
    },
    warning: {
        label: "Warning",
        badgeClass: "bg-yellow-50 text-yellow-700",
        barClass: "bg-yellow-500",
    },
    exceeded: {
        label: "Exceeded",
        badgeClass: "bg-red-50 text-red-700",
        barClass: "bg-red-600",
    },
};

const BudgetItem = ({ budget, onEdit, onDelete }) => {
    const config = statusConfig[budget.status] || statusConfig.normal;

    const progressWidth = Math.min(budget.percentage, 100);

    return (
        <div className="border-b border-slate-200 py-5 last:border-b-0">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                        <h4 className="text-lg font-bold text-slate-900">
                            {budget.category}
                        </h4>

                        <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${config.badgeClass}`}
                        >
                            {config.label}
                        </span>
                    </div>

                    <div className="mt-3 grid gap-3 text-sm md:grid-cols-3">
                        <div>
                            <p className="text-slate-500">Limit</p>
                            <p className="font-semibold text-slate-900">
                                {formatCurrency(budget.limit)}
                            </p>
                        </div>

                        <div>
                            <p className="text-slate-500">Spent</p>
                            <p className="font-semibold text-slate-900">
                                {formatCurrency(budget.spent)}
                            </p>
                        </div>

                        <div>
                            <p className="text-slate-500">Remaining</p>
                            <p
                                className={`font-semibold ${budget.remaining < 0
                                        ? "text-red-700"
                                        : "text-slate-900"
                                    }`}
                            >
                                {formatCurrency(budget.remaining)}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="mb-2 flex items-center justify-between">
                            <p className="text-sm text-slate-500">
                                {budget.percentage}% used
                            </p>

                            {budget.status === "warning" && (
                                <p className="text-sm font-medium text-yellow-700">
                                    You are close to your limit.
                                </p>
                            )}

                            {budget.status === "exceeded" && (
                                <p className="text-sm font-medium text-red-700">
                                    Budget exceeded.
                                </p>
                            )}
                        </div>

                        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                            <div
                                className={`h-full rounded-full ${config.barClass}`}
                                style={{
                                    width: `${progressWidth}%`,
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(budget)}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(budget.id)}
                        className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BudgetItem;