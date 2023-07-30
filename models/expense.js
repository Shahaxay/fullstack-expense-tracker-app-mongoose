const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const expenseSchema=new Schema({
    expenseAmount:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        require:true
    }
})

module.exports=mongoose.model('Expense',expenseSchema);


// const Sequelize=require('sequelize');

// const sequelize=require('../util/database');

// const Expense=sequelize.define('expenses',{
//     id:{
//         type:Sequelize.INTEGER,
//         primaryKey:true,
//         autoIncrement:true,
//         allowNull:false
//     },
//     expenseAmount:{
//         type:Sequelize.INTEGER,
//         allowNull:false
//     },
//     description:{
//         type:Sequelize.STRING,
//         allowNull:false,
//     },
//     category:{
//         type:Sequelize.STRING,
//         allowNull:false
//     }
// });

// module.exports=Expense;