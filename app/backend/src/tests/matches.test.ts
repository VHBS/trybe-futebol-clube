import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { before } from 'mocha';

import { app } from '../app';

import { Response } from 'superagent';
import Match from '../database/models/Match';
import { allMatches, allMatchesEnded, allMatchesInProgress, resultNewMatch, requestNewMatch } from './mocks/matchMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches', () => {

  let chaiHttpResponse: Response;

  describe('Retorna todos as partidas', () => {
    before(() => {
      sinon
        .stub(Match, "findAll")
        .resolves(allMatches);
    });
  
    after(()=>{
      (Match.findAll as sinon.SinonStub).restore();
    })
  
    it('Retorna status 200 com as partidas', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matches')
      
        const matches = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(matches).deep.equal(allMatches)
    });
  });

  describe('Retorna todos as partidas em andamento', () => {
    before(() => {
      sinon
        .stub(Match, "findAll")
        .resolves(allMatchesInProgress);
    });
  
    after(()=>{
      (Match.findAll as sinon.SinonStub).restore();
    })
  
    it('Retorna status 200 com as partidas', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=true')
      
        const matches = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(matches).deep.equal(allMatchesInProgress)
    });
  });

  describe('Retorna todos as partidas finalizadas', () => {
    before(() => {
      sinon
        .stub(Match, "findAll")
        .resolves(allMatchesEnded);
    });
  
    after(()=>{
      (Match.findAll as sinon.SinonStub).restore();
    })
  
    it('Retorna status 200 com as partidas', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=false')
      
        const matches = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(matches).deep.equal(allMatchesEnded)
    });
  });

  describe('Insere uma partida em andamendo', () => {
    before(() => {
      sinon
        .stub(Match, "create")
        .resolves(resultNewMatch);
    });
  
    after(()=>{
      (Match.create as sinon.SinonStub).restore();
    })
  
    it('Retorna status 200 com a partida', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .send(requestNewMatch)
      
        const match = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(match).deep.equal(resultNewMatch)
    });
  });
});
