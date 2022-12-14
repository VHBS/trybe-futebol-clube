import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { before } from 'mocha';


import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';
import { adminDb, adminLogin } from './mocks/userMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login', () => {
  let chaiHttpResponse: Response;

  describe('Login realizado com sucesso', () => {
    before(() => {
      sinon
        .stub(User, "findOne")
        .resolves(adminDb)
    });
  
    after(()=>{
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
      before(() => {
        sinon
          .stub(User, "findOne")
          .resolves(null)
      });
    
      after(()=>{
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

      before(() => {
        sinon
          .stub(User, "findOne")
          .resolves(adminDb)
      });
    
      after(()=>{
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

      before(() => {
        sinon
          .stub(User, "findOne")
          .resolves(adminDb)
      });
    
      after(()=>{
        (User.findOne as sinon.SinonStub).restore();
      })

      it('Retorna status 200 e a role do usuario', async () => {
        const {body: { token }} = await chai
          .request(app)
          .post('/login')
          .send(adminLogin)

        chaiHttpResponse = await chai
          .request(app)
          .get('/login/validate')
          .set({ authorization: token })
    
        const role = chaiHttpResponse.body
    
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(role).equal("admin")
      });
    });

    describe('Erro ao validar role', () => {
      before(() => {
        sinon
          .stub(jwt, "verify")
          .throws()
      });
    
      after(()=>{
        (jwt.verify as sinon.SinonStub).restore();
      })

      it('Retorna status 500 e a menssagem "Erro inesperado"', async () => {
        const {body: { token }} = await chai
          .request(app)
          .post('/login')
          .send(adminLogin)

        chaiHttpResponse = await chai
          .request(app)
          .get('/login/validate')
          .set({ authorization: token })
    
        const {message} = chaiHttpResponse.body
    
        expect(chaiHttpResponse.status).to.be.equal(500);
        expect(message).equal('Erro inesperado')
      });
    });

    describe('Token não encontrado', () => {
      it('Retorna status 400 e a menssagem "Token não encontrado"', async () => {

        chaiHttpResponse = await chai
          .request(app)
          .get('/login/validate')
    
        const { message } = chaiHttpResponse.body
    
        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(message).equal("Token não encontrado")
      });
    });

    describe('Erro no servidor', () => {

      before(() => {
        sinon
          .stub(jwt, "sign")
          .throws()
      });
    
      after(()=>{
        (jwt.sign as sinon.SinonStub).restore();
      })

      it('Retorna status 500 e a menssagem "Erro inesperado"', async () => {
        const chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send(adminLogin)

          const { message } = chaiHttpResponse.body
    
        expect(chaiHttpResponse.status).to.be.equal(500);
        expect(message).equal('Erro inesperado')
      });
    });
  });
});
