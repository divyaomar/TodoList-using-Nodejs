const express = require("express");
const https = require('https');
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');

let Items = [];
let workItems=[];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){

    let today = new Date();

    let options = { weekday: 'long', month: 'long', day: 'numeric' };
//let today  = new Date();

let day = today.toLocaleDateString("en-US", options);

// console.log(today.toLocaleDateString("en-US")); // 9/17/2016
// console.log(today.toLocaleDateString("en-US", options)); // Saturday, September 17, 2016
// console.log(today.toLocaleDateString("hi-IN", options)); // शनिवार, 17 सितंबर 2016
    




    res.render("list", {
        listTitle: day, newlistItems: Items
    });
});


app.post("/", function(req, res){

    let Item = req.body.newItem;
    if(req.body.list === "Work List"){
        workItems.push(Item);
        res.redirect("/work");
    }
    else{
        Items.push(Item);
   console.log(req.body);

   res.redirect("/");
    }


   
    
    // res.send("Added");
    // console.log("Post Request recieved");

})

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newlistItems: workItems});
});

app.post("/work", function(req, res){

    let Item = req.body.newItem;
 
    workItems.push(Item);
    //console.log(Item);
 
    res.redirect("/work");
     
     // res.send("Added");
     // console.log("Post Request recieved");
 
 })





app.listen(3000, function(){
    console.log("Server is started on port 3000");
});