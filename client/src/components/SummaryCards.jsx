import DashboardCard from "./DashboardCard";
import { formatCurrency } from "../utils/formatCurrency";

const SummaryCards = ({ summary }) => {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            <DashboardCard
                title="Total Income"
                value={formatCurrency(summary.totalIncome)}
                subtitle="All-time income"
            />

            <DashboardCard
                title="Total Expense"
                value={formatCurrency(summary.totalExpense)}
                subtitle="All-time expenses"
            />

            <DashboardCard
                title="Balance"
                value={formatCurrency(summary.balance)}
                subtitle="Income minus expenses"
            />

            <DashboardCard
                title="This Month Income"
                value={formatCurrency(summary.currentMonthIncome)}
                subtitle="Income this month"
            />

            <DashboardCard
                title="This Month Expense"
                value={formatCurrency(summary.currentMonthExpense)}
                subtitle="Expenses this month"
            />

            <DashboardCard
                title="This Month Balance"
                value={formatCurrency(summary.currentMonthBalance)}
                subtitle="Monthly net cash flow"
            />
        </div>
    );
};

export default SummaryCards;