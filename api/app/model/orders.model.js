const connection = require('../config/seq');

class OrderModel {

	static getOrderDetails(id) {
		return new Promise((resolve, reject) => {
			let sql = 'CALL orders_get_order_details(:id)';
			connection.query(sql, {replacements: {id: id}})
				.then( res => resolve(res[0]))
				.catch( e => reject(e));
		});
	}

	static ordersInCustomer(id) {
		return new Promise((resolve, reject) => {
			let sql = 'CALL orders_get_by_customer_id(:id)';
			connection.query(sql, {replacements: {id: id}})
				.then( res => resolve(res))
				.catch( e => reject(e));
		});
	}

	static getOrdersInfo(id) {
		return new Promise((resolve, reject) => {
			let sql = 'CALL orders_get_order_info(:id)';
			connection.query(sql, {replacements: {id: id}})
				.then( res => resolve(res[0]))
				.catch( e => reject(e));
		});
	}

	static createOrder(req) {
		return new Promise((resolve, reject) => {
			// const prodId = parseInt(req.product_id);
			let sql = 'CALL shopping_cart_create_order(:cartId, :CustId, :ShipId, :TaxId)';
			connection.query(sql, {replacements: {cartId: req.cart_id, CustId: req.customer_id, ShipId: req.shipping_id,
					TaxId: req.tax_id}})
				.then( res =>resolve(res[0]))
				.catch( e => reject(e));
		});
	}

}

module.exports = OrderModel;
