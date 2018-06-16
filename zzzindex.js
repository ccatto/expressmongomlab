// app.js
console.log("HERER");
var express = require('express');

const app = express();
var port = 3003;
var mongoose = require('mongoose');

const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'));

console.log(" inside index.js");


const MongoClient = require('mongodb').MongoClient

var db; 

MongoClient.connect('mongodb://ccatto:s1mple@ds147789.mlab.com:47789/cattomlabfun', (err, client) => {
  if (err) return console.log(err)
  db = client.db('cattomlabfun2') 
  // app.listen(3003, () => {
  //   console.log('listening on 3003')
  // })
})

var nameSchema = new mongoose.Schema({
  name: String,
  quote: String
 });

var UserQuote2 = mongoose.model("UserQuote", nameSchema);

var UserQuote = require('./src/models/userquotes');


var router = express.Router();
router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });   
});






// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);





app.listen(port, function(){
  console.log('hello worl 2d port: ', port);
  // console.log("UserQuote : ", UserQuote);
})

app.get('/', function(req, res){
    res.sendfile('./server/public/index.html');
    // res.send('Hello Express');

    // db.collection('quotes').find().toArray(function(err, results) {
    //   console.log(results)
    //   // send HTML file populated with quotes here
    // })
});

app.post("/addquote", (req, res) => {
  var myData = new UserQuote(req.body);
  res.send("insied addQuote");
  myData.save()
  .then(item => {
  res.send("item saved to database");
  })
  .catch(err => {
  res.status(400).send("unable to save to database");
  });
 });

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})


// var itemRouter = express.Router();
// app.use('/items', itemRouter);

// itemRouter.route('/').get(function (req, res) {
//     res.sendfile('./server/public/index.html');

//     // res.render('items');
//   });
  
//    itemRouter.route('/single').get(function (req, res) {
// //     res.render('singleItem');
// res.sendfile('./server/public/index.html');
//    });