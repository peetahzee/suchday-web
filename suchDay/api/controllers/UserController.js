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
    btoa = require('btoa');

var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

module.exports = {
  index: function(req, res) {
    console.log('hitting index');
    var url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/plus.me',
        approvalprompt: 'force'
    });
    res.redirect(url);
  },
  oAuthCallback: function(req, res) {
    console.log('hitting oauthcallback with code ' + req.param('code'));
    oauth2Client.getToken(req.param('code'), function(err, tokens) {
      if(err) {
        console.log(err);
        res.send(err);
      } else {
        var u = btoa(tokens.id_token);
        console.log(u);
        if (tokens.refresh_token) {
          User.findOne(u.sub).done(function(err, user) {
            if(typeof user === 'undefined') {
              console.log('cant find user');
            } else {
              console.log('found user');
            }
            console.log(tokens);
            res.send(tokens);
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
