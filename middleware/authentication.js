const jsonwebtoken=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
const User=require('../models/users');

exports.authenticate=async (req,res,next)=>{
    try{
        const token=req.headers.token;
        const decrypt=jsonwebtoken.verify(token,process.env.JWT_KEY);
        const user=await User.findById(decrypt.userId);
        req.user=user;
    }
    catch(err){
        console.log(err.message);
        console.log("not a valid user");
        res.json({"message":"not valid user"});
    }
    next();
}