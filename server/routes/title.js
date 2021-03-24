const router = require('express').Router();

let Title = require('../../db/title.model');
const mongoose = require('mongoose');

const dataGeneratorFunction = require('../example.data');

//helper function
let saveTile = (randomData, cb) => {
  var titleArray = randomData[0].titleName;
  titleArray.forEach((data, index) => {
    const title = data;

    Title.findOne({title: title}, (err, data) => {
      if (err) { console.log(err); }
      if (data) {
        cb(`${title} already exists in db`);
      } else {
        const repo = new Title({
          title
        });
        repo.save()
          .then((title) => cb(title))
          .catch(err => cb(err));
      }
    });
  });
};

router.route('/getTitle').get((req, res) => {
  Title.find().sort({_id: -1}).limit(1)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json(err));
});


//seeding route
router.route('/addTitle').post((req, res) => {
  var titleName = dataGeneratorFunction.exampleDataGenerator(req.body.total);
  saveTile(titleName, (data, err) => {
    if (err) {
      res.status(400).json(err);
    } else {
      console.log('Titles added successfully');
      // mongoose.connection.close();
    }
  });
  res.status(200).json('Added title names successfully');
});




module.exports = router;