/**
 * UsageController
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

module.exports = {
  getWidgets: function(req, res) {
    Usage.findByUser(req.param('user')).done(function(err, usages) {
      var widgets = [];
      var processedUsage = 0;
      for(var i in usages) {
        Widget.findOne(usages[i].widget).done(function(err, widget) {
          if(err) {
            widgets.push(err);
          } else if (typeof widget === 'undefined') {
          } else {
            try {
              widget.data = JSON.parse(usages[i].data);
            } catch (e) {
              widget.data = null;
            }
            widget.user = usages[i].user;
            widgets.push(widget);
          }
          processedUsage++;
          if(processedUsage == usages.length) {
            return res.send(widgets);
          }
        });
      }
    });
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UsageController)
   */
  _config: {}

  
};
