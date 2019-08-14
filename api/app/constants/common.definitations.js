const joi = require('@hapi/joi');
class Constants {
    static errorMessage = {
        code: 'USR_02',
        message: '',
        field: '',
        status: '500'
    };
    static customerResponse = {
        customer: {
					customer_id: '',
					name: '',
					email: '',
					address_1: '',
					address_2: '',
					city: '',
					region: '',
					postal_code: '',
					country: '',
					shipping_region_id: 0,
					day_phone: '',
					eve_phone: '',
					mob_phone: '',
					credit_card: ''},
        accessToken: '',
        expires_in: '24h'
    };
    static address = joi.object().keys({
			address_1: joi.string().required(),
			address_2: joi.string(),
			city: joi.string().required(),
			region: joi.string().required(),
			postal_code: joi.string().required(),
			country: joi.string().required(),
			shipping_region_id: joi.number().required(),
		});
    static registerDetails = joi.object().keys({
			name: joi.string().alphanum().min(3).max(30).required(),
			email: joi.string().email({ minDomainSegments: 2 }),
			password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
		});
    static accountDetails = joi.object().keys({
			name: joi.string().alphanum().min(3).max(30).required(),
			email: joi.string().email({ minDomainSegments: 2 }).required(),
			password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).allow(''),
			day_phone: joi.string(),
			eve_phone: joi.string(),
			mob_phone: joi.string()
		});
    static categoryDetails = joi.object().keys({
			order: joi.string(),
			page: joi.number(),
			limit: joi.number()
		});
    static cartDetails = joi.object().keys({
			cart_id: joi.string().required(),
			product_id: joi.number().required(),
			attributes: joi.string().required()
		});
    static stripeDetails = joi.object().keys({
			stripeToken: joi.string().required(),
			order_id: joi.number().required(),
			amount: joi.number().required(),
			description: joi.string().required(),
			currency: joi.string().allow('')
		});
		static orderDetails = joi.object().keys({
			cart_id: joi.string().required(),
			shipping_id: joi.number().required(),
			tax_id: joi.number().required(),
			customer_id: joi.number().required()
		})
}

module.exports = Constants;
