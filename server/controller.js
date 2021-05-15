///import the variable from index.js - conditional to determine which routes to use
const db = require('server/index.js');

//if the db is mongo
if (db === 'mongo') {

}

//otherwise if the db is postgres


//otherwise if the db is couchDB