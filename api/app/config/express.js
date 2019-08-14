// BASE SETUP
// =============================================================================

// import packages
const env = require('dotenv').config();
const express    = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
import morgan from 'morgan';
import logger from './logger';
import router from '../routes';
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const compression = require('compression');

//define our app
const app = express();

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use helmet to enhance Api Security
app.use(helmet());

// enable cors for all requests
app.use(cors());

// compress responses
app.use(compression());

// logging setting
app.use(morgan('combined', {stream: logger.stream}));

// serve swagger
//Api Documentation Settings
// =============================================================================

const options = {
	definition: {
		// Like the one described here: https://swagger.io/specification/#infoObject
		openapi: '3.0.0',
		info: {
			title: 'Turing API',
			version: '1.0.0',
			swagger: '2.0',
			description: 'Turing E-commerce API',
		},
		components: {
			securitySchemes: {
				UserKeyAuth: {
					type: 'apiKey',
					name: 'USER-KEY',
					in: 'header'
				}
			}
		},
		servers: [
			{
				url:'http://localhost:3000/api/v1/',
				description: 'Development server'
			}
		]
	},
	// path to the API docs
	apis: ['../**/routes/v1/*.js'],// pass all in array
};

const specs = swaggerJsdoc(options);

//endpoint where user can see the documentation.
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(specs));

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api/v1', router);

// START THE SERVER
// =============================================================================
// app.listen(port);
module.exports = app;
