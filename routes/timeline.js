var config = require('../config'),
	auth = require('../lib/auth'),
	HistoryQuery = require('../lib/history-query'),
	url = require('url'),
	_ = require('underscore'),
	formatter = require('../lib/simple_formatter');

function getHistoryByPath(req, res, token, path) {
	new HistoryQuery(token, 'OrionPlatform', path).process(function(data){
		// res.send(data);
		// res.render('timeline', {revisions: formatter.format(data, 'OrionPlatform')});
		// console.log(JSON.stringify(data, 4));
		res.render('timeline', {revisions: formatter.format(data.fileRevision.reverse())});
	});
}

exports.data = function(req, res) {

	var url_parts = url.parse(req.url, true),
		queryParams = url_parts.query,
		authToken = req.session.fisheyeAuthToken;

	if (authToken) {
		getHistoryByPath(req, res, authToken, queryParams.path);
	} else {
		auth.login(config.fisheye.auth, function(token) {
			req.session.fisheyeAuthToken = token;
			getHistoryByPath(req, res, token, queryParams.path);
		});
	}

};
