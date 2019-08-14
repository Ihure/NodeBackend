import CartModel from '../model/cart.model';
const Constant = require('../constants/common.definitations');

/**
 *
 *
 * @class CartController
 */
class CartController {

	/**
	 *@desc Get Unique ID
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with category Data
	 * @memberOf CartController
	 */
	static async getUniqueId(req, res){
		const cartId = '_' + Math.random().toString(36).substr(2,9);
		const resp = {
			cart_id: cartId
		};
		res.json(resp);
	}

	/**
	 *@desc ADd product to cart
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with customer data and access token
	 * @memberOf CartController
	 */
	static addProduct(req, res){
		let request = req.body;
		Constant.cartDetails.validate(request, async (err, value) => {
			if(!err){
				try {
					const products = await CartModel.addToCart(request);
					res.json(products);
				} catch (e) {
					res.status(400).send(e)
				}
			}else{
				Constant.errorMessage.message = err.message;
				Constant.errorMessage.code = 'USR_02';
				res.status(400).send(Constant.errorMessage)
			}
		});
	}

	/**
	 *@desc Get Cart Details
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with category Data
	 * @memberOf CartController
	 */
	static async getCartProducts(req, res){
		const cartId = req.params.cartId;
		try{
			const products = await CartModel.getCartDetails(cartId);
			res.json(products);
		}catch (e) {
			Constant.errorMessage.message = e.message;
			Constant.errorMessage.code = e.code;
			res.status(400).send(Constant.errorMessage)
		}
	}

	/**
	 *@desc Update Cart By item
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with category Data
	 * @memberOf CartController
	 */
	static async UpdateItem(req, res){
		let request = req.body;
		request.item_id = req.params.itemId;
		try{
			const products = await CartModel.updateItem(request);
			res.json(products);
		}catch (e) {
			Constant.errorMessage.message = e.message;
			Constant.errorMessage.code = e.code;
			res.status(400).send(Constant.errorMessage)
		}
	}

	/**
	 *@desc Empty Cart
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with category Data
	 * @memberOf CartController
	 */
	static async emptyCart(req, res){
		const cartId = req.params.cartId;
		try{
			const products = await CartModel.emptyCart(cartId);
			res.json(products);
		}catch (e) {
			Constant.errorMessage.message = e.message;
			Constant.errorMessage.code = e.code;
			res.status(400).send(Constant.errorMessage)
		}
	}

	/**
	 *@desc Move to cart
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with category Data
	 * @memberOf CartController
	 */

	static async moveToCart(req, res){
		const cartId = req.params.itemId;
		try{
			const products = await CartModel.moveToCart(cartId);
			res.json(products);
		}catch (e) {
			Constant.errorMessage.message = e.message;
			Constant.errorMessage.code = e.code;
			res.status(400).send(Constant.errorMessage)
		}
	}

	/**
	 *@desc Get totals
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with category Data
	 * @memberOf CartController
	 */

	static async getTotals(req, res){
		const cartId = req.params.cartId;
		try{
			const products = await CartModel.getTotal(cartId);
			res.json(products);
		}catch (e) {
			Constant.errorMessage.message = e.message;
			Constant.errorMessage.code = e.code;
			res.status(400).send(Constant.errorMessage)
		}
	}

	/**
	 *@desc Save for Later
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with category Data
	 * @memberOf CartController
	 */

	static async saveForLater(req, res){
		const itemId = req.params.itemId;
		try{
			const product = await CartModel.saveForLater(itemId);
			res.json(product);
		}catch (e) {
			Constant.errorMessage.message = e.message;
			Constant.errorMessage.code = e.code;
			res.status(400).send(Constant.errorMessage)
		}
	}

	/**
	 *@desc Get saved
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with category Data
	 * @memberOf CartController
	 */

	static async getSaved(req, res){
		const cartId = req.params.cartId;
		try{
			const products = await CartModel.getSaved(cartId);
			res.json(products);
		}catch (e) {
			Constant.errorMessage.message = e.message;
			Constant.errorMessage.code = e.code;
			res.status(400).send(Constant.errorMessage)
		}
	}

	/**
	 *@desc Remove item
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with category Data
	 * @memberOf CartController
	 */

	static async removeItem(req, res){
		const itemId = req.params.itemId;
		try{
			const product = await CartModel.removeProduct(itemId);
			res.json(product);
		}catch (e) {
			Constant.errorMessage.message = e.message;
			Constant.errorMessage.code = e.code;
			res.status(400).send(Constant.errorMessage)
		}
	}

}

module.exports = CartController;
