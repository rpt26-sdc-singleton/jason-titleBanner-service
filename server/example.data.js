const faker = require('faker');
var titleNameCounter = 0;
var enrolledCounter = 0;

let exampleDataGenerator = (index) => {
  var titleName = [{
    id: [],
    titleName: []
  }];
  while (index !== 0) {
    let title = faker.random.words(2);
    titleName[0].titleName.push(title);
    titleNameCounter++;
    titleName[0].id.push(titleNameCounter);
    index--;
  }

  return titleName;
};

let exampleEnrolledGenerator = () => {
  var diff = titleNameCounter - enrolledCounter;
  var totalEnrolled = [{
    id: [],
    enrolled: []
  }];
  while (diff !== 0) {
    enrolledCounter++;
    totalEnrolled[0].id.push(enrolledCounter);
    totalEnrolled[0].enrolled.push(faker.random.number());
    diff--;
  }
  return totalEnrolled;
};

module.exports = {
  exampleDataGenerator,
  exampleEnrolledGenerator
};