const express=require('express');
const mongoose=require('mongoose');
const mongoDb=require('mongodb');
const bodyParser=require('body-parser');
const cors=require('cors');
const morgan=require('morgan')
const fs=require('fs');
const path=require('path');
const dotenv=require('dotenv');
dotenv.config(); 
// const https=require('https');

const userRouter=require('./routes/user');
const expenseRouter=require('./routes/expense');
const purchaseRoute=require('./routes/purchase');
const premiumRoute=require('./routes/premium');
const passwordRouter=require('./routes/password');
const authentication=require('./middleware/authentication');

// const logStremFile=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});

const app=express();


app.use(bodyParser.json({extended:false}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());       

// app.use(morgan('combined',{stream:logStremFile}));

app.use('/user',userRouter);

app.use('/password',passwordRouter);

app.use('/expense',authentication.authenticate,expenseRouter);

app.use('/purchase',authentication.authenticate,purchaseRoute);

app.use('/premium',authentication.authenticate,premiumRoute);

app.use((req,res)=>{
    res.sendFile(path.join(__dirname,`public/${req.url}`));
});
 
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster1.dx1nxb0.mongodb.net/expenseTracker?retryWrites=true&w=majority`)
.then(()=>{
    app.listen(process.env.PORT||3000,()=>console.log("listening to port 3000..."));
})
.catch(err=>console.log(err));

