import { useEffect, useState } from "react";
import api from "../api/axios";
import AppNav from "../components/AppNav";
import BudgetForm from "../components/BudgetForm";
import BudgetList from "../components/BudgetList";
import { getCurrentMonthKey } from "../utils/month";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import ErrorAlert from "../components/ErrorAlert";

const Budgets = () => {
    const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthKey());
    const [budgets, setBudgets] = useState([]);
    const [editingBudget, setEditingBudget] = useState(null);

    const [loading, setLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchBudgetStatus = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                `/budgets/status?month=${selectedMonth}`
            );

            setBudgets(response.data.budgets);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to fetch budgets. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBudgetStatus();
    }, [selectedMonth]);

    const handleSubmitBudget = async (formData) => {
        try {
            setFormLoading(true);
            setError("");

            if (editingBudget) {
                await api.put(`/budgets/${editingBudget.id}`, formData);
                setEditingBudget(null);
            } else {
                await api.post("/budgets", formData);
            }

            if (formData.month !== selectedMonth) {
                setSelectedMonth(formData.month);
            } else {
                await fetchBudgetStatus();
            }
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to save budget. Please try again."
            );
        } finally {
            setFormLoading(false);
        }
    };

    const handleEditBudget = (budget) => {
        setEditingBudget(budget);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleCancelEdit = () => {
        setEditingBudget(null);
    };

    const handleDeleteBudget = async (budgetId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this budget?"
        );

        if (!confirmDelete) return;

        try {
            setError("");

            await api.delete(`/budgets/${budgetId}`);

            if (editingBudget?.id === budgetId) {
                setEditingBudget(null);
            }

            await fetchBudgetStatus();
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to delete budget. Please try again."
            );
        }
    };

    return (
        <main className="min-h-screen bg-slate-100">
            <AppNav />

            <section className="mx-auto max-w-6xl px-4 py-8">
                <PageHeader
                    title="Budgets"
                    description="Set monthly spending limits and track category usage."
                />

                <ErrorAlert message={error} />

                <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
                    <label className="block text-sm font-medium text-slate-700">
                        View Month
                    </label>

                    <input
                        type="month"
                        value={selectedMonth}
                        onChange={(e) => {
                            setSelectedMonth(e.target.value);
                            setEditingBudget(null);
                        }}
                        className="mt-1 w-full max-w-xs rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                    />
                </div>

                <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
                    <BudgetForm
                        onSubmit={handleSubmitBudget}
                        editingBudget={editingBudget}
                        onCancelEdit={handleCancelEdit}
                        loading={formLoading}
                    />

                    <BudgetList
                        budgets={budgets}
                        month={selectedMonth}
                        loading={loading}
                        onEdit={handleEditBudget}
                        onDelete={handleDeleteBudget}
                    />
                </div>
            </section>
            <Footer />
        </main>
    );
};

export default Budgets;