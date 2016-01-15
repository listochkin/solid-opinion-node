const bcrypt = require('bcryptjs');

const authModel = module.exports;

const mongoModels = require('./models');
const OAuthAccessTokensModel = mongoModels.OAuthAccessTokensModel;
const OAuthRefreshTokensModel = mongoModels.OAuthRefreshTokensModel;
const OAuthClientsModel = mongoModels.OAuthClientsModel;
const UsersModel = mongoModels.UsersModel;

//
// oauth2-server callbacks
//
authModel.getAccessToken = function (bearerToken, callback) {
  // console.log('in getAccessToken (bearerToken: ' + bearerToken + ')');

  OAuthAccessTokensModel.findOne({ accessToken: bearerToken }, callback);
};

authModel.getClient = function (clientId, clientSecret, callback) {
  // console.log('in getClient (clientId: ' + clientId + ', clientSecret: ' + clientSecret + ')');
  if (clientSecret === null) {
    return OAuthClientsModel.findOne({ clientId: clientId }, callback);
  }
  OAuthClientsModel.findOne({ clientId: clientId, clientSecret: clientSecret }, callback);
};

authModel.grantTypeAllowed = function (clientId, grantType, callback) {
  // console.log('in grantTypeAllowed (clientId: ' + clientId + ', grantType: ' + grantType + ')');

  OAuthClientsModel.findOne({ clientId: clientId }, (error, client) => {
    if (error) return callback(error);

    callback(null, client.grantTypes.indexOf(grantType) >= 0);
  });
};

authModel.saveAccessToken = function (token, clientId, expires, userId, callback) {
  // console.log('in saveAccessToken (token: ' + token + ', clientId: ' + clientId + ', userId: ' + userId + ', expires: ' + expires + ')');

  const accessToken = new OAuthAccessTokensModel({
    accessToken: token,
    clientId: clientId,
    userId: userId,
    expires: expires
  });

  accessToken.save(callback);
};

/*
 * Required to support password grant type
 */
authModel.getUser = function (username, password, callback) {
  // console.log('in getUser (username: ' + username + ', password: ' + password + ')');

  UsersModel.findOne({ username: username }, function(err, user) {
    if(err) return callback(err);

    if (bcrypt.compareSync(password, user.passwordHash)) {
      callback(null, user._id);
    } else {
      callback(new Error('password missmatch'));
    }
  });
};

/*
 * Required to support refreshToken grant type
 */
authModel.saveRefreshToken = function (token, clientId, expires, userId, callback) {
  // console.log('in saveRefreshToken (token: ' + token + ', clientId: ' + clientId +', userId: ' + userId + ', expires: ' + expires + ')');

  const refreshToken = new OAuthRefreshTokensModel({
    refreshToken: token,
    clientId: clientId,
    userId: userId,
    expires: expires
  });

  refreshToken.save(callback);
};

authModel.getRefreshToken = function (refreshToken, callback) {
  // console.log('in getRefreshToken (refreshToken: ' + refreshToken + ')');

  OAuthRefreshTokensModel.findOne({ refreshToken: refreshToken }, callback);
};
