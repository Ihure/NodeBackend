const connection = require('../config/seq');

class ProductModel {
	static getProducts(req) {
		return new Promise((resolve, reject ) => {
			const page = req.page ? req.page : 1;
			const records = req.limit ? parseInt(req.limit) : 20;
			const len = req.description_length ? parseInt(req.description_length) : 200;
			const offset = (page - 1) * records;
			connection.query('SELECT product_id,name,substring(description, 1,:len) as description, price,discounted_price,' +
				'thumbnail FROM product LIMIT :offset,:records ',
				{replacements: { len: len, offset: offset, records:records},type: connection.QueryTypes.SELECT })
				.then(products => {
					resolve(products);
				})
				.catch(e => reject(e));
		});
	}

	static searchProducts(req) {
		return new Promise((resolve, reject ) => {
			const page = req.page ? req.page : 1;
			const records = req.limit ? parseInt(req.limit) : 20;
			const len = req.description_length ? parseInt(req.description_length) : 200;
			const offset = (page - 1) * records;
			const querystring = `%${req.query_string}%`;
			connection.query('SELECT product_id,name,substring(description, 1,:len) as description, price,discounted_price,' +
				'thumbnail FROM product WHERE name LIKE :search LIMIT :offset,:records ',
				{replacements: { len: len, offset: offset, records:records, search:querystring},type: connection.QueryTypes.SELECT })
				.then(products => {
					resolve(products);
				})
				.catch(e => reject(e));
		});
	}

	static getProduct(id) {
		return new Promise((resolve, reject) => {
			let sql = 'CALL catalog_get_product_details(:id)';
			connection.query(sql, {replacements: {id: id}})
				.then( res => resolve(res[0]))
				.catch( e => reject(e));
		});
	}

	static getProductInCategory(req) {
		return new Promise((resolve, reject) => {
			const page = req.page ? req.page : 1;
			const records = req.limit ? parseInt(req.limit) : 20;
			const len = req.description_length ? parseInt(req.description_length) : 200;
			const offset = (page - 1) * records;
			let sql = 'CALL catalog_get_products_in_category(:CatId,:DescLen,:PerPage,:StartItem)';
			connection.query(sql, {replacements: {CatId: req.category_id, DescLen: len, PerPage: records, StartItem:offset}})
				.then( res => resolve(res))
				.catch( e => reject(e));
		});
	}

	static getProductInDepartment(req) {
		return new Promise((resolve, reject) => {
			const page = req.page ? req.page : 1;
			const records = req.limit ? parseInt(req.limit) : 20;
			const len = req.description_length ? parseInt(req.description_length) : 200;
			const offset = (page - 1) * records;
			let sql = 'CALL catalog_get_products_on_department(:depId,:DescLen,:PerPage,:StartItem)';
			connection.query(sql, {replacements: {depId: req.department_id, DescLen: len, PerPage: records, StartItem:offset}})
				.then( res => resolve(res))
				.catch( e => reject(e));
		});
	}

	static getProductDetails(id) {
		return new Promise((resolve, reject) => {
			let sql = 'CALL catalog_get_product_details(:id)';
			connection.query(sql, {replacements: {id: id}})
				.then( res => resolve(res[0]))
				.catch( e => reject(e));
		});
	}

	static getProductLocation(id) {
		return new Promise((resolve, reject) => {
			let sql = 'CALL catalog_get_product_locations(:id)';
			connection.query(sql, {replacements: {id: id}})
				.then( res => resolve(res[0]))
				.catch( e => reject(e));
		});
	}

	static getProductReviews(id) {
		return new Promise((resolve, reject) => {
			let sql = 'CALL catalog_get_product_reviews(:id)';
			connection.query(sql, {replacements: {id: id}})
				.then( res => resolve(res))
				.catch( e => reject(e));
		});
	}

	static productReview(req) {
		return new Promise((resolve, reject) => {
			let sql = 'CALL catalog_create_product_review(:custId, :ProdId, :Rev, :Rating)';
			connection.query(sql, {replacements: {custId: req.id, ProdId: req.prodId, Rev: req.review, Rating: req.rating}})
				.then( res => resolve())
				.catch( e => reject(e));
		});
	}

}

module.exports = ProductModel;
