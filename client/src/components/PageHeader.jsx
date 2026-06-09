const PageHeader = ({ title, description, action }) => {
    return (
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <h2 className="text-3xl font-bold text-slate-900">
                    {title}
                </h2>

                {description && (
                    <p className="mt-2 text-slate-600">
                        {description}
                    </p>
                )}
            </div>

            {action && <div>{action}</div>}
        </div>
    );
};

export default PageHeader;