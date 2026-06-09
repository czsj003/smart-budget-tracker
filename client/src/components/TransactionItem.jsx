import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";

const TransactionItem = ({ transaction, onEdit, onDelete }) => {
    const isIncome = transaction.type === "income";

    return (
        <div className="flex flex-col gap-4 border-b border-slate-200 py-4 last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div>
                <div className="flex items-center gap-3">
                    <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${isIncome
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-700"
                            }`}
                    >
                        {isIncome ? "Income" : "Expense"}
                    </span>

                    <span className="text-sm text-slate-500">
                        {formatDate(transaction.date)}
                    </span>
                </div>

                <h4 className="mt-2 font-semibold text-slate-900">
                    {transaction.description}
                </h4>

                <p className="mt-1 text-sm text-slate-500">
                    {transaction.category}
                </p>
            </div>

            <div className="flex items-center justify-between gap-4 md:justify-end">
                <p
                    className={`text-lg font-bold ${isIncome ? "text-green-700" : "text-red-700"
                        }`}
                >
                    {isIncome ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                </p>

                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(transaction)}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(transaction._id)}
                        className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionItem;