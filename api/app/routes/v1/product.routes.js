import express from 'express';
import ProductController from "../../controllers/product.controller";
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
 *     Product:
 *       properties:
 *         product_id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Chartres Cathedral
 *         description:
 *           type: string
 *           example: The French have always had an eye for beauty. One look at the T-shirts below and you'll see...
 *         price:
 *           type: string
 *           example: 16.95
 *         discounted_price:
 *           type: string
 *           example: 15.95
 *         thumbnail:
 *           type: string
 *           example: chartes.gif
 *     ProductDetails:
 *       properties:
 *         product_id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Chartres Cathedral
 *         description:
 *           type: string
 *           example: The French have always had an eye for beauty. One look at the T-shirts below and you'll see...
 *         price:
 *           type: string
 *           example: 16.95
 *         discounted_price:
 *           type: string
 *           example: 15.95
 *         image:
 *           type: string
 *           example: chartes.gif
 *         image2:
 *           type: string
 *           example: chartes2.gif
 *     ProductLocation:
 *       properties:
 *         category_id:
 *           type: integer
 *           example: 1
 *         category_name:
 *           type: string
 *           example: French
 *         department_id:
 *           type: integer
 *           example: 1
 *         department_name:
 *           type: string
 *           example: Regional
 *     Review:
 *       properties:
 *         name:
 *           type: string
 *           example: Eder Taveira
 *         review:
 *           type: string
 *           example: good product
 *         rating:
 *           type: integer
 *           example: 5
 *         created_on:
 *           type: string
 *           example: 2019-02-17
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get All products
 *     tags:
 *        - Products
 *     parameters:
 *       - in: query
 *         name: description_length
 *         schema:
 *           type: integer
 *         description: 'limit of the description default: 200'
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: 'Page Number. default: 1'
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: 'Limit per page. default: 20'
 *     responses:
 *       200:
 *         description: Return a list with count (total products) and the rows of Products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 20
 *                 rows:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.get('/products', ProductController.getProducts);

/**
 * @swagger
 * /products/search:
 *   get:
 *     summary: Search products
 *     tags:
 *        - Products
 *     parameters:
 *       - in: query
 *         name: query_string
 *         required: true
 *         schema:
 *           type: string
 *         description: 'query to search'
 *       - in: query
 *         name: all_words
 *         schema:
 *           type: string
 *         description: 'All words or no,Available values: on, off'
 *       - in: query
 *         name: description_length
 *         schema:
 *           type: integer
 *         description: 'limit of the description default: 200'
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: 'Page Number. default: 1'
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: 'Limit per page. default: 20'
 *     responses:
 *       200:
 *         description: Return a list with count (total products) and the rows of Products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 20
 *                 rows:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.get('/products/search', ProductController.searchProducts);

/**
 * @swagger
 * /products/{product_id}:
 *   get:
 *     summary: Get Product Details
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: product_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of Product
 *     responses:
 *       200:
 *         description: Return a Object of Product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.get('/products/:productId', ProductController.getProduct);

/**
 * @swagger
 * /products/inCategory/{category_id}:
 *   get:
 *     summary: Get Product Details
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: category_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of Category
 *       - in: query
 *         name: description_length
 *         schema:
 *           type: integer
 *         description: 'limit of the description default: 200'
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: 'Page Number. default: 1'
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: 'Limit per page. default: 20'
 *     responses:
 *       200:
 *         description: Return a Object of Product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer+
 *                   example: 20
 *                 rows:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.get('/products/inCategory/:categoryId', ProductController.getProductsInCategory);

/**
 * @swagger
 * /products/inDepartment/{department_id}:
 *   get:
 *     summary: Get Product Details
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: department_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of Department
 *       - in: query
 *         name: description_length
 *         schema:
 *           type: integer
 *         description: 'limit of the description default: 200'
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: 'Page Number. default: 1'
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: 'Limit per page. default: 20'
 *     responses:
 *       200:
 *         description: Return a Object of Product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer+
 *                   example: 20
 *                 rows:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.get('/products/inDepartment/:departmentId', ProductController.getProductsInDepartment);


/**
 * @swagger
 * /products/{product_id}/details:
 *   get:
 *     summary: Get Product Details
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: product_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of Product
 *     responses:
 *       200:
 *         description: Return a Object of Product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/ProductDetails'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.get('/products/:productId/details', ProductController.getProductDetails);

/**
 * @swagger
 * /products/{product_id}/locations:
 *   get:
 *     summary: Get Product Locations
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: product_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of Product
 *     responses:
 *       200:
 *         description: Return a Object of Product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/ProductLocation'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.get('/products/:productId/locations', ProductController.getProductLocation);

/**
 * @swagger
 * /products/{product_id}/reviews:
 *   get:
 *     summary: Get Product Reviews
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: product_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of Product
 *     responses:
 *       200:
 *         description: Return a Object of Product
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.get('/products/:productId/reviews', ProductController.getProductReviews);

/**
 * @swagger
 * /products/{product_id}/reviews:
 *   post:
 *     summary: Get Product Reviews
 *     tags:
 *       - Products
 *     security:
 *     	- UserKeyAuth: []
 *     requestBody:
 *       description: fields to be submitted to api
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - review
 *               - rating
 *               - password
 *             properties:
 *               review:
 *                 description: Review of Product
 *                 type: string
 *               rating:
 *                 description: Rating of product
 *                 type: integer
 *     parameters:
 *       - in: path
 *         name: product_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of Product
 *     responses:
 *       200:
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.post('/products/:productId/reviews', requireUserKey,ProductController.getProductReviews);

module.exports = router;
