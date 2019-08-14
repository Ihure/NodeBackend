import {expect} from 'chai';
import app from '../app/index';
import request from 'supertest';
import {describe} from "mocha";

describe('Get Order Details', () => {

	it('GET /api/v1/orders/{order_id} should return 200 with Order Details', (done) => {
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
				request(app).get('/api/v1/order/1')
					.set('USER-KEY', token[1])
					.set('content-type', 'application/x-www-form-urlencoded')
					.end(function (err, res) {
						if (err) return done(err);
						expect(res.status).to.equal(200);
						// expect(res.body.order_id).to.equal(1);
						return done()
					})
			})
	});
});

describe('Get Order Details for Customer', () => {

	it('GET /api/v1/orders/inCustomer should return 200 with Order Details', (done) => {
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
				request(app).get('/api/v1/orders/inCustomer')
					.set('USER-KEY', token[1])
					.set('content-type', 'application/x-www-form-urlencoded')
					.end(function (err, res) {
						if (err) return done(err);
						expect(res.status).to.equal(200);
						// expect(res.body.order_id).to.equal(1);
						return done()
					})
			})
	});
});

describe('Get Order Info for Customer', () => {

	it('GET /api/v1/orders/shortDetail/{order_id} should return 200 with Order Info', (done) => {
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
				request(app).get('/api/v1/orders/shortDetail/1')
					.set('USER-KEY', token[1])
					.set('content-type', 'application/x-www-form-urlencoded')
					.end(function (err, res) {
						if (err) return done(err);
						expect(res.status).to.equal(200);
						// expect(res.body.order_id).to.equal(1);
						return done()
					})
			})
	});
});
