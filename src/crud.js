'use strict';

const jsonApi = require('jsonapi-server');

jsonApi.define({
  resource: 'messages',
  handlers: new jsonApi.MemoryHandler(),
  attributes: {
    text: jsonApi.Joi.string().required(),
    createDate: jsonApi.Joi.date().iso().default(Date.now, 'time of creation')
  },

  examples: [{
    id: '11',
    type: 'messages',
    text: 'Hello World'
  }, {
    id: '12',
    type: 'messages',
    text: 'Second Comment'
  }]
});

jsonApi.listen = (port, callback) => {
  jsonApi.setConfig({ port });
  jsonApi.start();
  if (callback) {
    callback();
  }
};

module.exports = jsonApi;
