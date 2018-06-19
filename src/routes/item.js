// /routes/item.js

var Item = require("../models/item").Item;

var express = require('express')
  , router = express.Router()

// Car brands page
router.get('/item', function(req, res) {
    console.log("here item get");
  res.send('itemNamezz, 888')
})

// Post item page
router.post('/api/createitem', function(req, res) {
    console.log("inside api/create item");

    var record = new Item();
    record.itemName = "some item name";
    record.itemNumber = 888;
  
    record.save(function (err) {
      if (err) return handleError(err);
      console.log("here item was saved!");
    })


    res.send('soso item created ishL')
})

module.exports = router