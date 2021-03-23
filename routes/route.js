const router = require('express').Router();
const   dotenv= require('dotenv');
const e = require('express');
const userModel = require("../models/userSchema");
dotenv.config({path:'./config.env'});
require("../db/db");
router.get('/',(req, res) => {
    res.render('index');
})

router.post('/login', async (req, res) => {
    
    const {email,password} = req.body;


     if(!email || !password){
         res.statusCode(400).json({message:'Invalid Credentiales'});
     }
    
     
     const user = await userModel.findOne({email: email});
     try{
         if(!user){
             console.log(res.json({message:'User Not Found'}));
         }
         
         if(user.password == password){
            res.send("login Done.");
         }else{
             res.send("Invalid Credentials");
         }
     }catch(err){
         res.send(err);
     }   
     
})


router.get('/register',(req, res)=>{
    res.render('register');
});

router.post("/register", async (req, res)=>{
    const {email} = req.body;
    
    userModel.findOne({email:email}).then((userExist)=>{
        if(userExist){
            
            res.send("user exist");
        }else{
            const NewUser = new userModel(req.body);
            NewUser.save();
            try{
                res.redirect('/');
            }catch(err){
                res.send(err);
            }
        }


    }).catch((err)=>{
        res.send(err);
    })


    
})


module.exports = router;
