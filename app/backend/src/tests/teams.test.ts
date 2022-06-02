import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import Team from '../database/models/Team';
import { allTeams } from './mocks/teamMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams', () => {

  let chaiHttpResponse: Response;

  beforeEach(() => {
    sinon
      .stub(Team, "findAll")
      .resolves(allTeams);
  });

  afterEach(()=>{
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
