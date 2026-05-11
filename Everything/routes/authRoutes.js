const express = require("express");
const router = express.Router()

const {register,login,verifyLoginOTP} = require("../controller/authController");


router.post("/register", register);
router.post("/login", login)
router.post("/verify-login", verifyLoginOTP)

module.exports = router;