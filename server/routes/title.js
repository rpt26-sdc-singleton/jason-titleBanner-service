const router = require('express').Router();

let Title = require('../../db/title.model');
const mongoose = require('mongoose');

const dataGeneratorFunction = require('../example.data');

//helper function
let saveTile = (randomData, cb) => {
  var titleArray = randomData[0].titleName;
  var idArray = randomData[0].id;
  titleArray.forEach((data, index) => {
    const title = data;
    const id = String(idArray[index]);

    //take care of duplicates
    Title.findOne({ title: title }, (err, data) => {
      if (err) { console.log(err); }
      if (data) {
        cb(`${title} already exists in db`);
      } else {
        const repo = new Title({
          id,
          title
        });
        repo.save()
          .then((title) => cb(title))
          .catch(err => cb(err));
      }
    });
  });
};

//Retrieve/Read operation
router.route('/getTitle/:id').get((req, res) => {
  Title.find({ id: req.params.id })
    .then(data => {
      res.status(200).json(data[0].title);
    })
    .catch(err => res.status(400).json(err));
});


//seeding route - Create operation
router.route('/addTitle').post((req, res) => {
  var titleName = dataGeneratorFunction.exampleDataGenerator(req.body.total);
  saveTile(titleName, (data, err) => {
    if (err) {
      res.status(400).json(err);
    } else {
      console.log('Titles added successfully', data.title);
      // mongoose.connection.close();
    }
  });
  res.status(200).json('Added title names successfully');
});

//Update operation - given an id and new title as input through the req object
router.route('/updateTitle/:id').put((req, res) => {
  //update the one item
  User.updateOne({ age: { $gte: 5 } },
    { title: req.params.title }, function (err, docs) {
      if (err) {
        console.log(err);
      }
      else {
        console.log('Updated Docs : ', docs);
      }
    });
});


//Delete operation - given an id as input through the req object
router.route('deleteTitle/:id').delete((req, res) => {
  //find the item and delete
  Title.remove({ id: req.params.id },
    function (err, data) {
      if (err) {
        console.log(err);
      }
      else {
        res.send(data);
        console.log('Data Deleted!');
      }
    });
});

module.exports = router;