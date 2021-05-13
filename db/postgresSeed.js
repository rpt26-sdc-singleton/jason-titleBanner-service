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
const generator = require('../server/dataGeneration.js')

//seeding function
var seedPostgres = () => {
  //create a table in the db that I want
  const tableQuery = `
  CREATE TABLE titles (
    ID SERIAL PRIMARY KEY,
    title VARCHAR(60),
    enrolled INT
  );
  `;
  //invoke the above query
  client.query(tableQuery)
    .then(res => {console.log('Table successfully created');
    })
    .catch(err => {
      console.err(err);
    })
    .finally(() => {
      client.end();
    });
  //set a new array var equal to the invocation of data gen function with 10 million records

  //iterate over this array

  //create new entry for each item in the array -> *MUST use async logic though


}


//invoke the seeding function
seedPostgres();