import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Match from '../database/models/Match';
import { allMatches, allMatchesEnded, allMatchesInProgress } from './mocks/matchMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches', () => {

  let chaiHttpResponse: Response;

  describe('Retorna todos as partidas', () => {
    beforeEach(() => {
      sinon
        .stub(Match, "findAll")
        .resolves(allMatches);
    });
  
    afterEach(()=>{
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
    beforeEach(() => {
      sinon
        .stub(Match, "findAll")
        .resolves(allMatchesInProgress);
    });
  
    afterEach(()=>{
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
    beforeEach(() => {
      sinon
        .stub(Match, "findAll")
        .resolves(allMatchesEnded);
    });
  
    afterEach(()=>{
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
});