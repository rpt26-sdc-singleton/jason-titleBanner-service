
const router = require('express').Router();

let Enrolled = require('../../db/enrolled.model');

const { exampleEnrolledGenerator } = require('../example.data');


//helper function
let saveEnrolled = (randomData, cb) => {
  var enrolledArray = randomData[0].enrolled;
  var idArray = randomData[0].id;
  enrolledArray.forEach((data, index) => {
    const enrolled = data;
    const id = String(idArray[index]);

    Enrolled.findOne({enrolled: enrolled}, (err, data) => {
      if (err) { console.log(err); }
      if (data) {
        cb(`${title} already exists in db`);
      } else {
        const repo = new Enrolled({
          id,
          enrolled
        });
        repo.save()
          .then((enrolled) => cb(enrolled))
          .catch(err => cb(err));
      }
    });
  });
};

router.route('/getEnrolled/:id').get((req, res) => {
  // using a hack to populate enrolled table
  //totalEnrolled.saveEnrolled(exampleEnrolledGenerator());

  var enrolled = exampleEnrolledGenerator();
  console.log(enrolled);

  saveEnrolled(enrolled, (data, err) => {
    if (err) {
      res.status(400).json(err);
    } else {
      console.log('Enrolled added successfully');
      // mongoose.connection.close();
    }
  });

  Enrolled.find({id: req.params.id})
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).json(err));
});

module.exports = router;