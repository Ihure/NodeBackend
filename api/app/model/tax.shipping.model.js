const connection = require('../config/seq');

class TaxShippingModel {

	static getTaxes() {
		return new Promise((resolve, reject ) => {
			connection.query('SELECT * FROM tax',
				{replacements: { },type: connection.QueryTypes.SELECT })
				.then(taxes => resolve(taxes) )
				.catch(e => reject(e));
		});
	}

	static getTax(id) {
		return new Promise((resolve, reject) => {
			let sql = 'SELECT * FROM tax where tax_id=:id';
			connection.query(sql, {replacements: {id: id}, type: connection.QueryTypes.SELECT })
				.then( res => resolve(res[0]))
				.catch( e => reject(e));
		});
	}

	static getShippingRegions() {
		return new Promise((resolve, reject) => {
			let sql = 'CALL customer_get_shipping_regions()';
			connection.query(sql)
				.then( res => resolve(res))
				.catch( e => reject(e));
		});
	}

	static getShippingList(id) {
		return new Promise((resolve, reject) => {
			let sql = 'SELECT * FROM shipping where shipping_region_id=:id';
			connection.query(sql, {replacements: {id: id}, type: connection.QueryTypes.SELECT })
				.then( res => resolve(res))
				.catch( e => reject(e));
		});
	}

}

module.exports = TaxShippingModel;
