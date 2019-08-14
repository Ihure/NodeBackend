import express from 'express';
import OrderController from "../../controllers/orders.controller";
require('../../middleware/auth');
const passport = require('passport');

function requireUserKey (req, res, next) {
	passport.authenticate('jwt',{ session: false}, (err, user) => {
		if(err || !user) {
			return res.status(401).send({ code:"AUT_02" , message: 'Access Unauthorized'});
		}
		res.locals.customer = user;
		return next(); // continue to next middleware if no error.
	})(req,res,next);
}

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderDetails:
 *       properties:
 *         order_id:
 *           type: integer
 *           example: 1
 *         product_id:
 *           type: integer
 *           example: 1
 *         attributes:
 *           type: string
 *           example: lg, red
 *         product_name:
 *           type: string
 *           example: Arc d
 *         quantity:
 *           type: integer
 *           example: 1
 *         unit_cost:
 *           type: string
 *           example: 14.99
 *         subtotal:
 *           type: string
 *           example: 14.99
 *     OrderInfo:
 *       properties:
 *         order_id:
 *           type: integer
 *           example: 1
 *         total_amount:
 *           type: integer
 *           example: 1
 *         created_on:
 *           type: string
 *           example:
 *         shipped_on:
 *           type: string
 *           example:
 *         status:
 *           type: string
 *           example: paid
 *         name:
 *           type: string
 *           example: test
 */

/**
 * @swagger
 * /order/{order_id}:
 *   get:
 *     summary: Get Order Details
 *     tags:
 *       - Orders
 *     security:
 *       - UserKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: order_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of Order
 *     responses:
 *       200:
 *         description: Return a Object of Order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/OrderDetails'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.get('/order/:orderId', requireUserKey, OrderController.getOrderDetails);

/**
 * @swagger
 * /orders/inCustomer:
 *   get:
 *     summary: Get Orders by Customer
 *     tags:
 *       - Orders
 *     security:
 *       - UserKeyAuth: []
 *     responses:
 *       200:
 *         description: Return a Array of Orders
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.get('/orders/inCustomer', requireUserKey, OrderController.ordersInCustomer);


/**
 * @swagger
 * /orders/shortDetail/{order_id}:
 *   get:
 *     summary: Get Order Details
 *     tags:
 *       - Orders
 *     security:
 *       - UserKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: order_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of Order
 *     responses:
 *       200:
 *         description: Return a Object of Order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/OrderInfo'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.get('/orders/shortDetail/:orderId', requireUserKey, OrderController.getOrderInfo);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create an order
 *     tags:
 *        - Orders
 *     security:
 *     	- UserKeyAuth: []
 *     requestBody:
 *       description: fields to be submitted to api
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - cart_id
 *               - shipping_id
 *               - tax_id
 *             properties:
 *               cart_id:
 *                 description: Cart Id
 *                 type: string
 *               shipping_id:
 *                 description: Shipping ID
 *                 type: integer
 *               tax_id:
 *                 description: Tax Id
 *                 type: integer
 *     responses:
 *       200:
 *         description: Return a Object with Order id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderId:
 *                   type: integer
 *                   example: 1
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

router.post('/orders', requireUserKey, OrderController.createOrder);

module.exports = router;
