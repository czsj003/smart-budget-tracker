import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        type: {
            type: String,
            required: [true, "Transaction type is required"],
            enum: ["income", "expense"],
        },

        amount: {
            type: Number,
            required: [true, "Amount is required"],
            min: [0.01, "Amount must be greater than 0"],
        },

        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true,
        },

        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
            maxlength: [100, "Description cannot be more than 100 characters"],
        },

        date: {
            type: Date,
            required: [true, "Date is required"],
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;