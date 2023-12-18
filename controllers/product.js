const agent = require('../models/agent');
const product = require('../models/product');

exports.createProduct = async (req,res)=>{
    try {
        const {agentId,email,name,description,sellPrice,mrp,ratingAndReviews,pincodes,image} = req.body;
        
        if(!agentId ||!email || !name || !description || !sellPrice || !mrp || !pincodes || !image){
            return res.status(400).json({
                success: false,
                message:"Please fill all required information",
            })
        }

        const agentInfo = await agent.findOne({email: email});
        if(!agentInfo){
            return res.status(404).json({
                success: false,
                message:"Unauthorized access, product cannot be created",
            });
        }
        const createProduct = await product.create({
            agentId:agentId,
            name:name,
            description:description,
            sellPrice:sellPrice,
            mrp:mrp,
            ratingAndReviews:ratingAndReviews,
            pincodes:[...pincodes],
            image:image
        })
        return res.status(200).json({
            success: true,
            message:"Product created successfully",
            product: createProduct,
        });
    } catch (e) {
        console.error(e)
    }
}

exports.updateProduct = async (req,res)=>{
    try {
        const {productId,email,name,description,sellPrice,mrp,ratingAndReviews,pincodes} = req.body;
        
        if(!productId || !email || !name || !description || !sellPrice || !mrp || !pincodes){
            return res.status(400).json({
                success: false,
                message:"Please fill all required information",
            })
        }

        const agentInfo = await agent.findOne({email: email});

        if(!agentInfo){
            return res.status(404).json({
                success: false,
                message:"Unauthorized access, product cannot be created",
            });
        }
        const existedProduct  = await product.findOne({email:email});
        if(!existedProduct){
            return res.status(404).json({
                success: false,
                message:"Unauthorized access, product cannot be updated",
            })
        }
        const createProduct = await product.findByIdAndUpdate({_id:productId},{
            name:name,
            description:description,
            sellPrice:sellPrice,
            mrp:mrp,
            ratingAndReviews:ratingAndReviews,
            pincodes:[...pincodes]
        })
        return res.status(200).json({
            success: true,
            message:"Product created successfully",
            product: createProduct,
        });
    } catch (e) {
        console.error(e)
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const {email, productId} = req.body;
        if(!email || !productId) {
            return res.status(404).json({
                success: false,
                message:"Unvalidated request"
            });
        }
        const agentInfo = await agent.findById({_id:email});
        if(!agentInfo){
            return res.status(200).json({
                success:true,
                message:"Invalid agent"
            });
        }
        const productInfo = await product.findById({_id:productId});
        if(!productInfo){
            return res.status(200).json({
                success:true,
                message:"Invalid product"
            });
        }
        await product.findByIdAndDelete({_id:productId});
        return res.status(200).json({
            success:true,
            message:"Deleted product successfully"
        });
    } catch (e){
        console.error(e)
    };
};

exports.getAllProducts = async (req,res) => {
    try {
        const response = await product.find();
        if(response){
            return res.status(200).json({
                success:true,
                message:"Products list",
                list:response,
            });
        }
    } catch (e) {
        console.error(e)
    }
}

exports.getProductDetails = async (req,res) => {
    try{
        const {_id} = req.params;
        if(!_id || typeof(_id)!=="string") {
            return res.status(404).json({
            success:false,
            message:"id required or undefined"
        })};
        const productDetails = await product.findById(_id);
        if(!productDetails) res.status(404).json({
            success:false,
            message:"Product not not found"
        });
        return res.status(200).json({
            success:true,
            message:"Product found",
            productDetails,
        });
    } catch (e) {
        console.error(e.message)
    }
    
}