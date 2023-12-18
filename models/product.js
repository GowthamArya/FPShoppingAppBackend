const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    agentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Agent"
    },
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    sellPrice:{
        type:Number,
        required:true,
    },
    mrp:{
        type:Number,
        required:true,
    },
    ratingAndReviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview"
        }
    ],
    pincodes:[{
        type:Number,
        trim:true,
    }],
    image:
        {
            type:String,
        }
});

module.exports = mongoose.model("Product",productSchema); 