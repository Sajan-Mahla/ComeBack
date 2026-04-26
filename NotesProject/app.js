require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose")
const {DataBase} = require("./controllers")
const routes = require("./routes");

app.use(express.json());
app.use("/",routes);

DataBase();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
    console.log(`Server running on ${PORT}`);
}) 

