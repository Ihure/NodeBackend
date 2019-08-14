import {expect} from 'chai';
import server from '../app/index';
import {describe} from "mocha";
require('dotenv').config();

describe('Server', ()=>{
		// console.log(server.port);
    it('tests that server is running current port', async()=>{
        expect(server.port).to.equal(parseFloat(process.env.PORT))
    })
});
