import TransactionItem from "./TransactionItem";
import EmptyState from "./EmptyState";
import LoadingSpinner from "./LoadingSpinner";

const TransactionList = ({
    transactions,
    loading,
    onEdit,
    onDelete,
}) => {
    if (loading) {
        return <LoadingSpinner message="Loading transactions..." />;
    }

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">
                    Recent Transactions
                </h3>

                <p className="text-sm text-slate-500">
                    {transactions.length} records
                </p>
            </div>

            <div className="mt-4">
                {transactions.length === 0 ? (
                    <EmptyState
                        title="No transactions yet"
                        description="Add your first income or expense record."
                    />
                ) : (
                    transactions.map((transaction) => (
                        <TransactionItem
                            key={transaction._id}
                            transaction={transaction}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default TransactionList;