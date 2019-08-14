import {expect} from 'chai';
import app from '../app/index';
import request from 'supertest';
import {describe} from "mocha";
import server from "../app";

describe('get all Categories', () => {
	it('GET /api/v1/categories returns count and array of categories', (done)=>{
		const query_params = {
			order: 'name',
			page: 1,
			limit: 20
		};
		//send params to app to get categories
		request(app).get('/api/v1/categories')
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

describe('Category By ID', () => {
	it('GET /api/v1/categories/{category_id} returns an object with category details', async ()=>{
		const response = await  request(server).get('/api/v1/categories/1');
		expect(response.status).to.equal(200);
		expect(response.body).to.be.an.instanceOf(Object);
		expect('Content-Type', /json/);
	});
});

describe('Category In Product By ID', () => {
	it('GET /api/v1/categories/inProduct/{product_id} returns an object with category details', async ()=>{
		const response = await  request(server).get('/api/v1/categories/inProduct/1');
		expect(response.status).to.equal(200);
		expect(response.body).to.be.an.instanceOf(Array);
		expect('Content-Type', /json/);
	});
});

describe('Category In Department By ID', () => {
	it('GET /api/v1/categories/inDepartment/{department_id} returns an object with category details', async ()=>{
		const response = await  request(server).get('/api/v1/categories/inDepartment/1');
		expect(response.status).to.equal(200);
		expect(response.body).to.be.an.instanceOf(Array);
		expect('Content-Type', /json/);
	});
});
