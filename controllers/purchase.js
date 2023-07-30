const razorpay=require('razorpay');

const Order=require('../models/order');
const User=require('../models/users');

const dotenv=require('dotenv');
dotenv.config();


const getPurchasePremium=async(req,res,next)=>{
    //creating object of rezorpay
    let rez=new razorpay({
        key_id : process.env.RAZORPAY_KEY_ID,
        key_secret : process.env.RAZORPAY_KEY_SECRET
    })

    let amount=5000;
    // creating order on rezorpay
    rez.orders.create({amount:amount,currency:'INR'},async (err,order)=>{
        if(err){
            res.status(500).json(err);
            console.log(err);
        }else{
            // res.json(order);
            try{
                const ord=new Order({order_id:order.id,order_status:"pending"});
                await ord.save();
                res.json({key_id:process.env.RAZORPAY_KEY_ID,order_id:order.id});
            }
            catch(err){
                res.status(500).json({key_id:'',order_id:'',success:false});
                console.log(err.message);
            }
        }
    })
}
const postUpdatePremium=async (req,res,next)=>{
    try{
        let {order_id,payment_id}=req.body;
        const order=await Order.findOne({order_id:order_id});
        order.payment_id=payment_id;
        order.order_status="success";
        const promise1=order.save();
        req.user.ispremiumuser=1;
        const promise2=req.user.save();
        const result=await Promise.all([promise1,promise2]);
        console.log(result);
        res.status(200).json({"status":"success"});
    }
    catch(err){
        console.log(err);
        res.status(400).json(err);
    }
} 

module.exports={
    postUpdatePremium,
    getPurchasePremium
};


