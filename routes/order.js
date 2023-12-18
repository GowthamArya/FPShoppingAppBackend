const express=  require("express");
const { createOrder, getOrderDetails } = require("../controllers/order");
const router = express.Router();

router.post("/create",createOrder);
router.get("/myorders/:userId",getOrderDetails)

module.exports = router;