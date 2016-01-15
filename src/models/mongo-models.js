'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let modelsAreNotDefinedYet = false;

try {
  mongoose.model('OAuthAccessTokens');
} catch (o_O) {
  modelsAreNotDefinedYet = true;
}

if (modelsAreNotDefinedYet) {
  const OAuthAccessTokensSchema = new Schema({
    accessToken: { type: String },
    clientId: { type: String },
    userId: { type: String },
    expires: { type: Date }
  });

  const OAuthRefreshTokensSchema = new Schema({
    refreshToken: { type: String },
    clientId: { type: String },
    userId: { type: String },
    expires: { type: Date }
  });

  const OAuthClientsSchema = new Schema({
    clientId: { type: String },
    clientSecret: { type: String },
    grantTypes: [ {type: String} ],
    redirectUri: { type: String }
  });

  const UsersSchema = new Schema({
    username: { type: String },
    passwordHash: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String, default: '' }
  });

  mongoose.model('OAuthAccessTokens', OAuthAccessTokensSchema);
  mongoose.model('OAuthRefreshTokens', OAuthRefreshTokensSchema);
  mongoose.model('OAuthClients', OAuthClientsSchema);
  mongoose.model('Users', UsersSchema);
}

module.exports = {
  OAuthAccessTokensModel: mongoose.model('OAuthAccessTokens'),
  OAuthRefreshTokensModel: mongoose.model('OAuthRefreshTokens'),
  OAuthClientsModel: mongoose.model('OAuthClients'),
  UsersModel: mongoose.model('Users')
}
