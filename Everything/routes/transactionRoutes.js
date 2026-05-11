const express = require("express");
const router = express.Router();

const {
    deposit,
    withdraw,
    getBalance,
    getTransaction
} = require("../controller/transactionController");

const verifyToken = require("../middleware/authMiddleware");

router.post("/deposit", verifyToken,deposit);
router.post("/withdraw", verifyToken,withdraw);
router.get("/balance",verifyToken,getBalance);
router.get("/transactions/:accountNumber",verifyToken,getTransaction);

module.exports = router;