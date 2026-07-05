const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");

router.post("/place", async (req, res) => {
    try {
        const {
            userId,
            customer,
            paymentMethod,
            total
        } = req.body;

        const cart = await Cart.findOne({ userId });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        const order = new Order({
            userId,
            items: cart.items,
            customer,
            paymentMethod,
            total
        });

        await order.save();

        // Clear cart after order
        cart.items = [];
        await cart.save();

        res.json({
            message: "Order placed successfully",
            order
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server error"
        });
    }
});
router.get("/user/:userId", async (req, res) => {
    try {
        const orders = await Order.find({
            userId: req.params.userId
        });

        res.json(orders);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});
module.exports = router;