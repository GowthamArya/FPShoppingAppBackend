const express = require('express');
const { dealerSignup, dealerlogin } = require('../controllers/auth');
const { checkOtp } = require('../controllers/otp');
const router = express.Router();

router.post("/signup",checkOtp,dealerSignup);
router.post("/login",checkOtp,dealerlogin);

module.exports = router;