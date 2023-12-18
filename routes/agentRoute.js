const express = require('express');
const { agentSignUp, agentLogin } = require('../controllers/auth');
const { checkOtp } = require('../controllers/otp');
const router = express.Router();

router.post('/signup',checkOtp,agentSignUp);
router.post('/login',checkOtp,agentLogin);


module.exports = router;