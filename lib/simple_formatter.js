var config = require('../config'),
	_ = require('underscore'),
	moment = require('moment');
exports.format = function(fisheyeRevisions, repo) {
	return _.map(fisheyeRevisions, function(revision) {
		return {
			"date": moment(revision.date).format('MMM DD, YYYY, HH:mm'),
			"comment": revision.comment,
			"revision": revision.rev,
			"paths": {
				"raw": 'http://' + config.fisheye.hostname + revision.contentLink,
				"annotated": 'http://' + config.fisheye.hostname + '/browse/' + repo + '/' + revision.path + '?hb=true&content=true'
			}
		};
	});
};
