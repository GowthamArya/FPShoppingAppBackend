const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        house:{
            type:String,
            required:true,
        },
        village:{
            type:String,
            required:true,
        },
        street:{
            type:String,
            required:true,
        },
        contact:{
            type:Number,
            required:true,
            trim:true,
        },
        pincode:{
            type:Number,
            length:6,
        }
});

module.exports =mongoose.model("Address", addressSchema);