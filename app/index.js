// BASE SETUP
// =============================================================================

// import packages
const env = require('dotenv').config();
const express    = require('express');
const bodyParser = require('body-parser');
const debug = require('debug')('server:debug');
const cors = require('cors');
const helmet = require('helmet');
const winston = require('winston');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//define our app
const app = express();

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use helmet to enhance Api Security
app.use(helmet());

// enable cors for all requests
app.use(cors());

// set up server
const port = process.env.PORT || 8000;        // set our port

const listen = app.listen( port,()=>{
  debug(`server is running on port ${process.env.PORT} and in ${process.env.MODE} mode`);
  console.log(`server is running on port ${process.env.PORT} and in ${process.env.MODE} mode`);
});

//Api Documentation Settings
// =============================================================================

const options = {
  swaggerDefinition: {
    // Like the one described here: https://swagger.io/specification/#infoObject
    info: {
      title: 'Turing API',
      version: '1.0.0',
      description: 'Turing E-commerce API',
    },
    host: 'localhost:3000',
    basePath: '/api/v1',
  },
  // path to the API docs
  apis: ['./**/routes/*.js','routes.js'],// pass all in array
};

const specs = swaggerJsdoc(options);

//endpoint where user can see the documentation.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api/v1', router);

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// START THE SERVER
// =============================================================================
// app.listen(port);
module.exports= app;
module.exports.port=listen.address().port;
