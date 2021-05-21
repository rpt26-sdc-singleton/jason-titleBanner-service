
var express = require('express');
var cors = require('cors');

//Require postgres
const {Client} = require('pg');

//Require cassandra
var cassandra = require('cassandra-driver');

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


//Create connection to postgres db
const client = new Client({
  user: 'jasonschreiber',
  host: 'localhost',
  database: 'titleservice',
  password: 'password',
  port: 5432
});

client.connect()
  .then(() => console.log('Postgres Database connected'))
  .catch(() => console.log('Error connecting to db'));


//Create connection to Cassandra db
//Replace Username and Password with your cluster settings
var authProvider = new cassandra.auth.PlainTextAuthProvider('cassandra', 'cassandra');
//Replace PublicIP with the IP addresses of your clusters
var contactPoints = ['127.0.0.1:9042'];
//establish what localDataCenter to look for
var localDataCenter = 'datacenter1';
var cassClient = new cassandra.Client({contactPoints: contactPoints, localDataCenter: localDataCenter, authProvider: authProvider, keyspace:'sdc'});

cassClient.connect(() => {
  console.log('Cassandra Database connected');
});


//create mongoose connection
mongoose.connect('mongodb://localhost:27017/TitleService', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', _ => {
  console.log('Mongo Database connected');
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

//export the client variables for postgres and cass
module.exports = client, cassClient;
