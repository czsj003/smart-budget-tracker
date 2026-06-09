import { useEffect, useState } from "react";
import { subscriptionCategories } from "../utils/subscriptionCategories";
import { getTodayDateInput } from "../utils/formatDate";

const initialState = {
    name: "",
    amount: "",
    category: "Entertainment",
    billingCycle: "monthly",
    nextBillingDate: getTodayDateInput(),
    isActive: true,
    notes: "",
};

const SubscriptionForm = ({
    onSubmit,
    editingSubscription,
    onCancelEdit,
    loading,
}) => {
    const [formData, setFormData] = useState(initialState);
    const [error, setError] = useState("");

    const {
        name,
        amount,
        category,
        billingCycle,
        nextBillingDate,
        isActive,
        notes,
    } = formData;

    useEffect(() => {
        if (editingSubscription) {
            setFormData({
                name: editingSubscription.name,
                amount: editingSubscription.amount,
                category: editingSubscription.category,
                billingCycle: editingSubscription.billingCycle,
                nextBillingDate: editingSubscription.nextBillingDate
                    ? editingSubscription.nextBillingDate.split("T")[0]
                    : getTodayDateInput(),
                isActive: editingSubscription.isActive,
                notes: editingSubscription.notes || "",
            });
        } else {
            setFormData(initialState);
        }
    }, [editingSubscription]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!name || !amount || !category || !billingCycle || !nextBillingDate) {
            setError("Please fill in all required fields.");
            return;
        }

        if (Number(amount) <= 0) {
            setError("Amount must be greater than 0.");
            return;
        }

        await onSubmit({
            name,
            amount: Number(amount),
            category,
            billingCycle,
            nextBillingDate,
            isActive,
            notes,
        });

        if (!editingSubscription) {
            setFormData(initialState);
        }
    };

    return (
        <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">
                {editingSubscription ? "Edit Subscription" : "Add Subscription"}
            </h3>

            {error && (
                <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700">
                        Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        placeholder="Netflix, Spotify, ChatGPT..."
                        className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">
                        Amount
                    </label>

                    <input
                        type="number"
                        name="amount"
                        value={amount}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        placeholder="15.99"
                        className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">
                        Category
                    </label>

                    <select
                        name="category"
                        value={category}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-900"
                    >
                        {subscriptionCategories.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">
                        Billing Cycle
                    </label>

                    <select
                        name="billingCycle"
                        value={billingCycle}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-900"
                    >
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">
                        Next Billing Date
                    </label>

                    <input
                        type="date"
                        name="nextBillingDate"
                        value={nextBillingDate}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">
                        Notes
                    </label>

                    <textarea
                        name="notes"
                        value={notes}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Optional notes..."
                        className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                    />
                </div>

                <label className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        name="isActive"
                        checked={isActive}
                        onChange={handleChange}
                        className="h-4 w-4"
                    />

                    <span className="text-sm font-medium text-slate-700">
                        Active subscription
                    </span>
                </label>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-lg bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading
                            ? "Saving..."
                            : editingSubscription
                                ? "Update Subscription"
                                : "Add Subscription"}
                    </button>

                    {editingSubscription && (
                        <button
                            type="button"
                            onClick={onCancelEdit}
                            className="rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-700 hover:bg-slate-50"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default SubscriptionForm;