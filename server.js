const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const view = require('./view/view');
const Router = require('./helpers/router');
const studentController = require('./controller/students');
const PORT = 3000;

// create the template cache
view.cacheTemplates();

// create our router
var router = new Router();
router.addRoute('GET', '/', studentController.list);
router.addRoute('GET', '/students', studentController.list);
router.addRoute('POST', '/students', studentController.create);

/** @function handleRequest
  * Handles requests to the webserver by rendering a page listing
  * students, and processing any new student additions submitted
  * through an HTTP request.
  * @param {http.ClientRequest} req - the client request object
  * @param {htt.ServerResponse} res - the server response object
  */
function handleRequest(req, res) {
  // Check for form submittal
  if(req.method === "POST") {
    studentController.create(req, res);
  } else {
    studentController.list(req, res);
  }
}

// Create the webserver
var server = http.createServer(function(req, res) {
  router.route(req,res)
});

// Start listening for HTTP requests
server.listen(PORT, function() {
  console.log("Listening at port ", PORT);
});
