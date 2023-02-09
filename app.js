var express = require("express")
var app = express()
var path = require("path")
var bodyparser = require("body-parser")
var mongoose =  require("mongoose")
const { response } = require("express")
var port = process.env.port||3000
var db = require("./config/database")
const { Script } = require("vm")

console.log("HI")
app.use(bodyparser.json())

app.use(bodyparser.urlencoded({extended:true}))

app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/highscore",{
    useNewURLParser:true 
}).then(function(){
    console.log("Connect to MongoDB Database")
}).catch(function(err){
    console.log(err)
})
require("./model/Score")
var score = mongoose.model("score")

app.get("/",  function(req,res){
    
    //res.send("Hello There you niqupoop")
    res.redirect("Listboard.html")
})
app.get("/poop",  function(req,res){
    res.send("Your Butt face")
})

app.use(express.static(__dirname+"/pages"))
app.get("/getScore",function(req,res){
    score.find({}).then(function(score){
        //console.log({game})
        res.json({score})
    })
})
app.post("/saveScore", function(req,res){
    console.log(req.body)
    
    new score(req.body).save().then(function(){
        //res.send(req.body)
        //res.redirect("index.html")
        res.redirect("Listboard.html")

    })

})

app.post("/deleteSave",function(req,res){
    console.log(`Save Deletes ${req.body.score._id}`)
        score.findByIdAndDelete(req.body.score._id).exec()
        //res.redirect('Listboard.html')
})


app.listen(port, function(){
    console.log(`Running on port with the wovles ${port}`)

})
//127.0.0.1:27017