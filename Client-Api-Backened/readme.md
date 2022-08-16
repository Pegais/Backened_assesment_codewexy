

Routers Used----LoginRouter
<!-- LoginRouter Api ('/auth)
          |Routers               |reuqet-type   |isPrivate  |description
    1.     | './auth/login'  |    POST       |     NO   |       verify user authentication and return JWT
    
    2.     | './auth/register' | POST | NO | regsiter new user details and give 100$ bonus ,hashing pasword and inseriting in db.
    3.     | './auth/user'  |   Get       |     NO   |       user authorization middleware used 
    4.     | './auth/update_user_data'  |   patch     |     yes   |       user authorization middleware used and than update the values in db. and balance of user is updated 







 -->


 ****ProductRouter******
 <!-- ProductRouter Api ('/product/)
          |Routers               |request-type   |isPrivate  |description
    1.     | '/insertProduct'  |    Post    |     No|   add a new product to the database.
    2.     | '/allProduct' |'|GET  | YES | Get a product  details.
    3.     | '/update_product_data' |'|patch | no| buyers purchase a new product and modify product quantity accordingly.
   
 
 
 
 
 
  -->