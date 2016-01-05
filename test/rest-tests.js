'use strict';

const chai = require('chai');
const assert = chai.assert;

const fetch = require('node-fetch');
const co = require('co');

const crud = require('../src/crud');

describe('CRUD tests with jsonapi-server', () => {
  it('should load messages', co.wrap(function* () {
    assert.fail('not implemented');
  }));

  before(() => {
    crud.start();
  });

  after(() => {
    crud.close();
  });
});
