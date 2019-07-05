import express from 'express';
const router =express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/**
 *
 * @swagger
 * definitions:
 *   Unauthorized:
 *    properties:
 *      code:
 *        type: string
 *        example: AUT_02
 *      message:
 *        type: string
 *        example: The apikey is invalid
 *      field:
 *        type: string
 *        example: API-KEY
 *   Error:
 *     properties:
 *       code:
 *        type: string
 *        example: USR_02
 *       message:
 *        type: string
 *        example: parameter id is required
 *       field:
 *        type: string
 *        example: id
 *       status:
 *        type: string
 *        example: 500
 *   Customer:
 *     properties:
 *       customer_id:
 *         type: integer
 *         example: 1
 *       name:
 *         type: string
 *         example: Chris
 *       email:
 *         type: string
 *         example: nodetail@gmail.com
 *       address_1:
 *         type: string
 *         example: QI 20
 *       address_2:
 *         type: string
 *         example: ''
 *       city:
 *         type: string
 *         example: Nairobi
 *       region:
 *         type: string
 *         example: EA
 *       postal_code:
 *         type: string
 *         example: 001
 *       country:
 *         type: string
 *         example: Kenya
 *       shipping_region_id:
 *         type: integer
 *         example: 1
 *       day_phone:
 *         type: string
 *         example: +254 788 526 256
 *       eve_phone:
 *         type: string
 *         example: +254 789 569 782
 *       mob_phone:
 *         type: string
 *         example: +254 756 896 321
 *       credit_card:
 *         type: string
 *         example: XXXXXXXCC589
 */

/**
 * @swagger
 * /customer/{id}:
 *   get:
 *     summary: Get Customer By Id
 *     produces:
 *       - application/json
 *     tags:
 *        - Customers
 *     parameters:
 *        - in: path
 *          name: id
 *          required: true
 *     responses:
 *       200:
 *         description: Return a Object of Customer with auth credentials
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Customer'
 *       400:
 *         description: Return error object
 *         schema:
 *          type: object
 *          $ref: '#/definitions/Error'
 *       401:
 *        description: Unauthorized
 *        schema:
 *          type: object
 *          $ref: '#/definitions/Unauthorized'
 */
router.get('/customer', handler(async (req,res) => {
  try {
    res.send('respond with a resource');
  } catch (error) {
    res.status(500).send({message:'Interval server error'})
  }
}));

module.exports = router;
