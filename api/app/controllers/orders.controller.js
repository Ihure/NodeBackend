import OrderModel from '../model/orders.model';
import CustomerModel from "../model/customerModel";
const Constant = require('../constants/common.definitations');

/**
 *
 *
 * @class OrderController
 */
class OrderController {

	/**
	 *@desc Get Order details
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with category Data
	 * @memberOf OrderController
	 */
	static async getOrderDetails(req, res){
		const orderId = req.params.orderId;
		try{
			const order = await OrderModel.getOrderDetails(orderId);
			res.json(order);
		}catch (e) {
			Constant.errorMessage.message = e.message;
			Constant.errorMessage.code = e.code;
			res.status(400).send(Constant.errorMessage)
		}
	}

	/**
	 *@desc Get order details
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with customer data and access token
	 * @memberOf OrderController
	 */
	static async ordersInCustomer(req, res){
		if(res.locals.customer){
			const id = res.locals.customer.customer_id;
			// console.log(`id for customer is ${id}`);
			try{
				//console.log(id);
				const rev = await OrderModel.ordersInCustomer(id);
				res.json(rev);
			}catch (e) {
				//console.log(id);
				Constant.errorMessage.message = e.message;
				Constant.errorMessage.code = e.code;
				res.status(400).send(Constant.errorMessage)
			}
		}else{
			Constant.errorMessage.code = 'AUT_01';
			res.status(400).send(Constant.errorMessage)
		}
	}

	/**
	 *@desc Get Order info
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with category Data
	 * @memberOf OrderController
	 */
	static async getOrderInfo(req, res){
		const orderId = req.params.orderId;
		try{
			const order = await OrderModel.getOrdersInfo(orderId);
			res.json(order);
		}catch (e) {
			Constant.errorMessage.message = e.message;
			Constant.errorMessage.code = e.code;
			res.status(400).send(Constant.errorMessage)
		}
	}

	/**
	 *@desc Create new order
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with order id
	 * @memberOf OrderController
	 */
	static async createOrder(req, res){
		if(res.locals.customer){
			const request = req.body;
			request.customer_id = res.locals.customer.customer_id;
			Constant.orderDetails.validate(request, async (err, value) => {
				if(!err){
					try{
						//console.log(id);
						const order = await OrderModel.createOrder(request);
						res.json(order);
					}catch (e) {
						//console.log(id);
						Constant.errorMessage.message = e.message;
						Constant.errorMessage.code = e.code;
						res.status(400).send(Constant.errorMessage)
					}
				}else{
					Constant.errorMessage.message = err.message;
					Constant.errorMessage.code = 'USR_02';
					res.status(400).send(Constant.errorMessage)
				}
			});
		}else{
			Constant.errorMessage.code = 'AUT_01';
			res.status(400).send(Constant.errorMessage)
		}
	}

}

module.exports = OrderController;
