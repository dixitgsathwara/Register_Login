const asyncHandler =require ("express-async-handler")
const bcrypt =require("bcrypt");
const User =require("../model/User")
const jwt =require("jsonwebtoken");
const userLogin=asyncHandler(async (req,res)=>{
    const { email , password } = req.body;
    const user = await User.findOne({ email });
    if(user && (await bcrypt.compare(password, user.password))){
        const accesstoken = jwt.sign(
        {
            user: {
            name:user.name,
            email: user.email,
            id: user._id
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "20m" }
        );
        console.log(`loginside token:${accesstoken}`);
        res.cookie('token',accesstoken,{httpOnly:true , sameSite: 'None'})
        res.status(200).json({ accesstoken });
    }
    else{
        throw new Error('Email or Password incorrect');
    }
})

const userRegister = asyncHandler( async (req,res)=>{
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        password: hashPassword,
      });
    const accesstoken = jwt.sign(
        {
            user: {
            name:user.name,
            email: user.email,
            id: user._id
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "20m" }
        );
        console.log(`Registerside token:${accesstoken}`);
        res.cookie('token',accesstoken,{httpOnly:true ,sameSite: 'none',secure: true})
        res.json({ accesstoken });
});
const home = asyncHandler( async (req,res)=>{
    res.status(200).json(req.user)
})
module.exports = { userLogin,userRegister, home };