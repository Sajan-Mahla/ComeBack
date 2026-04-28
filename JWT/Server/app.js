require("dotenv").config();
const express = require("express");


const app = express();

app.use(express.json());

const authRoutes = require("../routes/authRoutes");
app.use("/", authRoutes);

const connectDB = require("../config/db");

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
    console.log(`Server running on port: ${PORT}`);
})