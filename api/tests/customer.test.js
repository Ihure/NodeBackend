import {expect} from 'chai';
import app from '../app/index';
import request from 'supertest';
import {describe} from "mocha";


/*describe('Customer registration', () => {

	it('Should return 200 and user details with accessToken', (done) => {
		//mock valid user input
		const new_user = {
			name : 'John',
			email: 'john@wick.com',
			password: 'abc123'
		};
		//send request to the app
		request(app).post('/api/v1/customers')
			.set('content-type', 'application/x-www-form-urlencoded')
			.type('form')
			.send(new_user)
			.expect('Content-Type', /json/)
			.expect(200)
			.expect((res)=>{
				expect(res.body).to.be.an.instanceOf(Object);
				expect(res.body.accessToken).to.exist;
			})
			.end(function (err, res) {
				if (err) return done(err);
				done()
			})
	});

});*/

describe('Customer Login', () => {

	it('POST /api/v1/customers/login Should return 200 with user details and accessToken', (done) => {
		//mock valid user input
		const customer = {
			email: 'john@wick.com',
			password: 'abc123'
		};
		//send request to the app
		request(app).post('/api/v1/customers/login')
			.set('content-type', 'application/x-www-form-urlencoded')
			.type('form')
			.send(customer)
			.expect('Content-Type', /json/)
			.end(function (err, res) {
				if (err) return done(err);
				expect(res.body).to.be.an.instanceOf(Object);
				expect(res.body.accessToken).to.exist;
				expect(res.body.customer.name).to.be.equal('John');
				expect(res.status).to.equal(200);
				return done()
			})
	});

});

describe('Get Customer Using Token', () => {

	it('GET /api/v1/customer should return 200 and user details if valid token provided', (done) => {
		//mock login to get token
		const valid_input = {
			email: 'john@wick.com',
			password: 'abc123'
		};
		//send login request to the app to receive token
		request(app).post('/api/v1/customers/login')
			.set('content-type', 'application/x-www-form-urlencoded')
			.type('form')
			.send(valid_input)
			.end((err, res) =>{
				if(err) return done(err);
				const acToken = res.body.accessToken;
				let token = acToken.split(' ');
				request(app).get('/api/v1/customer')
					.set('USER-KEY', token[1])
					.end(function (err, res) {
						if (err) return done(err);
						expect(res.body).to.be.an.instanceOf(Object);
						expect(res.body.accessToken).to.exist;
						expect(res.status).to.equal(200);
						expect(res.body.customer.name).to.be.equal('John');
						return done()
					})
			})
	});
});

describe('Update Customer Address', () => {

	it('PUT /api/v1/customers/address should return 200 with updated Address details ', (done) => {
		//mock login to get token
		const valid_input = {
			email: 'john@wick.com',
			password: 'abc123'
		};
		//send login request to the app to receive token
		request(app).post('/api/v1/customers/login')
			.set('content-type', 'application/x-www-form-urlencoded')
			.type('form')
			.send(valid_input)
			.end( (err, res) =>{
				if(err) return done(err);
				const acToken = res.body.accessToken;
				let token = acToken.split(' ');
				const address_details = {
					address_1: 'test',
					address_2: ' ',
					city: 'Nairobi',
					region: 'abc',
					postal_code: '0120',
					country: 'Kenya',
					shipping_region_id: 2
				};
				request(app).put('/api/v1/customers/address')
					.set('USER-KEY', token[1])
					.set('content-type', 'application/x-www-form-urlencoded')
					.type('form')
					.send(address_details)
					.end(function (err, res) {
						if (err) return done(err);
						expect(res.status).to.equal(200);
						expect(res.body).to.be.an.instanceOf(Object);
						expect(res.body.address_1).to.be.equal('test');
						return done()
					})
			})
	});
});

describe('Update Customer credit', () => {

	it('PUT /api/v1/customers/creditCard should return 200 with updated CreditCard details ', (done) => {
		//mock login to get token
		const valid_input = {
			email: 'john@wick.com',
			password: 'abc123'
		};
		//send login request to the app to receive token
		request(app).post('/api/v1/customers/login')
			.set('content-type', 'application/x-www-form-urlencoded')
			.type('form')
			.send(valid_input)
			.end( (err, res) =>{
				if(err) return done(err);
				const acToken = res.body.accessToken;
				let token = acToken.split(' ');
				const credit_card = {
					credit_card: 'test123456'
				};
				request(app).put('/api/v1/customers/creditCard')
					.set('USER-KEY', token[1])
					.set('content-type', 'application/x-www-form-urlencoded')
					.type('form')
					.send(credit_card)
					.end(function (err, res) {
						if (err) return done(err);
						expect(res.status).to.equal(200);
						expect(res.body).to.be.an.instanceOf(Object);
						expect(res.body.credit_card).to.be.equal('test123456');
						return done()
					})
			})
	});
});

describe('Update Customer account', () => {

	it('PUT /api/v1/customer should return 200 with updated Customer details ', (done) => {
		//mock login to get token
		const valid_input = {
			email: 'john@wick.com',
			password: 'abc123'
		};
		//send login request to the app to receive token
		request(app).post('/api/v1/customers/login')
			.set('content-type', 'application/x-www-form-urlencoded')
			.type('form')
			.send(valid_input)
			.end( (err, res) =>{
				if(err) return done(err);
				const acToken = res.body.accessToken;
				let token = acToken.split(' ');
				const account_details = {
					name:'John',
					email:'john@wick.com',
					password: '',
					day_phone: 'rest',
					eve_phone: '01287',
					mob_phone: '0123456'
				};
				request(app).put('/api/v1/customer')
					.set('USER-KEY', token[1])
					.set('content-type', 'application/x-www-form-urlencoded')
					.type('form')
					.send(account_details)
					.end(function (err, res) {
						if (err) return done(err);
						expect(res.status).to.equal(200);
						expect(res.body).to.be.an.instanceOf(Object);
						expect(res.body.mob_phone).to.be.equal('0123456');
						return done()
					})
			})
	});
});
