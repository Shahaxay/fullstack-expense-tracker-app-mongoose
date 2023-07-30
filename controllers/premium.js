const User = require('../models/users');

exports.getLeaderBoard=async(req,res,next)=>{
    try{
        const requiredResult=await User.find().select('name totalExpenses -_id').sort({totalExpenses:-1});
        // const requiredResult=await User.findAll({
        //     attributes:['name','totalExpenses'],
        //     order:[['totalExpenses','DESC']]
        // })
        console.log(requiredResult);
        res.json(requiredResult);
    }
    catch(err){
        console.log(err);
    }
}
