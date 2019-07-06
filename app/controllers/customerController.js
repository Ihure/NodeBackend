const Constant = require('../constants/common.definitations');
import CustomerModel from '../model/customerModel'


class CustomerController {
    static async register(req, res){
        if(!req.name || !req.email || !req.password){// check that all fields have values
            Constant.errorMessage.message ='Required field is empty';
            Constant.errorMessage.field = !req.name ? 'name': 'email';
            res.status(400).send(Constant.errorMessage);
        }else{//proceed to insert
            try {
                let payload = await CustomerModel.register(req);
                res.send(payload);
            } catch (e) {
                Constant.errorMessage.message = e;
                res.status(400).send(Constant.errorMessage)
            }
        }
    }
}

module.exports = CustomerController;