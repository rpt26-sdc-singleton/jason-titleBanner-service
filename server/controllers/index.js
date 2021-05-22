//module to contain the controller functions for postgres and cassandra

//import the client and cassClient from server/index.js
const {pgClient, cassClient} = require('../index.js');


module.exports = {
  title: {
    post: function (req, res) {

    },
    get: function (req, res) {
      //if the env db is postgres
      if (process.env.ENV_DB === 'pg') {
        console.log('PG', pgClient);
        //query the database for the specific id
        pgClient.query(`SELECT title FROM titles WHERE id = ${req.params.id}`)
        .then(data => {
          res.status(200).json(data);
        })
        .catch(err => {
          res.status(400).send(err);
          console.log('item not found');
        });
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