import mongoose from "mongoose";
import Budget from "../models/Budget.js";
import Transaction from "../models/Transaction.js";

const getCurrentMonthKey = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");

    return `${year}-${month}`;
};

const getMonthDateRange = (monthKey) => {
    const [year, month] = monthKey.split("-").map(Number);

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    return {
        startDate,
        endDate,
    };
};

const getBudgetStatus = (percentage) => {
    if (percentage > 100) {
        return "exceeded";
    }

    if (percentage >= 80) {
        return "warning";
    }

    return "normal";
};

export const getBudgets = async (req, res) => {
    try {
        const month = req.query.month || getCurrentMonthKey();

        const budgets = await Budget.find({
            user: req.user._id,
            month,
        }).sort({
            category: 1,
        });

        return res.status(200).json({
            budgets,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error while fetching budgets",
            error: error.message,
        });
    }
};

export const createBudget = async (req, res) => {
    try {
        const { category, limit, month } = req.body;

        const budgetMonth = month || getCurrentMonthKey();

        if (!category || !limit) {
            return res.status(400).json({
                message: "Please provide category and limit",
            });
        }

        if (Number(limit) <= 0) {
            return res.status(400).json({
                message: "Budget limit must be greater than 0",
            });
        }

        const existingBudget = await Budget.findOne({
            user: req.user._id,
            category,
            month: budgetMonth,
        });

        if (existingBudget) {
            return res.status(400).json({
                message: "Budget already exists for this category and month",
            });
        }

        const budget = await Budget.create({
            user: req.user._id,
            category,
            limit,
            month: budgetMonth,
        });

        return res.status(201).json({
            message: "Budget created successfully",
            budget,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error while creating budget",
            error: error.message,
        });
    }
};

export const updateBudget = async (req, res) => {
    try {
        const { category, limit, month } = req.body;

        const budget = await Budget.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!budget) {
            return res.status(404).json({
                message: "Budget not found",
            });
        }

        if (limit !== undefined && Number(limit) <= 0) {
            return res.status(400).json({
                message: "Budget limit must be greater than 0",
            });
        }

        budget.category = category || budget.category;
        budget.limit = limit !== undefined ? Number(limit) : budget.limit;
        budget.month = month || budget.month;

        const updatedBudget = await budget.save();

        return res.status(200).json({
            message: "Budget updated successfully",
            budget: updatedBudget,
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Budget already exists for this category and month",
            });
        }

        return res.status(500).json({
            message: "Server error while updating budget",
            error: error.message,
        });
    }
};

export const deleteBudget = async (req, res) => {
    try {
        const budget = await Budget.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!budget) {
            return res.status(404).json({
                message: "Budget not found",
            });
        }

        await budget.deleteOne();

        return res.status(200).json({
            message: "Budget deleted successfully",
            id: req.params.id,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error while deleting budget",
            error: error.message,
        });
    }
};

export const getBudgetStatusList = async (req, res) => {
    try {
        const month = req.query.month || getCurrentMonthKey();

        const { startDate, endDate } = getMonthDateRange(month);

        const userId = new mongoose.Types.ObjectId(req.user._id);

        const budgets = await Budget.find({
            user: req.user._id,
            month,
        }).sort({
            category: 1,
        });

        const spendingByCategory = await Transaction.aggregate([
            {
                $match: {
                    user: userId,
                    type: "expense",
                    date: {
                        $gte: startDate,
                        $lt: endDate,
                    },
                },
            },
            {
                $group: {
                    _id: "$category",
                    spent: {
                        $sum: "$amount",
                    },
                },
            },
        ]);

        const budgetStatus = budgets.map((budget) => {
            const categorySpending = spendingByCategory.find((item) => {
                return item._id === budget.category;
            });

            const spent = categorySpending?.spent || 0;
            const percentage = budget.limit > 0 ? (spent / budget.limit) * 100 : 0;
            const roundedPercentage = Math.round(percentage);

            return {
                id: budget._id,
                category: budget.category,
                limit: budget.limit,
                month: budget.month,
                spent,
                remaining: budget.limit - spent,
                percentage: roundedPercentage,
                status: getBudgetStatus(roundedPercentage),
                createdAt: budget.createdAt,
                updatedAt: budget.updatedAt,
            };
        });

        return res.status(200).json({
            month,
            budgets: budgetStatus,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error while fetching budget status",
            error: error.message,
        });
    }
};