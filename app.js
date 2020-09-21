var express = require("express");
var app = express();
var mongoose = require("mongoose");
var parser = require("body-parser");
const { Db, MongoClient } = require("mongodb");
const bodyParser = require("body-parser");

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.static("Images"));
app.use(bodyParser.urlencoded({extended:true}));
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/Revolt_Images",{useNewUrlParser:true})
    .then(()=> console.log("MongoDB Connected"))
    .catch(err=> console.log("This is error : " + err));



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
//var Admins = mongoose.model("revoltadmins",RevoltAdminsSchema);

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

//   Images.create({

//        name:"the tesli gogo",
//        Image: "https://images.unsplash.com/photo-1600353068218-27240d813841?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
    

//    },function(err,images){
//        if(err){
//            console.log(err);
//        }else {
//            console.log("Image Successful");
//            console.log(images);
//        }
//    });
app.get("/home",function(req,res){

    res.render("index");
});

app.get("/",function(req,res){

    
    res.render("index");

});

app.get("/admin",function(req,res){
    res.render("admin");
});

app.post("/FelledRoots",function(req,res){
    
    Images.create(req.body.Images,function(err,newimage){
          
              
        res.redirect("/FelledRoots");
          
    });
});

app.get("/FelledRoots/:id",function(req,res){

    
    Images.findById(req.params.id,function(err,foundImg){

        if(err){
            res.redirect("/FelledRoots");
        }else{
            res.render("show",{img:foundImg});
        }

    });

});

app.get("/admin/panel",function(req,res){
    res.render("panel");
});

app.get("/FelledRoots",function(req,res){

    Images.find({},function(err,allImages){

        console.log(allImages);
        res.render("FRMC",{RevoltImages:allImages});
    });
    
});


app.listen(2000, function(){
    console.log("Revolt Server Started!!!");
})

