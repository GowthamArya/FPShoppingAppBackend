const mongoose = require('mongoose');
require("dotenv").config();


exports.mongoDB = ()=> { 
    mongoose.connect(process.env.DB)
    .then(()=> console.log('mongoDB connected'))
    .catch((err)=> console.error(err));
}