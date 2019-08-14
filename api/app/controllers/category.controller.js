import CategoryModel from '../model/categories.model';
const Constant = require('../constants/common.definitations');
import client from '../config/redis';

/**
 *
 *
 * @class CategoryController
 */
class CategoryController {
	/**
	 *@desc Get Categories
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with category data
	 * @memberOf CategoryController
	 */
	static getCategories(req, res){
		const request = req.query;
		client.get(`categories:${request.page}:${request.limit}:${request.order}`, async (err, result) => {
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
					const categories = await CategoryModel.getCategories(request);
					let response ={
						count: categories.length,
						rows: categories
					};
					// Save response in Redis store
					client.setex(`categories:${request.page}:${request.limit}:${request.order}`, 3600,JSON.stringify(categories));
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
	 *@desc Get Category details
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with category Data
	 * @memberOf CategoryController
	 */
	static async getCategory(req, res){
		const catId = req.params.categoryId;
		try{
			const category = await CategoryModel.getCategory(catId);
			res.json(category);
		}catch (e) {
			Constant.errorMessage.message = e.message;
			Constant.errorMessage.code = e.code;
			res.status(400).send(Constant.errorMessage)
		}
	}

	/**
	 *@desc Get Category details in product
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with category Data
	 * @memberOf CategoryController
	 */
	static async getCategoryInProduct(req, res){
		const prodId = req.params.productId;
		client.get(`categories:inProduct:${prodId}`, async (err, result) => {
			if (result) {
				const resultJSON = JSON.parse(result);
				return res.status(200).json(resultJSON);
			} else if(err){
				Constant.errorMessage.message = err.message;
				Constant.errorMessage.code = 'Red_01';
				res.status(400).send(Constant.errorMessage)
			} else {
				try{
					const categories = await CategoryModel.getCategoryInProduct(prodId);
					// Save response in Redis store
					client.setex(`categories:inProduct:${prodId}`, 3600,JSON.stringify(categories));
					res.json(categories);
				}catch (e) {
					Constant.errorMessage.message = e.message;
					Constant.errorMessage.code = e.code;
					res.status(400).send(Constant.errorMessage)
				}
			}
		});
	}

	/**
	 *@desc Get Category details in department
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with category Data
	 * @memberOf CategoryController
	 */
	static async getCategoryInDepartment(req, res){
		const depId = req.params.departmentId;
		client.get(`categories:inDep:${depId}`, async (err, result) => {
			if (result) {
				const resultJSON = JSON.parse(result);
				return res.status(200).json(resultJSON);
			} else if(err){
				Constant.errorMessage.message = err.message;
				Constant.errorMessage.code = 'Red_01';
				res.status(400).send(Constant.errorMessage)
			} else {
				try{
					const categories = await CategoryModel.getCategoryInDepartment(depId);
					// Save response in Redis store
					client.setex(`categories:inDep:${depId}`, 3600,JSON.stringify(categories));
					res.json(categories);
				}catch (e) {
					Constant.errorMessage.message = e.message;
					Constant.errorMessage.code = e.code;
					res.status(400).send(Constant.errorMessage)
				}
			}
		});
	}


}

module.exports =  CategoryController;
