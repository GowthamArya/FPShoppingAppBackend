const address = require('../models/address');
const User = require('../models/user');

exports.createAddress = async (req,res)=>{
    try {
        const {user,house,street,village,contact,pincode} = req.body;
        if(!user || !house || !village || !contact || !pincode){
            return res.status(400).json({
                success: false,
                message:"Please enter all required information"
            });
        }

        const userInfo = await User.findById(user);

        if(!userInfo){
            return res.status(404).json({
                success: false,
                message:"user does not exist"
            });
        }
        try {
            const createAddress = await address.create({
                user:user,
                house:house,
                street:street,
                village:village,
                contact:contact,
                pincode:pincode
            }); 
            return res.status(200).json({
                success: true,
                message: "Address created successfully",
                address: createAddress,
            });
        } catch(err){
            console.log(err)
        };
    } catch (err) {
        console.error(err)
    };
}

exports.updateAddress = async (req, res) => {
    try {
        const {addressId,user,house,street,village,contact,pincode} = req.body;
        if(!addressId || !user || !house || !village || !street || !contact || !pincode){
            return res.status(400).json({
                success: false,
                message:"Please enter all required information"
            });
        }

        const userInfo = await User.findById(user);

        if(!userInfo){
            return res.status(404).json({
                success: false,
                message:"user does not exist"
            });
        }
        try {
            const updateAddress = await address.findByIdAndUpdate({_id:addressId},{
                user:user,
                house:house,
                street:street,
                village:village,
                contact:contact,
                pincode:pincode
            }); 
            return res.status(200).json({
                success: true,
                message: "Address updated successfully",
                address: updateAddress,
            });
        } catch(err){
            console.log(err)
        };
    } catch (err) {
        console.log(err)
    }
}

exports.deleteAddress = async (req, res) => {
    try {
        const {addressId}=req.body;
        await address.findByIdAndDelete({_id:addressId}).then(()=>{console.log("address")});
        return res.status(200).json({
            success: true,
            message: "Address deleted successfully",
        })
    } catch (err) {
        console.error(err)
    }
}