const express= require("express");
const homepageRouter = express.Router();  

function routerHome(navNew){
   
    homepageRouter.get("/",function(req,res){                      
    
        res.render("home",
        {
          navNew,
          title:"Home - Library",                   
        })
    });
    
    

    return homepageRouter;
}



module.exports = routerHome;