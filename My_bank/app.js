// main server
require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const accountRoutes = require("./routes/accountRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

app.use(express.json());

connectDB();

app.use("/auth", authRoutes);
app.use("/", accountRoutes);
app.use("/", transactionRoutes);

app.get("/", (req,res) => {
    return res.json({message: "Bank server running"});
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})