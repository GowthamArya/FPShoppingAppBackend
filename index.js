const express = require('express');
const app = express();
const agentRouter = require("./routes/agentRoute");
const addressRouter = require("./routes/addressRoute");
const dealer = require("./routes/dealer");
const user = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const otpRouter = require("./routes/otp");
const orderRouter = require("./routes/order")
const cors = require("cors");

app.use(cors());
require("dotenv").config();
require("./config/dataBase").mongoDB();

app.use(express.json());
app.use("/api/v1/address",addressRouter);
app.use("/api/v1/agent",agentRouter);
app.use("/api/v1/dealer",dealer);
app.use("/api/v1/user",user);
app.use("/api/v1/product",productRouter);
app.use("/api/v1/otp",otpRouter)
app.use("/api/v1/order",orderRouter)


app.get("/", (req, res) => {
    // res.send("Connected successfully")
    return res.status(200).json({
        success: true,
        message:"Connected successfully"
    })
})

app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`);
});
