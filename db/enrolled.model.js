
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27018/enrolled');
const Schema = mongoose.Schema;

const db = mongoose.connection;
db.once('open', _ => {
  console.log('Database connected');
});

const enrolledSchema = new Schema({
  enrolled: Number
});

let Enrolled = mongoose.model('Enrolled', enrolledSchema);

let saveEnrolled = (randomEnrolled) => {
  const enrolledTable = new Enrolled({
    randomEnrolled
  });
  enrolledTable.save()
    .then(response => console.log(response))
    .catch(err => console.log(err));
};

module.exports = {
  saveEnrolled,
  Enrolled
};