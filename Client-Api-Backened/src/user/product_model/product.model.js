// here in user.model ,we will write queries to the database;
const { ProductSchema } = require('./product.schema')

// insert query
const insert = (userObj) => {
    return new Promise((resolve, reject) => {

        ProductSchema(userObj).save()
            .then(data => resolve(data))
            .catch(error => reject(error));
    })
}

// getting userEmail from Database;

const getProduct= (name) => {
    return new Promise((resolve, reject) => {
        try {
            if (!name) {
                return false;
            }
            ProductSchema.findOne({ name}, (error, data) => {
                if (error) {
                    reject(error)
                }
                else {
                    resolve(data)
                }
            })

        } catch (error) {
            console.log(error)

        }


    })
}
const getProductByID = (_id) => {
    return new Promise((resolve, reject) => {
        try {
            if (!_id) {
                return false;
            }
            ProductSchema.findOne({ _id }, (error, data) => {
                if (error) {
                    reject(error)
                }
                else {
                    resolve(data)
                }
            })

        } catch (error) {
            console.log(error)

        }


    })
}

const update_product_data = (product,buyer_qty,buyer_price) => {
    // console.log(buyer_qty,buyer_price);
    let { product_title,total_qty,remain_qty } = product;
    if (buyer_qty < total_qty) { 
        remain_qty = total_qty-buyer_qty

    }
    return new Promise((resolve, reject) => {
        console.log(remain_qty,total_qty);
        try {
          ProductSchema.findOneAndUpdate(
                {product_title},
                {
                    $set: {
                       "remain_qty": remain_qty
                    }
                },
                {new:true}
            ).then((data) => resolve(data))
                .catch((error) => {
                    reject(error)
                    console.log(error);
                })
        } catch (error) {
            reject(error)
        }
    })
}



module.exports = {
    insert,
    getProductByID,
    getProduct,
    update_product_data,
    

};
