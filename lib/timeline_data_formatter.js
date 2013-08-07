var _ = require('underscore');
exports.format = function(fisheyeRevisions, repo) {
	return {
		"timeline": {
			"headline": "Johnny B Goode",
			"type": "default",
			"startDate": "2009,1",
			"text": "<i><span class='c1'>Designer</span> & <span class='c2'>Developer</span></i>",
			"asset": {
				"media": "assets/img/notes.png",
				"credit": "<a href='http://dribbble.com/shots/221641-iOS-Icon'>iOS Icon by Asher</a>",
				"caption": ""
			},
			"date": _.map(fisheyeRevisions.fileRevision, function(revision) {
				var date = new Date(revision.date);
				return {
					"startDate": [date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()].join(","),
					"headline": revision.fileRevisionState,
					"text": revision.comment,
					"asset": {
						"media": "http://fisheye/browse/" + repo + "/" + revision.path + "?hb=true",
						"credit": revision.author,
						"caption": ""
					}
				};
			})
		}
	};



};
