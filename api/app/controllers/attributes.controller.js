import AttributesModel from '../model/attributes.model';
const Constant = require('../constants/common.definitations');

/**
 *
 *
 * @class AttributesController
 */
class AttributesController {
	/**
	 *@desc Get Attribute details
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with Attribute Data
	 * @memberOf AttributesController
	 */
	static async getAttributes(req, res){
		try{
			const attributes = await AttributesModel.getAttributes();
			res.json(attributes);
		}catch (e) {
			Constant.errorMessage.message = e.message;
			Constant.errorMessage.code = e.code;
			res.status(400).send(Constant.errorMessage)
		}
	}

	/**
	 *@desc Get Attribute details
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with Attribute Data
	 * @memberOf AttributesController
	 */
	static async getAttribute(req, res){
		const id = req.params.attributeId;
		try{
			const attribute = await AttributesModel.getAttribute(id);
			res.json(attribute);
		}catch (e) {
			Constant.errorMessage.message = e.message;
			Constant.errorMessage.code = e.code;
			res.status(400).send(Constant.errorMessage)
		}
	}

	/**
	 *@desc Get Attribute details
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with Attribute Data
	 * @memberOf AttributesController
	 */
	static async getAttributeValue(req, res){
		const id = req.params.attributeId;
		try{
			const attribute = await AttributesModel.getAttributeValue(id);
			res.json(attribute);
		}catch (e) {
			Constant.errorMessage.message = e.message;
			Constant.errorMessage.code = e.code;
			res.status(400).send(Constant.errorMessage)
		}
	}

	/**
	 *@desc Get Attribute details
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with Attribute Data
	 * @memberOf AttributesController
	 */
	static async getAttributeInProduct(req, res){
		const id = req.params.productId;
		try{
			const attribute = await AttributesModel.getAttributeInProduct(id);
			res.json(attribute);
		}catch (e) {
			Constant.errorMessage.message = e.message;
			Constant.errorMessage.code = e.code;
			res.status(400).send(Constant.errorMessage)
		}
	}

}

module.exports = AttributesController;

