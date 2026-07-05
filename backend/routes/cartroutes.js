const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

const Product = require("../models/Product");

router.post("/add", async (req, res) => {
    try {
        const { userId, product } = req.body;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
                items: [{
                    productId: product.productId,
                    quantity: 1
                }]
            });
        } else {
            const existingItem = cart.items.find(
                item => item.productId.toString() === product.productId
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.items.push({
                    productId: product.productId,
                    quantity: 1
                });
            }
        }

        await cart.save();
        res.json({ message: "Item added to cart", cart });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});

// GET CART
router.get("/:userId", async (req, res) => {
    try {
       const cart = await Cart.findOne({
    userId: req.params.userId
}).populate("items.productId");

        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// REMOVE ITEM
router.post("/remove", async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const cart = await Cart.findOne({ userId });

        cart.items = cart.items.filter(
            item => item.productId !== productId
        );

        await cart.save();

        res.json({ message: "Item removed", cart });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/update", async (req, res) => {
    try {
        const { userId, productId, action } = req.body;

        const cart = await Cart.findOne({ userId });

        const item = cart.items.find(
            item => item.productId.toString() === productId
        );

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        if (action === "increase") {
            item.quantity++;
        } else if (action === "decrease") {
            item.quantity--;

            if (item.quantity <= 0) {
                cart.items = cart.items.filter(
                    item => item.productId.toString() !== productId
                );
            }
        }

        await cart.save();
        res.json(cart);

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
module.exports = router;