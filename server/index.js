
var express = require('express');
var cors  = require('cors');

var app = express();
var bodyParser = require('body-parser');
var title = require('./routes/title');
var enrolled = require('./routes/enrolled');

app.use(express.static(__dirname + '/../client/dist'));
app.use(cors());

let port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/addTitle', title);

//app.use('/api/getTotalEnrolled', enrolled);


app.listen(port, function() {
  console.log('Server started and listening on port 3000');
});