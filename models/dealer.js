const mongoose = require('mongoose');

const dealerSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    addressId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Address',
    },
    verification:{
        type:Boolean,
        default:false,
    },
    pincode:{
        type:String,
        length:6,
    }
});

module.exports = mongoose.model("Dealer",dealerSchema);