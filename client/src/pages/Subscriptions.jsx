import { useEffect, useState } from "react";
import api from "../api/axios";
import AppNav from "../components/AppNav";
import SubscriptionForm from "../components/SubscriptionForm";
import SubscriptionList from "../components/SubscriptionList";
import SubscriptionSummary from "../components/SubscriptionSummary";
import UpcomingBills from "../components/UpcomingBills";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import ErrorAlert from "../components/ErrorAlert";

const initialSummary = {
    monthlyTotal: 0,
    yearlyTotal: 0,
    activeCount: 0,
    upcomingBills: [],
};

const Subscriptions = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [summary, setSummary] = useState(initialSummary);
    const [editingSubscription, setEditingSubscription] = useState(null);

    const [subscriptionsLoading, setSubscriptionsLoading] = useState(true);
    const [summaryLoading, setSummaryLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(false);

    const [error, setError] = useState("");

    const fetchSubscriptions = async () => {
        try {
            setSubscriptionsLoading(true);
            setError("");

            const response = await api.get("/subscriptions");

            setSubscriptions(response.data.subscriptions);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to fetch subscriptions. Please try again."
            );
        } finally {
            setSubscriptionsLoading(false);
        }
    };

    const fetchSubscriptionSummary = async () => {
        try {
            setSummaryLoading(true);
            setError("");

            const response = await api.get("/subscriptions/summary");

            setSummary(response.data);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to fetch subscription summary. Please try again."
            );
        } finally {
            setSummaryLoading(false);
        }
    };

    const refreshSubscriptionsPage = async () => {
        await Promise.all([
            fetchSubscriptions(),
            fetchSubscriptionSummary(),
        ]);
    };

    useEffect(() => {
        refreshSubscriptionsPage();
    }, []);

    const handleSubmitSubscription = async (formData) => {
        try {
            setFormLoading(true);
            setError("");

            if (editingSubscription) {
                await api.put(
                    `/subscriptions/${editingSubscription._id}`,
                    formData
                );

                setEditingSubscription(null);
            } else {
                await api.post("/subscriptions", formData);
            }

            await refreshSubscriptionsPage();
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to save subscription. Please try again."
            );
        } finally {
            setFormLoading(false);
        }
    };

    const handleEditSubscription = (subscription) => {
        setEditingSubscription(subscription);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleCancelEdit = () => {
        setEditingSubscription(null);
    };

    const handleDeleteSubscription = async (subscriptionId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this subscription?"
        );

        if (!confirmDelete) return;

        try {
            setError("");

            await api.delete(`/subscriptions/${subscriptionId}`);

            if (editingSubscription?._id === subscriptionId) {
                setEditingSubscription(null);
            }

            await refreshSubscriptionsPage();
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to delete subscription. Please try again."
            );
        }
    };

    const handleToggleActive = async (subscription) => {
        try {
            setError("");

            await api.put(`/subscriptions/${subscription._id}`, {
                isActive: !subscription.isActive,
            });

            await refreshSubscriptionsPage();
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to update subscription status. Please try again."
            );
        }
    };

    return (
        <main className="min-h-screen bg-slate-100">
            <AppNav />

            <section className="mx-auto max-w-6xl px-4 py-8">
                <PageHeader
                    title="Subscriptions"
                    description="Manage recurring bills and track fixed monthly costs."
                />

                <ErrorAlert message={error} />

                <SubscriptionSummary
                    summary={summary}
                    loading={summaryLoading}
                />

                <div className="mt-8">
                    <UpcomingBills bills={summary.upcomingBills} />
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
                    <SubscriptionForm
                        onSubmit={handleSubmitSubscription}
                        editingSubscription={editingSubscription}
                        onCancelEdit={handleCancelEdit}
                        loading={formLoading}
                    />

                    <SubscriptionList
                        subscriptions={subscriptions}
                        loading={subscriptionsLoading}
                        onEdit={handleEditSubscription}
                        onDelete={handleDeleteSubscription}
                        onToggleActive={handleToggleActive}
                    />
                </div>
            </section>
            <Footer />
        </main>
    );
};

export default Subscriptions;