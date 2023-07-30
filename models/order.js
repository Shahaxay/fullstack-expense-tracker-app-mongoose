const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const orderSchema=new Schema({
    order_id:{
        type:String,
        required:true
    },
    payment_id:String,
    order_status:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('Order',orderSchema);

// const Sequelize=require('sequelize');

// const sequelize=require('../util/database');

// const Order=sequelize.define('orders',{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         primaryKey:true,
//         allowNull:false
//     },
//     order_id:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     payment_id:Sequelize.STRING,
//     order_status:{
//         type:Sequelize.STRING,
//         allowNull:false
//     }
// });

// module.exports=Order;