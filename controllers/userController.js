const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


// Desc: Controller for user registration
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Check for missing fields
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }

    // Check if user already exists
    const checkUser = await User.findOne({ email: req.body.email });
    if (checkUser) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); 
    console.log("The hashed password is:", hashedPassword);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

   if(user){
    
    res.status(201).json({
        _id: user.id,
        username: user.username,
        email: user.email,
    });

   }else{
         res.status(400);
         throw new Error("Invalid user data");
   }
});


//Desc: Controller for usersLogin
//@route POST /api/users/login
//@access Public
const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }

    const user = await User.findOne({ email: email });
    // compare the password
    if (user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
             username: user.username,
             email: user.email,
             _id: user._id

        }, 
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '1d'}
    );
         res.status(200).json({accessToken})
    }
    else{
        res.status(401);
        throw new Error("Invalid email or password");
    } 
});


//Desc: Controller for usersInfo
//@route POST /api/users/userinfo
//@access Private
const userInfo = asyncHandler(async (req, res) => {
    res.json({ user: req.user });
});

module.exports = { registerUser, userLogin, userInfo };
