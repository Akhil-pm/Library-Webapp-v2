const express= require("express");
const multer = require("multer");                  // Middleware multer used to store image into project folder
const addauthorRouter = express.Router();  
const path = require("path")


//Multer Storage

let storage = multer.diskStorage({
  destination : (req, file, cb)=> {
      cb(null, "./public/images");
  },
  filename : (req, file, cb)=>{
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
  }
});

//Init Upload

const upload = multer({
  storage : storage,
  
}).single("image");




const AuthorData=require('../model/Authordata')

function routerAddauthor(navNew){
   
    addauthorRouter.get("/",function(req,res){                     
    
        res.render("addauthor",
        {
          navNew,
          title:"Add Author - Library",                   
        })
    });







    addauthorRouter.post("/add",function(req,res){                  //Router on submitting      
       
      upload(req,res,(err)=>{
         if(err)
         {
           console.log("Error occured while uploading")
         }
         else{

          var item={

            name:  req.body.name,
            nationality: req.body.nationality,
            category:  req.body.category,
            image:  req.file.filename
      
            }
            var author=  AuthorData(item);
            author.save();                    //saving to database
           res.redirect('/authors');

         }

      })


      
       
  });





    
   

    return addauthorRouter;
}

module.exports = routerAddauthor;