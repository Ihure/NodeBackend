import ProductModel from '../model/product.model';
const Constant = require('../constants/common.definitations');
import client from '../config/redis';

/**
 *
 *
 * @class ProductController
 */
class ProductController {
	/**
	 *@desc Get Products
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with product data
	 * @memberOf ProductController
	 */
	static getProducts(req, res){
		const request = req.query;
		client.get(`products:${request.page}:${request.limit}:${request.description_length}`, async (err, result) => {
			if (result) {
				const resultJSON = JSON.parse(result);
				let response ={
					count: resultJSON.length,
					rows: resultJSON
				};
				return res.status(200).json(response);
			} else if(err){
				Constant.errorMessage.message = err.message;
				Constant.errorMessage.code = 'Red_01';
				res.status(400).send(Constant.errorMessage)
			} else {
				try{
					const products = await ProductModel.getProducts(request);
					let response ={
						count: products.length,
						rows: products
					};
					// Save response in Redis store
					client.setex(`products:${request.page}:${request.limit}:${request.description_length}`, 3600,
						JSON.stringify(products));
					res.json(response);
				}catch (e) {
					Constant.errorMessage.message = e.message;
					Constant.errorMessage.code = e.code;
					res.status(400).send(Constant.errorMessage)
				}
			}
		});
	}

	/**
	 *@desc Search Products
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with product data
	 * @memberOf ProductController
	 */
	static searchProducts(req, res){
		const request = req.query;
		if(request.query_string){
			client.get(`products:search:${request.query_string}:${request.all_words}:${request.page}:${request.limit}:
				${request.description_length}`, async (err, result) => {
				if (result) {
					const resultJSON = JSON.parse(result);
					let response ={
						count: resultJSON.length,
						rows: resultJSON
					};
					return res.status(200).json(response);
				} else if(err){
					Constant.errorMessage.message = err.message;
					Constant.errorMessage.code = 'Red_01';
					res.status(400).send(Constant.errorMessage)
				} else {
					try{
						const products = await ProductModel.searchProducts(request);
						let response ={
							count: products.length,
							rows: products
						};
						// Save response in Redis store
						client.setex(`products:search:${request.query_string}:${request.all_words}:${request.page}:${request.limit}:
				${request.description_length}`, 3600,
							JSON.stringify(products));
						res.json(response);
					}catch (e) {
						Constant.errorMessage.message = e.message;
						Constant.errorMessage.code = e.code;
						res.status(400).send(Constant.errorMessage)
					}
				}
			});
		}else{
			Constant.errorMessage.message = 'query string is missing';
			Constant.errorMessage.code = 'PROD_01';
			res.status(400).send(Constant.errorMessage)
		}
	}

	/**
	 *@desc Get Product details
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with category Data
	 * @memberOf ProductController
	 */
	static async getProduct(req, res){
		const prodId = req.params.productId;
		try{
			const product = await ProductModel.getProduct(prodId);
			res.json(product);
		}catch (e) {
			Constant.errorMessage.message = e.message;
			Constant.errorMessage.code = e.code;
			res.status(400).send(Constant.errorMessage)
		}
	}

	/**
	 *@desc Products in category
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with product data
	 * @memberOf ProductController
	 */
	static getProductsInCategory(req, res){
		let request = req.query;
		request.category_id  = req.params.categoryId;
		if(request.category_id){
			client.get(`products:category:${request.category_id}:${request.page}:${request.limit}:
			${request.description_length}`, async (err, result) => {
				if (result) {
					const resultJSON = JSON.parse(result);
					let response ={
						count: resultJSON.length,
						rows: resultJSON
					};
					return res.status(200).json(response);
				} else if(err){
					Constant.errorMessage.message = err.message;
					Constant.errorMessage.code = 'Red_01';
					res.status(400).send(Constant.errorMessage)
				} else {
					try{
						const products = await ProductModel.getProductInCategory(request);
						let response ={
							count: products.length,
							rows: products
						};
						// Save response in Redis store
						client.setex(`products:category:${request.category_id}:${request.page}:${request.limit}:
						${request.description_length}`, 3600, JSON.stringify(products));
						res.json(response);
					}catch (e) {
						Constant.errorMessage.message = e.message;
						Constant.errorMessage.code = e.code;
						res.status(400).send(Constant.errorMessage)
					}
				}
			});
		}else{
			Constant.errorMessage.message = 'category_id is missing';
			Constant.errorMessage.code = 'PROD_02';
			res.status(400).send(Constant.errorMessage)
		}
	}

	/**
	 *@desc Products in department
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with product data
	 * @memberOf ProductController
	 */
	static getProductsInDepartment(req, res){
		let request = req.query;
		request.department_id  = req.params.departmentId;
		if(request.department_id){
			client.get(`products:department:${request.department_id}:${request.page}:${request.limit}:
			${request.description_length}`, async (err, result) => {
				if (result) {
					const resultJSON = JSON.parse(result);
					let response ={
						count: resultJSON.length,
						rows: resultJSON
					};
					return res.status(200).json(response);
				} else if(err){
					Constant.errorMessage.message = err.message;
					Constant.errorMessage.code = 'Red_01';
					res.status(400).send(Constant.errorMessage)
				} else {
					try{
						const products = await ProductModel.getProductInDepartment(request);
						let response ={
							count: products.length,
							rows: products
						};
						// Save response in Redis store
						client.setex(`products:department:${request.department_id}:${request.page}:${request.limit}:
						${request.description_length}`, 3600, JSON.stringify(products));
						res.json(response);
					}catch (e) {
						Constant.errorMessage.message = e.message;
						Constant.errorMessage.code = e.code;
						res.status(400).send(Constant.errorMessage)
					}
				}
			});
		}else{
			Constant.errorMessage.message = 'department_id is missing';
			Constant.errorMessage.code = 'PROD_03';
			res.status(400).send(Constant.errorMessage)
		}
	}

	/**
	 *@desc Get Product details
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with category Data
	 * @memberOf ProductController
	 */
	static async getProductDetails(req, res){
		const prodId = req.params.productId;
		try{
			const product = await ProductModel.getProductDetails(prodId);
			res.json(product);
		}catch (e) {
			Constant.errorMessage.message = e.message;
			Constant.errorMessage.code = e.code;
			res.status(400).send(Constant.errorMessage)
		}
	}

	/**
	 *@desc Get Product details
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with category Data
	 * @memberOf ProductController
	 */
	static async getProductLocation(req, res){
		const prodId = req.params.productId;
		try{
			const product = await ProductModel.getProductLocation(prodId);
			res.json(product);
		}catch (e) {
			Constant.errorMessage.message = e.message;
			Constant.errorMessage.code = e.code;
			res.status(400).send(Constant.errorMessage)
		}
	}

	/**
	 *@desc Get Product details
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with category Data
	 * @memberOf ProductController
	 */
	static async getProductReviews(req, res){
		const prodId = req.params.productId;
		try{
			const product = await ProductModel.getProductReviews(prodId);
			res.json(product);
		}catch (e) {
			Constant.errorMessage.message = e.message;
			Constant.errorMessage.code = e.code;
			res.status(400).send(Constant.errorMessage)
		}
	}
	/**
	 *@desc Add a review
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with customer data and access token
	 * @memberOf ProductController
	 */
	static async productReview(req, res){
		let request = req.body;
		request.prodId = req.params.productId;
		request.id = res.locals.customer.customer_id;
		try{
			const rev = await ProductModel.productReview(request);
			res.json(rev);
		}catch (e) {
			Constant.errorMessage.message = e.message;
			Constant.errorMessage.code = e.code;
			res.status(400).send(Constant.errorMessage)
		}
	}

}

module.exports = ProductController;
