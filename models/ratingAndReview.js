const mongoose = require('mongoose');

const ratingAndReviewSchema = mongoose.Schema({
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    rating:{
        type:Number,
        required:true,
    },
    review:{
        type:string,
    }
});

module.exports = mongoose.model('Rating', ratingAndReviewSchema);