'use strict';

const chai = require('chai');
const assert = chai.assert;

const fetch = require('node-fetch');
const co = require('co');
const stringify = require('querystring').stringify;

const auth = require('../src/auth');
const crud = require('../src/crud');

describe('authentication', () => {
  const port = process.env.PORT || 4000;
  const rootUrl = 'http://localhost:' + port;

  let accessToken = null;
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
    accessToken = loginJson.access_token;
  }));

  it('should not load resources if there is no token', co.wrap(function* () {
    const messagesRes = yield fetch(rootUrl + '/messages');
    assert.equal(messagesRes.status, 400);
  }));

  it('should load resources if token is present', co.wrap(function* () {
    const messagesRes = yield fetch(rootUrl + '/messages', {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });
    assert.equal(messagesRes.status, 200);

    const messagesJson = yield messagesRes.json();
    assert.equal(messagesJson.data[0].id, '11', '');
  }));


  before(() => {
    auth.listen(port);
    crud.setConfig({ port: 5000 });
    crud.start();
  });

  after(() => {
    auth.close();
    crud.close();
  });
});
