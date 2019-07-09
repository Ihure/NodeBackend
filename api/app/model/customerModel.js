const connection = require('../db/config');
import bcrypt from 'bcrypt';

class CustomerModel {
    static register(req) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(req.password, 8, function (err, hash) {
                let sql = 'CALL customer_add(?, ?, ?)';
                connection.query(sql, [req.name, req.email, hash], (error, results) => {
                    if (error) reject(error);
                    resolve(results[0][0]);
                });
                connection.end();
            });
        });
    }
}

module.exports = CustomerModel;