import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import { formatCurrency } from "../utils/formatCurrency";

const COLORS = [
    "#0f172a",
    "#334155",
    "#475569",
    "#64748b",
    "#94a3b8",
    "#cbd5e1",
    "#e2e8f0",
    "#1e293b",
    "#475569",
    "#64748b",
];

const CategoryPieChart = ({ data }) => {
    return (
        <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">
                    Expense by Category
                </h3>

                <p className="text-sm text-slate-500">
                    Pie chart
                </p>
            </div>

            <div className="mt-6 h-80">
                {data.length === 0 ? (
                    <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-slate-300">
                        <div className="text-center">
                            <p className="font-medium text-slate-700">
                                No expense data
                            </p>
                            <p className="mt-2 text-sm text-slate-500">
                                Add expenses to see this chart.
                            </p>
                        </div>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="total"
                                nameKey="category"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label={({ category, percent }) =>
                                    `${category} ${(percent * 100).toFixed(0)}%`
                                }
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={entry.category}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>

                            <Tooltip
                                formatter={(value) => formatCurrency(value)}
                            />

                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default CategoryPieChart;