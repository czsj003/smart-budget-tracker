import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";

const UpcomingBills = ({ bills }) => {
    return (
        <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">
                    Upcoming Bills
                </h3>

                <p className="text-sm text-slate-500">
                    Next 30 days
                </p>
            </div>

            <div className="mt-5">
                {bills.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center">
                        <p className="font-medium text-slate-700">
                            No upcoming bills
                        </p>

                        <p className="mt-2 text-sm text-slate-500">
                            Nothing due in the next 30 days.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {bills.map((bill) => (
                            <div
                                key={bill._id}
                                className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-b-0 last:pb-0"
                            >
                                <div>
                                    <p className="font-medium text-slate-900">
                                        {bill.name}
                                    </p>

                                    <p className="mt-1 text-sm text-slate-500">
                                        {bill.category} • {formatDate(bill.nextBillingDate)}
                                    </p>
                                </div>

                                <p className="font-bold text-slate-900">
                                    {formatCurrency(bill.amount)}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpcomingBills;