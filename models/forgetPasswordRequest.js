const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const forgetPasswordRequestSchema=new Schema({
    requestid:{
        type:String,
        required:true,
        unique:true
    },
    isactive:{
        type:Boolean,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
});

module.exports=mongoose.model('ForgetPasswordRequest',forgetPasswordRequestSchema);



// const Sequelize=require('sequelize');

// const sequelize=require('../util/database');

// const ForgetPasswordRequest=sequelize.define('forgetPasswordRequest',{
//     id:{
//         type:Sequelize.STRING,
//         primaryKey:true,
//     },
//     isactive:{
//         type:Sequelize.STRING,
//         allowNull:false
//     }
// });

// module.exports=ForgetPasswordRequest;