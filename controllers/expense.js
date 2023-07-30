// const sequelize=require('../util/database');

const Expense=require('../models/expense');
const User=require('../models/users');


exports.postAddExpense=async (req,res,next)=>{
    let {expenseAmount,description,category}=req.body;
    console.log(expenseAmount,description,category);
    try{
        const expense=new Expense({expenseAmount,description,category,user:req.user});
        const result=await expense.save();
        console.log(result);
        //updating user cart
        req.user.totalExpenses=req.user.totalExpenses+parseInt(expenseAmount);
        req.user.numberOfExpenses=req.user.numberOfExpenses+1;
        await req.user.save();
        // console.log(totalExpense,numberOfExpenses);
        res.status(200).json({id:result._id,premium:req.user.ispremiumuser,numberOfExpense:req.user.numberOfExpenses});
    }
    catch(err){
        console.log(err.message);
        res.status(400).json(err);  
    }
}
exports.getExpenses=async (req,res,next)=>{
    const page=Number(req.query.page);
    const rows_per_page=Number(req.query.rows_per_page);
    const TOTAL_NUMBER_OF_EXPENSES= req.user.numberOfExpenses;
    let ITEMS_PER_PAGE=10;
    if(rows_per_page){
        ITEMS_PER_PAGE=rows_per_page;
    }
    try{
        const expenses=await Expense.find({user:req.user}).skip((Number(page)-1)*ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
        // console.log(expenses);
        const resObj={
            expenses,
            currentPage:page,
            hasPrevious:page>1,
            hasNext:(page*ITEMS_PER_PAGE)<TOTAL_NUMBER_OF_EXPENSES,
            previousPage:page-1, 
            nextPage:page+1
        }
        res.status(200).json(resObj);
    }
    catch(err){
        console.log(err.message);
    }
} 

exports.deleteExpense=async(req,res,next)=>{
    try{
        const expenseId=req.params.expenseId;
        // console.log(expenseId);
        const expense=await Expense.findByIdAndRemove(expenseId);
        
        //updating totalExpense
        req.user.totalExpenses=req.user.totalExpenses-parseInt(expense.expenseAmount);
        req.user.numberOfExpenses=req.user.numberOfExpenses-1;
        await req.user.save();
        res.status(200).json({success:true,ispremiumuser:req.user.ispremiumuser});
    }
    catch(err){
        console.log(err.message);
        res.status(400).json(err); 
    } 
} 