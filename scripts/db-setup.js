'use script';

const mongoose = require('mongoose');
const models = require('../src/models');
const bcrypt = require('bcryptjs');

databaseUrl = process.env.DATABASE || 'mongodb://localhost/test';
const connection = mongoose.connect(databaseUrl, (error, connection) => {
  if (error) throw error;

  const defaultClient = new models.OAuthClientsModel({
    clientId: 'webapp',
    clientSecret: 'secret',
    grantTypes: [ 'password' ],
    redirectUri: null
  });

  defaultClient.save();

  const defaultUser = new models.UsersModel({
    username: 'test_user',
    passwordHash: bcrypt.hashSync('test_password', 8),
    firstname: 'Test',
    lastname: 'User',
    email: 'test@user.tld'
  });

  defaultUser.save();

  setTimeout(() => {
    mongoose.disconnect();
  }, 1000)
});
