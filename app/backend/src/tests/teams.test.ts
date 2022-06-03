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

  describe('Retorna todos os times', () => {
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
      
        const teams = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(teams).deep.equal(allTeams)
    });
  });

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
      
        const teamResult = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(teamResult).deep.equal(team)
    });
  });

  describe('Retorna uma mensagem caso não encontre um time com o id', () => {
    before(() => {
      sinon
        .stub(Team, "findOne")
        .resolves(null);
    });
  
    after(()=>{
      (Team.findOne as sinon.SinonStub).restore();
    })
  
    it('Retorna status 200 com o time', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/teams/100')
      
        const teamResult = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(teamResult).deep.equal({ message: 'Time não encontrado' })
    });
  });

});
