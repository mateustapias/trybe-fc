import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import TeamMock from './mocks/Team.mock';
import TeamModel from '../models/TeamModel';
import SequelizeTeam from '../database/models/SequelizeTeam';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
  afterEach(sinon.restore);
  it('Retorna todos os times', async () => {
    const validTeamBodyResponseArray = [TeamMock.validTeamBodyResponse, TeamMock.validTeamBodyResponse, TeamMock.validTeamBodyResponse];
    sinon.stub(SequelizeTeam, 'findAll').resolves(validTeamBodyResponseArray as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(validTeamBodyResponseArray);
  });
  it('Retorna apenas um time', async () => {
    const validTeamBodyResponse = TeamMock.validTeamBodyResponse;
    sinon.stub(SequelizeTeam, 'findByPk').resolves(validTeamBodyResponse as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(validTeamBodyResponse);
  });
  it('Retorna um erro caso não encontre um time', async () => {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(404);
    // expect(body)
  })
});
