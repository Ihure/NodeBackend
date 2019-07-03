// BASE SETUP
// =============================================================================

// import packages
require('dotenv').config();
const express    = require('express');
const bodyParser = require('body-parser');
const debug = require('debug')('server:debug');
const cors = require('cors');
const helmet = require('helmet');
const winston = require('winston');

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
  // console.log(`server is running on port ${process.env.PORT} and in ${process.env.MODE} mode`);
});

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/v1', router);

// START THE SERVER
// =============================================================================
// app.listen(port);
module.exports= app;
module.exports.port=listen.address().port;
