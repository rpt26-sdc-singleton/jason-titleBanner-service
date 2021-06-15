//module to contain the controller functions for postgres and cassandra
require('dotenv').config();

//Require postgres
const { Pool } = require('pg');

//Create connection to postgres db
const pgClient = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT
});

pgClient.connect()
  .then(() => console.log('Postgres Database connected'))
  .catch(() => console.log('Error connecting to db'));


//Require cassandra
var cassandra = require('cassandra-driver');

//Create connection to cassandra db
//Replace Username and Password with your cluster settings
var authProvider = new cassandra.auth.PlainTextAuthProvider(process.env.CASS_USER, process.env.CASS_PASS);
//Replace PublicIP with the IP addresses of your clusters
var contactPoints = [process.env.CASS_CONTACT_POINT1];
//establish what localDataCenter to look for
var localDataCenter = process.env.CASS_DATACENTER;
var cassClient = new cassandra.Client({contactPoints: contactPoints, localDataCenter: localDataCenter, authProvider: authProvider, keyspace: process.env.CASS_KEYSPACE});

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
        const selectQuery = `SELECT title FROM titles WHERE id = ${id}`;
        //take care of duplicates - if the id in the req exists already
        try {
          var query = await pgClient.query(selectQuery);
          //if the id is already found
          if (query.rows.length !== 0) {
            //send response that item already exists
            res.json(`${id} already exists in db`);
            console.log(`${id} already exists in db`);
            //otherwise
          } else {
            //query the database to insert a new title, given an input title and input id
            const insertQuery = `INSERT INTO titles (id, title, enrolled) VALUES (${id}, '${title}', 0)`;
            try {
              await pgClient.query(insertQuery);
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
        //take care of duplicates - if the id in the req exists already
        const selectExecute = `SELECT title FROM titles WHERE id = ${id}`;
        try {
          var query = await cassClient.execute(selectExecute);
          //if the id is already found
          if (query.rows.length !== 0) {
            //send response that item already exists
            res.json(`${id} already exists in db`);
            console.log(`${id} already exists in db`);
            //otherwise
          } else {
            //query the database to insert a new title, given an input title and input id
            const insertExecute = `INSERT INTO titles (id, title, enrolled) VALUES (${id}, '${title}', 0)`
            try {
              await cassClient.execute(insertExecute);
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
      }
    },
    get: async function (req, res) {
      //if the env db is postgres
      if (process.env.ENV_DB === 'pg') {
        //query the database for the specific id
        const selectQueryString = `SELECT title FROM titles WHERE id = ${req.params.id}`
        try {
          const results = await pgClient.query(selectQueryString);
          res.status(200).json(results.rows[0].title);
        } catch (err) {
          res.status(400).send(err);
          console.log('item not found');
        }
      }
      //otherwise if the env db is cass
      else if (process.env.ENV_DB === 'cass') {
        //query the cass db for inputted id
        const selectExecuteString = `SELECT title FROM titles WHERE id = ${req.params.id}`;
        try {
          const results = await cassClient.execute(selectExecuteString);
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
        const updateQueryString = `UPDATE titles SET title = '${title}' WHERE id = ${id}`;
        pgClient.query(updateQueryString)
          .then(() => {
            //query the database for the specific id
            const queryFindItem = `SELECT title FROM titles WHERE id = ${id}`;
              pgClient.query(queryFindItem)
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
        const updateExecuteString = `UPDATE titles SET title = '${title}' WHERE id = ${id}`;
        cassClient.execute(updateExecuteString)
          .then(() => {
            //query the database for the specific id
            const executeFindItem = `SELECT title FROM titles WHERE id = ${id}`
              cassClient.execute(executeFindItem)
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
      }

    },
    delete: function (req, res) {
      //create variables for the id
      const id = req.params.id;
      //if the env db is postgres
      if (process.env.ENV_DB === 'pg') {
        const deleteQueryString = `DELETE FROM titles WHERE id = ${id}`;
        pgClient.query(deleteQueryString)
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
        const deleteExecuteString = `DELETE FROM titles WHERE id = ${id}`;
        cassClient.execute(deleteExecuteString)
        .then(() => {
          res.status(200).send(`Title and id for id ${id} deleted`);
        console.log('Data Deleted!');
        })
        .catch(err => {
          res.status(400).send(err);
          console.log(`Could not delete item ${id}`, err);
        });
      }
    }
  },

  enrolled: {
    get: async function (req, res) {
      //if the env db is postgres
      if (process.env.ENV_DB === 'pg') {
        //query the database for the specific id
        const queryString = `SELECT enrolled FROM titles WHERE id = ${req.params.id}`;
        try {
          const results = await pgClient.query(queryString);
          res.status(200).json(results.rows[0].enrolled);
        } catch (err) {
          res.status(400).send(err);
          console.log('item not found');
        }
        //otherwise if the env db is cass
      } else if (process.env.ENV_DB === 'cass') {
        //query the cass db for inputted id
        const executeString = `SELECT enrolled FROM titles WHERE id = ${req.params.id}`;
        try {
          const results = await cassClient.execute(executeString);
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


