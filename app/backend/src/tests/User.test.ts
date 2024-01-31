import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import SequelizeUser from '../database/models/SequelizeUser';
import UserMock from './mocks/User.mock';
import * as bcrypt from 'bcryptjs';
import Validations from '../middlewares/validationMiddleware';

chai.use(chaiHttp);

const { expect } = chai;

describe('Users', () => {
  afterEach(sinon.restore);
  it('Retorna um token se usuário loga com sucesso', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(UserMock.validUserModelReturn as any);
    sinon.stub(bcrypt, 'compareSync').returns(true);

    const { status, body } = await chai.request(app).post('/login').send(UserMock.validUserBody);

    expect(status).to.equal(200);
    expect(body).to.have.key('token');
  });
});
