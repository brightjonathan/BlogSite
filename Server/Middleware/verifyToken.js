const jwt = require('jsonwebtoken'); 
const asyncHandler = require('express-async-handler');
const User = require('../ModelScheme/userShema')

//ACCESS CONTROL ENGINE

const verify = asyncHandler( async (req, res, next) =>{
   
        try {
            //getting the token
            const token = req.headers.authorization.split(' ')[1];
             //checking iftooken is less than 500
             const  isCustomAuth = token.length < 500;
             let Decode ;

             //if its token
             if(token && isCustomAuth){
                Decode = jwt.verify(token, process.env.JWT_SECRET);
                 req.userId = Decode?.id;
             }else{
                 //if with google registretion
                 Decode = jwt.decode(token);
                 const googleId = Decode?.sub.toString();
                 const user = await User.findOne({ googleId });
                 req.userId = user?._id;
             }
             next()
        } catch (error) {
            console.log(error)
        }
 
});



module.exports = {
    verify
};