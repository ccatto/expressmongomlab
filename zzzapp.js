// app.js

var express = require('express');
var app = express();
var port = 3003;
var mongoose = require('mongoose');


app.use(express.static('public'));


app.listen(port, function(){
  console.log("Server listening on port " + port);
})

app.get('/', function(req, res){
  db.collection('quotes').find().toArray(function(err, results) {
    console.log(results)
    // send HTML file populated with quotes here
  })

    res.sendfile('./server/public/index.html');
    // res.send('Hello Express');
});


var itemRouter = express.Router();
app.use('/items', itemRouter);

itemRouter.route('/').get(function (req, res) {
    res.sendfile('./server/public/index.html');

    // res.render('items');
  });
  
   itemRouter.route('/single').get(function (req, res) {
//     res.render('singleItem');
res.sendfile('./server/public/index.html');
   });