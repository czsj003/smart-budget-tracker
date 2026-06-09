import Transaction from "../models/Transaction.js";

export const getTransactions = async (req, res) => {
    try {
        const {
            search,
            type,
            category,
            startDate,
            endDate,
            sort = "newest",
            page = 1,
            limit = 10,
        } = req.query;

        const query = {
            user: req.user._id,
        };

        if (search) {
            query.description = {
                $regex: search,
                $options: "i",
            };
        }

        if (type && ["income", "expense"].includes(type)) {
            query.type = type;
        }

        if (category) {
            query.category = category;
        }

        if (startDate || endDate) {
            query.date = {};

            if (startDate) {
                query.date.$gte = new Date(startDate);
            }

            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                query.date.$lte = end;
            }
        }

        let sortOption = {
            date: -1,
            createdAt: -1,
        };

        if (sort === "oldest") {
            sortOption = {
                date: 1,
                createdAt: 1,
            };
        }

        if (sort === "highest") {
            sortOption = {
                amount: -1,
            };
        }

        if (sort === "lowest") {
            sortOption = {
                amount: 1,
            };
        }

        const pageNumber = Math.max(Number(page), 1);
        const limitNumber = Math.max(Number(limit), 1);
        const skip = (pageNumber - 1) * limitNumber;

        const totalTransactions = await Transaction.countDocuments(query);

        const transactions = await Transaction.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limitNumber);

        const totalPages = Math.ceil(totalTransactions / limitNumber);

        return res.status(200).json({
            transactions,
            pagination: {
                totalTransactions,
                totalPages,
                currentPage: pageNumber,
                limit: limitNumber,
                hasNextPage: pageNumber < totalPages,
                hasPrevPage: pageNumber > 1,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error while fetching transactions",
            error: error.message,
        });
    }
};

export const getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found",
            });
        }

        return res.status(200).json({
            transaction,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error while fetching transaction",
            error: error.message,
        });
    }
};

export const createTransaction = async (req, res) => {
    try {
        const { type, amount, category, description, date } = req.body;

        if (!type || !amount || !category || !description || !date) {
            return res.status(400).json({
                message: "Please provide type, amount, category, description, and date",
            });
        }

        if (!["income", "expense"].includes(type)) {
            return res.status(400).json({
                message: "Type must be either income or expense",
            });
        }

        if (Number(amount) <= 0) {
            return res.status(400).json({
                message: "Amount must be greater than 0",
            });
        }

        const transaction = await Transaction.create({
            user: req.user._id,
            type,
            amount,
            category,
            description,
            date,
        });

        return res.status(201).json({
            message: "Transaction created successfully",
            transaction,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error while creating transaction",
            error: error.message,
        });
    }
};

export const updateTransaction = async (req, res) => {
    try {
        const { type, amount, category, description, date } = req.body;

        const transaction = await Transaction.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found",
            });
        }

        if (type && !["income", "expense"].includes(type)) {
            return res.status(400).json({
                message: "Type must be either income or expense",
            });
        }

        if (amount !== undefined && Number(amount) <= 0) {
            return res.status(400).json({
                message: "Amount must be greater than 0",
            });
        }

        transaction.type = type || transaction.type;
        transaction.amount = amount !== undefined ? amount : transaction.amount;
        transaction.category = category || transaction.category;
        transaction.description = description || transaction.description;
        transaction.date = date || transaction.date;

        const updatedTransaction = await transaction.save();

        return res.status(200).json({
            message: "Transaction updated successfully",
            transaction: updatedTransaction,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error while updating transaction",
            error: error.message,
        });
    }
};

export const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found",
            });
        }

        await Transaction.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            message: "Transaction deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error while deleting transaction",
            error: error.message,
        });
    }
};
