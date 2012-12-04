/**
 * User login page
 */
 var _ = require('underscore'),
 	crypto = require('crypto'),
 	responser = require('../lib/responser'),
 	utility = require('../lib/utility');

 // Router handler.
 module.exports = function (req, res) {
 	//如果用户已经登录，则重定向到首页
 	if (req.user.username) {
 		res.redirect('/index');
 	}
 	else if (utility.isGet(req)) {
 		res.render('login', {title: '广告系统 | 用户登陆'});
 	}
 	else {
 		var password = utility.md5(req.body.password);
 		var User = new require('../model').load('User');
 		var username = req.body.username;
 		User.getUserByName(username, function(err, data) {
 			if (err) {
 				res.send(responser.ajaxError(err));
 			}
 			else if (_.isEmpty(data)) {
 				res.send(responser.ajaxError("用户名或密码错误"));
 			}
 			else {
 				var user = _.first(data);
 				if (user.password == password) {
 					console.log('logined');
 					req.session.username = user.username;
 					res.send(responser.ajaxResponse("登录成功"));
 				}
 			}
 		});
 	}
 }