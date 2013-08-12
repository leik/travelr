var config = require('../config'),
	auth = require('../lib/auth'),
	HistoryQuery = require('../lib/history-query'),
	SourceQuery = require('../lib/source-query'),
	url = require('url'),
	_ = require('underscore'),
	formatter = require('../lib/simple_formatter');

function getHistoryByPath(req, res, token, path, repo) {
	new HistoryQuery(token, repo, path).process(function(data) {
		// res.send(data);
		// res.render('timeline', {revisions: formatter.format(data, 'OrionPlatform')});
		res.render('timeline', {
			revisions: formatter.format(data.fileRevision.reverse(), repo),
			fisheyeHostName: config.fisheye.hostname
		});
	});
}

exports.history = function(req, res) {

	var url_parts = url.parse(req.url, true),
		queryParams = url_parts.query,
		authToken = req.session.fisheyeAuthToken;

	if (authToken) {
		getHistoryByPath(req, res, authToken, queryParams.path, queryParams.repo);
	} else {
		auth.login(config.fisheye.auth, function(token) {
			req.session.fisheyeAuthToken = token;
			getHistoryByPath(req, res, token, queryParams.path, queryParams.repo);
		});
	}

};

exports.source = function(req, res) {
	var url_parts = url.parse(req.url, true),
		queryParams = url_parts.query;

	new SourceQuery(queryParams.contentLink).process(function(data) {
		res.send(data);
	});
};
