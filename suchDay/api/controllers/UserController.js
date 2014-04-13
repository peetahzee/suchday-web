/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var googleapis = require('googleapis'),
    OAuth2 = googleapis.auth.OAuth2,
    CLIENT_ID = '99312021964-5hc9j067l4svgh87sg3vc8ran4m1ctbm.apps.googleusercontent.com',
    CLIENT_SECRET = 'vAeqhqqdXQ7THNm8Y6zLWVm9',
    REDIRECT_URL = 'http://dash.ptzlabs.com/user/oAuthCallback',
    atob = require('atob');

var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

module.exports = {
  index: function(req, res) {
    var url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/plus.me',
        approval_prompt: 'force'
    });
    res.redirect(url);
  },
  oAuthCallback: function(req, res) {
    oauth2Client.getToken(req.param('code'), function(err, tokens) {
      if(err) {
        console.log(err);
        res.send(err);
      } else {
        var u = JSON.parse(atob(tokens.id_token.split('.')[1]));
        if (tokens.refresh_token) {
          oauth2Client.credentials = {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token
          };
          User.findByGoogleId(u.sub).done(function(err, users) {
            var user = users[0];
            if(typeof user === 'undefined') {
              googleapis.discover('plus', 'v1').execute(function(err, client) {
                client.plus.people.get({userId:'me'})
                  .withAuthClient(oauth2Client)
                  .execute(function(err, data) {
                    User.create({
                      name: data.displayName,
                      googleId: u.sub,
                      refreshToken: tokens.refresh_token
                    }).done(function(err, newUser) {
                      res.send(newUser);
                    });
                  });
              });
            } else {
              res.send(user);
            }
          });
        } else {
          console.log("found user " + u.sub);
          User.findByGoogleId(u.sub).done(function(err, users) {
            if(err) { console.log(err); }
            res.send(users[0]);
          });
        }
      }
    });
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}

};
