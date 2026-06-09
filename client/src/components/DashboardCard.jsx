const DashboardCard = ({ title, value, subtitle }) => {
    return (
        <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">{title}</p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
                {value}
            </p>

            {subtitle && (
                <p className="mt-2 text-sm text-slate-500">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default DashboardCard;