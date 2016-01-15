'use strict';

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const oauthserver = require('oauth2-server');
const request = require('request');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const authModel = require('./auth-model')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.oauth = oauthserver({
  model: authModel,
  grants: ['password']
  // debug: true
});

app.all('/oauth/token', app.oauth.grant());

app.get('*', app.oauth.authorise(), function (req, res) {
  req.pipe(request('http://localhost:5000' + req.originalUrl)).pipe(res);
});

app.use(app.oauth.errorHandler());

const server = http.createServer(app);
server.on('close', () => {
  mongoose.disconnect();
});

module.exports = server;
