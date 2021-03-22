
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enrolledSchema = new Schema({
  enrolled: Number
});

let Enrolled = mongoose.model('Enrolled', enrolledSchema);

module.exports = Enrolled;
