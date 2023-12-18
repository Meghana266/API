const mongoose = require("mongoose");
const propertySchema = new mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    price: {
        type: Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    area: {
        type: Number,
        required:true
    },
    bedrooms: {
        type: Number,
        required:true
    },
    bathrooms: {
        type: Number,
        required:true
    }
});

module.exports = mongoose.model('Property',propertySchema);