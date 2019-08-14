import express from 'express';
import StripeController from "../../controllers/stripe.controller";

const router = express.Router();

/**
 * @swagger
 * /stripe/charge:
 *   post:
 *     summary: Create a charge in stripe
 *     tags:
 *        - Stripe
 *     requestBody:
 *       description: fields to be submitted to api
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - stripeToken
 *               - order_id
 *               - description
 *               - amount
 *             properties:
 *               stripeToken:
 *                 description: Stripe Token
 *                 type: string
 *               order_id:
 *                 description: Id of Order
 *                 type: integer
 *               description:
 *                 description: Description of order
 *                 type: string
 *               amount:
 *                 description: Charge amount
 *                 type: integer
 *               currency:
 *                 description: Currency Option
 *                 type: string
 *     responses:
 *       200:
 *         description: Return a Stripe Object
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

router.post('/stripe/charge', StripeController.createCharge);

module.exports = router;
