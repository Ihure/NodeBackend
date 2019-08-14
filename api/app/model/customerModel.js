const connection = require('../config/seq');
import bcrypt from 'bcryptjs';

class CustomerModel {
    static register(req) {
        return new Promise((resolve, reject) => {
					connection.query('SELECT * FROM customer WHERE email =:email ',
						{ replacements: { email: req.email }, type: connection.QueryTypes.SELECT }
					).then(user => {
						let customer = user[0];
						if(customer){
								let err= {
									message: 'User already exists',
									code: 'USR_04'
								};
								reject(err);
						}else {
							bcrypt.hash(req.password, 10, function (err, hash) {
								let sql = 'CALL customer_add(:name, :email, :password)';
								connection.query(sql, {replacements: { name:req.name, email: req.email, password: hash}})
									.then( res => resolve(res[0]))
									.catch( e => reject(e));
							});
						}
					})
					.catch(e => {
						let err= {
							message: e.message,
							code: 'USR_05'
						};
						reject(err)
					});
        });
    }
    static registerFacebook(req) {
        return new Promise((resolve, reject) => {
					connection.query('SELECT * FROM customer WHERE email =:email ',
						{ replacements: { email: req.email }, type: connection.QueryTypes.SELECT }
					).then(user => {
						let customer = user[0];
						if(customer){
							resolve(customer);
						}else {
							let sql = 'CALL customer_add_facebook(:name, :email, :id)';
							connection.query(sql, {replacements: { name:req.name, email: req.email, id: req.id}})
								.then( res => resolve(res[0]))
								.catch( e => reject(e));
						}
					})
						.catch(e => {
							let err= {
								message: e.message,
								code: 'USR_05'
							};
							reject(err)
						});
        });
    }

    static getUser(id) {
        return new Promise((resolve, reject) => {
						let sql = 'CALL customer_get_customer(:id)';
						connection.query(sql, {replacements: {id: id}})
							.then( res => resolve(res[0]))
							.catch( e => reject(e));
        });
    }

    static login(req) {
			return new Promise((resolve, reject ) => {
				connection.query('SELECT * FROM customer WHERE email =:email ',
					{ replacements: { email: req.email }, type: connection.QueryTypes.SELECT }
				).then(user => {
					let customer = user[0];
					bcrypt.compare(req.password, customer.password, function(err, res) {
						if(res){
							delete customer.password;
							delete customer.facebook_id;
							resolve(customer);
						}else{
							reject(err);
						}
					});
				})
				.catch(e => reject(e));
			});
		}


	static updateAddress(req) {
		return new Promise((resolve, reject) => {
			let sql = 'CALL customer_update_address( :id, :address1, :address2, :City, :Region, :PostalCode, :Country,' +
				':ShippingRegionId)';
			connection.query(sql, {replacements: { id: req.id, address1: req.address_1, address2: req.address_2,
					City: req.city, Region: req.region, PostalCode: req.postal_code, Country: req.country,
					ShippingRegionId: req.shipping_region_id}})
				.then( res => resolve(res[0]))
				.catch( e => reject(e));
		});
	}

	static updateCreditCard(req) {
		return new Promise((resolve, reject) => {
			let sql = 'CALL customer_update_credit_card( :id, :creditCard)';
			connection.query(sql, {replacements: { id: req.id, creditCard: req.credit_card}})
				.then( res => resolve(res[0]))
				.catch( e => reject(e));
		});
	}
	static updateCustomerAccount(req) {
		return new Promise((resolve, reject) => {
			if(req.password){
				bcrypt.hash(req.password, 10, function (err, hash) {
					let sql ='CALL customer_update_account(:CustomerId, :Name, :Email, :Password, :DayPhone, :EvePhone, :MobPhone)';
					connection.query(sql, {replacements: {CustomerId: req.id, Name: req.name, Email: req.email, Password: hash,
							DayPhone: req.day_phone, EvePhone: req.eve_phone, MobPhone: req.mob_phone}})
						.then( res => resolve(res[0]))
						.catch( e => reject(e));
				});
			}else {
				let sql ='CALL customer_update_account(:CustomerId, :Name, :Email, :Password, :DayPhone, :EvePhone, :MobPhone)';
				connection.query(sql, {replacements: {CustomerId:req.id, Name:req.name, Email:req.email, Password:req.password,
						DayPhone: req.day_phone, EvePhone: req.eve_phone, MobPhone: req.mob_phone}})
					.then( res => resolve(res[0]))
					.catch( e => reject(e));
			}
		});
	}
}



module.exports = CustomerModel;
