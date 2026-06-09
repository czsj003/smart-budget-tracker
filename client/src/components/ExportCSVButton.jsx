const escapeCSVValue = (value) => {
    if (value === null || value === undefined) {
        return "";
    }

    const stringValue = String(value);

    if (
        stringValue.includes(",") ||
        stringValue.includes('"') ||
        stringValue.includes("\n")
    ) {
        return `"${stringValue.replace(/"/g, '""')}"`;
    }

    return stringValue;
};

const ExportCSVButton = ({ transactions }) => {
    const handleExport = () => {
        if (!transactions || transactions.length === 0) {
            alert("No transactions to export.");
            return;
        }

        const headers = [
            "Type",
            "Amount",
            "Category",
            "Description",
            "Date",
            "Created At",
        ];

        const rows = transactions.map((transaction) => {
            return [
                transaction.type,
                transaction.amount,
                transaction.category,
                transaction.description,
                transaction.date
                    ? new Date(transaction.date).toISOString().split("T")[0]
                    : "",
                transaction.createdAt
                    ? new Date(transaction.createdAt).toISOString()
                    : "",
            ];
        });

        const csvContent = [
            headers.map(escapeCSVValue).join(","),
            ...rows.map((row) => row.map(escapeCSVValue).join(",")),
        ].join("\n");

        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);

        const today = new Date().toISOString().split("T")[0];

        const link = document.createElement("a");
        link.href = url;
        link.download = `transactions-${today}.csv`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    };

    return (
        <button
            onClick={handleExport}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
            Export CSV
        </button>
    );
};

export default ExportCSVButton;