const mongoose = require("mongoose");
const SellProperty = new mongoose.Schema({
    id: String,
    name: String,
    contact: Number,
    category: String,
    price: Number,
    details: [String],
  });

module.exports = mongoose.model('SellProperty', SellProperty);
