import Subscription from "../models/Subscription.js";

const getMonthlyAmount = (subscription) => {
    if (subscription.billingCycle === "yearly") {
        return subscription.amount / 12;
    }

    return subscription.amount;
};

const getYearlyAmount = (subscription) => {
    if (subscription.billingCycle === "yearly") {
        return subscription.amount;
    }

    return subscription.amount * 12;
};

export const getSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find({
            user: req.user._id,
        }).sort({
            isActive: -1,
            nextBillingDate: 1,
            createdAt: -1,
        });

        return res.status(200).json({
            subscriptions,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error while fetching subscriptions",
            error: error.message,
        });
    }
};

export const createSubscription = async (req, res) => {
    try {
        const {
            name,
            amount,
            category,
            billingCycle,
            nextBillingDate,
            isActive,
            notes,
        } = req.body;

        if (!name || !amount || !category || !billingCycle || !nextBillingDate) {
            return res.status(400).json({
                message:
                    "Please provide name, amount, category, billing cycle, and next billing date",
            });
        }

        if (Number(amount) <= 0) {
            return res.status(400).json({
                message: "Amount must be greater than 0",
            });
        }

        if (!["monthly", "yearly"].includes(billingCycle)) {
            return res.status(400).json({
                message: "Billing cycle must be either monthly or yearly",
            });
        }

        const subscription = await Subscription.create({
            user: req.user._id,
            name,
            amount: Number(amount),
            category,
            billingCycle,
            nextBillingDate,
            isActive: isActive !== undefined ? isActive : true,
            notes: notes || "",
        });

        return res.status(201).json({
            message: "Subscription created successfully",
            subscription,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error while creating subscription",
            error: error.message,
        });
    }
};

export const updateSubscription = async (req, res) => {
    try {
        const {
            name,
            amount,
            category,
            billingCycle,
            nextBillingDate,
            isActive,
            notes,
        } = req.body;

        const subscription = await Subscription.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!subscription) {
            return res.status(404).json({
                message: "Subscription not found",
            });
        }

        if (amount !== undefined && Number(amount) <= 0) {
            return res.status(400).json({
                message: "Amount must be greater than 0",
            });
        }

        if (
            billingCycle &&
            !["monthly", "yearly"].includes(billingCycle)
        ) {
            return res.status(400).json({
                message: "Billing cycle must be either monthly or yearly",
            });
        }

        subscription.name = name || subscription.name;
        subscription.amount =
            amount !== undefined ? Number(amount) : subscription.amount;
        subscription.category = category || subscription.category;
        subscription.billingCycle = billingCycle || subscription.billingCycle;
        subscription.nextBillingDate =
            nextBillingDate || subscription.nextBillingDate;
        subscription.isActive =
            isActive !== undefined ? isActive : subscription.isActive;
        subscription.notes = notes !== undefined ? notes : subscription.notes;

        const updatedSubscription = await subscription.save();

        return res.status(200).json({
            message: "Subscription updated successfully",
            subscription: updatedSubscription,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error while updating subscription",
            error: error.message,
        });
    }
};

export const deleteSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!subscription) {
            return res.status(404).json({
                message: "Subscription not found",
            });
        }

        await subscription.deleteOne();

        return res.status(200).json({
            message: "Subscription deleted successfully",
            id: req.params.id,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error while deleting subscription",
            error: error.message,
        });
    }
};

export const getSubscriptionSummary = async (req, res) => {
    try {
        const subscriptions = await Subscription.find({
            user: req.user._id,
            isActive: true,
        }).sort({
            nextBillingDate: 1,
        });

        const monthlyTotal = subscriptions.reduce((sum, subscription) => {
            return sum + getMonthlyAmount(subscription);
        }, 0);

        const yearlyTotal = subscriptions.reduce((sum, subscription) => {
            return sum + getYearlyAmount(subscription);
        }, 0);

        const now = new Date();

        const next30Days = new Date();
        next30Days.setDate(now.getDate() + 30);

        const upcomingBills = subscriptions.filter((subscription) => {
            const billingDate = new Date(subscription.nextBillingDate);

            return billingDate >= now && billingDate <= next30Days;
        });

        const activeCount = subscriptions.length;

        return res.status(200).json({
            monthlyTotal,
            yearlyTotal,
            activeCount,
            upcomingBills,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error while fetching subscription summary",
            error: error.message,
        });
    }
};