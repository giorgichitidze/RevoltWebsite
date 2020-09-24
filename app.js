var express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  parser = require("body-parser"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  User = require("./models/user");
const { Db, MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const user = require("./models/user");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("Images"));
app.use(bodyParser.urlencoded({ extended: true }));

//Show Hide LogOut Link
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});
mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://localhost:27017/Revolt_Images", { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("This is error : " + err));

var RevoltAdminsSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
//Schema Setup
var RevoltImagesSchema = new mongoose.Schema({
  name: String,
  Image: String,
});

var Images = mongoose.model("revoltimages", RevoltImagesSchema);
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

//PASSPORT CONFIG
app.use(
  require("express-session")({
    secret: "This is admin secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/home", function (req, res) {
  res.render("index");
});

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/admin", function (req, res) {
  res.render("admin");
});

app.post("/FelledRoots", function (req, res) {
  Images.create(req.body.Images, function (err, newimage) {
    res.redirect("/FelledRoots");
  });
});

app.get("/FelledRoots/:id", function (req, res) {
  Images.findById(req.params.id, function (err, foundImg) {
    if (err) {
      res.redirect("/FelledRoots");
    } else {
      res.render("show", { img: foundImg });
    }
  });
});

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

app.get("/admin/panel", isLoggedIn, function (req, res) {
  console.log(req.currentUser);
  res.render("panel");
});

// app.post("/admin/panel", function (req, res) {
//   var newUser = new User({ username: "test@mail.com" });
//   User.register(newUser, "12345", function (err, user) {
//     if (err) {
//       console.log(
//         "===============================Error==============================="
//       );
//       console.log(err);
//       console.log(
//         "===============================End of Error==============================="
//       );
//       return res.render("admin");
//     }
//     passport.authenticate("local")(req, res, function () {
//       res.redirect("/panel");
//     });
//   });
// });

app.post(
  "/admin",
  passport.authenticate("local", {
    successRedirect: "/admin/panel",
    failureRedirect: "/admin",
  }),
  function (req, res) {}
);

app.get("/FelledRoots", function (req, res) {
  Images.find({}, function (err, allImages) {
    console.log(allImages);
    res.render("FRMC", { RevoltImages: allImages });
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

app.listen(2000, function () {
  console.log("Revolt Server Started!!!");
});
