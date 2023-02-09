var mongoose = require("mongoose")
var Schema = mongoose.Schema
var Schema = new Schema({
    score:{
        type:String,
        required:true



    }
})

mongoose.model("score", Schema)