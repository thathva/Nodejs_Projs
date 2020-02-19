var mongoose=require('mongoose');
var Campground=require('./models/campground');
var Comment   = require("./models/comment");

var data=[
  {name:"Assassins Creed II",image:"https://upload.wikimedia.org/wikipedia/en/thumb/7/77/Assassins_Creed_2_Box_Art.JPG/220px-Assassins_Creed_2_Box_Art.JPG",description:"AC1"},
  {name:"Assassins Creed III",image:"https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Assassin%27s_Creed_III_Game_Cover.jpg/220px-Assassin%27s_Creed_III_Game_Cover.jpg",description:"AC2"},
  {name:"Assassins Creed Origins",image:"https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Assassin%27s_Creed_Origins_Cover_Art.png/220px-Assassin%27s_Creed_Origins_Cover_Art.png",description:"AC5"}
]
function seedDb(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    });
    //add a few comments
}

module.exports=seedDb;
