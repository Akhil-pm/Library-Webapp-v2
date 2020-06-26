const express= require("express");
const multer = require("multer");                               // Middleware multer used to store image into project folder
const addbookRouter = express.Router();  
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

///////////////////////////////////////////


const BookData=require('../model/Bookdata')

function routerAddbook(navNew){
   
    addbookRouter.get("/",function(req,res){                  //Router for addbook page        
    
        res.render("addbook",
        {
          navNew,
          title:"Add Book - Library",                   
        })
    });
    
    addbookRouter.post("/add",function(req,res){                  //Router on submitting      
       
      upload(req,res,(err)=>{
         if(err)
         {
           console.log("Error occured while uploading")
         }
         else{

          var item={

            title:  req.body.title,
            author: req.body.author,
            genre:  req.body.genre,
            image:  req.file.filename
      
            }
            var book=  BookData(item);
            book.save();                    //saving to database
           res.redirect('/books');

         }

      })


      
       
  });

    return addbookRouter;
}

module.exports = routerAddbook;