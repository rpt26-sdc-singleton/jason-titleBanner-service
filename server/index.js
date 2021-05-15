
var express = require('express');
var cors = require('cors');

//TODO: Require the postgresSeed module

var app = express();
var bodyParser = require('body-parser');
var title = require('./routes/title');
var enrolled = require('./routes/enrolled');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

app.use(express.static(__dirname + '/../client/dist'));
app.use(cors());

let port = 3001;

dotenv.config();

// mongo environment variables
// const {
//   MONGO_HOSTNAME,
//   MONGO_DB,
//   MONGO_PORT,
//   PORT
// } = process.env;

//^^Jason commented out because the env vars are not included when pulled from github


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Create connection to postgres db


//Create connection to Cassandra db


//**Create conditional for which db to use*/
var whichDB = '';

mongoose.connect('mongodb://localhost:27017/TitleService', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', _ => {
  console.log('Mongo Database connected');
  whichDB = 'mongo';
});

//if the db is mongo
//routes to get and add title
app.use('/api', title);


//api for enrolled second table
app.use('/api', enrolled);


app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.listen(port, function () {
  console.log(`Server started and listening on port ${port}`);
});
