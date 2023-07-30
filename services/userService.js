const ExpenseReportLink=require('../models/expenseReportLink');
const getExpenseReportLinks=(req,where)=>{
    return ExpenseReportLink.find({user:req.user});
}

module.exports={
    getExpenseReportLinks
}