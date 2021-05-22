//module to contain the controller functions for postgres and cassandra

//import the client and cassClient from server/index.js
// const { pgClient, cassClient } = require('../index.js');


//Require postgres
const {Pool} = require('pg');

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




module.exports = {
  title: {
    post: function (req, res) {

    },
    get: async function (req, res) {
      //if the env db is postgres
      if (process.env.ENV_DB === 'pg') {
        console.log('PG', pgClient);
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

    },
    delete: function (req, res) {

    }
  },

  enrolled: {
    get: function (req, res) {

    }
  }

}