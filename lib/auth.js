var config = require('../config'),
	AUTH_REST_API = '/rest-service/auth-v1/login?',
	http = require('http'),
	querystring = require('querystring');

/**
	Login to Fisheye to get a loginToken, which is used for later REST requests.
	@param callback function(loginToken).
	*/
exports.login = function(authObject, callback) {
	var params = querystring.stringify(authObject);

	http.get({
		hostname: config.fisheye.hostname,
		path: AUTH_REST_API + params,
		headers: {
			'Accept': 'application/json'
		}
	}, function(res) {
		res.setEncoding('utf8');
		res.on('data', function(json) {
			var resultObject = JSON.parse(json);
			if (resultObject && resultObject.token) {
				callback(resultObject.token);
			}
		});
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
	});

};
