var _ = require('underscore'),
	utility = require('../lib/utility'),
	responser = require('../lib/responser');

module.exports = function (req, res) {
	//这里是表单提交的查询参数 需要处理
	if (utility.isPost(req)) {
		var page = req.body.page;
		var num = req.body.rows;
		require('../model').load('Enterprice').pagerEnterprices(page, num,  function (err, data) {
			if (err) {
				utility.log(err);
				throw err;
			}
			else {
				var enterprices = data;
				require('../model').load('Enterprice').totalEnterprices(function (err, data) {
					if (err) {
						utility.log(err);
						throw err;
					}
					else {
						var total = data;
						var province_nos = [];
						var city_nos = [];
						_.each(enterprices, function(enterprice) {
							if (!_.isUndefined(enterprice['province'])) {
								province_nos = _.union(province_nos, [enterprice['province']]);
							}
							if (!_.isUndefined(enterprice['city'])) {
								city_nos = _.union(city_nos, [enterprice['city']]);
							}
						});
						require('../model').load('Province').getProvinces(province_nos, function (err, data) {
							var provinces = data;
							require('../model').load('City').getCities(city_nos, function (err, data) {
								if (err) {
									utility.log(err);
									throw err;
								}
								else {
									var cities = data;
									function getProvince(province_no) {
										return _.find(provinces, function (province) {
											return province_no == province['no'];
										});
									}
									function getCity(city_no) {
										return _.find(cities, function (city) {
											return city_no == city['no'];
										});
									}
									var ret_enterprices = [];
									for (var key = 0; key < enterprices.length; key++) {
										var enterprice = enterprices[key];
										var enterprice_item = {
											name: enterprice['name'],
											code: enterprice['code'],
											email: enterprice['email'],
											phone: enterprice['phone'],
											province: enterprice['province'],
											city: enterprice['city'],
										};
										if (!_.isUndefined(enterprice_item['province'])) {
											enterprice_item['province_name'] = getProvince(enterprice['province'])['name'];
										}
										if (!_.isUndefined(enterprice_item['city'])) {
											enterprice_item['city_name'] = getCity(enterprice['city'])['name'];
										}
										ret_enterprices.push(enterprice_item);
									}
									res.send(responser.ajaxPagerResponse({total: total, rows: ret_enterprices}));
								}
							});
						});
					}
				});
			}
		});
	}
	else {
		var tpl_params = {
			title: '合作厂商列表',
			enterprices: [],
			table_title: "合作厂商列表",
		};
		tpl_params = utility.templateParams(tpl_params, req);
		res.render('list_enterprice', tpl_params);
	}
}