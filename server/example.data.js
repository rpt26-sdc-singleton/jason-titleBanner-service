const faker = require('faker');

let exampleData = (index) => {
  var titleName = [{
    titleName: []
  }];
  while (index !== 0) {
    let title = faker.random.words(2);
    titleName[0].titleName.push(title);
    index--;
  }

  return titleName;
}

module.exports = {
  exampleData
}