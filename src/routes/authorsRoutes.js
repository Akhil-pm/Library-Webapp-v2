const express= require("express");
const authorsRouter = express.Router();  
const multer = require("multer");                  // Middleware multer used to store image into project folder
const Authordata=require('../model/Authordata')
const path = require("path")

function routerAuthors(navNew){

    authorsRouter.get("/",function(req,res){                      
        Authordata.find()
        .then(function(authors){
            res.render("authors",
            {
              navNew,
              title:"Authors - Library",
              authors                      
            });
        });
        
    });
    
    
    authorsRouter.get("/:id",function(req,res){                       //Routing to single author
        const id = req.params.id;                    // parameter passed from url
        Authordata.findOne({_id:id})
        .then(function(author){
            res.render("author",
            {
              navNew,
              title:"Author - Library",
              author                
            })
        });
    });



    authorsRouter.get("/edit/:id",function(req,res){                     //Routing to edit
      
        const id = req.params.id;                    
      Authordata.findOne({_id:id})
      .then(function(author){
          res.render("editauthor",
          {
            navNew,
            title:"Edit-Author",
            author                 
          })
      });
    
        })




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

  
  
  
        authorsRouter.post("/update",function(req,res){           //updation
      
          upload(req,res,(err)=>{
            if(err)
            {
              console.log("Error occured while uploading")
            }
            else{
   
              const id = req.body.id;
              var name = req.body.name;
              var nationality = req.body.nationality;
              var category = req.body.category;
              var image =  req.file.filename
      
              Authordata.findByIdAndUpdate({_id:id},{$set:{name:name,nationality:nationality,category:category,image:image}})
              .then(function(){
                res.redirect("/authors")
      
              })
   
            }
   
         })
      
        })
    
  
  
        authorsRouter.get("/delete/:id",function(req,res){   
        
          var id=req.params.id;
          Authordata.findByIdAndDelete({_id:id})
          .then(function(){
            res.redirect("/authors")
          })
          
          })


    return authorsRouter;
}



module.exports = routerAuthors;