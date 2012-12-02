var _ = require('underscore'),
	User = require('../model').load('User');

module.exports = function (req, res, next) {
	//加载当前登录的用户
	if (!_.isUndefined(req.session) && !_.isUndefined(req.session.username)) {
		var username = req.session.username;
		User.getUserByName(username, function (err, data) {
			if (err) {
				console.log("Err:" + err);
			}
			else {
				req.user = _.first(data);
			}
			next();
		});
	}
	else {
		next();
	}
}