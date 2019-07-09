const Constant = require('../constants/common.definitations');
import CustomerModel from '../model/customerModel'

/**
 * Customer controller handles all requests that has to do with customer
 * - register - allow customers to create a new account
 */

/**
 *
 *
 * @class CustomerController
 */
class CustomerController {
    /**
     *@desc Register a customer and assign access token
     *
     * @static
     * @param {object} req express request object
     * @param {object} res express response object
     * @returns {json} json object with customer data and access token
     * @memberOf CustomerController
     */
    static async register(req, res){
        let request = req.body;
        if (!request.name || !request.email || !request.password) {// check that all fields have values
            Constant.errorMessage.message ='Required field is empty';
            Constant.errorMessage.field = !request.name ? 'name' : 'email';
            Constant.errorMessage.field = !request.name ? 'name' : 'email';
            res.status(400).send(Constant.errorMessage);
        } else {//proceed to create customer
            try {
                Constant.customerResponse.customer = await CustomerModel.register(request);
                res.json(Constant.customerResponse);
            } catch (e) {
                Constant.errorMessage.message = e.message;
                Constant.errorMessage.code = e.code;
                res.status(400).send(Constant.errorMessage)
            }
        }
    }
}

module.exports = CustomerController;