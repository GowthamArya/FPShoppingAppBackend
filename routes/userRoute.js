const express = require('express');
const { userSignUp, userLogin } = require('../controllers/auth');
const { checkOtp } = require('../controllers/otp');
const { createOrder, cancelOrder } = require('../controllers/order');
const router = express.Router();

router.post('/signup',checkOtp,userSignUp);
router.post('/login', checkOtp ,userLogin);
router.post("/create/order",createOrder);
router.post("/delete/order",cancelOrder);


module.exports = router;