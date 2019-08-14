const connection = require('../config/seq');

class CartModel {

	static addToCart(req) {
		return new Promise((resolve, reject) => {
			const prodId = parseInt(req.product_id);
			let sql = 'CALL shopping_cart_add_product(:cartId, :prodId, :attributes)';
			connection.query(sql, {replacements: {cartId:req.cart_id, prodId: prodId, attributes: req.attributes }})
				.then( res =>{
					let sql2 = 'CALL shopping_cart_get_products(:cartId)';
					connection.query(sql2, {replacements: {cartId:req.cart_id}})
						.then(res => resolve(res))
						.catch( e => reject(e))
				})
				.catch( e => reject(e));
		});
	}

	static getCartDetails(id) {
		return new Promise((resolve, reject) => {
			let sql = 'CALL shopping_cart_get_products(:id)';
			connection.query(sql, {replacements: {id: id}})
				.then( res => resolve(res))
				.catch( e => reject(e));
		});
	}

	static updateItem(req) {
		return new Promise((resolve, reject) => {
			let sql = 'CALL shopping_cart_update(:itemId, :quantity)';
			connection.query(sql, {replacements: {itemId:req.item_id, quantity: req.quantity}})
				.then( res =>{
					let sql2 = 'CALL shopping_cart_get_products(:cartId)';
					connection.query(sql2, {replacements: {cartId:res[0].cart_id}})
						.then(res => resolve(res))
						.catch( e => reject(e))
				})
				.catch( e => reject(e));
		});
	}

	static emptyCart(id) {
		return new Promise((resolve, reject) => {
			let sql = 'CALL shopping_cart_empty(:id)';
			connection.query(sql, {replacements: {id: id}})
				.then( res => resolve())
				.catch( e => reject(e));
		});
	}

	static moveToCart(id) {
		return new Promise((resolve, reject) => {
			let sql = 'CALL shopping_cart_move_product_to_cart(:id)';
			connection.query(sql, {replacements: {id: id}})
				.then( res => resolve())
				.catch( e => reject(e));
		});
	}

	static getTotal(id) {
		return new Promise((resolve, reject) => {
			let sql = 'CALL shopping_cart_get_total_amount(:id)';
			connection.query(sql, {replacements: {id: id}})
				.then( res => resolve(res[0]))
				.catch( e => reject(e));
		});
	}

	static saveForLater(id) {
		return new Promise((resolve, reject) => {
			let sql = 'CALL shopping_cart_save_product_for_later(:id)';
			connection.query(sql, {replacements: {id: id}})
				.then( res => resolve())
				.catch( e => reject(e));
		});
	}

	static getSaved(id) {
		return new Promise((resolve, reject) => {
			let sql = 'CALL shopping_cart_get_saved_products(:id)';
			connection.query(sql, {replacements: {id: id}})
				.then( res => resolve(res))
				.catch( e => reject(e));
		});
	}

	static removeProduct(id) {
		return new Promise((resolve, reject) => {
			let sql = 'CALL shopping_cart_remove_product(:id)';
			connection.query(sql, {replacements: {id: id}})
				.then( res => resolve())
				.catch( e => reject(e));
		});
	}

}

module.exports = CartModel;
