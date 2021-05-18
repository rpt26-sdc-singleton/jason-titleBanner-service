//import the express router
var router = require('express').Router();

//import the variable from index.js - conditional to determine which routes to use
const db = require('./index.js');
//import the title.js and enrolled.js modules for mongo routes
const title = require('./routes/title.js');
const enrolled = require('./routes/enrolled.js')

//if the db is mongo
if (db === 'mongo') {
  //route to get title
  router.get('/getTitle/:id', title.get)
}

//otherwise if the db is postgres


//otherwise if the db is couchDB

//export the router
module.exports = router;