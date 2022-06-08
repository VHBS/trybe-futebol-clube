import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { before } from 'mocha';

import { app } from '../app';

import { Response } from 'superagent';
import Team from '../database/models/Team';
import { allTeams, team } from './mocks/teamMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams', () => {

  let chaiHttpResponse: Response;

  describe('Restorna todos os times', () => {
    describe('Sucesso ao retornas todos os times', () => {
      before(() => {
        sinon
          .stub(Team, "findAll")
          .resolves(allTeams);
      });
    
      after(()=>{
        (Team.findAll as sinon.SinonStub).restore();
      })
    
      it('Retorna status 200 com os times', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get('/teams')
        
          const { body } = chaiHttpResponse;
    
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(body).deep.equal(allTeams)
      });
    });

    describe('Erro no servidor', () => {
      before(() => {
        sinon
          .stub(Team, "findAll")
          .throws();
      });
    
      after(()=>{
        (Team.findAll as sinon.SinonStub).restore();
      })
    
      it('Retorna status 500 com a menssagem "Erro inesperado"', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get('/teams')
        
          const { message } = chaiHttpResponse.body;
    
        expect(chaiHttpResponse.status).to.be.equal(500);
        expect(message).equal('Erro inesperado')
      });
    });
  });

  describe('Retorna times por id', () => {
    describe('Retorna um time através do id', () => {
      before(() => {
        sinon
          .stub(Team, "findOne")
          .resolves(team);
      });
    
      after(()=>{
        (Team.findOne as sinon.SinonStub).restore();
      })
    
      it('Retorna status 200 com o time', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get('/teams/1')
        
          const { body } = chaiHttpResponse;
    
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(body).deep.equal(team)
      });
    });

    describe('Falha ao tentar retornar um time com o id inexistente', () => {
      before(() => {
        sinon
          .stub(Team, "findOne")
          .resolves(null);
      });
    
      after(()=>{
        (Team.findOne as sinon.SinonStub).restore();
      })
    
      it('Retorna status 404 com a menssagem "Time não encontrado"', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get('/teams/100')
        
          const { message } = chaiHttpResponse.body;
    
        expect(chaiHttpResponse.status).to.be.equal(404);
        expect(message).deep.equal('Time não encontrado')
      });
    });

    describe('Erro no servidor', () => {
      before(() => {
        sinon
          .stub(Team, "findOne")
          .throws();
      });
    
      after(()=>{
        (Team.findOne as sinon.SinonStub).restore();
      })
    
      it('Retorna status 500 com a menssagem "Erro inesperado"', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get('/teams/1')
        
          const { message } = chaiHttpResponse.body;
    
        expect(chaiHttpResponse.status).to.be.equal(500);
        expect(message).equal('Erro inesperado')
      });
    });
  });
});
