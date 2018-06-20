// /routes/index.js

// routes/index.js
var express = require('express')
  , router = express.Router()


  router.use(require('./cars'));
  router.use(require('./item'));
  router.use(require('./customer'));

// router.use('/cars', require('./cars'))

// router.get('/', function(req, res) {
//     console.log("here ins index routher ");
//   res.send('Home page')
// })

// router.get('/about', function(req, res) {
//   res.send('Learn about us')
// })

module.exports = router