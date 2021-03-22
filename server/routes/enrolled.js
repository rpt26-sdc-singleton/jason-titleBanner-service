
const router = require('express').Router();

let Enrolled = require('../../db/enrolled.model');

const { exampleEnrolledGenerator } = require('../example.data');

router.route('/getEnrolled').get((req, res) => {
  // using a hack to populate enrolled table
  //totalEnrolled.saveEnrolled(exampleEnrolledGenerator());

  var enrolled = exampleEnrolledGenerator();

  const enrolledTable = new Enrolled({
    enrolled
  });

  console.log('MONGO', enrolledTable);
  enrolledTable.save()
    .then(response => console.log(response))
    .catch(err => console.log(err));

  Enrolled.find().sort({_id: -1}).limit(1)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).json(err));
});

module.exports = router;