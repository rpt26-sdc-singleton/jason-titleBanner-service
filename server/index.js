
var express = require('express');
var cors = require('cors');

var app = express();
var bodyParser = require('body-parser');
var title = require('./routes/title');
var enrolled = require('./routes/enrolled');

  app.use(express.static(__dirname + '/../client/dist'));
app.use(cors());

let port = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//routes to get and add title
app.use('/api', title);


//TODO second table
app.use('/api', enrolled);


app.listen(port, function() {
  console.log(`Server started and listening on port ${port}`);
});