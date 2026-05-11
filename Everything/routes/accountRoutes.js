const express = require("express");
const router = express.Router();

const {createAccount} = require("../controller/accountController");
const verifyToken = require("../middleware/authMiddleware")

router.post("/createAccount",verifyToken, createAccount);

module.exports = router;