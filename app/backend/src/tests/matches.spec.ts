import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { before } from 'mocha';

import { app } from '../app';

import { Response } from 'superagent';
import Match from '../database/models/Match';
import Team from '../database/models/Team';
import { allMatches, allMatchesEnded, allMatchesInProgress, resultNewMatch, requestNewMatch, badRequestNewMatch, badRequestNewMatchNoTeam } from './mocks/matchMocks';
import { adminLogin } from './mocks/userMocks';
import { badResultTeamsById } from './mocks/teamMocks';

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

    describe('Erro ao tentar inserir um time sem token', () => {
      it('Retorna status 400 com uma menssagem', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/matches')
        
          const { message } = chaiHttpResponse.body;
    
        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(message).equal("Token não encontrado")
      });
    });

    describe('Erro ao tentar inserir um time vs ele mesmo', () => {
      it('Retorna status 401 com uma menssagem', async () => {
        const { body: { token } } = await chai
        .request(app)
        .post('/login')
        .send(adminLogin)
  
  
        chaiHttpResponse = await chai
          .request(app)
          .post('/matches')
          .set({ authorization: token })
          .send(badRequestNewMatch)
        
          const { message } = chaiHttpResponse.body;
    
        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(message).equal("It is not possible to create a match with two equal teams")
      });
    });
    

    describe('Erro ao tentar inserir uma partida com um time inexistente', () => {
      before(() => {
        sinon
          .stub(Team, "findAll")
          .resolves(badResultTeamsById);
      });
    
      after(()=>{
        (Team.findAll as sinon.SinonStub).restore();
      });
      it('Retorna status 404 com uma menssagem', async () => {
        const { body: { token } } = await chai
        .request(app)
        .post('/login')
        .send(adminLogin)
  
  
        chaiHttpResponse = await chai
          .request(app)
          .post('/matches')
          .set({ authorization: token })
          .send(badRequestNewMatchNoTeam)
        
          const { message } = chaiHttpResponse.body;
    
        expect(chaiHttpResponse.status).to.be.equal(404);
        expect(message).equal("There is no team with such id!")
      });
    });

    describe('Sucesso ao inserir uma partida', () => {
      before(() => {
        sinon
          .stub(Match, "create")
          .resolves(resultNewMatch);
      });
    
      after(()=>{
        (Match.create as sinon.SinonStub).restore();
      })
    
      it('Retorna status 200 com a partida', async () => {
        const { body: { token } } = await chai
        .request(app)
        .post('/login')
        .send(adminLogin)
  
  
        chaiHttpResponse = await chai
          .request(app)
          .post('/matches')
          .set({ authorization: token })
          .send(requestNewMatch)
        
          const match = chaiHttpResponse.body;
    
        expect(chaiHttpResponse.status).to.be.equal(201);
        expect(match).property('id')
        expect(match).deep.equal(resultNewMatch)
      });
    });    
  });

  describe('Atualiza uma partida em andamendo para finalizada com sucesso', () => {
    before(() => {
      sinon
        .stub(Match, "update")
        .resolves([1, []]);
    });
  
    after(()=>{
      (Match.update as sinon.SinonStub).restore();
    })
  
    it('Retorna status 200 com uma menssagem', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1/finish')
      
        const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(message).equal("Finished")
    });
  });

  describe('Falha ao tentar atualizar uma partida em andamendo para finalizada', () => {
    before(() => {
      sinon
        .stub(Match, "update")
        .resolves([0, []]);
    });
  
    after(()=>{
      (Match.update as sinon.SinonStub).restore();
    })
  
    it('Retorna status 404 com uma menssagem', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1/finish')
      
        const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(message).equal("Partida não encontrada ou já finalizada")
    });
  });

  describe('Atualiza os gols de uma partida', () => {
    describe('Sucesso ao atualizar os gols de uma partida', () => {
      before(() => {
        sinon
          .stub(Match, "update")
          .resolves([1, []]);
      });
    
      after(()=>{
        (Match.update as sinon.SinonStub).restore();
      })
    
      it('Retorna status 200 com uma menssagem', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .patch('/matches/1')
          .send()
        
          const { message } = chaiHttpResponse.body;
    
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(message).equal("Gols atualizados")
      });
    });
    describe('Falha ao atualizar os gols de uma partida', () => {
      before(() => {
        sinon
          .stub(Match, "update")
          .resolves([0, []]);
      });
    
      after(()=>{
        (Match.update as sinon.SinonStub).restore();
      })
    
      it('Retorna status 404 com uma menssagem', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .patch('/matches/1')
          .send()
        
          const { message } = chaiHttpResponse.body;
    
        expect(chaiHttpResponse.status).to.be.equal(404);
        expect(message).equal("Partida não encontrada, já finalizada ou já possui os dados inseridos")
      });      
    });

    describe('Erro no middleware de login', () => {
      before(() => {
        sinon
          .stub(jwt, "verify")
          .throws();
      });
    
      after(()=>{
        (jwt.verify as sinon.SinonStub).restore();
      })
    
      it('Retorna status 500 com uma menssagem', async () => {
        const { body: { token } } = await chai
        .request(app)
        .post('/login')
        .send(adminLogin)
  
  
        chaiHttpResponse = await chai
          .request(app)
          .post('/matches')
          .set({ authorization: token })
          .send(requestNewMatch)
        
          const { message } = chaiHttpResponse.body;
    
        expect(chaiHttpResponse.status).to.be.equal(500);
        expect(message).equal('Erro inesperado')
      });
    });

    describe('Erro no servidor', () => {
      before(() => {
        sinon
          .stub(Match, "update")
          .throws();
      });
    
      after(()=>{
        (Match.update as sinon.SinonStub).restore();
      })
    
      it('Retorna status 500 com uma menssagem', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .patch('/matches/1')
          .send()
        
          const { message } = chaiHttpResponse.body;
    
        expect(chaiHttpResponse.status).to.be.equal(500);
        expect(message).equal('Erro inesperado')
      });
    });
  });
});
