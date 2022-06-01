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
      (bcrypt.compareSync as sinon.SinonStub).restore();
    })
  
    it('Retorna status 200 com os dados do usuário e o token', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
  
      const { user, token } = chaiHttpResponse.body
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(user).deep.equal(adminLogin.userData)
      expect(token).not.equal(undefined);
    });
  });
  describe('Login não realizado', () => {
    describe('Login Admin com email invalido', () => {
      beforeEach(async () => {
        sinon
          .stub(User, "findOne")
          .resolves(null)
      });
    
      afterEach(()=>{
        (User.findOne as sinon.SinonStub).restore();
      })
      it('Retorna status 401 e a menssagem "Incorrect email or password"', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
    
        const { message } = chaiHttpResponse.body
    
        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(message).equal('Incorrect email or password')
      });
    });

    describe('Login Admin com senha invalida', () => {

      beforeEach(async () => {
        sinon
          .stub(User, "findOne")
          .resolves(adminLogin as User)
    
          sinon.stub(bcrypt, "compareSync")
          .returns(false);
      });
    
      afterEach(()=>{
        (User.findOne as sinon.SinonStub).restore();
        (bcrypt.compareSync as sinon.SinonStub).restore();
      })
  
      it('Retorna status 401 e a menssagem "Incorrect email or password"', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
    
        const { message } = chaiHttpResponse.body
    
        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(message).equal('Incorrect email or password')
      });
    });
  });
});
