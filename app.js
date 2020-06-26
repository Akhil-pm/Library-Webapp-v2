
const express= require("express");
const app = new express();

const nav = [
    {link:"/",name:"Home"},{link:"/signup",name:"Signup"},{link:"/login",name:"Login"}
];


const navNew =[
  {link:"/home",name:"Home"},{link:"/books",name:"Books"},{link:"/authors",name:"Authors"},
    {link:"/addbook",name:"Add Book"},{link:"/addauthor",name:"Add Author"},{link: "/", name: "Sign out"}
]



const booksRouter= require("./src/routes/bookRoutes")(navNew)
const authorsRouter= require("./src/routes/authorsRoutes")(navNew)
const loginRouter= require("./src/routes/loginRoutes")(nav)
const signupRouter= require("./src/routes/signupRoutes")(nav)
const addbookRouter= require("./src/routes/addbookRoutes")(navNew)
const addauthorRouter= require("./src/routes/addauthorRoutes")(navNew)
const homepageRouter= require("./src/routes/homepageRoutes")(navNew)

app.use(express.urlencoded({extended:true}));          //Middleware

app.use(express.static("./public"))
app.set("view engine","ejs");
app.set("views","./src/views");
app.use('/books',booksRouter)                  
app.use('/authors',authorsRouter) 
app.use('/login',loginRouter) 
app.use('/signup',signupRouter) 
app.use('/addbook',addbookRouter)
app.use('/addauthor',addauthorRouter)
app.use('/home',homepageRouter)

app.get("/",function(req,res){

    res.render("index",
    {
      nav,
      title:"Library"
    })
});



app.listen(5000);
console.log("port : 5000")