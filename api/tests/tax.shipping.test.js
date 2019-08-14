import {expect} from 'chai';
import app from '../app/index';
import request from 'supertest';
import {describe} from "mocha";
import server from "../app";

describe('get all Taxes', () => {
	it('GET /api/v1/tax returns count and array of taxes', (done)=>{
		//send params to app to get categories
		request(app).get('/api/v1/tax')
			.expect('Content-Type', /json/)
			.end((err, res)=>{
				if(err) return done(err);
				expect(res.status).to.equal(200);
				expect(res.body).to.be.an.instanceOf(Array);
				return done();
			});
	});
});

describe('Tax By ID', () => {
	it('GET /api/v1/tax/{tax_id} returns an object with tax details', async ()=>{
		const response = await  request(server).get('/api/v1/tax/1');
		expect(response.status).to.equal(200);
		expect(response.body).to.be.an.instanceOf(Object);
		expect('Content-Type', /json/);
	});
});

describe('get all shipping Regions', () => {
	it('GET /api/v1/shipping/regions returns count and array of taxes', (done)=>{
		//send params to app to get categories
		request(app).get('/api/v1/shipping/regions')
			.expect('Content-Type', /json/)
			.end((err, res)=>{
				if(err) return done(err);
				expect(res.status).to.equal(200);
				expect(res.body).to.be.an.instanceOf(Array);
				return done();
			});
	});
});

describe('Shippings By ID', () => {
	it('GET /api/v1/shipping/regions/{shipping_region_id} returns an object with tax details', async ()=>{
		const response = await  request(server).get('/api/v1/shipping/regions/1');
		expect(response.status).to.equal(200);
		expect(response.body).to.be.an.instanceOf(Array);
		expect('Content-Type', /json/);
	});
});
