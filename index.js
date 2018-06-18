// // index.js

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
const MongoClient = require('mongodb').MongoClient

var ObjectID = mongodb.ObjectID;

var CONTACTS_COLLECTION = "contacts";
var collectionName = "testcollection";
var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
// MongoClient.connect('mongodb://ccatto:s1mple@ds147789.mlab.com:47789/cattomlabfun', (err, database) => {

// // mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
//   if (err) {
//     console.log(err);
//     process.exit(1);
//   }

//   // Save database object from the callback for reuse.
//   db = database;
//   console.log("Database connection ready");

//   // Initialize the app.
//   var server = app.listen(process.env.PORT || 8080, function () {
//     var port = server.address().port;
//     console.log("App now running on port", port);
//   });
// });



///// MONGOODSE!!!
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let uri = 'mongodb://ccatto:s1mple@ds147789.mlab.com:47789/cattomlabfun';

 mongoose.connect(uri);

// mongoose.connect(uri).exec()
//     .then(() => { // if all is ok we will be here
//         // console.log("all good in Mongoose");
//         return server.start();
//     })
//     .catch(err => { // if error we will be here
//         console.error('App starting error:', err.stack);
//         process.exit(1);
//     });

let dbMongoose = mongoose.connection;
dbMongoose.on('open', function () { 
  console.log("inside mongoose connect open ");
 });
dbMongoose.on('error', console.error.bind(console, 'connection error:'));


var ContactSchema = new Schema({
  firstName: String,
  lastName: String
});

var ContactModel = mongoose.model('ContactModel', ContactSchema);
//var UserModel = mongoose.model('User', User);

var record = new ContactModel();

record.firstName = "Joe";
record.lastName = "Jones";

record.save(function (err) {
  if (err) return handleError(err);
  console.log("here it was saved!");
})

app.post("/addcontact", (req, res) => {
  console.log("inside /addcontact POST");
});


// Create simple schema:

// var nameSchema = new mongoose.Schema({
//   firstName: String,
//   lastNameName: String
// });

// // create model from schema:
// var User = mongoose.model("User", nameSchema);


// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

// app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3008, () => console.log('Example app listening on port 3008!'))

app.get("/contacts", function(req, res) {
  console.log("inside /contact GET");
});

// POST
app.post("/contacts", function(req, res) {


    var newContact = req.body;
    newContact.createDate = new Date();

    if (!(req.body.firstName || req.body.lastName)) {
      handleError(res, "Invalid user input", "Must provide a first or last name.", 400);
    }

    db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new contact.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });



});

/*  "/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/contacts/:id", function(req, res) {
});










// older version below:
// // var express = require("express");
// // var path = require("path");
// // var bodyParser = require("body-parser");
// // var mongodb = require("mongodb");
// // var ObjectID = mongodb.ObjectID;

// // var TEST_COLLECTION = "testcollection";



// // app.js
// console.log("HERER");
// var express = require('express');

// const app = express();
// var port = 3003;
// var mongoose = require('mongoose');

// const bodyParser= require('body-parser');
// app.use(bodyParser.urlencoded({extended: true}))

// app.use(express.static('public'));

// console.log(" inside index.js");


// const MongoClient = require('mongodb').MongoClient

// var db; 

// MongoClient.connect('mongodb://ccatto:s1mple@ds147789.mlab.com:47789/cattomlabfun', (err, client) => {
//   if (err) return console.log(err)
//   db = client.db('cattomlabfun2') 
//   // app.listen(3003, () => {
//   //   console.log('listening on 3003')
//   // })
// })

// var nameSchema = new mongoose.Schema({
//   name: String,
//   quote: String
//  });

// var UserQuote2 = mongoose.model("UserQuote", nameSchema);

// var UserQuote = require('./src/models/userquotes');


// var router = express.Router();
// router.use(function(req, res, next) {
//   // do logging
//   console.log('Something is happening.');
//   next(); // make sure we go to the next routes and don't stop here
// });
// // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
// router.get('/', function(req, res) {
//   res.json({ message: 'hooray! welcome to our api!' });   
// });






// // REGISTER OUR ROUTES -------------------------------
// // all of our routes will be prefixed with /api
// app.use('/api', router);





// app.listen(port, function(){
//   console.log('hello worl 2d port: ', port);
//   // console.log("UserQuote : ", UserQuote);
// })

// app.get('/', function(req, res){
//     res.sendfile('./server/public/index.html');
//     // res.send('Hello Express');

//     // db.collection('quotes').find().toArray(function(err, results) {
//     //   console.log(results)
//     //   // send HTML file populated with quotes here
//     // })
// });

// app.post("/addquote", (req, res) => {
//   var myData = new UserQuote(req.body);
//   res.send("insied addQuote");
//   myData.save()
//   .then(item => {
//   res.send("item saved to database");
//   })
//   .catch(err => {
//   res.status(400).send("unable to save to database");
//   });
//  });

// app.post('/quotes', (req, res) => {
//   db.collection('quotes').save(req.body, (err, result) => {
//     if (err) return console.log(err)

//     console.log('saved to database')
//     res.redirect('/')
//   })
// })



// // var itemRouter = express.Router();
// // app.use('/items', itemRouter); 

// // itemRouter.route('/').get(function (req, res) {
// //     res.sendfile('./server/public/index.html');

// //     // res.render('items');
// //   });
  
// //    itemRouter.route('/single').get(function (req, res) {
// // //     res.render('singleItem');
// // res.sendfile('./server/public/index.html');
// //    });