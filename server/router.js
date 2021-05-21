//intermediary module to contain the module to go to for the routes

//import the express router
var router = require('express').Router();

//import the controller module
const controller = require('./controllers');

console.log('Im in the router');

//Connect controller methods to their corresponding routes
router.post('/addTitle', controller.title.post);

router.get('/getTitle/:id', controller.title.get);

router.update('/updateTitle/:id', controller.title.update);

router.delete('/deleteTitle/:id', controller.title.delete);

router.get('/getEnrolled/:id', controller.enrolled.get);

//TODO: other CRUD routes for enroll - think about user experience
router.update('/updateEnrolled/:id', controller.enrolled.post);

router.delete('/deleteEnrolled/:id', controller.enrolled.delete);


//export the router
module.exports = router;