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

  it('Retorna todos os times em "/teams', async () => {
    const validTeamBodyResponseArray = [TeamMock.validTeamBodyResponse, TeamMock.validTeamBodyResponse, TeamMock.validTeamBodyResponse];
    sinon.stub(SequelizeTeam, 'findAll').resolves(validTeamBodyResponseArray as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(validTeamBodyResponseArray);
  });
  afterEach(sinon.restore);
});
