//*This module contains the seeding function of the cassandra db - TODO : create command to seed the db in package.json
var cassandra = require('cassandra-driver');


//access the cassandra db
//Replace Username and Password with your cluster settings
var authProvider = new cassandra.auth.PlainTextAuthProvider('cassandra', 'cassandra');
//Replace PublicIP with the IP addresses of your clusters
var contactPoints = ['127.0.0.1:9042'];
//establish what localDataCenter to look for
var localDataCenter = 'datacenter1';
var client = new cassandra.Client({contactPoints: contactPoints, localDataCenter: localDataCenter, authProvider: authProvider, keyspace:'sdc'});

client.connect(() => {
  console.log('Cassandra db connected');
});

//import the data generation module
const { dataGenerator } = require('../server/dataGeneration.js')

//seeding function
var seedCassandra = async () => {
  //start the timer
  console.time(seedCassandra);
  //create a table in the db that I want
  const tableQuery = `
  CREATE TABLE titles(id int, title text, enrolled int, PRIMARY KEY(id));
  `;
  //invoke the above query - using async logic
  try {
    const res = await client.execute(tableQuery);
    console.log('Table successfully created');
  } catch (err) {
    console.error(err);
  }

  //set a new array var equal to the invocation of data gen function with 10 million records
  var titleObjects = dataGenerator(10000000);

  //iterate over this array
  for (let i = 0; i < titleObjects.length; i++) {
    const { id, title, enrolled } = titleObjects[i];
    //create the insertion query
    const insertionQuery =
      `INSERT INTO titles (id, title, enrolled) VALUES (${id}, '${title}', ${enrolled})`;
    //create new entry for each item in the array -> *MUST use async logic though
    try {
      const inserted = await client.execute(insertionQuery);
    } catch (err) {
      console.error(err);
    }
  }
  console.log('finished seeding to Cassandra');
  //end the client connection
  client.shutdown();
  //display the time taken to seed
  console.timeEnd(seedCassandra);

}


//invoke the seeding function
// seedCassandra();