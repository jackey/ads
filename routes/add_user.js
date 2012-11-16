var _ = require('underscore'),
	lib_ads = require('../lib/ads');;

module.exports = function (req, res) {
	var User = require('../model/User').User;
	var params = lib_ads.params({
		title: '添加新用户'
	});
	if (!_.isEmpty(req.body)) {
		var new_user = new User({
			username: req.body.username,
			password: req.body.password,
		});
		
	}
	res.render('user_add', params);
}