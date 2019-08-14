import express from 'express';
import TaxShippingController from "../../controllers/tax.shipping.controller";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Tax:
 *       properties:
 *         tax_id:
 *           type: integer
 *           example: 1
 *         tax_type:
 *           type: string
 *           example: sales tax
 *         tax_percentage:
 *           type: string
 *           example: 8.50
 *     ShippingRegions:
 *       properties:
 *         shipping_region_id:
 *           type: integer
 *           example: 1
 *         shipping_region:
 *           type: string
 *           example: Region x
 *     Shippings:
 *       properties:
 *         shipping_region_id:
 *           type: integer
 *           example: 1
 *         shipping_id:
 *           type: integer
 *           example: 1
 *         shipping_type:
 *           type: string
 *           example: Next Day Delivery
 *         shipping_cost:
 *           type: string
 *           example: 20
 */


/**
 * @swagger
 * /tax:
 *   get:
 *     summary: Get All Taxes
 *     tags:
 *        - Tax
 *     responses:
 *       200:
 *         description: Json With Taxes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tax'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.get('/tax', TaxShippingController.getTaxes);
/**
 * @swagger
 * /shipping/regions:
 *   get:
 *     summary: Get All Shipping Regions
 *     tags:
 *        - Shipping
 *     responses:
 *       200:
 *         description: Json With regions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShippingRegions'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.get('/shipping/regions', TaxShippingController.getShippingRegions);

/**
 * @swagger
 * /tax/{tax_id}:
 *   get:
 *     summary: Get Tax By Id
 *     tags:
 *        - Tax
 *     parameters:
 *       - in: path
 *         name: tax_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of Tax
 *     responses:
 *       200:
 *         description: Json With Tax
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Tax'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.get('/tax/:taxId', TaxShippingController.getTax);

/**
 * @swagger
 * /shipping/regions/{shipping_region_id}:
 *   get:
 *     summary: Get Tax By Id
 *     tags:
 *        - Shipping
 *     parameters:
 *       - in: path
 *         name: shipping_region_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of Tax
 *     responses:
 *       200:
 *         description: Json With Shipping Regions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Shippings'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.get('/shipping/regions/:shipId', TaxShippingController.getShipping);

module.exports = router;
