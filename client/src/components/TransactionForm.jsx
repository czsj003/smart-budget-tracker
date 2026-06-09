import { useEffect, useState } from "react";
import { expenseCategories, incomeCategories } from "../utils/categories";
import { getTodayDateInput } from "../utils/formatDate";

const initialState = {
    type: "expense",
    amount: "",
    category: "Food",
    description: "",
    date: getTodayDateInput(),
};

const TransactionForm = ({
    onSubmit,
    editingTransaction,
    onCancelEdit,
    loading,
}) => {
    const [formData, setFormData] = useState(initialState);
    const [error, setError] = useState("");

    const { type, amount, category, description, date } = formData;

    const categories =
        type === "income" ? incomeCategories : expenseCategories;

    useEffect(() => {
        if (editingTransaction) {
            setFormData({
                type: editingTransaction.type,
                amount: editingTransaction.amount,
                category: editingTransaction.category,
                description: editingTransaction.description,
                date: editingTransaction.date
                    ? editingTransaction.date.split("T")[0]
                    : getTodayDateInput(),
            });
        } else {
            setFormData(initialState);
        }
    }, [editingTransaction]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "type") {
            const nextCategory =
                value === "income" ? incomeCategories[0] : expenseCategories[0];

            setFormData((prev) => ({
                ...prev,
                type: value,
                category: nextCategory,
            }));

            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!type || !amount || !category || !description || !date) {
            setError("Please fill in all fields.");
            return;
        }

        if (Number(amount) <= 0) {
            setError("Amount must be greater than 0.");
            return;
        }

        await onSubmit({
            type,
            amount: Number(amount),
            category,
            description,
            date,
        });

        if (!editingTransaction) {
            setFormData(initialState);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900">
                {editingTransaction ? "Edit Transaction" : "Add Transaction"}
            </h3>

            {error && (
                <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 grid gap-4 md:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium text-slate-700">
                        Type
                    </label>
                    <select
                        name="type"
                        value={type}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900 bg-white"
                    >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
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
                        placeholder="25.50"
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
                        className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900 bg-white"
                    >
                        {categories.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">
                        Date
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={date}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700">
                        Description
                    </label>
                    <input
                        type="text"
                        name="description"
                        value={description}
                        onChange={handleChange}
                        placeholder="Lunch, Salary, Rent..."
                        className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                    />
                </div>

                <div className="md:col-span-2 flex gap-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-lg bg-slate-900 px-5 py-3 text-white font-medium hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading
                            ? "Saving..."
                            : editingTransaction
                                ? "Update Transaction"
                                : "Add Transaction"}
                    </button>

                    {editingTransaction && (
                        <button
                            type="button"
                            onClick={onCancelEdit}
                            className="rounded-lg border border-slate-300 px-5 py-3 text-slate-700 font-medium hover:bg-slate-50"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default TransactionForm;