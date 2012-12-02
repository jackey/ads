var _ = require('underscore'),
	utility = require('../lib/utility'),
	responser = require('../lib/responser');

module.exports = function (req, res) {


	if (utility.isGet(req)) {
		var tpl_params = {title: '添加合作厂商'};
		_.extend(tpl_params, {
			cities: [],
			provinces:[]
		});
		tpl_params = utility.templateParams(tpl_params, req)
		require('../model').load('Province').getProvinces(function (err, data) {
			if (err) {
				throw err;
			}
			else {
				var provinces = data;

				require('../model').load('City').getCityInProvince(function (err, data) {
					if (err) {
						throw err;
					}
					else {
						var cities = data;
						_.extend(tpl_params, {
							cities: cities,
							provinces:provinces,
							code: require('../model').load('Enterprice').uuid()
						});
						res.render('add_enterprice', tpl_params);
					}
				});
			}
		});
	}
	// 表单提交后 处理逻辑
	else {
		var name = req.body.name;
		var province = req.body.province;
		var city = req.body.city;
		var code = req.body.code;
		var email = req.body.email;
		var phone = req.body.phone;
		var new_enterprice = new require('../model').load('Enterprice')(req.body);
		new_enterprice.save(function (err, data) {
			if (err) {
				utility.log(err);
				res.send(responser.ajaxError(err.toString()));
			}
			else {
				res.send(responser.ajaxResponse("厂商添加成功"));
			}
		});
	}
}