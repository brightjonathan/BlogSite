const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const asyncHandler = require('express-async-handler');
const User = require('../ModelScheme/userShema')


//@desc      user registration
//@route    POST /user/signup
//@access    public
const registeruser = asyncHandler(async (req, res) =>{
   
    const {firstName, lastName, email, password} = req.body;
    
    
    //checking if the user Exit
    let userExit = await User.findOne({email});
    if(userExit) {
        res.status(400)
        throw new Error('user already Exit')
    }

    //Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);
    
    //create user
    const user = await User.create({
        email,
        password: hashedpassword,
        name: `${firstName} ${lastName}`,
    });
      
    if(user){
        res.status(200).json({
            user,
            token: generateToken(user._id)
        })
    } else{
        res.status(400)
        throw new Error('invalid user data')
    }
});


//@desc      user Authentication
//@route    POST /user/login
//@access    public
const loginuser = asyncHandler(async (req, res) =>{
     
    const {email, password} = req.body;

    //check for user by email
    const OldUser = await User.findOne({email});
    if(!OldUser){
         res.status(404) 
        throw new Error('invalid credential')
    }

    const isPasswordCorrect = await bcrypt.compare(password, OldUser.password)
    if(!isPasswordCorrect) {
         res.status(404)
         throw new Error('invalid credential')
    }else{
        res.status(200).json({OldUser, token: generateToken(OldUser._id)})
    }

});


//@desc      google sign In
//@route    by google
//@access    public
const google = asyncHandler(async (req, res) =>{
    const {email, name, token, googleId} = req.body;

    //checking if there is already a user
    const oldUser = await User.findOne({email});
    if(oldUser){
        //const result = {_id: oldUser._id.toString(), email, name};
        res.status(404)
        throw new Error('user already exit');
    }

    //if successful
    const result = await User.create({
        email,
        name,
        googleId
    });

    res.status(200).json({result, token})
});


//generate JWT token
const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: '30d',
    })
}


module.exports = {
   registeruser,
   loginuser,
   google
};

