const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

 



const registerUser = async (req,res) => {
    const { name, email, password } = req.body;
    try{
       if(!name ||!email ||!password){
           return res.status(400).json({message:"All fields are required", success:false});
       }

       const existingUser = await User.findOne({email});
       if(existingUser){
           return res.status(400).json({message:"User already exists with this email", success:false});
       }

       const validEmailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if(!validEmailRegx.test(email)){
           return res.status(400).json({message:"Invalid email format", success:false});
       }
       
       const hashedPassword = await bcrypt.hash(password, 10);

       const user = new User({name, email, password: hashedPassword});
       await user.save();

       if(!user){
        return res.status(500).json({message:"Failed to register user", success:false});
       }

       return res.status(201).json({message:"User registered successfully", success:true});
    }
    catch(error){
        return res.status(500).json({message:"internal server error",success:false,error: error.message});
    }
}


const loginUser = async (req,res) => {
    const { email, password } = req.body;
    try{

       if(!email ||!password){
           return res.status(400).json({message:"All fields are required", success:false});
       }

        const validEmailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!validEmailRegx.test(email)){
            return res.status(400).json({message:"Invalid email format", success:false});
        }
         
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message:"Invalid email or password", success:false});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid email or password", success:false});
        }

        const loginUser = await User.findById(user._id).select("-password -__v");

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});

        return res.status(200).json({message:"Logged in successfully", success:true, token,user:loginUser});

       }
    catch(error){
        return res.status(500).json({message:"internal server error", success:false, error: error.message});
    }
}



module.exports = { registerUser, loginUser };