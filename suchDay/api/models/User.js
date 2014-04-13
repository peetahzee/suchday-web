/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    googleId: {
      type: 'STRING',
      required: true
    },
    name: {
      type: 'STRING',
      required: true
    },
    refreshToken: 'STRING',
    toJSON: function() {
      var obj = this.toObject();
      delete obj.refreshToken;
      return obj;
    }
  },

};
