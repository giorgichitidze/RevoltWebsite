var express = require("express");
var app = express();
var mongoose = require("mongoose");
const { Db, MongoClient } = require("mongodb");

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.static("Images"));

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/Revolt_Images",{})
    .then(()=> console.log("MongoDB Connected"))
    .catch(err=> console.log("This is error : " + err));

//Schema Setup
var RevoltImagesSchema = new mongoose.Schema({

    name: String,
    Image: String

});

var Images = mongoose.model("RevoltImages",RevoltImagesSchema); 


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

})

app.get("/FelledRoots",function(req,res){

    const db = MongoClient()
    const collection = Db.collection('RevoltImages');
   
    
   collection.find({}).toArray(function(err,allImages){

    res.render("FRMC",{RevoltImages:allImages});
   })
    
   
    
});

app.listen(4000, function(){
    console.log("Revolt Server Started!!!");
})

