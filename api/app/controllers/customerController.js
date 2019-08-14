const Constant = require('../constants/common.definitations');
import CustomerModel from '../model/customerModel';
const reqProm = require('request-promise');
const jwt = require('jsonwebtoken');
require('dotenv').config();

let privateKey = process.env.APPKEY;

/**
 * Customer controller handles all requests that has to do with customer
 * - register - allow customers to create a new account
 */

/**
 *
 *
 * @class CustomerController
 */
class CustomerController {
    /**
     *@desc Register a customer and assign access token
     *
     * @static
     * @param {object} req express request object
     * @param {object} res express response object
     * @returns {json} json object with customer data and access token
     * @memberOf CustomerController
     */
    static register(req, res){
        let request = req.body;
        Constant.registerDetails.validate(request, async (err, value) => {
        	if(!err){
						try {
							Constant.customerResponse.customer = await CustomerModel.register(request);
							Constant.customerResponse.accessToken = `Bearer ` + jwt.sign({
								id: Constant.customerResponse.customer.customer_id
							}, privateKey,{ expiresIn: '24h' });
							res.json(Constant.customerResponse);
						} catch (e) {
							res.status(400).send(e)
						}
					}else{
						Constant.errorMessage.message = err.message;
						Constant.errorMessage.code = 'USR_02';
						res.status(400).send(Constant.errorMessage)
					}
				});
    }
	/**
	 *@desc login customer via facebook and register them in system
	 *
	 * @static
	 * @param {object} req authentication token
	 * @param {object} res express response object
	 * @returns {json} json object with customer data and access token
	 * @memberOf CustomerController
	 */

    static facebookLogin(req, res){
    		const token = req.body.access_token;
    		// const id = req.body.id;
				const userFieldSet = 'id, first_name, email';

				const options = {
					method: 'GET',
					uri: `https://graph.facebook.com/me`,
					qs: {
						access_token: token,
						fields: userFieldSet
					}
				};
				reqProm(options)
					.then(fbRes => {
						try {
							Constant.customerResponse.customer = CustomerModel.registerFacebook(fbRes);
							Constant.customerResponse.accessToken = `Bearer ` + jwt.sign({
								id: Constant.customerResponse.customer.customer_id
							}, privateKey, { expiresIn: '24h' });
							res.json(Constant.customerResponse);
						} catch (e) {
							Constant.errorMessage.message = e.message;
							Constant.errorMessage.code = e.code;
							res.status(400).send(Constant.errorMessage)
						}
					})
		}

	/**
	 *@desc verify customer in System
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with customer data and access token
	 * @memberOf CustomerController
	 */

		static async login(req, res){
			let request = req.body;
			if(!request.email || !request.password){
				Constant.errorMessage.message = 'Fields are missing';
				Constant.errorMessage.code ='USR_02';
				res.status(400).send(Constant.errorMessage)
			}else{
				try {
					Constant.customerResponse.customer = await CustomerModel.login(request);
					Constant.customerResponse.accessToken = `Bearer ` + jwt.sign({
						id: Constant.customerResponse.customer.customer_id
					}, privateKey, { expiresIn: '24h' });
					res.json(Constant.customerResponse);
				} catch (e) {
					Constant.errorMessage.message = e.message;
					Constant.errorMessage.code = e.code;
					res.status(400).send(Constant.errorMessage)
				}
			}
		}

		/**
	 *@desc get customer in System by their JWT token
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with customer data and access token
	 * @memberOf CustomerController
	 */

		static async getCustomer(req, res){
			if(res.locals.customer){
				Constant.customerResponse.customer = res.locals.customer;
				Constant.customerResponse.accessToken = `Bearer ` + jwt.sign({
					id: Constant.customerResponse.customer.customer_id
				}, privateKey, { expiresIn: '24h' });
				res.json(Constant.customerResponse);
			}else {
				Constant.errorMessage.code = 'AUT_01';
				res.status(400).send(Constant.errorMessage)
			}
		}

	/**
	 *@desc update a customer address
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with customer data and access token
	 * @memberOf CustomerController
	 */
	static async updateAddress(req, res){
		let request = req.body;
		Constant.address.validate(request, async (err,value) => {
			if(err){
				Constant.errorMessage.message = err.message;
				Constant.errorMessage.code = 'USR_02';
				res.status(400).send(Constant.errorMessage)
			}else{
				request.id = res.locals.customer.customer_id;
				try{
					Constant.customerResponse.customer = await CustomerModel.updateAddress(request);
					res.json(Constant.customerResponse.customer);
				}catch (e) {
					Constant.errorMessage.message = e.message;
					Constant.errorMessage.code = e.code;
					res.status(400).send(Constant.errorMessage)
				}
			}
		});
	}

	/**
	 *@desc update users credit card
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with customer data
	 * @memberOf CustomerController
	 */
	static async updateCreditCard(req, res){
		let request = req.body;
		if(!request.credit_card){
			Constant.errorMessage.message = 'Fields are missing';
			Constant.errorMessage.code ='USR_02';
			res.status(400).send(Constant.errorMessage)
		}else{
			request.id = res.locals.customer.customer_id;
			try{
				Constant.customerResponse.customer = await CustomerModel.updateCreditCard(request);
				res.json(Constant.customerResponse.customer);
			}catch (e) {
				Constant.errorMessage.message = e.message;
				Constant.errorMessage.code = e.code;
				res.status(400).send(Constant.errorMessage)
			}
		}
	}
	/**
	 *@desc update users account
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with customer data
	 * @memberOf CustomerController
	 */
	static async updateCustomerAccount(req, res){
		let request = req.body;
		Constant.accountDetails.validate(request, async (err,value) => {
			if(err){
				Constant.errorMessage.message = err.message;
				Constant.errorMessage.code = 'USR_02';
				res.status(400).send(Constant.errorMessage)
			}else{
				request.id = res.locals.customer.customer_id;
				try{
					Constant.customerResponse.customer = await CustomerModel.updateCustomerAccount(request);
					res.json(Constant.customerResponse.customer);
				}catch (e) {
					Constant.errorMessage.message = e.message;
					Constant.errorMessage.code = e.code;
					res.status(400).send(Constant.errorMessage)
				}
			}
		});
	}

}

module.exports = CustomerController;
