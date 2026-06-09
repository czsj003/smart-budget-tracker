import { useEffect, useState } from "react";
import { expenseCategories } from "../utils/categories";
import { getCurrentMonthKey } from "../utils/month";

const initialState = {
    category: "Food",
    limit: "",
    month: getCurrentMonthKey(),
};

const BudgetForm = ({
    onSubmit,
    editingBudget,
    onCancelEdit,
    loading,
}) => {
    const [formData, setFormData] = useState(initialState);
    const [error, setError] = useState("");

    const { category, limit, month } = formData;

    useEffect(() => {
        if (editingBudget) {
            setFormData({
                category: editingBudget.category,
                limit: editingBudget.limit,
                month: editingBudget.month,
            });
        } else {
            setFormData(initialState);
        }
    }, [editingBudget]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!category || !limit || !month) {
            setError("Please fill in all fields.");
            return;
        }

        if (Number(limit) <= 0) {
            setError("Budget limit must be greater than 0.");
            return;
        }

        await onSubmit({
            category,
            limit: Number(limit),
            month,
        });

        if (!editingBudget) {
            setFormData(initialState);
        }
    };

    return (
        <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">
                {editingBudget ? "Edit Budget" : "Add Budget"}
            </h3>

            {error && (
                <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
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
                        {expenseCategories.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">
                        Monthly Limit
                    </label>

                    <input
                        type="number"
                        name="limit"
                        value={limit}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        placeholder="500"
                        className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">
                        Month
                    </label>

                    <input
                        type="month"
                        name="month"
                        value={month}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-lg bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading
                            ? "Saving..."
                            : editingBudget
                                ? "Update Budget"
                                : "Add Budget"}
                    </button>

                    {editingBudget && (
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

export default BudgetForm;