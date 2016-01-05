'use strict';

const chai = require('chai');
const assert = chai.assert;

const fetch = require('node-fetch');

describe('some tests', () => {
  it('should pass', () => {
    assert(1 == '1');
  });

  it('should run async tests', () => {
    return fetch('https://google.com').then(res => {
      assert(res.ok);
      return res.text();
    }).then(text => {
      assert.equal(text.substr(0, 5), '<!doc')
    });
  });
});
