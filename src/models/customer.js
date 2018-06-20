// ./models/customer.js

var mongoose = require("mongoose");

var CustomerSchema = new mongoose.Schema({
    CustomerFirstName: String,
    CustomerLastName: String,
    CustomerEmail: String,
    CustomerNumber: Number
});

var Customer = mongoose.model('Customer', CustomerSchema);

module.exports = {
  Customer: Customer
}