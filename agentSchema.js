const mongoose = require("mongoose");
const agentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profession: {
        type:String,
        required:true
    },
    experience: {
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('Agent',agentSchema);