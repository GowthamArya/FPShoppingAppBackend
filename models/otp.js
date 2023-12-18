const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const { html } = require('../utils/html');

const otpSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:'2m'
    }
});
async function sendVerificationEmail (email,otp) {
    try {
        const mailResponse = await mailSender(email,"OTP from Farmer's Palm",html(otp));
    } catch (e){
        console.error(e);
    }
}
otpSchema.pre('save',async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
});

module.exports = mongoose.model('otp', otpSchema);