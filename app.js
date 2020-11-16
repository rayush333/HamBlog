const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const quote=require(__dirname+"/quote.js");
const date=require(__dirname+"/date.js");
const lodash=require("lodash");
const mongoose=require('mongoose');
const homecontent="Welcome to HamBlog! Your very own hamster blogging website. Post what you like about your little friend or just update us about its day to day activities. Join a community of hamster owners willing to share their experiences and help you with petting the best pets in the world-Hamsters!"
const aboutcontent="We are simply THE BEST hamster blogging site doing rounds on the internet!";
const contactcontent="Wanna contact me? Ask your mum ;)";
mongoose.connect("mongodb+srv://admin-ayush:mirzamal@gmail@cluster0.g58qn.mongodb.net/hamblogDB?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true});
const blogSchema=new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  time: Date,
  blog: {
      type: String,
      required: true
  }
});
const Blog=mongoose.model("Blog",blogSchema);
var i;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.get("/",function(req,res){
  Blog.find({},function(err,blogs){
    if(err)
    console.log(err);
    else
    res.render("index",{arr: quote.f1(),heading: "Home", content: homecontent,blogs: blogs});
  });
});
app.get("/about",function(req,res){
  res.render("aboutcont",{arr: quote.f1(),heading: "About Us",content: aboutcontent});
});
app.get("/contact",function(req,res){
  res.render("aboutcont",{arr: quote.f1(),heading: "Contact Us",content: contactcontent});
});
app.get("/compose",function(req,res){
  res.render("compose",{arr: quote.f1(),heading: "Compose"});
});
app.post("/",function(req,res){
  const blog = new Blog({
    title: lodash.capitalize(req.body.title),
    time: date.f1(),
    blog: req.body.blog
  });
  blog.save(function(err){
    if(err)
    console.log(err);
    else
    res.redirect("/");
  });
});
// app.post("/posts",function(req,res){
//   i = req.body.read;
//   res.redirect("/posts");
// });
app.get("/posts/:postname",function(req,res){
  i=lodash.capitalize(req.params.postname);
  Blog.findOne({title: i},function(err,blog){
    if(err)
    console.log(err);
    else
    {
      if(!blog)
      res.redirect("/");
      else
      res.render("blog",{arr: quote.f1(),heading: blog.title, time: blog.time,content: blog.blog});
    }
  });
  // for(var j=0;j<blogs.length;j++)
  // {
  //   if(lodash.lowerCase(blogs[j].title)===i)
  //   {
  //     res.render("blog",{arr: quote.f1(),heading: blogs[j].title, time: blogs[j].time,content: blogs[j].blog})
  //     break;
  //   }
  // }
});
// app.get("/laura/:lassan1/lassan/:lassan2",function(req,res){
//   console.log(req.params);
// });
app.get("/delete/:postname",function(req,res){
  Blog.deleteOne({title: req.params.postname},function(err){
    if(err)
    console.log(err);
    else
    res.redirect("/");
  });
});
app.listen(process.env.PORT || 3000,function(){
  console.log("Server running");
});
