const express = require('express');
const { createProduct, deleteProduct, getAllProducts, getProductDetails } = require('../controllers/product');
const { checkOtp } = require('../controllers/otp');
const router = express.Router();

router.post("/create",checkOtp,createProduct);
router.post("/delete",checkOtp,deleteProduct);


router.get("/products",getAllProducts);
router.get("/product/:_id",getProductDetails);

module.exports = router;