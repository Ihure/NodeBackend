import CustomerModel from "../model/customerModel";

const Constant = require('../constants/common.definitations');
require('dotenv').config();

let stripeKey = process.env.STRIPEKEY;

const stripe = require('stripe')(stripeKey);

/**
 * Customer controller handles all requests that has to do with customer
 * - register - allow customers to create a new account
 */

/**
 *
 *
 * @class StripeController
 */
class StripeController {
	/**
	 *@desc Create A charge to customer
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with stripe Metadata
	 * @memberOf CustomerController
	 */
	static createCharge(req, res){
		let request = req.body;
		Constant.stripeDetails.validate(request, async (err, value) => {
			if(!err){
				stripe.charges.create({
					amount: request.amount,
					currency: request.currency ? request.currency : 'usd',
					source: request.stripeToken,
					description: request.description,
					metadata: {
						order_id: request.order_id
					}
				}, function(err, charge) {
					// asynchronously called
					if(!err){
						res.json(charge);
					}else{
						Constant.errorMessage.message = err.message;
						Constant.errorMessage.code = 'USR_02';
						res.status(400).send(Constant.errorMessage)
					}
				});
			}else{
				Constant.errorMessage.message = err.message;
				Constant.errorMessage.code = 'USR_02';
				res.status(400).send(Constant.errorMessage)
			}
		});
	}

}

module.exports = StripeController;
