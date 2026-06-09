import { useEffect, useState } from "react";
import api from "../api/axios";
import AppNav from "../components/AppNav";
import ExportCSVButton from "../components/ExportCSVButton";
import Pagination from "../components/Pagination";
import TransactionFilters from "../components/TransactionFilters";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import ErrorAlert from "../components/ErrorAlert";

const defaultFilters = {
    search: "",
    type: "",
    category: "",
    startDate: "",
    endDate: "",
    sort: "newest",
    page: 1,
    limit: 10,
};

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [filters, setFilters] = useState(defaultFilters);

    const [editingTransaction, setEditingTransaction] = useState(null);

    const [transactionsLoading, setTransactionsLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(false);

    const [error, setError] = useState("");

    const buildQueryString = () => {
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== "" && value !== null && value !== undefined) {
                params.append(key, value);
            }
        });

        return params.toString();
    };

    const fetchTransactions = async () => {
        try {
            setTransactionsLoading(true);
            setError("");

            const queryString = buildQueryString();

            const response = await api.get(`/transactions?${queryString}`);

            setTransactions(response.data.transactions);
            setPagination(response.data.pagination);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to fetch transactions. Please try again."
            );
        } finally {
            setTransactionsLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [filters]);

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

            await fetchTransactions();
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

            await fetchTransactions();
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to delete transaction. Please try again."
            );
        }
    };

    const handlePageChange = (page) => {
        setFilters((prev) => ({
            ...prev,
            page,
        }));
    };

    const handleResetFilters = () => {
        setFilters(defaultFilters);
    };

    return (
        <main className="min-h-screen bg-slate-100">
            <AppNav />

            <section className="mx-auto max-w-6xl px-4 py-8">
                <PageHeader
                    title="Transactions"
                    description="Manage, search, filter, and export your financial records."
                    action={<ExportCSVButton transactions={transactions} />}
                />

                <ErrorAlert message={error} />

                <TransactionFilters
                    filters={filters}
                    onChange={setFilters}
                    onReset={handleResetFilters}
                />

                <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
                    <TransactionForm
                        onSubmit={handleSubmitTransaction}
                        editingTransaction={editingTransaction}
                        onCancelEdit={handleCancelEdit}
                        loading={formLoading}
                    />

                    <div>
                        <TransactionList
                            transactions={transactions}
                            loading={transactionsLoading}
                            onEdit={handleEditTransaction}
                            onDelete={handleDeleteTransaction}
                        />

                        <Pagination
                            pagination={pagination}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
};

export default Transactions;