
/*
 * GET home page.
 */
var utility = require('../lib/utility');
module.exports = function (req, res) {
	var tpl_params = {
		title: '没有权限访问此页面'
	}
	tpl_params = utility.templateParams(tpl_params, req);
	res.render('user_accessdeny', tpl_params);
}