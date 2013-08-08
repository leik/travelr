var config = require('../config'),
  http = require('http'),
  fs = require('fs'),
  querystring = require('querystring');

var Query = function(url) {
  this._url = url;
};

Query.prototype = {
  process: function(callback) {
    var self = this;
    http.get({
      hostname: config.fisheye.hostname,
      path: self._url+'?FEAUTH='+self._loginToken
    }, function(res) {
      var data = '';
      res.setEncoding('utf8');
      res.on('data', function(responseData) {
        data += responseData;
      });
      res.on('end', function(){
        callback(data);
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
  }
};

module.exports = Query;
