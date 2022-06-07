import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { before } from 'mocha';


import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard', () => {
  let chaiHttpResponse: Response;

  describe('Login realizado com sucesso', () => {
    before(() => {
      // sinon
      //   .stub(User, "findOne")
      //   .resolves(adminDb)
    });
  
    after(()=>{
      // (User.findOne as sinon.SinonStub).restore();
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
  
      // expect(chaiHttpResponse.status).to.be.equal(200);
      // expect(user).deep.equal(adminDb.userData)
      // expect(token).not.equal(undefined);


    });
  });
});
