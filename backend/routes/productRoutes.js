const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// ================= ADD PRODUCT =================
router.post("/add", async (req, res) => {
    try {
        const { name, price, image, category } = req.body;

        const product = new Product({
            name,
            price,
            image,
            category
        });

        await product.save();

        res.json({
            message: "Product added successfully",
            product
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ================= GET ALL PRODUCTS =================
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ================= GET PRODUCTS BY CATEGORY =================
router.get("/category/:category", async (req, res) => {
    try {
        const products = await Product.find({
            category: req.params.category
        });

        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;