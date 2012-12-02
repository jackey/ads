// Provinces
// ==============================================================================
var Province = require('../model').load('Province'),
	_ = require('underscore');

var provinces = [
	[1, "北京市", true, true],
	[2, "天津市", true, true],
	[3, "上海市", true, true],
	[4, "重庆市", true, true],
	[5, "河北省", false, true],
]

Province.find().remove(function (err, data) {
	if (err) {
		console.log("Empty provinces error:" + err);
	}
	else {
		_.each(provinces, function (p) {
			var p = new Province({
				no: p[0],
				name: p[1],
				sar: p[2],
				municipality: p[3]
			});
			p.save(function(err, data) {
				if (err) {
					console.log(err);
				}
				else {
					console.log("Province:" + data.name + " Added.");
				}
			});
		});
	}
});

// Cities
// ==============================================================================
var City = require('../model').load('City');

var cities = [
	[101, '北京市', 1],
	[201, '天津市', 2],
	[301, '上海市', 3],
	[401, '重庆市', 4],
	[501, '石家庄市', 5],
	[502, '唐山市', 5],
	[503, '秦皇岛市', 5],
	[504, '邯郸市', 5],
	[505, '邢台市', 5],
	[506, '保定市', 5],
];

City.find().remove(function (err, data) {
	if (err) {
		console.log("Empty cities error:" + err);
	}
	else {
		_.each(cities, function (city) {
			new City({
				no: city[0],
				name: city[1],
				province_no: city[2]
			})
			.save(function (err, data) {
				if (err) {
					console.log(err);
				}
				else {
					console.log("City:" + data.name + " Added.");
				}
			});
		});
	}
});




