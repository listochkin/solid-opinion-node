'use strict';

const chai = require('chai');
const assert = chai.assert;

const fetch = require('node-fetch');
const co = require('co');

describe('some tests', () => {
  it('should pass', () => {
    assert(1 == '1');
  });
                              // async function
  it('should run async tests', co.wrap(function* () {
    const res = yield fetch('https://google.com');
    assert(res.ok);
              // await
    const text = yield res.text();
    assert.equal(text.substr(0, 5), '<!doc')
  }));
});
