import { formatCurrency } from "../utils/formatCurrency";

const SubscriptionSummary = ({ summary, loading }) => {
    if (loading) {
        return (
            <div className="rounded-xl bg-white p-6 shadow-sm">
                <p className="text-slate-600">Loading subscription summary...</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Monthly Subscriptions</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                    {formatCurrency(summary.monthlyTotal)}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                    Estimated monthly cost
                </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Yearly Subscriptions</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                    {formatCurrency(summary.yearlyTotal)}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                    Estimated annual cost
                </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Active Subscriptions</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                    {summary.activeCount}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                    Currently active services
                </p>
            </div>
        </div>
    );
};

export default SubscriptionSummary;