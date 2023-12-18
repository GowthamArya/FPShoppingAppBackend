const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    prodectIds:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    }],
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    addressId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address",
        required:true
    },
    pincode:{
        type:String,
    }
})

module.exports = mongoose.model("Order",orderSchema);