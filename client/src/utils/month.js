export const getCurrentMonthKey = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");

    return `${year}-${month}`;
};

export const formatMonthLabel = (monthKey) => {
    if (!monthKey) return "";

    const [year, month] = monthKey.split("-").map(Number);

    const date = new Date(year, month - 1, 1);

    return date.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
    });
};