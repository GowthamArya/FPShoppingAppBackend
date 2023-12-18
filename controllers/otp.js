const OTP = require("../models/otp");

exports.otpSender = async (req,res) => {
    try {
        const {email} =req.body;
        if(!email) {
            return res.status(401).json({
                success: false,
                message:"Invalid email address",
            })
        }
        const createOtp = Math.floor(Math.random() * (9999 - 1000) + 1000);
        await OTP.create({
            email: email,
            otp: createOtp,
        })
        return res.status(200).json({
            success: true, 
            message:"OTP sent successfully"
        });
    } catch (e) {
        console.error(e)
    }
}

exports.checkOtp = async (req,res,next) => {
    try {
        const {email,otp} = req.body;
        if(!email || !otp) {
            return res.status(401).json({
                success: false,
                message:"Invalid Email Address or OTP.",
            })
        };
        const findOtp = await OTP.find({email: email});
        if(!findOtp.length){
            console.log(findOtp);
            return res.status(401).json({
                success: false,
                message:"OTP Expired,Please Try Again later."
            });
        }
        if(findOtp[findOtp.length-1].otp !== otp) {
            return res.status(401).json({
                success: false,
                message:"OTP not Matched. Please enter a correct OTP",
            })
        };
        next();
        // return res.status(200).json({
        //     success: true,
        //     message:"Verification Success",
        // })
    } catch (e) {
        console.error(e)
    };
}