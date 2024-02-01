import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import UserMock from './mocks/User.mock';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import jwtUtil from '../utils/jwtUtil';
import MatchMock from './mocks/Match.mock';
import SequelizeMatch from '../database/models/SequelizeMatch';

chai.use(chaiHttp);

const { expect } = chai;

describe('Match', () => {
  afterEach(sinon.restore);
  it('Retorna todas partidas', async function () {
    const validMatchBodyResponseArray = [MatchMock.validMatchBodyResponse, MatchMock.validMatchBodyResponse, MatchMock.validMatchBodyResponse];
    sinon.stub(SequelizeMatch, 'findAll').resolves(validMatchBodyResponseArray as any);

    const { status, body } = await chai.request(app).get('/matches').query({ inProgress: undefined });

    expect(status).to.equal(200);
    expect(body).to.deep.equal(validMatchBodyResponseArray);
  });
  it('Retorna todas partidas em progresso', async function () {
    const validMatchBodyResponseArray = [MatchMock.validMatchBodyResponse, MatchMock.validMatchBodyResponse, MatchMock.validMatchBodyResponse];
    sinon.stub(SequelizeMatch, 'findAll').resolves(validMatchBodyResponseArray as any);

    const { status, body } = await chai.request(app).get('/matches').query({ inProgress: 'true' });

    expect(status).to.equal(200);
    expect(body).to.deep.equal(validMatchBodyResponseArray);
  });
  it('Retorna todas partidas finalizadas', async function () {
    const validMatchBodyResponseArray = [MatchMock.validMatchBodyResponse, MatchMock.validMatchBodyResponse, MatchMock.validMatchBodyResponse];
    sinon.stub(SequelizeMatch, 'findAll').resolves(validMatchBodyResponseArray as any);

    const { status, body } = await chai.request(app).get('/matches').query({ inProgress: 'false' });

    expect(status).to.equal(200);
    expect(body).to.deep.equal(validMatchBodyResponseArray);
  });
});
