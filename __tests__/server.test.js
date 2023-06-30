'use strict'

const { app } = require("../src/server");
const { db } = require("../src/auth/models/index");
const supertest = require('supertest');
const mockServer = supertest(app);
const base64 = require('base-64')
const basicAuthMiddleWare = require('../src/auth/middleware/ basic')

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});
  
// Test endpoints
describe('Test the signin & signup endpoints', () => {

  it(' POST to /signup to create a new user.  ', async () => {
    const result = await mockServer.post('/signup').send({
      username: 'jadaan',
      password: '123123'
    });
    expect(result.status).toEqual(201);
  });

  it('POST to /signin to login as a user (use basic auth).  ', async () => {
    const req = {
      headers: {
        authorization: `Basic ${base64.encode('jadaan:123123')}`
      },
      body: {
        username: undefined
      }
    };

    const res = {};
    const next = jest.fn();
    await basicAuthMiddleWare(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});