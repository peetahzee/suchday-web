/**
 * Usage
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  attributes: {
    user: {
      type: 'STRING',
      required: true
    },
    widget: {
      type: 'STRING',
      required: true
    },
    data: 'JSON'
  }

};
