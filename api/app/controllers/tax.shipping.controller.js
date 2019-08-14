import TaxShippingModel from '../model/tax.shipping.model';
const Constant = require('../constants/common.definitations');

/**
 *
 *
 * @class TaxShippingController
 */
class TaxShippingController {
	/**
	 *@desc Get Tac details
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with category Data
	 * @memberOf TaxShippingController
	 */
	static async getTaxes(req, res){
		try{
			const taxes = await TaxShippingModel.getTaxes();
			res.json(taxes);
		}catch (e) {
			Constant.errorMessage.message = e.message;
			Constant.errorMessage.code = e.code;
			res.status(400).send(Constant.errorMessage)
		}
	}
	/**
	 *@desc Get Shipping Regions details
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with category Data
	 * @memberOf TaxShippingController
	 */
	static async getShippingRegions(req, res){
		try{
			const regions = await TaxShippingModel.getShippingRegions();
			res.json(regions);
		}catch (e) {
			Constant.errorMessage.message = e.message;
			Constant.errorMessage.code = e.code;
			res.status(400).send(Constant.errorMessage)
		}
	}

	/**
	 *@desc get specific Tax
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with category Data
	 * @memberOf TaxShippingController
	 */
	static async getTax(req, res){
		const taxId = req.params.taxId;
		try{
			const tax = await TaxShippingModel.getTax(taxId);
			res.json(tax);
		}catch (e) {
			Constant.errorMessage.message = e.message;
			Constant.errorMessage.code = e.code;
			res.status(400).send(Constant.errorMessage)
		}
	}

	/**
	 *@desc get Shipping list
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with category Data
	 * @memberOf TaxShippingController
	 */
	static async getShipping(req, res){
		const shipId = req.params.shipId;
		try{
			const list = await TaxShippingModel.getShippingList(shipId);
			res.json(list);
		}catch (e) {
			Constant.errorMessage.message = e.message;
			Constant.errorMessage.code = e.code;
			res.status(400).send(Constant.errorMessage)
		}
	}
}

module.exports = TaxShippingController;
