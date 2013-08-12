var config = require('../config'),
  http = require('http'),
  fs = require('fs'),
  querystring = require('querystring');

var Query = function(loginToken, repo, path) {
  this._loginToken = loginToken;
  this._repo = repo;
  this._path = path;
};

Query.prototype = {
  process: function(callback) {
    var self = this;
    http.get({
      hostname: config.fisheye.hostname,
      path: '/rest-service-fe/revisionData-v1/pathHistory/' + self._repo + '?path=' + self._path +'&FEAUTH='+self._loginToken,
      headers: {
        'Accept': 'application/json'
      }
    }, function(res) {
      var data = '';
      res.setEncoding('utf8');
      res.on('data', function(responseData) {
        data += responseData;
      });
      res.on('end', function(){
        // console.log(data);
        callback(JSON.parse(data));
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
  }
};

module.exports = Query;
