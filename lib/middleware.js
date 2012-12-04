var _ = require('underscore'),
	User = require('../model').load('User'),
	routes = require('../config').routes,
	Step = require('step');

module.exports = function (req, res, next) {
	//当前应用是否支持session
	if (!_.isUndefined(req.session)) {
		Step(function () {
			var self = this;
			//加载当前登录的用户
			if (!_.isUndefined(req.session.username)) {
				var username = req.session.username;
				User.getUserByName(username, function (err, data) {
					if (err) {
						console.log("Err:" + err);
					}
					else {
						req.user = _.first(data);
						self(err, data)
					}
				});
			}
			else {
				//如果用户未登录 则需要生成一个默认的用户对象
				req.user = {
					username: "",
					password: "",
					created: 0,
					updated: Date.now,
					province_id: 0,
					city_id: 0,
					roles: ["anonymous"],
				}
				self(null, null);
			}
		}, function () {
			//检查权限.
			var router = require('../app.js').app._router;
			var router_matched = router.match('get', req.url);
			if (router_matched) {
				var path = router_matched.path.slice(1);
				_.each(routes, function (_n ,route) {
					if (path == route) {
						var permissions = !_.isUndefined(_n['permissions']) ? _n['permissions'] : [];
						require('../model').load('User').userAccess(req.user.username, permissions, function (accessiable) {
							//有权限访问
							if (accessiable) {
								req.accessiable = true;
								next();
							}
							//未授权的访问
							else {
								req.accessiable = false;
								res.redirect('user_accessdeny');
							}
						});
					}
				});
			}
		});
	}
	else {
		next();
	}
}