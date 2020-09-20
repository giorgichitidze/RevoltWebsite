var express = require("express");
var app = express();
var mongoose = require("mongoose");
const { Db, MongoClient } = require("mongodb");

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.static("Images"));

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/Revolt_Images",{useNewUrlParser:true})
    .then(()=> console.log("MongoDB Connected"))
    .catch(err=> console.log("This is error : " + err));


mongoose.connect("mongodb://localhost:27017/Revolt_Admins",{useNewUrlParser:true})
    .then(()=> console.log("admins DB created"))
    .catch(err=>console.log("this is error: " + err));

var RevoltAdminsSchema = new mongoose.Schema({

    name:String,
    email:String,
    password:String
});
//Schema Setup
var RevoltImagesSchema = new mongoose.Schema({

    name: String,
    Image: String

});

var Images = mongoose.model("revoltimages",RevoltImagesSchema); 
var Admins = mongoose.model("revoltadmins",RevoltAdminsSchema);

// Admins.create({
//     name:"Giorgi Chitidze",
//     email:"chitidzegiorgi2@gmail.com",
//     password:"Reventcolch1."
// }, function(err,admins){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("admin created successfuly");
//         console.log(admins);
//     }
// })

//  Images.create({

//       name:"the tesli gogo",
//       Image: "https://images.unsplash.com/photo-1600353067943-bda64e5a5178?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
    

//   },function(err,images){
//       if(err){
//           console.log(err);
//       }else {
//           console.log("Image Successful");
//           console.log(images);
//       }
//   });

app.get("/",function(req,res){

    
    res.render("index");

});

app.get("/admin",function(req,res){
    res.render("admin");
});

app.get("/admin/panel",function(req,res){
    res.send("this is admin panel page");
});

app.get("/FelledRoots",function(req,res){

   
   
    Images.find({},function(err,allImages){

        console.log(allImages);
        res.render("FRMC",{RevoltImages:allImages});
    });
   

    
   
    
   
    
});


app.listen(3000, function(){
    console.log("Revolt Server Started!!!");
})

