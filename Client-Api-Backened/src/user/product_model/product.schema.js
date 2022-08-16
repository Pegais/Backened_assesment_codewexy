// this schema is for defining mongo database.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
    // ObjectId,
    product_title: {
        type: String,
        maxlength: 40,
        required: true
    },
    total_qty: {
        type: Number,
        required: true,
    },
    remain_qty: {
        type: Number,
        required:true,
    },
    price: {
        type: Number,
        required: true
    },
    product_image: {
        data: Buffer
        // required: true
    }
   

});
// exporting by making databse model table and passing the schema as second argument;
module.exports = {
    ProductSchema:mongoose.model('Product',ProductSchema)
}