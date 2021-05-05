
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

    Enrolled.findOne({ enrolled: enrolled }, (err, data) => {
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

  saveEnrolled(enrolled, (data, err) => {
    if (err) {
      res.status(400).json(err);
    } else {
      console.log('Enrolled added successfully');
      // mongoose.connection.close();
    }
  });

  Enrolled.find({ id: req.params.id })
    .then(data => res.status(200).json(data[0].enrolled))
    .catch(err => res.status(404).json(err));
});




//Create operation - given an enrolled num and an id, create a new entry
router.route('/postEnrolled').post((req, res) => {
  //save a new document to the db

  const id = req.body.id;
  const enrolled = req.body.enrolled;
  //take care of duplicates
  Enrolled.findOne({ id: req.body.id }, (err, data) => {
    if (err) { console.log(err); }
    if (data) {
      res.json(`${id} already exists in db`)
      console.log(`${id} already exists in db`);
    } else {
      const item = new Enrolled({
        id,
        enrolled
      });
      item.save()
        .then((title) => res.status(200).json(item))
        .catch(err => res.send(err));
    }
  });
});



//Read Operation - given a specific id
router.route('/retrieveEnrolled/:id').get((req, res) => {
  Enrolled.find({ id: req.params.id })
    .then(data => res.status(200).json(data[0].enrolled))
    .catch(err => res.status(404).json(err));
});


//Update Operation - given a specific id
router.route('/updateEnrolled/:id').put((req, res) => {

});



//Delete Operation - given a specific id
router.route('/updateEnrolled/:id').delete((req, res) => {

});


module.exports = router;