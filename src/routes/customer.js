// /routes/customer.js

var Customer = require("../models/customer").Customer;

var express = require('express')
  , router = express.Router()

// Car brands page
router.get('/customer', function(req, res) {
    console.log("Customer Get;");
  res.send('itemNamezz, 888')
})

// Post item page
router.post('/api/createcustomer', function(req, res) {
    console.log("inside api/create customer");

    var customer = new Customer();
    record.CustomerFirstName = "some item name";
    record.CustomerLastName = "some item name";
    record.CustomerEmail = "some item name";
    record.CustomerNumber = 888;
  
    record.save(function (err) {
      if (err) return handleError(err);
      console.log("here item was saved!");
    })

    res.send('soso item created ishL')
})

module.exports = router