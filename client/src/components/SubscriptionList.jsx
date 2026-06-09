import SubscriptionItem from "./SubscriptionItem";
import EmptyState from "./EmptyState";
import LoadingSpinner from "./LoadingSpinner";

const SubscriptionList = ({
    subscriptions,
    loading,
    onEdit,
    onDelete,
    onToggleActive,
}) => {
    if (loading) {
        return <LoadingSpinner message="Loading subscriptions..." />;
    }

    return (
        <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <h3 className="text-lg font-bold text-slate-900">
                    Subscriptions
                </h3>

                <p className="text-sm text-slate-500">
                    {subscriptions.length} subscription
                    {subscriptions.length !== 1 ? "s" : ""}
                </p>
            </div>

            <div className="mt-4">
                {subscriptions.length === 0 ? (
                    <EmptyState
                        title="No subscriptions yet"
                        description="Add services like Netflix, Spotify, ChatGPT, or Gym."
                    />
                ) : (
                    subscriptions.map((subscription) => (
                        <SubscriptionItem
                            key={subscription._id}
                            subscription={subscription}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onToggleActive={onToggleActive}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default SubscriptionList;