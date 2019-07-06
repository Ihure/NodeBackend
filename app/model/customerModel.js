const connection = require('../db/config');
import bcrypt from 'bcrypt';

class CustomerModel {
    static async register(req) {
        bcrypt.hash(req.password, 10, function(err, hash) {
            let sql = `CALL customer_add(${req.name}, ${req.email}, ${hash})`;
            connection.query(sql, (error, results, fields) => {
                if(error) throw  error;
                return results;
            });
            connection.end();
        });
    }
}

module.exports = CustomerModel;