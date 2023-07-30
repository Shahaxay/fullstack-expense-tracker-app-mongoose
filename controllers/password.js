const Sib = require('sib-api-v3-sdk');
const { v4: uuidv4 } = require('uuid');
const bcrypt=require('bcrypt');

const User = require('../models/users');
const ForgetPasswordRequest=require('../models/forgetPasswordRequest');



exports.postResetPassword = async (req, res, next) => {
    // console.log(req);
    const requestId = uuidv4();
    // console.log(requestId);
    const passwordResetApiLink = `http://localhost:3000/password/resetpassword/` + requestId;
    // console.log(passwordResetApiLink);
    const resetEmail = req.body.resetEmail;
    try {

        //find user
        const user = await User.findOne({email:resetEmail});
        if (user) {
            const request=new ForgetPasswordRequest({requestid:requestId,isactive:true,user:user});
            await request.save();
            const client = Sib.ApiClient.instance;
            const apiKey = client.authentications['api-key'];
            apiKey.apiKey = process.env.BREVO_API_KEY;
            // console.log(process.env.BREVO_API_KEY);

            const transEmailApi = new Sib.TransactionalEmailsApi();
 
            const sender = {
                email: 'shahaxay34@gmail.com',
                name: 'Akshay'
            }
 
            const receiver = [
                {
                    email: resetEmail
                }
            ];
            const messageId=await transEmailApi.sendTransacEmail({
                sender,
                to: receiver,
                subject: "Reset password",
                textContent: `this is the email send to reset your {{params.website}} password`,
                params: {
                    website: 'Expense Tracker App'
                },
                htmlContent: `<h3>use the following link to reset your Expense Tracker App password</h3><a href="${passwordResetApiLink}">${passwordResetApiLink}</a>`
            })
            console.log(messageId);
            res.status(200).json({message:"reset link has been sent to the email"});
        }
        else {
            res.status(400).json({ message: "user does not exist" });
        }
    }
    catch (err) {
        console.log(err.message);
    }
}

exports.getResetPsswordHandler = async (req, res, next) => {
    const requestId = req.params.requestId;
    try{
        const resetRequest=await ForgetPasswordRequest.findOne({requestid:requestId,isactive:true});
        if(resetRequest){
            console.log("active");
            res.send(`<h3>Resetting password</h3><form action="http://localhost:3000/password/change-password/${requestId}" method="post"><label for="newpass">new password</label><input type="password" id="newpass" name="newpass"><button type="submit">change password</button></form>`);
        }
        else{
            res.status(400).json({message:"the link has been expired"});
        }
    }
    catch(err){
        res.status(400).json(err); 
    }
}

exports.postChangePassword=async (req,res,next)=>{
    const requestId=req.params.requestId;
    const newPassword=req.body.newpass;
    const request=await ForgetPasswordRequest.findOne({requestid:requestId}).populate('user');
    // console.log(request);
    let salt=10;
    bcrypt.hash(newPassword,salt,async (err,hash)=>{
        if(err){
            console.log(err);
        }else{
            try{
                request.user.password=hash;
                // console.log(request.user);
                const promise1=request.user.save();
                request.isactive=false;
                const promise2=request.save();
                await Promise.all([promise1,promise2]);
                res.json({success:true});
            }
            catch(err){
                console.log(err); 
            }
        }
    })
} 