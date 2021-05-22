//module to contain the controller functions for postgres and cassandra

//import the client and cassClient from server/index.js
// const { pgClient, cassClient } = require('../index.js');


//Require postgres
const { Pool } = require('pg');

//Create connection to postgres db
const pgClient = new Pool({
  user: 'jasonschreiber',
  host: 'localhost',
  database: 'titleservice',
  password: 'password',
  port: 5432
});

pgClient.connect()
  .then(() => console.log('Postgres Database connected'))
  .catch(() => console.log('Error connecting to db'));



//Reauire cassandra
var cassandra = require('cassandra-driver');

//Create connection to cassandra db

module.exports = {
  title: {
    post: async function (req, res) {
      //if the db is postgres
      if (process.env.ENV_DB === 'pg') {
        //create variables for the id and title
        const id = req.body.id;
        const title = req.body.title;
        //take care of duplicates - if the id in the req exists already
        try {
          var query = await pgClient.query(`SELECT title FROM titles WHERE id = ${id}`);
          console.log('Query', query);
            //if the id is already found
            if (query.rows.length !== 0) {
              // console.log('Exists', exists);
              //send response that item already exists
              res.json(`${id} already exists in db`);
              console.log(`${id} already exists in db`);
              //otherwise
            } else {
              //query the database to insert a new title, given an input title and input id
              try {
                console.log('in the try');
                const insert = await pgClient.query(`INSERT INTO titles (id, title, enrolled) VALUES (${id}, '${title}', 0)`);
                res.status(200).json(insert);
              } catch (err) {
                res.status(400).send(err);
                console.log('Error inserting into db', err);
              };
            }
          //if there is an error
        } catch (err) {
          res.status(400).send(err);
          console.log('searching for id not successful', err);
        }
      } else if(process.env.ENV_DB === 'cass') {

      }
    },
get: async function (req, res) {
  //if the env db is postgres
  if (process.env.ENV_DB === 'pg') {
    //query the database for the specific id
    try {
      const results = await pgClient.query(`SELECT title FROM titles WHERE id = ${req.params.id}`);
      res.status(200).json(results.rows[0].title);
    } catch (err) {
      res.status(400).send(err);
      console.log('item not found');
    }
  }
  //otherwise if the env db is cass
  else if (process.env.ENV_DB === 'cass') {

  }
},
update: function (req, res) {
  //if the env db is postgres
  if (process.env.ENV_DB === 'pg') {

    //otherwise if the env db is cass
  } else if (process.env.ENV_DB === 'cass') {

  }

},
delete: function (req, res) {
  //if the env db is postgres
  if (process.env.ENV_DB === 'pg') {

    //otherwise if the env db is cass
  } else if (process.env.ENV_DB === 'cass') {

  }
}
  },

enrolled: {
  get: function (req, res) {
    //if the env db is postgres
    if (process.env.ENV_DB === 'pg') {

      //otherwise if the env db is cass
    } else if (process.env.ENV_DB === 'cass') {

    }
  }
}

}