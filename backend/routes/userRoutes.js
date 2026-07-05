const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt"); // only once

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { name, email, phone, address, password } = req.body;

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            phone,
            address,
            password: hashedPassword
        });

        await newUser.save();

        res.json({ message: "Registration successful" });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        res.json({
    message: "Login successful",
    user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address
    }
});

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/profile/:email", async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.params.email
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;