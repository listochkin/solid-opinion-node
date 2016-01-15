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
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: stringify({
        grant_type: 'password',
        client_id: 'webapp',
        client_secret: 'secret',

        username: 'test_user',
        password: 'test_password'
      })
    });
    assert.equal(loginRes.status, 200);

    const loginJson = yield loginRes.json();
    assert.isNotNull(loginJson.access_token);
    assert.equal(loginJson.token_type, 'bearer');
  }));

  before(() => {
    auth.listen(port);
  });

  after(() => {
    auth.close();
  });
});
