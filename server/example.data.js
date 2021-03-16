const faker = require('faker');

let exampleDataGenerator = (index) => {
  var titleName = [{
    titleName: []
  }];
  while (index !== 0) {
    let title = faker.random.words(2);
    titleName[0].titleName.push(title);
    index--;
  }

  return titleName;
};

let exampleEnrolledGenerator = () => {
  return faker.random.number();

}

module.exports = {
  exampleDataGenerator,
  exampleEnrolledGenerator
};