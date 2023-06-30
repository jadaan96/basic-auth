'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { User } = require('../auth/models');
const basicAuthMiddleWare = require('../auth/middleware/ basic');

describe('basicAuthMiddleWare', () => {
  it('should invok the next middleware if authentication was successful', async () => {
    const req = {
      headers: {
        authorization: `Basic ${base64.encode('username:password')}`,
      },
    };
    const res = {};
    const next = jest.fn();
    const mockUser = {
      username: 'username',
      password: await bcrypt.hash('password', 10),
    };
    User.findOne = jest.fn().mockResolvedValue(mockUser);
    bcrypt.compare = jest.fn().mockResolvedValue(true);
    await basicAuthMiddleWare(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should return an error if authentication was faild', async () => {
    const req = {
      headers: {
        authorization: `Basic ${base64.encode('username:password')}`,
      },
    };
    const res = {};
    const next = jest.fn();
    const mockUser = {
      username: 'username',
      password: await bcrypt.hash('password', 10),
    };
    User.findOne = jest.fn().mockResolvedValue(mockUser);

    bcrypt.compare = jest.fn().mockResolvedValue(false);

    await expect(basicAuthMiddleWare(req, res, next)).rejects.toThrow('this user is invalid');

    expect(next).not.toHaveBeenCalled();
  });
});