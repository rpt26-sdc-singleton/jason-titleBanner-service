//*This module contains the seeding function of the postgres db - TODO : create command to seed the db in package.json


//import the client to access the postgres db
const {Client} = require('pg');

const client = new Client({
  user: 'jasonschreiber',
  host: 'localhost',
  database: 'titleservice',
  password: 'password',
  port: 5432
});

client.connect();

//import the data generation module
const {dataGenerator} = require('../server/dataGeneration.js')

//seeding function
var seedPostgres = async () => {
  //start the timer
  console.time(seedPostgres);
  //create a table in the db that I want
  const tableQuery = `
  CREATE TABLE titles (
    ID INT PRIMARY KEY,
    title VARCHAR(60),
    enrolled INT
  );
  `;
  //invoke the above query - using async logic
    try {
      const res = await client.query(tableQuery);
      console.log('Table successfully created');
    } catch (err) {
      console.error(err);
    }

  //set a new array var equal to the invocation of data gen function with 10 million records
  var titleObjects = dataGenerator(10000000);

  //iterate over this array
  for (let i = 0; i < titleObjects.length; i++) {
    const {id, title, enrolled} = titleObjects[i];
    //create the insertion query
    const insertionQuery =
    `INSERT INTO titles (ID, title, enrolled) VALUES (${id}, '${title}', ${enrolled})`;
    //create new entry for each item in the array -> *MUST use async logic though
    try {
      const inserted = await client.query(insertionQuery);
    } catch (err) {
      console.error(err);
    }
  }
  console.log('finished seeding to Postgres');
  //end the client connection
  client.end();
  //display the time taken to seed
  console.timeEnd(seedPostgres);

}


//invoke the seeding function
seedPostgres();