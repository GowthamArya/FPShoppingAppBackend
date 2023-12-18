const express = require('express');
const { otpSender,checkOtp } = require('../controllers/otp');
const router = express.Router();

router.post("/send",otpSender);
router.get("/check",checkOtp);


module.exports= router;