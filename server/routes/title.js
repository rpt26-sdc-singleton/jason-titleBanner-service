const router = require('express').Router();

let titleBanner = require('../../db/title.model');

const dataGeneratorFunction = require('../example.data')

// router.route('/:id').get((req, res) => {
//   TitleBanner.findById(req.params.id)
//     .then(title => res.json(title))
//     .catch(err => res.status(400).json('Error: ' + err))
// });


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