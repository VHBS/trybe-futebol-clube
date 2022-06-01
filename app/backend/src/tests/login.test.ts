import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcrypt';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';

import { Response } from 'superagent';
import { adminLogin } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login', () => {

  let chaiHttpResponse: Response;

  describe('Login realizado com sucesso', () => {
    beforeEach(async () => {
      sinon
        .stub(User, "findOne")
        .resolves(adminLogin as User)
  
        sinon.stub(bcrypt, "compareSync")
        .resolves(true);
    });
  
    afterEach(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })
  
    it('Login Admin', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
  
      const { user, token } = chaiHttpResponse.body
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(user).deep.equal(adminLogin.userData)
      expect(token).not.equal(undefined);
    });
  });
});
