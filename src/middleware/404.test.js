'use strict';

const { app } = require("../server");
const { db } = require("../auth/models/index");
const supertest = require('supertest');
const req = supertest(app);

beforeAll(async () => {
    await db.sync();
  })
  
  afterAll(async () => {
    await db.drop();
  })
 //test// error handler
describe('Server test', () => {
   
    it('PAGE NOT FOUND', async () => {
      const res = await req.get('/new');
      expect(res.status).toEqual(404);
    })

    it('PAGE NOT FOUND', async () => {
      const res = await req.put('/new');
      expect(res.status).toEqual(404);
    })
});