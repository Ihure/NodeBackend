import express from 'express';
import CustomerController from '../../controllers/customerController';
require('../../middleware/auth');
const passport = require('passport');
import client from '../../config/redis';

const Limiter = require('ratelimiter');

const router = express.Router();

function requireUserKey (req, res, next) {
	passport.authenticate('jwt',{ session: false}, (err, user) => {
		if(err || !user) {
			return res.status(401).send({ code:"AUT_02" , message: 'Access Unauthorized'});
		}
		res.locals.customer = user;
		return next(); // continue to next middleware if no error.
	})(req,res,next);
}

function preventBruteForce (req, res, next) {
	const id = req.body.email;
	const limit = new Limiter({ id: id, db: client });
	limit.get(function(err, limit){
		if (err) return next(err);

		res.set('X-RateLimit-Limit', limit.total);
		res.set('X-RateLimit-Remaining', limit.remaining - 1);
		res.set('X-RateLimit-Reset', limit.reset);

		// all good
		// debug('remaining %s/%s %s', limit.remaining - 1, limit.total, id);
		if (limit.remaining) return next();

		// not good
		const delta = (limit.reset * 1000) - Date.now() | 0;
		const after = limit.reset - (Date.now() / 1000) | 0;
		res.set('Retry-After', after);
		res.send(429, 'Rate limit exceeded, retry in ' + ms(delta, { long: true }));
	});
}

/**
 *
 * @swagger
 * components:
 *   schemas:
 *     Unauthorized:
 *      properties:
 *        code:
 *          type: string
 *          example: AUT_02
 *        message:
 *          type: string
 *          example: The apikey is invalid
 *        field:
 *          type: string
 *          example: API-KEY
 *     Error:
 *       properties:
 *         code:
 *          type: string
 *          example: USR_02
 *         message:
 *          type: string
 *          example: parameter id is required
 *         field:
 *          type: string
 *          example: id
 *         status:
 *          type: string
 *          example: 500
 *     CustomerRegister:
 *       properties:
 *         customer:
 *          type: object
 *          $ref: '#/components/schemas/Customer'
 *         accessUserKeyAuth:
 *          type: string
 *          example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE1NTA0MjQ0OTgsImV4
 *         expires_in:
 *          type: string
 *          example: 24h
 *     Customer:
 *       properties:
 *         customer_id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Chris
 *         email:
 *           type: string
 *           example: nodetail@gmail.com
 *         address_1:
 *           type: string
 *           example: QI 20
 *         address_2:
 *           type: string
 *           example: ''
 *         city:
 *           type: string
 *           example: Nairobi
 *         region:
 *           type: string
 *           example: EA
 *         postal_code:
 *           type: string
 *           example: 001
 *         country:
 *           type: string
 *           example: Kenya
 *         shipping_region_id:
 *           type: integer
 *           example: 1
 *         day_phone:
 *           type: string
 *           example: +254 788 526 256
 *         eve_phone:
 *           type: string
 *           example: +254 789 569 782
 *         mob_phone:
 *           type: string
 *           example: +254 756 896 321
 *         credit_card:
 *           type: string
 *           example: XXXXXXXCC589
 */


/**
 * @swagger
 * /customer:
 *   put:
 *     summary: Update a customers account
 *     tags:
 *        - Customers
 *     security:
 *     	- UserKeyAuth: []
 *     requestBody:
 *       description: fields to be submitted to api
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 description: Customer Name
 *                 type: string
 *               email:
 *                 description: Email Address
 *                 type: string
 *               password:
 *                 description: Password
 *                 type: string
 *               day_phone:
 *                 description: Day phone
 *                 type: string
 *               eve_phone:
 *                 description: Evening Home
 *                 type: string
 *               mob_phone:
 *                 description: mob_phone
 *                 type: string
 *     responses:
 *       200:
 *         description: Return a Object of Customer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 *       401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Unauthorized'
 */
router.put('/customer', requireUserKey, CustomerController.updateCustomerAccount);

/**
 * @swagger
 * /customer:
 *   get:
 *     summary: Get Customer By Id
 *     tags:
 *        - Customers
 *     security:
 *     	- UserKeyAuth: []
 *     responses:
 *       200:
 *         description: Return a Object of Customer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 *       401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Unauthorized'
 */
router.get('/customer', requireUserKey ,CustomerController.getCustomer);

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Register a Customer
 *     tags:
 *        - Customers
 *     requestBody:
 *       description: fields to be submitted to api
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 description: Customer Name
 *                 type: string
 *               email:
 *                 description: Email Address
 *                 type: string
 *               password:
 *                 description: Password
 *                 type: string
 *     responses:
 *       200:
 *         description: Return a Object of Customer with auth credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/CustomerRegister'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 *       401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Unauthorized'
 */

router.post('/customers', CustomerController.register);

/**
 * @swagger
 * /customers/facebook:
 *   post:
 *     summary: Customer Login via Facebook
 *     tags:
 *        - Customers
 *     requestBody:
 *       description: fields to be submitted to api
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - access_UserKeyAut
 *             properties:
 *               access_UserKeyAuth:
 *                 description: Facebook UserKeyAut
 *                 type: string
 *     responses:
 *       200:
 *         description: Return a Object of Customer with auth credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/CustomerRegister'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 *       401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Unauthorized'
 */

router.post('/customers/facebook', CustomerController.facebookLogin);

/**
 * @swagger
 * /customers/login:
 *   post:
 *     summary: Customer Login
 *     tags:
 *        - Customers
 *     requestBody:
 *       description: fields to be submitted to api
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 description: Email Address
 *                 type: string
 *               password:
 *                 description: Password
 *                 type: string
 *     responses:
 *       200:
 *         description: Return a Object of Customer with auth credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/CustomerRegister'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 *       401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Unauthorized'
 */

router.post('/customers/login', preventBruteForce,CustomerController.login);

/**
 * @swagger
 * /customers/address:
 *   put:
 *     summary: Update a customer address
 *     tags:
 *        - Customers
 *     security:
 *     	- UserKeyAuth: []
 *     requestBody:
 *       description: fields to be submitted to api
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - address_1
 *               - city
 *               - region
 *               - postal_code
 *               - country
 *               - shipping_region_id
 *             properties:
 *               address_1:
 *                 description: Primary Address
 *                 type: string
 *               address_2:
 *                 description: Second Address
 *                 type: string
 *               city:
 *                 description: City
 *                 type: string
 *               region:
 *                 description: Region
 *                 type: string
 *               postal_code:
 *                 description: Postal Code
 *                 type: string
 *               country:
 *                 description: Country
 *                 type: string
 *               shipping_region_id:
 *                 description: Sipping Region Id
 *                 type: string
 *     responses:
 *       200:
 *         description: Return a Object of Customer with auth credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 *       401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Unauthorized'
 */
router.put('/customers/address', requireUserKey,CustomerController.updateAddress);

/**
 * @swagger
 * /customers/creditCard:
 *   put:
 *     summary: Update the credit card from customer
 *     tags:
 *        - Customers
 *     security:
 *     	- UserKeyAuth: []
 *     requestBody:
 *       description: fields to be submitted to api
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - credit_card
 *             properties:
 *               credit_card:
 *                 description: Credit Card
 *                 type: string
 *     responses:
 *       200:
 *         description: Return a Object of Customer with auth credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 *       401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Unauthorized'
 */
router.put('/customers/creditCard', requireUserKey,CustomerController.updateCreditCard);


/* GET home page. */
router.get('/home', function(req, res, next) {
  res.json({ message: 'hooray! welcome to our api!' });
});

module.exports = router;
