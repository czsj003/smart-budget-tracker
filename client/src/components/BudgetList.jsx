import { formatMonthLabel } from "../utils/month";
import BudgetItem from "./BudgetItem";
import EmptyState from "./EmptyState";
import LoadingSpinner from "./LoadingSpinner";

const BudgetList = ({
    budgets,
    month,
    loading,
    onEdit,
    onDelete,
}) => {
    if (loading) {
        return <LoadingSpinner message="Loading budgets..." />;
    }

    return (
        <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <h3 className="text-lg font-bold text-slate-900">
                        Budget Status
                    </h3>

                    <p className="text-sm text-slate-500">
                        {formatMonthLabel(month)}
                    </p>
                </div>

                <p className="text-sm text-slate-500">
                    {budgets.length} budget{budgets.length !== 1 ? "s" : ""}
                </p>
            </div>

            <div className="mt-4">
                {budgets.length === 0 ? (
                    <EmptyState
                        title="No budgets yet"
                        description="Add a monthly budget for your expense categories."
                    />
                ) : (
                    budgets.map((budget) => (
                        <BudgetItem
                            key={budget.id}
                            budget={budget}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default BudgetList;