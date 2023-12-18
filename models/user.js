const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Order',
        }
    ],
    address:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Address',
        }
    ]
})

module.exports = mongoose.model("User",userSchema);