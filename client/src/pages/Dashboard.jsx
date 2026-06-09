import { useEffect, useState } from "react";
import api from "../api/axios";
import CategoryBreakdown from "../components/CategoryBreakdown";
import RecentTransactions from "../components/RecentTransactions";
import SummaryCards from "../components/SummaryCards";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import CategoryPieChart from "../components/CategoryPieChart";
import MonthlyTrendChart from "../components/MonthlyTrendChart";
import AppNav from "../components/AppNav";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import ErrorAlert from "../components/ErrorAlert";

const initialSummary = {
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    currentMonthIncome: 0,
    currentMonthExpense: 0,
    currentMonthBalance: 0,
    categoryBreakdown: [],
    recentTransactions: [],
    monthlyTrend: [],
};

const Dashboard = () => {
    const [summary, setSummary] = useState(initialSummary);
    const [transactions, setTransactions] = useState([]);
    const [editingTransaction, setEditingTransaction] = useState(null);

    const [summaryLoading, setSummaryLoading] = useState(true);
    const [transactionsLoading, setTransactionsLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(false);

    const [error, setError] = useState("");

    const fetchSummary = async () => {
        try {
            setSummaryLoading(true);
            setError("");

            const response = await api.get("/summary");

            setSummary(response.data);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to fetch summary. Please try again."
            );
        } finally {
            setSummaryLoading(false);
        }
    };

    const fetchTransactions = async () => {
        try {
            setTransactionsLoading(true);
            setError("");

            const response = await api.get("/transactions?limit=5");

            setTransactions(response.data.transactions);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to fetch transactions. Please try again."
            );
        } finally {
            setTransactionsLoading(false);
        }
    };

    const refreshDashboard = async () => {
        await Promise.all([
            fetchSummary(),
            fetchTransactions(),
        ]);
    };

    useEffect(() => {
        refreshDashboard();
    }, []);

    const handleSubmitTransaction = async (formData) => {
        try {
            setFormLoading(true);
            setError("");

            if (editingTransaction) {
                await api.put(
                    `/transactions/${editingTransaction._id}`,
                    formData
                );

                setEditingTransaction(null);
            } else {
                await api.post("/transactions", formData);
            }

            await refreshDashboard();
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to save transaction. Please try again."
            );
        } finally {
            setFormLoading(false);
        }
    };

    const handleEditTransaction = (transaction) => {
        setEditingTransaction(transaction);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleCancelEdit = () => {
        setEditingTransaction(null);
    };

    const handleDeleteTransaction = async (transactionId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this transaction?"
        );

        if (!confirmDelete) return;

        try {
            setError("");

            await api.delete(`/transactions/${transactionId}`);

            if (editingTransaction?._id === transactionId) {
                setEditingTransaction(null);
            }

            await refreshDashboard();
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to delete transaction. Please try again."
            );
        }
    };

    return (
        <main className="min-h-screen bg-slate-100">
            <AppNav />

            <section className="mx-auto max-w-6xl px-4 py-8">
                <PageHeader
                    title="Dashboard"
                    description="Overview of your income, expenses, budgets, and subscriptions."
                />

                <ErrorAlert message={error} />

                {summaryLoading ? (
                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <p className="text-slate-600">Loading summary...</p>
                    </div>
                ) : (
                    <SummaryCards summary={summary} />
                )}

                <div className="mt-8 grid gap-8 lg:grid-cols-2">
                    <CategoryBreakdown
                        categories={summary.categoryBreakdown}
                    />

                    <RecentTransactions
                        transactions={summary.recentTransactions}
                    />
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-2">
                    <CategoryPieChart
                        data={summary.categoryBreakdown}
                    />

                    <MonthlyTrendChart
                        data={summary.monthlyTrend}
                    />
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
                    <TransactionForm
                        onSubmit={handleSubmitTransaction}
                        editingTransaction={editingTransaction}
                        onCancelEdit={handleCancelEdit}
                        loading={formLoading}
                    />

                    <TransactionList
                        transactions={transactions}
                        loading={transactionsLoading}
                        onEdit={handleEditTransaction}
                        onDelete={handleDeleteTransaction}
                    />
                </div>
            </section>
            <Footer />
        </main>
    );
};

export default Dashboard;