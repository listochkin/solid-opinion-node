'use strict';

const chai = require('chai');
const assert = chai.assert;

const fetch = require('node-fetch');
const co = require('co');
const stringify = require('querystring').stringify;

const auth = require('../src/auth');

describe('authentication', () => {
  const port = process.env.PORT || 4000;
  const rootUrl = 'http://localhost:' + port;

  it('should log in with username and password', co.wrap(function* () {
    const loginRes = yield fetch(rootUrl + '/oauth/token', {
      method: 'POST',
      body: stringify({
        username: 'test-user',
        password: 'secret'
      })
    });
    assert.equal(loginRes.status, 200);
    assert.fail('not implemented');
  }));

  before(() => {
    auth.listen(port);
  });

  after(() => auth.close());
});
