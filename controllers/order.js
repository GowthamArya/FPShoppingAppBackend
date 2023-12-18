const User = require("../models/user")
const Product = require("../models/product")
const Address = require("../models/address");
const order = require("../models/order");

exports.createOrder = async (req,res) => {
    try {
        const {productIds,userId,addressId,pincode} = req.body;
        if (!productIds || !userId || !addressId || !pincode) {
            return res.status(400).json({
                success: false,
                message:'Error creating order,please enter all required fields.',
            })
        }
        if (!await User.findOne({_id:userId})) {
            return res.status(404).json({
                success: false,
                message:"User not found, Please relogin your account...",
            })
        }
        if (!await Address.findOne({_id:addressId})) {
            return res.status(404).json({
                success: false,
                message:"Address not found, Please create a address to your account and try again.",
            })
        }
        if(pincode.length !== 6){
            return res.status(404).json({
                success: false,
                message:"Please enter a valid Pincode",
            });
        }
        const products = productIds.map(async (productId) => {
            const checkProduct = await Product.findOne({_id:productId});
            if (!checkProduct) {
                return res.status(404).json({
                    success: false,
                    message:"Product not found, Please try again later",
                    productId,
                })
            }
            return productId;
        })
        const createOrder = await order.create({
            productIds:products,
            userId:userId,
            addressId:addressId,
            pincode:pincode,
        })
        return res.status(200).json({
            success: true,
            message:"Order created successfully",
        })
    } catch (err) {
        console.log(err);
    }
}

exports.getOrderDetails = async (req,res)=>{
    try{
        const {userId}=req.params;
            if (!userId) res.status(404).json({
                    success:false,
                    message:"Invalid user id..!!!"
                })
            const orderDetails = await order.findOne({userId:userId});
            if(!orderDetails) return res.status(404).json({
                success:false,
                message:"No Orders Found.Start ordering..."
            })
            return res.status(200).json(orderDetails)
    }catch(err){
        console.log(err.message)
    }
    
}

exports.cancelOrder = async (req,res) => {
    try {
        const {orderId} = req.body;
        if (!orderId){
            return res.status(404).json({
                success: false,
                message:"Order Id is required",
            })
        }
        const orderValidation = await order.findOne({_id: orderId});
        if(!orderValidation){
            return res.status(404).json({
                success: false,
                message:"Order Id is not found",
            });
        }
        const orderDelete = await order.findOneAndDelete({_id: orderId}).then(()=>{
        return res.status(200).json({
            success: false,
            message:"Order has been deleted",
        });
        }).catch(err => {
            return res.status(500).json({
                success: false,
                message: err.message,
            })
        });
    } catch (err) {
        console.log(err)
    }
}