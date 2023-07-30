const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const expenseReportLinkSchema=new Schema({
    reports:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
});

module.exports=mongoose.model('ExpenseReportLink',expenseReportLinkSchema);