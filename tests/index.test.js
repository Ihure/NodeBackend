import {expect} from 'chai';
import server from '../app/index';
import {describe} from "mocha";
console.log(server.port);

describe('Server', ()=>{
    it('tests that server is running current port', async()=>{
        expect(server.port).to.equal(3000)

    })
});