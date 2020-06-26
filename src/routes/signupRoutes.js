const express= require("express");
const signupRouter = express.Router();  
const SignupData=require('../model/SignupData')

function routerSignup(nav){


    signupRouter.get("/",function(req,res){                      
    
        res.render("signup",
        {
          nav,
          title:"Sign up - Library",                 
        })
    });


    signupRouter.post("/register",function(req,res){                      
    
      var item = {
   
        name:req.body.name,
        username:req.body.username,
        phonenumber:req.body.phonenumber,
        email:req.body.email,
        password:req.body.password
 
      }
      var signup=  SignupData(item);
            signup.save();                    
           res.redirect('/login');
      
  });




    

    return signupRouter;
}



module.exports = routerSignup;