'use strict';

const chai = require('chai');
const assert = chai.assert;

const fetch = require('node-fetch');
const co = require('co');

const crud = require('../src/crud');

describe('CRUD tests with jsonapi-server', () => {
  const port = process.env.PORT || 3000;
  const rootUrl = 'http://localhost:' + port;

  it('should load messages', co.wrap(function* () {
    const res = yield fetch(rootUrl + '/messages');
    assert(res.ok, 'no endpoint found' + res.status);

    const json = yield res.json();
    assert.equal(json.data[0].id, '11', '');
  }));

  before(() => {
    crud.setConfig({ port });
    crud.start();
  });

  after(() => {
    crud.close();
  });
});
