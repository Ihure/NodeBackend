import {expect} from 'chai';
import app from '../app/index';
import request from 'supertest';
import {describe} from "mocha";
import server from "../app";

describe('get all Products', () => {
	it('GET /api/v1/products returns count and array of products', (done)=>{
		const query_params = {
			description_length: 200,
			page: 1,
			limit: 20
		};
		//send params to app to get categories
		request(app).get('/api/v1/products')
			.query(query_params)
			.expect('Content-Type', /json/)
			.end((err, res)=>{
				if(err) return done(err);
				expect(res.status).to.equal(200);
				expect(res.body).to.be.an.instanceOf(Object);
				expect(res.body.rows).to.be.an.instanceOf(Array);
				return done();
			});
	});
});

describe('search Products', () => {
	it('GET /api/v1/products/search returns count and array of products', (done)=>{
		const query_params = {
			description_length: 200,
			page: 1,
			limit: 20,
			query_string: 'nt',
			all_words: 'on'
		};
		//send params to app to get categories
		request(app).get('/api/v1/products/search')
			.query(query_params)
			.expect('Content-Type', /json/)
			.end((err, res)=>{
				if(err) return done(err);
				expect(res.status).to.equal(200);
				expect(res.body).to.be.an.instanceOf(Object);
				expect(res.body.rows).to.be.an.instanceOf(Array);
				return done();
			});
	});
});

describe('Product By ID', () => {
	it('GET /api/v1/products/{product_id} returns an object with products details', async ()=>{
		const response = await  request(server).get('/api/v1/products/1');
		expect(response.status).to.equal(200);
		expect(response.body).to.be.an.instanceOf(Object);
		expect('Content-Type', /json/);
	});
});

describe('Products in Category', () => {
	it('GET /api/v1/products/inCategory/{category_id} returns count and array of products', (done)=>{
		const query_params = {
			description_length: 200,
			page: 1,
			limit: 20
		};
		//send params to app to get categories
		request(app).get('/api/v1/products/inCategory/1')
			.query(query_params)
			.expect('Content-Type', /json/)
			.end((err, res)=>{
				if(err) return done(err);
				expect(res.status).to.equal(200);
				expect(res.body).to.be.an.instanceOf(Object);
				expect(res.body.rows).to.be.an.instanceOf(Array);
				return done();
			});
	});
});

describe('Products in Department', () => {
	it('GET /api/v1/products/inDepartment/{department_id} returns count and array of products', (done)=>{
		const query_params = {
			description_length: 200,
			page: 1,
			limit: 20
		};
		//send params to app to get categories
		request(app).get('/api/v1/products/inDepartment/1')
			.query(query_params)
			.expect('Content-Type', /json/)
			.end((err, res)=>{
				if(err) return done(err);
				expect(res.status).to.equal(200);
				expect(res.body).to.be.an.instanceOf(Object);
				expect(res.body.rows).to.be.an.instanceOf(Array);
				return done();
			});
	});
});

describe('Product Details By ID', () => {
	it('GET /api/v1/products/{product_id}/details returns an object with products details', async ()=>{
		const response = await  request(server).get('/api/v1/products/1/details');
		expect(response.status).to.equal(200);
		expect(response.body).to.be.an.instanceOf(Object);
		expect('Content-Type', /json/);
	});
});

describe('Product Locations By ID', () => {
	it('GET /api/v1/products/{product_id}/locations returns an object with products details', async ()=>{
		const response = await  request(server).get('/api/v1/products/1/locations');
		expect(response.status).to.equal(200);
		expect(response.body).to.be.an.instanceOf(Object);
		expect('Content-Type', /json/);
	});
});

describe('Product Review By ID', () => {
	it('GET /api/v1/products/{product_id}/reviews returns an object with reviews', async ()=>{
		const response = await  request(server).get('/api/v1/products/1/reviews');
		expect(response.status).to.equal(200);
		expect(response.body).to.be.an.instanceOf(Array);
		expect('Content-Type', /json/);
	});
});

describe('Enter Product Review', () => {

	it('PUT /api/v1/products/{product_id}/reviews should return 200', (done) => {
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
				const review_details = {
					review: 'very nice',
					rating: 4
				};
				request(app).post('/api/v1/products/1/reviews')
					.set('USER-KEY', token[1])
					.set('content-type', 'application/x-www-form-urlencoded')
					.type('form')
					.send(review_details)
					.end(function (err, res) {
						if (err) return done(err);
						expect(res.status).to.equal(200);
						return done()
					})
			})
	});
});
