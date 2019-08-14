import express from 'express';
import CategoryController from "../../controllers/category.controller";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       properties:
 *         category_id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: French
 *         description:
 *           type: string
 *           example: The French have always had an eye for beauty. One look at the T-shirts below and you'll see...
 *         department_id:
 *           type: integer
 *           example: 1
 *     CategoryBasic:
 *       properties:
 *         category_id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: French
 *         department_id:
 *           type: integer
 *           example: 1
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get categories
 *     tags:
 *        - Categories
 *     parameters:
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: sorting of fields. allowed fields:'category_id', 'name'
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
 *         description: Return a list with count (total categories) and the rows of Categories
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
 *                     $ref: '#/components/schemas/Category'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.get('/categories', CategoryController.getCategories);

/**
 * @swagger
 * /categories/{category_id}:
 *   get:
 *     summary: Get one Category
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: category_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of Category
 *     responses:
 *       200:
 *         description: Return a Object of Category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.get('/categories/:categoryId', CategoryController.getCategory);

/**
 * @swagger
 * /categories/inProduct/{product_id}:
 *   get:
 *     summary: Get Categories in a product
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: product_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of Product
 *     responses:
 *       200:
 *         description: Return a Array of Categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CategoryBasic'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.get('/categories/inProduct/:productId', CategoryController.getCategoryInProduct);

/**
 * @swagger
 * /categories/inDepartment/{department_id}:
 *   get:
 *     summary: Get Categories in a Department
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: department_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of Department
 *     responses:
 *       200:
 *         description: Return a Array of Categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.get('/categories/inDepartment/:departmentId', CategoryController.getCategoryInDepartment);

module.exports = router;
