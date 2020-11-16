const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const quote=require(__dirname+"/quote.js");
const date=require(__dirname+"/date.js");
const lodash=require("lodash");
const homecontent="Welcome to HamBlog! Your very own hamster blogging website. Post what you like about your little friend or just update us about its day to day activities. Join a community of hamster owners willing to share their experiences and help you with petting the best pets in the world-Hamsters!"
const aboutcontent="We are simply THE BEST hamster blogging site doing rounds on the internet!";
const contactcontent="Wanna contact me? Ask your mum ;)";
var blogs=[];
var i;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.get("/",function(req,res){
  res.render("index",{arr: quote.f1(),heading: "Home", content: homecontent,blogs: blogs});
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
  var obj = {
    title: req.body.title,
    blog: req.body.blog,
    time: date.f1()
  };
  blogs.push(obj);
  res.redirect("/");
});
// app.post("/posts",function(req,res){
//   i = req.body.read;
//   res.redirect("/posts");
// });
app.get("/posts/:postname",function(req,res){
  i=lodash.lowerCase(req.params.postname);
  for(var j=0;j<blogs.length;j++)
  {
    if(lodash.lowerCase(blogs[j].title)===i)
    {
      res.render("blog",{arr: quote.f1(),heading: blogs[j].title, time: blogs[j].time,content: blogs[j].blog})
      break;
    }
  }
  res.send();
});
// app.get("/laura/:lassan1/lassan/:lassan2",function(req,res){
//   console.log(req.params);
// });
app.listen(process.env.PORT || 3000,function(){
  console.log("Server running");
});
