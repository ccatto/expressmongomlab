// ./models/item.js

var mongoose = require("mongoose");

var ItemSchema = new mongoose.Schema({
    itemName: String,
    itemNumber: Number
});

var Item = mongoose.model('Item', ItemSchema);

module.exports = {
  Item: Item
}