import {expect} from 'chai';
import app from '../app/index';
import request from 'supertest';
import {describe} from "mocha";


describe('Get Unique Cart ID', () => {
	it('GET /api/v1/shoppingcart/generateUniqueId returns an object with cartId', async ()=>{
		const response = await  request(app).get('/api/v1/shoppingcart/generateUniqueId');
		expect(response.status).to.equal(200);
		expect(response.body).to.be.an.instanceOf(Object);
		expect('Content-Type', /json/);
	});
});

describe('Add Product In Cart', () => {

	it('Should return 200 with an Array of products in cart', (done) => {
		//mock valid user input
		const new_product = {
			cart_id : 'abc123weeer',
			product_id: 1,
			attributes: 'test test'
		};
		//send request to the app
		request(app).post('/api/v1/shoppingcart/add')
			.set('content-type', 'application/x-www-form-urlencoded')
			.type('form')
			.send(new_product)
			.expect('Content-Type', /json/)
			.expect(200)
			.expect((res)=>{
				expect(res.body).to.be.an.instanceOf(Array);
			})
			.end(function (err, res) {
				if (err) return done(err);
				done()
			})
	});

});

describe('Get Products in cart', () => {
	it('GET /api/v1/shoppingcart/{cart_id} returns an Array with cart data', async ()=>{
		const response = await  request(app).get('/api/v1/shoppingcart/abc123uiui');
		expect(response.status).to.equal(200);
		expect(response.body).to.be.an.instanceOf(Array);
		expect('Content-Type', /json/);
	});
});

describe('Update Cart by Item', () => {

	it('PUT /api/v1/shoppincart/update/{item_id} should return 200 with updated Cart', (done) => {
		//mock login to get token
		const quantity = {
			quantity: 1
		};
		//send login request to the app to receive token
		request(app).put('/api/v1/shoppingcart/update/1')
			.set('content-type', 'application/x-www-form-urlencoded')
			.type('form')
			.send(quantity)
			.end(function (err, res) {
				if (err) return done(err);
				expect(res.status).to.equal(200);
				expect(res.body).to.be.an.instanceOf(Array);
				return done()
			})
	});
});

describe('Empty Cart', () => {
	it('DELETE /api/v1/shoppingcart/empty/{cart_id} returns an empty Array with status 200', async ()=>{
		const response = await  request(app).delete('/api/v1/shoppingcart/empty/abc123weeer');
		expect(response.status).to.equal(200);
		expect('Content-Type', /json/);
	});
});

describe('Move To Cart', () => {
	it('Get /api/v1/shoppingcart/moveToCart/{item_id} returns an empty Array with status 200', async ()=>{
		const response = await  request(app).get('/api/v1/shoppingcart/moveToCart/1');
		expect(response.status).to.equal(200);
		expect('Content-Type', /json/);
	});
});

describe('Get Cart Totals', () => {
	it('Get /api/v1/shoppingcart/totalAmount/{cart_id} returns an Object with status 200', async ()=>{
		const response = await  request(app).get('/api/v1/shoppingcart/totalAmount/abc123uiui');
		expect(response.status).to.equal(200);
		expect('Content-Type', /json/);
	});
});

describe('Save for Later', () => {
	it('Get /api/v1/shoppingcart/saveForLater/{item_id} returns an Object with status 200', async ()=>{
		const response = await  request(app).get('/api/v1/shoppingcart/saveForLater/1');
		expect(response.status).to.equal(200);
		expect('Content-Type', /json/);
	});
});

describe('Get Saved', () => {
	it('Get /api/v1/shoppingcart/getSaved/{cart_id} returns an Array with status 200', async ()=>{
		const response = await  request(app).get('/api/v1/shoppingcart/getSaved/abc123uiui');
		expect(response.status).to.equal(200);
		expect(response.body).to.be.an.instanceOf(Array);
		expect('Content-Type', /json/);
	});
});

