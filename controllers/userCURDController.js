const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");

const getUserProfile = async (req,res) => {
   
    const  userId  = req.user.id;
    
    if(!userId){
        return res.status(401).json({message:"Unauthorized", success:false});
    }

    if(!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(400).json({message:"Invalid user id", success:false});
    }

    const user = await User.findById(userId).select("-password -__v");

    if(!user){
        return res.status(404).json({message:"User not found", success:false});
    }

    return res.status(200).json({message:"User profile retrieved successfully", success:true, user});
}

module.exports = getUserProfile;