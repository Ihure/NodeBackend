import {expect} from 'chai';
import app from '../app/index';
import request from 'supertest';
import {describe} from "mocha";

describe('Get Attributes', () => {
	it('GET /api/v1/attributes returns an object with attribute details', async ()=>{
		const response = await  request(app).get('/api/v1/attributes');
		expect(response.status).to.equal(200);
		expect(response.body).to.be.an.instanceOf(Array);
		expect('Content-Type', /json/);
	});
});

describe('Attribute By ID', () => {
	it('GET /api/v1/attributes/{attribute_id} returns an object with attribute details', async ()=>{
		const response = await  request(app).get('/api/v1/attributes/1');
		expect(response.status).to.equal(200);
		expect(response.body).to.be.an.instanceOf(Object);
		expect('Content-Type', /json/);
	});
});

describe('Attribute Values By ID', () => {
	it('GET /api/v1/attributes/values/{attribute_id} returns an object with attribute details', async ()=>{
		const response = await  request(app).get('/api/v1/attributes/values/1');
		expect(response.status).to.equal(200);
		expect(response.body).to.be.an.instanceOf(Object);
		expect('Content-Type', /json/);
	});
});

describe('Attribute Values By Product ID', () => {
	it('GET /api/v1/attributes/inProduct/{product_id} returns an object with attribute details', async ()=>{
		const response = await  request(app).get('/api/v1/attributes/inProduct/1');
		expect(response.status).to.equal(200);
		expect(response.body).to.be.an.instanceOf(Array);
		expect('Content-Type', /json/);
	});
});
