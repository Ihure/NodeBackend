const connection = require('../config/seq');

class CategoryModel {
	static getCategories(req) {
		return new Promise((resolve, reject ) => {
			const page = req.page ? req.page : 1;
			const records = req.limit ? parseInt(req.limit) : 20;
			const offset = (page - 1) * records;
			connection.query('SELECT * FROM category ORDER BY :order LIMIT :offset,:records ',
				{replacements: { order: req.order, offset: offset, records:records},type: connection.QueryTypes.SELECT })
				.then(categories => {
					resolve(categories);
				})
				.catch(e => reject(e));
		});
	}

	static getCategory(id) {
		return new Promise((resolve, reject) => {
			let sql = 'CALL catalog_get_category_details(:id)';
			connection.query(sql, {replacements: {id: id}})
				.then( res => resolve(res[0]))
				.catch( e => reject(e));
		});
	}

	static getCategoryInProduct(id) {
		return new Promise((resolve, reject) => {
			let sql = 'CALL catalog_get_categories_for_product(:id)';
			connection.query(sql, {replacements: {id: id}})
				.then( res => resolve(res))
				.catch( e => reject(e));
		});
	}

	static getCategoryInDepartment(id) {
		return new Promise((resolve, reject) => {
			let sql = 'CALL catalog_get_department_categories(:id)';
			connection.query(sql, {replacements: {id: id}})
				.then( res => resolve(res))
				.catch( e => reject(e));
		});
	}

}

module.exports = CategoryModel;
