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
import * as jwt from 'jsonwebtoken';
import jwtUtil from '../utils/jwtUtil';

chai.use(chaiHttp);

const { expect } = chai;

describe('User', () => {
  afterEach(sinon.restore);
  describe('Login', function () {
    it('Retorna um token se usuário loga com sucesso', async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(UserMock.validUserModelReturn as any);
      sinon.stub(bcrypt, 'compareSync').returns(true);
  
      const { status, body } = await chai.request(app).post('/login').send(UserMock.validUserBody);
  
      expect(status).to.equal(200);
      expect(body).to.have.key('token');
    });
    it('Retorna um erro se login for feito com campos faltando ou vazios', async function() {
      const mockInvalidUser = { ...UserMock.validUserBody, email: "" };
  
      const { status, body } = await chai.request(app).post('/login').send(mockInvalidUser);
  
      expect(status).to.equal(400);
      expect(body).to.deep.equal({ message: 'All fields must be filled' });
    });
    it('Retorna um erro se login for feito com campo "email" inválido', async function() {
      const mockInvalidUser = { ...UserMock.validUserBody, email: "invalidEmail.com" };
  
      const { status, body } = await chai.request(app).post('/login').send(mockInvalidUser);
  
      expect(status).to.equal(401);
      expect(body).to.deep.equal({ message: 'Invalid email or password' });
    });
    it('Retorna um erro se login for feito com campo "senha" inválido', async function() {
      const mockInvalidUser = { ...UserMock.validUserBody, password: "invalid" };
  
      const { status, body } = await chai.request(app).post('/login').send(mockInvalidUser);
  
      expect(status).to.equal(401);
      expect(body).to.deep.equal({ message: 'Invalid email or password' });
    });
    it('Retorna um erro se login for feito com usuário inexistente no banco', async function() {
      // const mockInvalidUser = { ...UserMock.validUserBody, username: "invalid" };
      sinon.stub(SequelizeUser, 'findOne').resolves(null);
  
      const { status, body } = await chai.request(app).post('/login').send(UserMock.validUserBody);
  
      expect(status).to.equal(401);
      expect(body).to.deep.equal({ message: 'Invalid email or password' });
    });
    it('Retorna um erro se login for feito com senha incorreta ', async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(UserMock.validUserModelReturn as any);
      sinon.stub(bcrypt, 'compareSync').returns(false);
  
      const { status, body } = await chai.request(app).post('/login').send(UserMock.validUserBody);
  
      expect(status).to.equal(401);
      expect(body).to.deep.equal({ message: 'Invalid email or password' });
    });
  })
  describe('Authorization', function() {
    it('Retorna a role se token for válido ', async function() {
      const { id, email, role } = UserMock.mockFields;
      const token = "mockedToken";
      // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc";
      const tokenPayload = { id, email, role };
      sinon.stub(jwt, 'verify').returns(tokenPayload as any);
      // sinon.stub(jwtUtil, 'verifyToken').returns(tokenPayload);
  
      const { status, body } = await chai.request(app).get('/login/role').set('authorization', token);
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal({ role });
    });
    it('Retorna um erro se token estiver faltando ', async function() {
      const { status, body } = await chai.request(app).get('/login/role');
  
      expect(status).to.equal(401);
      expect(body).to.deep.equal({ message: 'Token not found' });
    });
    it('Retorna um erro se token for incorreto ', async function() {
      const { id, email, role } = UserMock.mockFields;
      const incorrectToken = "mockedToken";
      sinon.stub(jwt, 'verify').throws(new Error());
  
      const { status, body } = await chai.request(app).get('/login/role').set('authorization', incorrectToken);
  
      expect(status).to.equal(401);
      expect(body).to.deep.equal({ message: 'Token must be a valid token' });
    });
  });
});
