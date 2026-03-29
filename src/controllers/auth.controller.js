const userModel=require("../models/user.model");
const jwt=require("jsonwebtoken");


async function registerUser(req,res){
    const {username,email,password,role}=req.body;
    
    const isUserAlreadyExists=await userModel.findOne({email});
    if(isUserAlreadyExists){
        return res.status(409).json({message:"User already exists"});
    }
    const user=await userModel.create({username,email,password,role});
    const token=jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1h"});  
    res.cookie("token",token,{httpOnly:true,secure:true,sameSite:"strict",maxAge:60*60*1000});
    return res.status(201).json({message:"User registered successfully",user:{
        username:user.username,
        email:user.email,
        role:user.role,
        _id:user._id,
    }});
}

module.exports={registerUser};