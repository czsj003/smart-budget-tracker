import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { formatCurrency } from "../utils/formatCurrency";

const MonthlyTrendChart = ({ data }) => {
    return (
        <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">
                    Monthly Trend
                </h3>

                <p className="text-sm text-slate-500">
                    Last 6 months
                </p>
            </div>

            <div className="mt-6 h-80">
                {data.length === 0 ? (
                    <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-slate-300">
                        <div className="text-center">
                            <p className="font-medium text-slate-700">
                                No monthly data
                            </p>
                            <p className="mt-2 text-sm text-slate-500">
                                Add transactions to see trends.
                            </p>
                        </div>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="label" />

                            <YAxis
                                tickFormatter={(value) => `$${value}`}
                            />

                            <Tooltip
                                formatter={(value) => formatCurrency(value)}
                            />

                            <Legend />

                            <Bar
                                dataKey="income"
                                name="Income"
                                fill="#16a34a"
                                radius={[4, 4, 0, 0]}
                            />

                            <Bar
                                dataKey="expense"
                                name="Expense"
                                fill="#dc2626"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default MonthlyTrendChart;