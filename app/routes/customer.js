import express from 'express';
const router =express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/**
 *
 * @swagger
 * definition:
 *   customerCredential:
 *     properties:
 *       customer_id:
 *         type: integer
 *         example: 1
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       address_1:
 *         type: string
 *       address_2:
 *         type: string
 *       city:
 *         type: string
 *       region:
 *         type: string
 *       postal_code:
 *         type: string
 *       country:
 *         type: string
 *       shipping_region_id:
 *         type: integer
 *       day_phone:
 *         type: string
 *       eve_phone:
 *         type: string
 *       mob_phone:
 *         type: string
 *       credit_card:
 *         type: string
 */

/**
 * @swagger
 * /customer/{id}:
 *   get:
 *     summary: Get Customer By Id
 *     description: Return a Object of Customer with auth credentials
 *     tags:
 *        - Customers
 *     parameters:
 *        - in: path
 *          name: id
 *          required: true
 *     responses:
 *       200:
 *         description: Customer Credentials
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/definitions/customerCredential'
 *              examples:
 */
router.get('/customer',async(req,res)=>{
  try {
    res.send('respond with a resource');
  } catch (error) {
    res.status(500).send({message:'Interval server error'})
  }
});

module.exports = router;
