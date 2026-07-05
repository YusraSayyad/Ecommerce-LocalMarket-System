const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/users", require("./routes/userRoutes"));
app.use("/cart", require("./routes/cartRoutes"));
const productRoutes = require("./routes/productRoutes");

app.use("/images", express.static("public/images"));

app.use("/products", productRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/orders", orderRoutes);
/* ✅ ADD THIS HERE */
app.get("/", (req, res) => {
    res.send("Fresh Mart API is running");
});

// database connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// start server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});