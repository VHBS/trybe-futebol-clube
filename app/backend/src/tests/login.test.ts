import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';

import { Response } from 'superagent';
import { adminLogin, adminLoginJwtVerify, adminLoginResult } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login', () => {

  let chaiHttpResponse: Response;

  describe('Login realizado com sucesso', () => {
    beforeEach(async () => {
      sinon
        .stub(User, "findOne")
        .resolves(adminLoginResult as User)
  
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
        .send(adminLogin)
  
      const { user, token } = chaiHttpResponse.body
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(user).deep.equal(adminLoginResult.userData)
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
          .send(adminLogin)
    
        const { message } = chaiHttpResponse.body
    
        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(message).equal('Incorrect email or password')
      });
    });

    describe('Login Admin com senha invalida', () => {

      beforeEach(async () => {
        sinon
          .stub(User, "findOne")
          .resolves(adminLoginResult as User)
    
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
          .send(adminLogin)
    
        const { message } = chaiHttpResponse.body
    
        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(message).equal('Incorrect email or password')
      });
    });

    describe('Login sem email informado', () => {
      it('Retorna status 400 e a menssagem "All fields must be filled"', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({
            password: adminLogin.password
          })
    
        const { message } = chaiHttpResponse.body
    
        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(message).equal('All fields must be filled')
      });
    });

    describe('Login sem senha informada', () => {
      it('Retorna status 400 e a menssagem "All fields must be filled"', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({
            email: adminLogin.email
          })
    
        const { message } = chaiHttpResponse.body
    
        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(message).equal('All fields must be filled')
      });
    });
  });

  describe('Valida a role do usuário', () => {
    let chaiHttpResponse: Response;

  describe('Login realizado com sucesso', () => {
    beforeEach(async () => {
      sinon
        .stub(jwt, "verify")
        .resolves(adminLoginJwtVerify)
    });
  
    afterEach(()=>{
      (jwt.verify as sinon.SinonStub).restore();
    })
  
    it('Retorna status 200 com os dados do usuário e o token', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
  
      const role = chaiHttpResponse.body
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(role).deep.equal("admin")
    });
  });
  })
});
