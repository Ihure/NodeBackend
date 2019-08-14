import {expect} from 'chai';
import server from '../app/index';
import request from 'supertest';
import {describe} from "mocha";

describe('Departments API Tests', () => {
	it('GET /api/v1/departments returns an array of departments', async ()=>{
			const response = await  request(server).get('/api/v1/departments');
			expect(response.status).to.equal(200);
			expect(response.body).to.be.an.instanceOf(Array);
	});

	it('GET /api/v1/departments/{department_id} returns an object with department details', async ()=>{
			const response = await  request(server).get('/api/v1/departments/1');
			expect(response.status).to.equal(200);
			expect(response.body).to.be.an.instanceOf(Object);
			expect('Content-Type', /json/);
	});
});
