const router = require('express').Router();

let titleBanner = require('../../db/title.model');

const dataGeneratorFunction = require('../example.data')

router.route('/get').get((req, res) => {
  titleBanner.Title.find().limit(5)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json(err))
});


//seeding route
router.route('/add').post((req, res) => {
  var titleName = dataGeneratorFunction.exampleData(req.body.total);
  console.log('------>', titleName)
  titleBanner.saveTile(titleName, (data, err) => {
    if(err) res.status(400).json(err);
    else console.log('Titles added successfully')
  })
  res.json('Added title names successfully');
});

module.exports = router;