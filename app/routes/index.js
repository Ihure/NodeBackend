var express = require('express');
var router = express.Router();

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// serve swagger
router.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});


module.exports = router;
