const bcrypt = require("bcrypt");
const agent = require("../models/agent");
const dealer = require("../models/dealer");
const User = require("../models/user");

exports.agentSignUp = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const existingUser = await agent.findOne({email: email});
    
        if(existingUser){
            return res.status(401).json({
                success: false,
                message:"User already registered"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const createAgent = await agent.create({
            email: email, password: hashedPassword
            }).then(()=>{
            return res.status(200).json({
                success: true,
                message:"Agent created successfully",
                id:createAgent._id,
            })})
            .catch((e)=> {
                console.log(e);
                return res.status(500).json({
                    success: false,
                    message:"Error while creating agent",
                });
            })
    } catch (e) {
        console.error(e)
    }
    
}

exports.agentLogin = async (req,res) => {
    try {
        const {email,password} = req.body;
        const existingUser = await agent.findOne({email});
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message:"User not found",
            });
        }
    
        if (!await bcrypt.compare(password,existingUser.password)) {
            return res.status(400).json({
                success: false,
                message:"Password does not match",
            });
        }
        return res.status(200).json({
                success: true,
                message:"Login successfull",
                id:existingUser._id
        });
    } catch (e) {
        console.error(e)
    };
    
}

exports.dealerSignup = async (req,res)=>{
    try {
        const {email,password,addressId,pincode} = req.body
        const existingDelaer = await dealer.findOne({email:email});
        if (!email || !password || !addressId || !pincode) {
            return res.status(400).json({
                success: false,
                message:"Please enter all required information",
            })
        }
        if (existingDelaer){
            return res.status(400).json({
                success: false,
                message:"User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const createDealer = await dealer.create({
            email:email,
            password:hashedPassword,
            addressId:addressId,
            pincode:pincode
        });
        return res.status(200).json({
            success:true,
            message:"User created successfully",
            id:createDealer._id,
        })
    } catch (err) {
        console.error(err);
    }
    
}

exports.dealerlogin = async (req,res) => {
    try {
        const {email,password} = req.body;
        const existingDealer = await dealer.findOne({email: email});
        if (!existingDealer){
            return res.status(400).json({
                success:false,
                message:"User not found, please sign up first",
            })
        }
        if(!await bcrypt.compare(existingDealer.password, password)){
            return res.status(401).json({
                success:false,
                message:"Password is incorrect,please try again",
            })
        }
        return res.status(200).json({
            success:true,
            message:"User logged in successfully",
            id: existingDealer.id,
        })
    } catch (err) {
        console.error(err);
    }
}

exports.userSignUp = async (req,res) => {
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please enter all required information",
            })
        }

        const existingUser = await User.findOne({
            email: email,
        });

        if(existingUser){
            return res.status(404).json({
                success:false,
                message:"User already exists",
            });
        }
        const hashedPassword = await bcrypt.hash(password,10);
        try {
            const user = await User.create({
                email: email,
                password:hashedPassword
            });
            return res.status(200).json({
                success:true,
                message:"User created successfully",
                id:user._id,
            })
        } catch(err) {
            console.log(err)
        }
    } catch (err) {
        console.error(err);
    }
};

exports.userLogin = async (req,res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password",
            });
        }
        const existingUser = await User.findOne({
            email: email
        });
        if (!existingUser || !await bcrypt.compare(password, existingUser.password)){
            return res.status(400).json({
                success:false,
                message:"Wrong Credintials,User Not Found.",
            })
        }
        return res.status(200).json({
            success:true,
            message:"User logined successfully",
            id:existingUser._id,
        });
    } catch (err) {
        console.log(err)
    };
};