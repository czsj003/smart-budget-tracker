import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";

const RecentTransactions = ({ transactions }) => {
    return (
        <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">
                    Recent Transactions
                </h3>

                <p className="text-sm text-slate-500">
                    Latest 5 records
                </p>
            </div>

            <div className="mt-5">
                {transactions.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center">
                        <p className="font-medium text-slate-700">
                            No recent transactions
                        </p>
                        <p className="mt-2 text-sm text-slate-500">
                            Add your first transaction to get started.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {transactions.map((transaction) => {
                            const isIncome = transaction.type === "income";

                            return (
                                <div
                                    key={transaction._id}
                                    className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-b-0 last:pb-0"
                                >
                                    <div>
                                        <p className="font-medium text-slate-900">
                                            {transaction.description}
                                        </p>

                                        <p className="mt-1 text-sm text-slate-500">
                                            {transaction.category} • {formatDate(transaction.date)}
                                        </p>
                                    </div>

                                    <p
                                        className={`font-bold ${isIncome ? "text-green-700" : "text-red-700"
                                            }`}
                                    >
                                        {isIncome ? "+" : "-"}
                                        {formatCurrency(transaction.amount)}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentTransactions;