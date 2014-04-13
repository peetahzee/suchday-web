/**
 * Widget
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  attributes: {
    name: {
      type: 'STRING',
      required: true
    },
    logo: 'STRING',
    url: {
      type: 'STRING',
      required: true
    },
    voiceUrl: 'STRING',
    // what data do we need?
    data: 'JSON',
    // if the widget has a custom setup api, then we display a webview with this settingsUrl instead. Leave blank otherwise.
    settingsUrl: 'STRING'
  }

};
