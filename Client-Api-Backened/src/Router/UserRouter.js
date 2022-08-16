const express = require("express");
const LoginRouter = express.Router();
const { createAccessJwt, createRefreshJwt } = require('../utils/jwt')
const { userAuthorization } = require("../middleware/authorization.middleware")
// requiring the insert query from user/modal/user.modal
const { insert, getUserByID , storeUpdatedPassword, getUserByName,update_user_data} = require('../user/model/user.model')

LoginRouter.all("/", (req, res, next) => {
    res.json({
        message: "return user router"
    })
    next();
})

// import hassedpasswordfunc
const { hassedPassFunc } = require('../utils/BrcyptingPassword')

// create new user coming to webPage;
LoginRouter.post('/register', async (req, res) => {
    let registration_gift_balance = 100;
    let { name, nickname, password, total_products_on_shell, total_earning, total_balance } = req.body;
    total_balance += registration_gift_balance;
    
    let hasedPassword = await hassedPassFunc(password)
    console.log(hasedPassword)
    try {

        const result = await insert({ name,nickname,total_products_on_shell,total_earning,total_balance ,password:hasedPassword })
        console.log(result);
        return res.json({
            message: 'User inserted succesfully and rewarded 100$ Enjoy!!', result
        })
    } catch (error) {
        console.log(error);
        return res.json({
            message: 'error in inserting data'
        })

    }
})


// create  userLogin Route
// check if user is there in DB through email and bcrypt compare
const { ComparePassword } = require('../utils/BrcyptingPassword')
LoginRouter.post('/login', async (req, res) => {
    console.log(ComparePassword, "this is comparePassword function");
    try {

        const { name, password } = req.body
        if (!name || !password) {
            return res.json({status:0,message:"not authenticated"})
        }
        const user = await getUserByName(name);
        console.log("user from database is:", user);
        const passwordFromDatabase = user && user._id ? user.password : null;
        console.log(passwordFromDatabase, name);

        // if user and user's passsword exists than comparePassword using bcrypt
        if (user && user.password) {
            const result = await ComparePassword(password, passwordFromDatabase)
            if (result) {

                // making two tokens with jwt 
                const accessToken = await createAccessJwt(user.name, `${user._id}`);

                const refreshToken = await createRefreshJwt(user.name, `${user._id}`);
               return res.json({ status: 1, message: 'login succesfully', accessToken, refreshToken })
            }

            console.log(result);
        } else {
            console.log("User not Found or User password invalid");
            // res.json({ status: 'error', message: 'User not Found or User password invalid' })
           return res.json({ status:0, message: 'User not found or User password invalid' })
        }

    } catch (error) {
        console.log(error)
    }
    // res.json({status:"success",message:"login successully"})

})

// Get user profile router with authorization access token and also delete the expired accesstoken from redisdb
// also when user is authorized here give access to see the product page

LoginRouter.get("/user", userAuthorization, async (req, res) => {
    // suppose this data coming from client request and he is asking to access the view product

    try {
        const id = req.userid;
        const getUser = await getUserByID(id)
        // console.log(getUser);
        if (getUser._id && getUser.name) {
            
            
        }
        
        res.json({ user: req.userid ,getUser})
    } catch (error) {
        console.log(error);
    }
})

LoginRouter.patch("/update_user_data",userAuthorization, async (req, res) => {
    // get name_of_user from client and other infos.
    let { name,qty_purchased_by_buyer, price_paid_by_buyer } = req.body;
    //   find the user databse and update the total_balance accordingly.
    // update the total_products_on_shell and total_earnings accordingly
//    find the product databse and update the remaining_products accordingly.
    let user = await getUserByName(name);
    if (user._id && user.name) {
        let updatedb = await update_user_data(user,qty_purchased_by_buyer,price_paid_by_buyer)
        return res.json({ updatedb: updatedb})
    }
    res.json({ status:"0",message:"user not found"})
})






module.exports = LoginRouter