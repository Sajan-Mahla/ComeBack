const path = require("path");
require("dotenv").config();
const express = require("express");
const ConnectDb = require("./db")
const authRoutes = require("./routes/authRoutes");
const connectDb = require("./db");
const app = express();
const accountRoutes = require("./routes/accountRoutes");
const transactionRoutes = require("./routes/transactionRoutes")
const cors = require("cors")
app.use(cors())



app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;

connectDb();
app.use("/api/auth", authRoutes);






app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})