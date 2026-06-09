import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        name: {
            type: String,
            required: [true, "Subscription name is required"],
            trim: true,
            maxlength: [80, "Name cannot be more than 80 characters"],
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

        billingCycle: {
            type: String,
            required: [true, "Billing cycle is required"],
            enum: ["monthly", "yearly"],
            default: "monthly",
        },

        nextBillingDate: {
            type: Date,
            required: [true, "Next billing date is required"],
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        notes: {
            type: String,
            trim: true,
            maxlength: [200, "Notes cannot be more than 200 characters"],
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;