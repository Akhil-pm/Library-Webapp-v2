const express= require("express");
const booksRouter = express.Router();  
const multer = require("multer");                               // Middleware multer used to store image into project folder
const Bookdata = require("../model/Bookdata");
const path = require("path")

function router(navNew){
  
    booksRouter.get("/",function(req,res){                       //Using booksRouter  Router Handler
     
        Bookdata.find()
        .then(function(books){
            res.render("books",
            {
              navNew,
              title:"Books - Library",
              books                      // books array which contains list of books is also passed
            });
        });
       
        
    });
    
    
    booksRouter.get("/:id",function(req,res){                       //Single book  Router Handler
    const id = req.params.id;                    // parameter passed from url
    Bookdata.findOne({_id:id})
    .then(function(book){
        res.render("book",
        {
          navNew,
          title:"Book - Library",
          book                 
        })
    });


    })

    
  

    booksRouter.get("/edit/:id",function(req,res){                         //Go to editting page  
      
      const id = req.params.id;                    
    Bookdata.findOne({_id:id})
    .then(function(book){
        res.render("editbook",
        {
          navNew,
          title:"Edit - Book",
          book                 
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

///////////////////////////////////////////




      booksRouter.post("/update",function(req,res){                         //Router handler for updating
        

        upload(req,res,(err)=>{
          if(err)
          {
            console.log("Error occured while uploading")
          }
          else{
 
            const id = req.body.id;
        var title = req.body.title;
        var author = req.body.author;
        var genre = req.body.genre;
        var image =  req.file.filename

        Bookdata.findByIdAndUpdate({_id:id},{$set:{title:title,author:author,genre:genre,image:image}})
        .then(function(Book){
          res.redirect("/books")
         
        })
 
          }
 
       })





      
      })
  


      booksRouter.get("/delete/:id",function(req,res){                        //Router handler for deletion
      
        // res.send("deleted")

        var id=req.params.id;
        Bookdata.findByIdAndDelete({_id:id})
        .then(function(){
          res.redirect("/books")
        })
        
        })

  
 
    return booksRouter;
}

module.exports = router;













































  // var books= [
    
    //     {
    //         title : 'The Book Thief',
    //         author : 'Markus Zusak',
    //         genere : 'Fiction',
    //         img : 'tbt1.jpg',
    //         desc : "It is 1939. Nazi Germany. The country is holding its breath. Death has never been busier, and will be busier still.By her brother's graveside, Liesel's life is changed when she picks up a single object, partially hidden in the snow.It is The Gravedigger's Handbook, left behind there by accident, and it is her first act of book thievery."

            
    //     },
    //     {
    //         title : 'American Gods',
    //         author : 'Neil Gaiman',
    //         genere : 'Fantasy',
    //         img : 'ag.jpg',
    //         desc : "Days before his release from prison, Shadow's wife, Laura, dies in a mysterious car crash. Numbly, he makes his way back home. On the plane, he encounters the enigmatic Mr Wednesday, who claims to be a refugee from a distant war, a former god and the king of America."
    //     },
    //     {
    //         title : 'Angels & Demons',
    //         author : 'Dan Brown',
    //         genere : 'Fiction',
    //         img : 'angels.jpg',
    //         desc : "World-renowned Harvard symbologist Robert Langdon is summoned to a Swiss research facility to analyze a cryptic symbol seared into the chest of a murdered physicist. What he discovers is unimaginable: a deadly vendetta against the Catholic Church by a centuries-old underground organization -- the Illuminati."
    //     },
    //     {
    //         title : 'The Devil in the White City',
    //         author : 'Erik Larson',
    //         genere : 'Crime',
    //         img : 'devil.jpg',
    //         desc : "Author Erik Larson imbues the incredible events surrounding the 1893 Chicago World's Fair with such drama that readers may find themselves checking the book's categorization to be sure that 'The Devil in the White City' is not, in fact, a highly imaginative novel. Larson tells the stories of two men: Daniel H. Burnham, the architect responsible for the fair's construction, and H.H. Holmes, a serial killer masquerading as a charming doctor."
    //     },
    //     {
    //         title : 'The Thirteenth Tale',
    //         author : 'Diane Setterfield',
    //         genere : 'Fiction',
    //         img : 'tale.jpg',
    //         desc : "All children mythologize their birth...So begins the prologue of reclusive author Vida Winter's collection of stories, which are as famous for the mystery of the missing thirteenth tale as they are for the delight and enchantment of the twelve that do exist."
    //     },
    //     {
    //         title : 'The Road',
    //         author : 'Cormac McCarthy',
    //         genere : 'Fiction',
    //         img : 'road.jpg',
    //         desc: "A father and his son walk alone through burned America. Nothing moves in the ravaged landscape save the ash on the wind. It is cold enough to crack stones, and when the snow falls it is gray. The sky is dark. Their destination is the coast, although they don’t know what, if anything, awaits them there. They have nothing; just a pistol to defend themselves against the lawless bands that stalk the road, the clothes they are wearing, a cart of scavenged food—and each other."
    //     }
    
    // ]




