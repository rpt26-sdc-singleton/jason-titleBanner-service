const faker = require('faker');

//GOAL = to take in an input number and generate the amount of records of the input number

let dataGenerator = (inputNum) => {
  //create an array to hold all title objects
  var titleObjects = [];
  //iterate over inputNum number of times
  for (let i = 0; i < inputNum; i++) {
    //create new object
    var newObj = {};
    //create id property of current iteration + 1 to obj
    var id = i + 1;
    //set id prop of obj to the above
    newObj.id = id;
    //create a new faker title
    var title = faker.random.words(2);
    //set title prop of obj to the above
    newObj.title = title;
    //create new enrolled number
    var enrolled = faker.random.number();
    //set enrolled prop of obj to the above
    newObj.enrolled = enrolled;
    //push the object to the titleObjects array
    titleObjects.push(newObj);
    console.log(`id ${newObj.id} with title ${newObj.title} added to db`);
  }
  console.log(`finished data generation, ${titleObjects.length} objects in titleObjects array`);
  console.log('ARRAY', titleObjects);
  //return the array containing all objects
  return titleObjects;
}

module.exports = {
  dataGenerator
}


//tested dataGeneration to see if it worked
// dataGenerator(5);