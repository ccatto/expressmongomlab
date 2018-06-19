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
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
let uri = 'mongodb://ccatto:s1mple@ds147789.mlab.com:47789/cattomlabfun';
mongoose.connect(uri);
let dbMongoose = mongoose.connection;
dbMongoose.on('open', function () {
  console.log("inside mongoose connect open to: ", uri);
});
dbMongoose.on('error', console.error.bind(console, 'connection error:'));

var ContactSchema = new Schema({
  firstName: String,
  lastName: String
});

var ContactModel = mongoose.model('ContactModel', ContactSchema);
var record = new ContactModel();
var contactModelRecord = new ContactModel();

////////// /////////////////   ////////// /////////////////
////////// Routes              /////////////////  
////////// /////////////////   ////////// ///////////////// 
app.get('/', (req, res) => {
  console.log("HERE insdie the /");
  // record.find({})
  //   .exec(function(err, data){
  //     if(err){
  //       res.send('An Error has Ocurr');
  //     }else {
  //       console.log("No Error so Far");
  //       console.log(data);
  //       res.json(data);
  //     }
  //   });
  console.log("here");
  res.sendFile(__dirname + '/public/index.html');
  //  response.send("Hello world");
});

app.get('/api/getallcontacts', (req, res) => {
  console.log("inside Get All Contacts");
  ContactModel.find({}, (err, contact) => {
    console.log("about to retrun all contacts", contact);
    res.json(contact)
  })
})

app.get('/api/getcontactbyname', (req, res) => {
  console.log("inside Get Contact by Name");

  ContactModel.find({ firstName: "john" }, (err, contact) => {
    if (err) return res.status(500).send(err)
    console.log("contact ", contact);
    // send the list of all people in database with name of "John James" and age of 36
    // Very possible this will be an array with just one Person object in it.
    return res.status(200).send(contact);
  });
})

app.get('/api/getconactbyid', (req, res) => {
  // app.get('/api/getcontactbyname2', (req,res)=>{
  console.log("inside Get Contact by Name");
  var id = "5b282299a8dfd0ea8603ffa9";
  ContactModel.findById(id, function (err, contact) {
    if (err) return res.status(500).send(err)
    console.log("get contact by ID");
    return res.status(200).send(contact);
  });
})



app.get('/api/updateconactbyid', (req, res) => {
  // app.get('/api/getcontactbyname2', (req,res)=>{
  console.log("inside Get Contact by Name");
  var id = "5b282299a8dfd0ea8603ffa9";

  ContactModel.findByIdAndUpdate(
    id,
    {firstName: "Jennifer"},
    {new: true},
    function(err, contact) {
      if (err) throw err;
      console.log("get contact by ID");
      return res.status(200).send(contact);
  });
  // ContactModel.findById(id, function (err, contact) {
  //   if (err) return res.status(500).send(err)
  //   console.log("get contact by ID");
  //   return res.status(200).send(contact);
  // });
})



// Model.findByIdAndUpdate(id, updateObj, {new: true}, function(err, model) {


// ContactModel.find({ "firstName" : "John" })
// .exec(function (err, contact) {
//   if (err) return handleError(err);
//   console.log("contact ", contact);
//   // returns all stories that have Bob's id as their author.
// });

// ContactModel.find({}, (err, contact) => {
//   console.log("about to retrun all contacts", contact);
//   res.json(contact)
// })


app.get('/api/findbyid2', (req, res) => {
  console.log("Find By ID");
  var id = "5b282299a8dfd0ea8603ffa9";
  // ContactModel.find({firstName: "john"}, (err, contact) =>{  
  //     if (err) return res.status(500).send(err)
  //     console.log("contact ", contact);
  //     // send the list of all people in database with name of "John James" and age of 36
  //     // Very possible this will be an array with just one Person object in it.
  //     return res.status(200).send(contact);
  // });
})
// ContactModel.findByIdAndUpdate(id, function(err, ContactModel) {
//   if (err) {
//     console.log("ERRROR finding by id");
//     return;
//     //   logger.error(modelString +':edit' + modelString +' - ' + err.message);
//     //   self.emit('item:failure', 'Failed to edit ' + modelString);
//   }
//   console.log("ContactModel == ", ContactModel)
//   //   self.emit('item:success', moContactModeldel);
//   // }
// });


// static response example
app.post('/api/updatecontactbyid', (req, res) => {
  console.log("HERE ins die update by id");
  var id = "5b282299a8dfd0ea8603ffa9";
  ContactModel.findByIdAndUpdate(id, updateObj, { new: true }, function (err, ContactModel) {
    if (err) {
      console.log("ERRROR finding by id");
      return;
      //   logger.error(modelString +':edit' + modelString +' - ' + err.message);
      //   self.emit('item:failure', 'Failed to edit ' + modelString);
    }
    //   self.emit('item:success', moContactModeldel);
    // }
  });
})

app.post("/api/addcontact", (req, res) => {
  var firstName = req.body.firstName;
  console.log("firstName == ", firstName);
  console.log("body -- ", req.body);
  console.log("inside add /addcontact POST");

  record.firstName = firstName;
  record.lastName = "Jones";

  record.save(function (err) {
    if (err) return handleError(err);
    console.log("here it was saved!");
  })

  res.sendFile(__dirname + '/public/index.html');
});

// static response example
app.get('/api/books/2', (req, res) => {
  res.json(
    {
      id: 2,
      title: "Einstein's Dreams",
      author: "Alan Lightman"
    }
  )
})


// app.post("/addcontact", (req, res) => {
//   // var firstName = req.body.firstName;
//   // console.log("inside /addcontact POST", firstName);
//   if (!req.body) return res.sendStatus(400)
//   console.log("insdie post ");
//   console.log("body -- ", req.body);
//   console.log("firstName -- ", req.body.firstName);
//   res.sendFile(__dirname + '/public/index.html');
// });

// var newContact = req.body;
// newContact.createDate = new Date();

// if (!(req.body.firstName || req.body.lastName)) {
//   handleError(res, "Invalid user input", "Must provide a first or last name.", 400);
// }

// db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
//   if (err) {
//     handleError(res, err.message, "Failed to create new contact.");
//   } else {
//     res.status(201).json(doc.ops[0]);
//   }
// });

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({ "error": message });
}

// require('./src/routes')(app, {});
// require('./src/routes')(app, {});
// app.use(require('./src/routes/cars'));
app.use(require('./src/routes'));
  //  app.use(require('./src/routes/allroutes'));

app.listen(3008, () => console.log('Example app listening on port 3008!'))





//////////////////// //////////////////// ////////////////////
//////////////////// Old Comments         ////////////////////
//////////////////// //////////////////// ////////////////////

// app.get('/', (req, res) => res.send('Hello World!'));

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


// if we want form in public directory use line below up top:
// app.use(express.static(__dirname + "/public"));

// mongoose.connect(uri).exec()
//     .then(() => { // if all is ok we will be here
//         // console.log("all good in Mongoose");
//         return server.start();
//     })
//     .catch(err => { // if error we will be here
//         console.error('App starting error:', err.stack);
//         process.exit(1);
//     });



// Create simple schema:

// var nameSchema = new mongoose.Schema({
//   firstName: String,
//   lastNameName: String
// });

// // create model from schema:
// var User = mongoose.model("User", nameSchema);


// // CONTACTS API ROUTES BELOW

// // Generic error handler used by all endpoints.
// function handleError(res, reason, message, code) {
//   console.log("ERROR: " + reason);
//   res.status(code || 500).json({"error": message});
// }

// /*  "/contacts"
//  *    GET: finds all contacts
//  *    POST: creates a new contact
//  */



// // app.get('/', (req, res) => res.send('Hello World!'));

// app.listen(3008, () => console.log('Example app listening on port 3008!'))

// app.get("/contacts", function(req, res) {
//   console.log("inside /contact GET");
// });

// POST
// app.post("/contacts", function(req, res) {


//     var newContact = req.body;
//     newContact.createDate = new Date();

//     if (!(req.body.firstName || req.body.lastName)) {
//       handleError(res, "Invalid user input", "Must provide a first or last name.", 400);
//     }

//     db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
//       if (err) {
//         handleError(res, err.message, "Failed to create new contact.");
//       } else {
//         res.status(201).json(doc.ops[0]);
//       }
//     });



// });

/*  "/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

// app.get("/contacts/:id", function(req, res) {
// });










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