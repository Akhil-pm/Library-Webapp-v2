const express= require("express");
const loginRouter = express.Router();  
const Signupdata = require("../model/SignupData");

function routerLogin(nav){
   
    loginRouter.get("/",function(req,res){                      
    
        res.render("login",
        {
          nav,
          title:"Login - Library", 
          msg:""  
        })
    });



    loginRouter.post("/log",function(req,res){                         //On submitting login form
    
      var email =req.body.email;
      var password =req.body.password;
      if(email==""|| password=="")
      {
        res.render("login",
            {
                nav,
                title : "Login - Library",
                msg: "All Fields required!!!" 
            });
      }
      else{
        Signupdata.findOne({email:email,password:password},function(err,match){
          if(err)
          {
           console.log("Error Occured")
          }
          if(!match)
          {
            res.render("login",
            {
                nav,
                title : "Login - Library",
                msg: "Wrong credentials!!!"
            });
          }
          else
          {
            res.redirect("/home")
          }
        })
      }
      
  });
  
    
    

    return loginRouter;
}



module.exports = routerLogin;