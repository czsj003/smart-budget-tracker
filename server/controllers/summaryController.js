import mongoose from "mongoose";
import Transaction from "../models/Transaction.js";

const getLastSixMonths = () => {
    const months = [];
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");

        months.push({
            key: `${year}-${month}`,
            label: date.toLocaleString("en-US", {
                month: "short",
            }),
            income: 0,
            expense: 0,
        });
    }

    return months;
};

export const getSummary = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user._id);

        const now = new Date();

        const startOfMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            1
        );

        const startOfNextMonth = new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            1
        );

        const lastSixMonthsStart = new Date(
            now.getFullYear(),
            now.getMonth() - 5,
            1
        );

        const totalStats = await Transaction.aggregate([
            {
                $match: {
                    user: userId,
                },
            },
            {
                $group: {
                    _id: "$type",
                    total: {
                        $sum: "$amount",
                    },
                },
            },
        ]);

        const currentMonthStats = await Transaction.aggregate([
            {
                $match: {
                    user: userId,
                    date: {
                        $gte: startOfMonth,
                        $lt: startOfNextMonth,
                    },
                },
            },
            {
                $group: {
                    _id: "$type",
                    total: {
                        $sum: "$amount",
                    },
                },
            },
        ]);

        const categoryBreakdown = await Transaction.aggregate([
            {
                $match: {
                    user: userId,
                    type: "expense",
                },
            },
            {
                $group: {
                    _id: "$category",
                    total: {
                        $sum: "$amount",
                    },
                    count: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    total: -1,
                },
            },
        ]);

        const monthlyStats = await Transaction.aggregate([
            {
                $match: {
                    user: userId,
                    date: {
                        $gte: lastSixMonthsStart,
                        $lt: startOfNextMonth,
                    },
                },
            },
            {
                $group: {
                    _id: {
                        year: {
                            $year: "$date",
                        },
                        month: {
                            $month: "$date",
                        },
                        type: "$type",
                    },
                    total: {
                        $sum: "$amount",
                    },
                },
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1,
                },
            },
        ]);

        const recentTransactions = await Transaction.find({
            user: req.user._id,
        })
            .sort({
                date: -1,
                createdAt: -1,
            })
            .limit(5);

        const totalIncome =
            totalStats.find((item) => item._id === "income")?.total || 0;

        const totalExpense =
            totalStats.find((item) => item._id === "expense")?.total || 0;

        const currentMonthIncome =
            currentMonthStats.find((item) => item._id === "income")?.total || 0;

        const currentMonthExpense =
            currentMonthStats.find((item) => item._id === "expense")?.total || 0;

        const monthlyTrend = getLastSixMonths();

        monthlyStats.forEach((item) => {
            const year = item._id.year;
            const month = String(item._id.month).padStart(2, "0");
            const key = `${year}-${month}`;

            const targetMonth = monthlyTrend.find((monthItem) => {
                return monthItem.key === key;
            });

            if (targetMonth) {
                targetMonth[item._id.type] = item.total;
            }
        });

        return res.status(200).json({
            totalIncome,
            totalExpense,
            balance: totalIncome - totalExpense,

            currentMonthIncome,
            currentMonthExpense,
            currentMonthBalance: currentMonthIncome - currentMonthExpense,

            categoryBreakdown: categoryBreakdown.map((item) => ({
                category: item._id,
                total: item.total,
                count: item.count,
            })),

            recentTransactions,
            monthlyTrend,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error while fetching summary",
            error: error.message,
        });
    }
};