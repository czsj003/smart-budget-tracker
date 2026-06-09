import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true,
        },

        limit: {
            type: Number,
            required: [true, "Budget limit is required"],
            min: [0.01, "Budget limit must be greater than 0"],
        },

        month: {
            type: String,
            required: [true, "Month is required"],
        },
    },
    {
        timestamps: true,
    }
);

budgetSchema.index(
    {
        user: 1,
        category: 1,
        month: 1,
    },
    {
        unique: true,
    }
);

const Budget = mongoose.model("Budget", budgetSchema);

export default Budget;