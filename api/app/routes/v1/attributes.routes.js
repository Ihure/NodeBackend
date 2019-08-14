import express from 'express';
import AttributesController from "../../controllers/attributes.controller";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Attribute:
 *       properties:
 *         attribute_id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: size
 *     AttributeValue:
 *       properties:
 *         attribute_value_id:
 *           type: integer
 *           example: 1
 *         value:
 *           type: integer
 *           example: 5
 *     AttributeInProduct:
 *       properties:
 *         attribute_value_id:
 *           type: integer
 *           example: 1
 *         attribute_name:
 *           type: string
 *           example: color
 *         attribute_value:
 *           type: string
 *           example: white
 */

/**
 * @swagger
 * /attributes:
 *   get:
 *     summary: Get attributes
 *     tags:
 *        - Attributes
 *     responses:
 *       200:
 *         description: Return a list attributes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Attribute'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.get('/attributes', AttributesController.getAttributes);

/**
 * @swagger
 * /attributes/{attribute_id}:
 *   get:
 *     summary: Get Attribute Details
 *     tags:
 *       - Attributes
 *     parameters:
 *       - in: path
 *         name: attribute_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of Attribute
 *     responses:
 *       200:
 *         description: Return a Object of Attribute
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Attribute'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.get('/attributes/:attributeId', AttributesController.getAttribute);

/**
 * @swagger
 * /attributes/values/{attribute_id}:
 *   get:
 *     summary: Get Attribute Details
 *     tags:
 *       - Attributes
 *     parameters:
 *       - in: path
 *         name: attribute_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of Attribute
 *     responses:
 *       200:
 *         description: Return a Object of Attribute Values
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/AttributeValue'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.get('/attributes/values/:attributeId', AttributesController.getAttribute);

/**
 * @swagger
 * /attributes/inProduct/{product_id}:
 *   get:
 *     summary: Get Attribute Details in Product
 *     tags:
 *       - Attributes
 *     parameters:
 *       - in: path
 *         name: product_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of Product
 *     responses:
 *       200:
 *         description: Return an Array of Attribute Values
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AttributeInProduct'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.get('/attributes/inProduct/:productId', AttributesController.getAttributeInProduct);

module.exports = router;
