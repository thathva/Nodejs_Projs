var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var passport=require("passport");
var LocalStrategy=require("passport-local");
var User=require("./models/user");
var seedDb = require("./seeds");
var Comment = require("./models/comment")
var commentRoutes=require('./routes/comments');
var campgroundRoutes=require('./routes/campgrounds');
var indexRoutes=require('./routes/index');

app.use(bodyparser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/yelp_camp", {
  useNewUrlParser: true
});

app.use(require('express-session')({
  secret:"Hello world",
  resave:false,
  saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
  res.locals.currentUser=req.user;
  next();
})
function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}
// var campgrounds = [{
//     name: "Assassins Creed II",
//     image: "https://upload.wikimedia.org/wikipedia/en/thumb/7/77/Assassins_Creed_2_Box_Art.JPG/220px-Assassins_Creed_2_Box_Art.JPG"
//   },
//   {
//     name: "Assassins Creed III",
//     image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Assassin%27s_Creed_III_Game_Cover.jpg/220px-Assassin%27s_Creed_III_Game_Cover.jpg"
//   },
//   {
//     name: "Assassins Creed Origins",
//     image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Assassin%27s_Creed_Origins_Cover_Art.png/220px-Assassin%27s_Creed_Origins_Cover_Art.png"
//   },
//   {
//     name: "PES 18",
//     image: "https://images.g2a.com/newlayout/323x433/1x1x0/01bc37549aba/59ba3cfd5bafe31a2e47ee72"
//   },
//   {
//     name: "FIFA 18",
//     image: "https://images-na.ssl-images-amazon.com/images/I/91nAAR2GuWL._SY500_.jpg"
//   }
// ];
seedDb();
app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(indexRoutes);
app.listen("3000", function(req, res) {
  console.log("Listening");
});
