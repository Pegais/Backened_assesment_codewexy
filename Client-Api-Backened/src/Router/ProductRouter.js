const express = require("express");
const ProductRouter = express.Router();
const{insert,getProduct,getProductByID} = require("../user/product_model/product.model")

ProductRouter.all("/", (req, res, next) => {
    res.json({
        message: "return user router"
    })
    next();
})

ProductRouter.post("/insertProduct", async (req, res, next) => { 
    
    const { product_title, total_qty, remain_qty, price, product_image } = req.body;
    try {

        const result = await insert({ product_title, total_qty, remain_qty, price, product_image })
        console.log(result);
        return res.json({
            message: 'Product inserted succesfully', result
        })
    } catch (error) {
        console.log(error);
        return res.json({
            message: 'error in inserting data'
        })

    }
})

const {userAuthorization}= require("../middleware/authorization.middleware")

ProductRouter.get('/allProducts',userAuthorization,async (req, res) => { 
    const { product_title } = req.body;
    const resultOfProduct = await getProduct(product_title);
    res.json({  resultOfProduct });
})


const {update_product_data} =require("../user/product_model/product.model")
ProductRouter.patch("/update_product_data", async (req, res) => {
    const { product_title ,qty_purchased_by_buyer,price_paid_by_buyer} = req.body;
    // check if product is there in db;
    const resultFromDb = await getProduct(product_title);
    if (resultFromDb._id && resultFromDb.product_title) {
        if (resultFromDb.price !== price_paid_by_buyer) {
            return res.json({ message:"buyer not payinh correct price"})
        }
        let updatedDb = await update_product_data(resultFromDb,qty_purchased_by_buyer,price_paid_by_buyer)
        return res.json({ updatedDb });
    }
})



module.exports =ProductRouter