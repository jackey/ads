var _ = require('underscore'),
	utility = require('../lib/utility'),
	responser = require('../lib/responser'),
	Step = require('step');

module.exports = function (req, res) {
	var UserModel = require('../model').load('User');
	Step(function () {
		// Get provinces
		require('../model').load('Province').getProvinces(this.parallel());
	}, function (err, provinces) {
		if (err) {
			throw err;
		}
		else {
			if (_.isUndefined(req.body) || _.isEmpty(req.body)) {
				var fist_province = _.first(provinces);
				require('../model').load('City').getCityInProvince(function (err, cities) {
					var op_role = {"管理员": ADMINISTRATOR, "操作员": OP};
					var type_role = {"本公司用户": SELF_COMPANY_ROLE, "合作厂商": ENTERPRISE_ROLE, "经销商": DEALER_ROLE};
					res.render('add_user', {
						title: '广告系统|添加新用户', 
						provinces: provinces, 
						cities: cities,
						op_role: op_role,
						type_role: type_role});
				});
			}
			else {
				var username = req.body.username;
				var password = utility.md5(req.body.password);
				var type_role = req.body.type_role;
				var op_role = req.body.op_role;
				var city_id = req.body.city;
				var province_id = req.body.province;
				var new_user = new UserModel({
					username: username,
					password: password,
					type_role: type_role,
					op_role: op_role,
					province_id: province_id,
					city_id: city_id
				});
				UserModel.getUserByName(username, function (err, data) {
					if (err) {
						res.send(responser.ajaxError());
					}
					else if (_.isEmpty(data)) {
						new_user.save(function (err, data) {
							if (err) {
								res.send(responser.ajaxError());
							}
							else{
								res.send(responser.ajaxResponse());
							}
						});
					}
					else {
						res.send(responser.ajaxError("账户名已经存在"));
					}
				});

			}
		}
	});
}