
var express = require('express');
var cors = require('cors');

//TODO: Require postgres

//TODO: Require cassandra

//require the router
var router = require('./router.js');

var app = express();
var bodyParser = require('body-parser');
// var title = require('./routes/title');
// var enrolled = require('./routes/enrolled');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

app.use(express.static(__dirname + '/../client/dist'));
app.use(cors());

let port = 3001;

dotenv.config();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// //**Create conditional for which db to use*/
// var whichDB = '';

//Create connection to postgres db


//Create connection to Cassandra db



mongoose.connect('mongodb://localhost:27017/TitleService', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', _ => {
  console.log('Mongo Database connected');
  // whichDB = 'mongo';
  // console.log('current DB', whichDB)
});

// //routes to get and add title
// app.use('/api', title);


// //api for enrolled second table
// app.use('/api', enrolled);

//send requests with /api to router.js
app.use('/api', router);


app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.listen(port, function () {
  console.log(`Server started and listening on port ${port}`);
});

//console.log the current db connected to
console.log('DB', process.env.ENV_DB);

//export the whichDB variable
// module.exports = whichDB;
