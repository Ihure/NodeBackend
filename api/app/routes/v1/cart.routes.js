import express from 'express';
import CartController from "../../controllers/cart.controller";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CartWithProducts:
 *       properties:
 *         item_id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Arc d
 *         attributes:
 *           type: string
 *           example: lg, red
 *         product_id:
 *           type: integer
 *           example: 1
 *         price:
 *           type: string
 *           example: 14.99
 *         quantity:
 *           type: integer
 *           example: 1
 *         image:
 *           type: string
 *           example: arc-d.gif
 *         subtotal:
 *           type: string
 *           example: 14.99
 *     savedProducts:
 *       properties:
 *         item_id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Arc d
 *         attributes:
 *           type: string
 *           example: lg, red
 *         price:
 *           type: string
 *           example: 14.99
 */


/**
 * @swagger
 * /shoppingcart/generateUniqueId:
 *   get:
 *     summary: Generates Unique ID
 *     tags:
 *        - ShoppingCart
 *     responses:
 *       200:
 *         description: Json With UniqueId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cart_id:
 *                   type: string
 *                   example: muol789897890
 */

router.get('/shoppingcart/generateUniqueId', CartController.getUniqueId);

/**
 * @swagger
 * /shoppingcart/add:
 *   post:
 *     summary: Add Product in the cart
 *     tags:
 *        - ShoppingCart
 *     requestBody:
 *       description: fields to be submitted to api
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - cart_id
 *               - product_id
 *               - attributes
 *             properties:
 *               cart_id:
 *                 description: Cart Id
 *                 type: string
 *               product_id:
 *                 description: Product Id
 *                 type: integer
 *               attributes:
 *                 description: Attributes of product
 *                 type: string
 *     responses:
 *       200:
 *         description: Return a Array of products in cart
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartWithProducts'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.post('/shoppingcart/add', CartController.addProduct);

/**
 * @swagger
 * /shoppingcart/{cart_id}:
 *   get:
 *     summary: list of Products in the cart
 *     tags:
 *        - ShoppingCart
 *     parameters:
 *       - in: path
 *         name: cart_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of Cart
 *     responses:
 *       200:
 *         description: Return a Array of products in cart
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartWithProducts'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.get('/shoppingcart/:cartId', CartController.getCartProducts);

/**
 * @swagger
 * /shoppingcart/update/{item_id}:
 *   put:
 *     summary: Update Cart by Item
 *     tags:
 *        - ShoppingCart
 *     parameters:
 *       - in: path
 *         name: item_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of Item
 *     requestBody:
 *       description: fields to be submitted to api
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 description: Quantity
 *                 type: integer
 *     responses:
 *       200:
 *         description: Return a Array of products in cart
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartWithProducts'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.put('/shoppingcart/update/:itemId', CartController.UpdateItem);

/**
 * @swagger
 * /shoppingcart/empty/{cart_id}:
 *   delete:
 *     summary: Empty Cart
 *     tags:
 *        - ShoppingCart
 *     parameters:
 *       - in: path
 *         name: cart_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of Item
 *     responses:
 *       200:
 *         description: Return empty Array
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.delete('/shoppingcart/empty/:cartId', CartController.emptyCart);

/**
 * @swagger
 * /shoppingcart/moveToCart/{item_id}:
 *   get:
 *     summary: Move a product to cart
 *     tags:
 *        - ShoppingCart
 *     parameters:
 *       - in: path
 *         name: item_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of Item
 *     responses:
 *       200:
 *         description: Return empty Array
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.get('/shoppingcart/moveToCart/:itemId', CartController.moveToCart);

/**
 * @swagger
 * /shoppingcart/totalAmount/{cart_id}:
 *   get:
 *     summary: Return A total Amount from Cart
 *     tags:
 *        - ShoppingCart
 *     parameters:
 *       - in: path
 *         name: cart_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of Cart
 *     responses:
 *       200:
 *         description: Return total amount
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_amount:
 *                   type: integer
 *                   example: 5
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.get('/shoppingcart/totalAmount/:cartId', CartController.getTotals);

/**
 * @swagger
 * /shoppingcart/saveForLater/{item_id}:
 *   get:
 *     summary: Save a product for later
 *     tags:
 *        - ShoppingCart
 *     parameters:
 *       - in: path
 *         name: item_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of Item
 *     responses:
 *       200:
 *         description: Return empty Array
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.get('/shoppingcart/saveForLater/:itemId', CartController.saveForLater);

/**
 * @swagger
 * /shoppingcart/getSaved/{cart_id}:
 *   get:
 *     summary: Get Saved Products
 *     tags:
 *        - ShoppingCart
 *     parameters:
 *       - in: path
 *         name: cart_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of Item
 *     responses:
 *       200:
 *         description: Return Array of saved items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/savedProducts'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.get('/shoppingcart/getSaved/:cartId', CartController.getSaved);

/**
 * @swagger
 * /shoppingcart/removeProduct/{item_id}:
 *   delete:
 *     summary: Remove item from Cart
 *     tags:
 *        - ShoppingCart
 *     parameters:
 *       - in: path
 *         name: item_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of Item
 *     responses:
 *       200:
 *         description: Return Empty Array
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.delete('/shoppingcart/removeProduct/:itemId', CartController.removeItem);

module.exports = router;
