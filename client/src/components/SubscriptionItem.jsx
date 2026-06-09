import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";

const SubscriptionItem = ({
    subscription,
    onEdit,
    onDelete,
    onToggleActive,
}) => {
    const isActive = subscription.isActive;

    return (
        <div className="border-b border-slate-200 py-5 last:border-b-0">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                    <div className="flex flex-wrap items-center gap-3">
                        <h4 className="text-lg font-bold text-slate-900">
                            {subscription.name}
                        </h4>

                        <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${isActive
                                    ? "bg-green-50 text-green-700"
                                    : "bg-slate-100 text-slate-600"
                                }`}
                        >
                            {isActive ? "Active" : "Inactive"}
                        </span>

                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                            {subscription.billingCycle}
                        </span>
                    </div>

                    <div className="mt-3 grid gap-3 text-sm md:grid-cols-3">
                        <div>
                            <p className="text-slate-500">Amount</p>
                            <p className="font-semibold text-slate-900">
                                {formatCurrency(subscription.amount)}
                            </p>
                        </div>

                        <div>
                            <p className="text-slate-500">Category</p>
                            <p className="font-semibold text-slate-900">
                                {subscription.category}
                            </p>
                        </div>

                        <div>
                            <p className="text-slate-500">Next Billing</p>
                            <p className="font-semibold text-slate-900">
                                {formatDate(subscription.nextBillingDate)}
                            </p>
                        </div>
                    </div>

                    {subscription.notes && (
                        <p className="mt-3 text-sm text-slate-500">
                            {subscription.notes}
                        </p>
                    )}
                </div>

                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => onToggleActive(subscription)}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        {isActive ? "Deactivate" : "Activate"}
                    </button>

                    <button
                        onClick={() => onEdit(subscription)}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(subscription._id)}
                        className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionItem;