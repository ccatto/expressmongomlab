// /routes/item.js

var Item = require("../models/item").Item;

var express = require('express')
  , router = express.Router()

// Car brands page
router.get('/item', function(req, res) {
    console.log("here item get");
  res.send('itemNamezz, 888')
})

// // Car models page
// router.get('/models', function(req, res) {
//   res.send('Audi Q7, BMW X5, Mercedes GL')
// })

module.exports = router