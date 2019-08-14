const connection = require('../config/seq');

class AttributesModel {
	static getAttributes() {
		return new Promise((resolve, reject) => {
			let sql = 'CALL catalog_get_attributes()';
			connection.query(sql)
				.then( res => resolve(res))
				.catch( e => reject(e));
		});
	}

	static getAttribute(id) {
		return new Promise((resolve, reject) => {
			let sql = 'CALL catalog_get_attribute_details(:id)';
			connection.query(sql, {replacements: {id: id}})
				.then( res => resolve(res[0]))
				.catch( e => reject(e));
		});
	}

	static getAttributeValue(id) {
		return new Promise((resolve, reject) => {
			let sql = 'CALL catalog_get_attribute_values(:id)';
			connection.query(sql, {replacements: {id: id}})
				.then( res => resolve(res[0]))
				.catch( e => reject(e));
		});
	}

	static getAttributeInProduct(id) {
		return new Promise((resolve, reject) => {
			let sql = 'CALL catalog_get_product_attributes(:id)';
			connection.query(sql, {replacements: {id: id}})
				.then( res => resolve(res))
				.catch( e => reject(e));
		});
	}

}

module.exports = AttributesModel;
