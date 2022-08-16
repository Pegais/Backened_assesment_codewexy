// here in user.model ,we will write queries to the database;
const { UserSchema } = require('./use.schema')

// insert query
const insert = (userObj) => {
    return new Promise((resolve, reject) => {

        UserSchema(userObj).save()
            .then(data => resolve(data))
            .catch(error => reject(error));
    })
}

// getting userEmail from Database;

const getUserByName= (name) => {
    return new Promise((resolve, reject) => {
        try {
            if (!name) {
                return false;
            }
            UserSchema.findOne({ name}, (error, data) => {
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
const getUserByID = (_id) => {
    return new Promise((resolve, reject) => {
        try {
            if (!_id) {
                return false;
            }
            UserSchema.findOne({ _id }, (error, data) => {
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

const storeRefreshJWT = (_id, token) => {
    console.log(_id,typeof id);
    return new Promise((resolve, reject) => {
        try {
            UserSchema.findByIdAndUpdate(
                { _id },
                {
                    $set: {
                        "refreshJWT.token": token,
                        "refreshJWT.addedAt": Date.now()
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


const update_user_data = (user,buyer_qty,buyer_price) => {
    // console.log(email,password);
    let { name, total_products_on_shell, total_earning, total_balance } = user;

    total_products_on_shell = total_products_on_shell - buyer_qty; 
    total_earning = total_earning + buyer_price;
    total_balance = total_balance + buyer_price;
    return new Promise((resolve, reject) => {
        try {
            UserSchema.findOneAndUpdate(
                { name},
                {
                    $set: {
                        "total_products_on_shell": total_products_on_shell,
                        "total_earning": total_earning,
                        "total_balance": total_balance
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
    getUserByName,
    storeRefreshJWT,
    getUserByID,
    update_user_data,
    

};
