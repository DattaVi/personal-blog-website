//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
var harr=[];
var parr=[];
//var i=0;
mongoose.connect('mongodb://127.0.0.1:27017/blogDB');
const ms=new mongoose.Schema({
  heading:String,
  post:String
});
const pms=new mongoose.Schema({
  pheading:String,
  ppost:String
});
const blog=new mongoose.model("post",ms);
const pblog=new mongoose.model("ppost",pms);
const i1=new blog({
  heading:"hi",
  post:"hello"
});
const i2=new blog({
  heading:"namaste",
  post:"salaam"
});
// blog.insertMany([i1,i2]).then(function(res){
//   console.log(res);
// });

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  pblog.find({}).then(function(result){
    res.render("home",{hh:result});
  })
  
})

app.get("/compose",function(req,res){
  res.render("compose");
})
app.post("/",function(req,res){
  var h=req.body.head;
  var p=req.body.post;
  if(h!=undefined&&p!=undefined){
    const ph=new pblog({
      pheading:req.body.head,
      ppost:p.substring(0,100)
    });
    ph.save();
  }
  const i=new blog({
    heading:req.body.head,
    post:req.body.post
  });
  i.save();
  if(req.body.pub=="publ"){
res.redirect("/");
}
else{
  console.log(harr);
  res.redirect("/"+req.body.b);   
}
})


app.get("/:generic",function(req,res){
 var cc= req.params.generic;
 console.log(cc);
  blog.find({heading:cc}).then(function(result){
    console.log(result);
    if(result.length!=0)
    res.render("post",{he:result[0].heading,po:result[0].post});
  })
});


app.get("/abc/ejs-challenge/public/css/about.ejs",function(req,res){
  res.render("about");
})
app.get("/abc/ejs-challenge/public/css/contact.ejs",function(req,res){
  res.render("contact");
})







app.listen(3000, function() {
  console.log("Server started on port 3000");
});


// var h=req.body.head;
// p=req.body.post;
// if(h!==undefined&&p!==undefined){
// //var ah=h.slice(0,100);
// var ap=p.substring(0,100);

//  harr.push(h);
//  parr.push(ap);
// }
// app.get("/"+h,function(req,res){
//   res.render("post",{he:h,po:p});
// })
// if(req.body.pub=="publ"){
// res.redirect("/");
// }
// else{
//   console.log(harr);
//   res.redirect("/"+req.body.b);   
// }
// }

// res.render("home",{hh:harr,pp:parr});

 // blog.find({_id:n}).then(function(result){
  //   // console.log(result);
  //   // console.log("/"+result[0].heading);
  //   // console.log(result[0].heading+" "+result[0].post);
  //   // app.get("/"+result[0].heading,function(req,res){
  //   //     res.render("post",{he:result[0].heading,po:result[0].post})
  //   // })
  // })