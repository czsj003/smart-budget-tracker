const EmptyState = ({
    title = "No data found",
    description = "There is nothing to display yet.",
}) => {
    return (
        <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center">
            <p className="font-medium text-slate-700">
                {title}
            </p>

            <p className="mt-2 text-sm text-slate-500">
                {description}
            </p>
        </div>
    );
};

export default EmptyState;