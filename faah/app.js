const express = require("express");
const app = express();

const routes = require("./routes");
require("dotenv").config();

app.use("/",routes);

const PORT = process.env.PORT || 3000;

app.listen (PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})