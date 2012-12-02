
/*
 * GET home page.
 */
var utility = require('../lib/utility');
module.exports = function (req, res) {
	var tpl_params = {
		title: '广告系统'
	}
	tpl_params = utility.templateParams(tpl_params, req);
	if (req.user) {
		res.render('index', tpl_params);
	}
	else {
		res.redirect('/user_login');
	}
	
}