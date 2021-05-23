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
//Replace Username and Password with your cluster settings
var authProvider = new cassandra.auth.PlainTextAuthProvider('cassandra', 'cassandra');
//Replace PublicIP with the IP addresses of your clusters
var contactPoints = ['127.0.0.1:9042'];
//establish what localDataCenter to look for
var localDataCenter = 'datacenter1';
var cassClient = new cassandra.Client({contactPoints: contactPoints, localDataCenter: localDataCenter, authProvider: authProvider, keyspace:'sdc'});

cassClient.connect(() => {
  console.log('Cassandra Database connected');
});


module.exports = {
  title: {
    post: async function (req, res) {
      //create variables for the id and title
      const id = req.body.id;
      const title = req.body.title;

      //if the db is postgres
      if (process.env.ENV_DB === 'pg') {
        //take care of duplicates - if the id in the req exists already
        try {
          var query = await pgClient.query(`SELECT title FROM titles WHERE id = ${id}`);
          //if the id is already found
          if (query.rows.length !== 0) {
            //send response that item already exists
            res.json(`${id} already exists in db`);
            console.log(`${id} already exists in db`);
            //otherwise
          } else {
            //query the database to insert a new title, given an input title and input id
            try {
              await pgClient.query(`INSERT INTO titles (id, title, enrolled) VALUES (${id}, '${title}', 0)`);
              res.status(200).json(`Added id ${id} with title '${title}'`);
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
      } else if (process.env.ENV_DB === 'cass') {

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
        //query the cass db for inputted id
        try {
          const results = await cassClient.execute(`SELECT title FROM titles WHERE id = ${req.params.id}`);
          //send back the result
          res.status(200).json(results.rows[0].title);
        } catch (err) {
          res.status(400).send(err);
          console.log('item not found');
        }
      }
    },
    update: async function (req, res) {
      //create variables for the id and title
      const id = req.params.id
      const title = req.body.title;
      //if the env db is postgres
      if (process.env.ENV_DB === 'pg') {
        pgClient.query(`UPDATE titles SET title = '${title}' WHERE id = ${id}`)
          .then(() => {
            //query the database for the specific id
              pgClient.query(`SELECT title FROM titles WHERE id = ${id}`)
              .then((results) => res.status(200).json(results.rows[0].title))
              .catch(err => {
                res.status(400).send(err);
              console.log(`error selecting item with id ${id}`, err);
              });
          })
          .catch(err => {
            res.status(400).send(err);
            console.log(`Error updating id ${id}`, err);
          })
        //otherwise if the env db is cass
      } else if (process.env.ENV_DB === 'cass') {

      }

    },
    delete: function (req, res) {
      //create variables for the id
      const id = req.params.id;
      //if the env db is postgres
      if (process.env.ENV_DB === 'pg') {
        pgClient.query(`DELETE FROM titles WHERE id = ${id}`)
        .then(() => {
          res.status(200).send(`Title and id for id ${id} deleted`);
        console.log('Data Deleted!');
        })
        .catch(err => {
          res.status(400).send(err);
          console.log(`Could not delete item ${id}`, err);
        });
        //otherwise if the env db is cass
      } else if (process.env.ENV_DB === 'cass') {

      }
    }
  },

  enrolled: {
    get: async function (req, res) {
      //if the env db is postgres
      if (process.env.ENV_DB === 'pg') {
        //query the database for the specific id
        try {
          const results = await pgClient.query(`SELECT enrolled FROM titles WHERE id = ${req.params.id}`);
          res.status(200).json(results.rows[0].enrolled);
        } catch (err) {
          res.status(400).send(err);
          console.log('item not found');
        }
        //otherwise if the env db is cass
      } else if (process.env.ENV_DB === 'cass') {
        //query the cass db for inputted id
        try {
          const results = await cassClient.execute(`SELECT enrolled FROM titles WHERE id = ${req.params.id}`);
          //send back the result
          res.status(200).json(results.rows[0].enrolled);
        } catch (err) {
          res.status(400).send(err);
          console.log('item not found');
        }
      }
    }
  }

}