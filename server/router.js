//import the express router
var router = require('express').Router();

//import conditional var from index.js - determines which routes to use
const {whichDB} = require('./index.js');
//import the title.js and enrolled.js modules for mongo routes
const title = require('./routes/title.js');
const enrolled = require('./routes/enrolled.js');

//import the postgresSeed module

//import the cassandraSeed module

console.log('Im in the router', whichDB);

//if the db is mongo
if (whichDB === 'mongo') {
  console.log('in the if statement');
  //route to add a title
  router.post('/addTitle', title.post);
  //route to get title
  router.get('/getTitle/:id', title.get);
}

//if the process.env.db is postgres
  //route to get title

  //route to get enrolled



//otherwise if the process.env.db is cassandra
  //route to get title

  //route to get enrolled





//export the router
module.exports = router;