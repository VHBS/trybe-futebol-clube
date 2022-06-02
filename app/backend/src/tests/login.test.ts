import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';
import { adminDb } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login', () => {
  let chaiHttpResponse: Response;

  describe('Login realizado com sucesso', () => {
    beforeEach(() => {
      sinon
        .stub(User, "findOne")
        .resolves(adminDb)
    });
  
    afterEach(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })
  
    it('Retorna status 200 com os dados do usuário e o token', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: "admin@admin.com",
          password: "secret_admin"
        })
  
      const { user, token } = chaiHttpResponse.body
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(user).deep.equal(adminDb.userData)
      expect(token).not.equal(undefined);


    });
  });

  describe('Login não realizado', () => {
    describe('Login Admin com email invalido', () => {
      beforeEach(() => {
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
          .send({
            email: "email@errado.com",
            password: "secret_admin"
          })
    
        const { message } = chaiHttpResponse.body
    
        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(message).equal('Incorrect email or password')
      });
    });

    describe('Login Admin com senha invalida', () => {

      beforeEach(() => {
        sinon
          .stub(User, "findOne")
          .resolves(adminDb)
      });
    
      afterEach(()=>{
        (User.findOne as sinon.SinonStub).restore();
      })
  
      it('Retorna status 401 e a menssagem "Incorrect email or password"', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({
            email: "admin@admin.com",
            password: "senha_errada"
          })
    
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
            password: "secret_admin"
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
            email: "admin@admin.com"
          })
    
        const { message } = chaiHttpResponse.body
    
        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(message).equal('All fields must be filled')
      });
    });
  });

  describe('Valida a role do usuário', () => {
  describe('Login validado com sucesso', () => {

    beforeEach(async () => {
      sinon
        .stub(User, "findOne")
        .resolves(adminDb)
    });
  
    afterEach(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })

    it('Retorna status 200 e a role do usuario', async () => {
      const {body: { token }} = await chai
        .request(app)
        .post('/login')
        .send({
          email: "admin@admin.com",
          password: "secret_admin"
        })

      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set({ authorization: token })
  
      const role = chaiHttpResponse.body
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(role).equal("admin")
    });
  });
  });
});
