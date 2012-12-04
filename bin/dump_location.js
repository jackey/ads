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


// permissions
// ==============================================================================
var permissons = [
	{name: "access_static_content", humanname: "访问内容权限", description: "访问关于我们等静态页面的权限"},
	{name: "access_enterprice_list", humanname: "访问厂商列表", description: "."},
	{name: "edit_enterprice", humanname: "编辑厂商", description: "."},
	{name: "add_enterprice", humanname: "添加厂商", description: "."},
	{name: "access_login", humanname: "允许用户登录", description: "."},
	{name: "access_content", humanname: "允许访问内容", description: "."},
	{name: "user_is_logined", humanname: "用户已经登录", description: "."},
];

var Permission = require('../model').load('Permission');
Permission.find().remove(function (err) {
	if (err) {
		console.log("Empty permissons error: " + err);
	}
	else {
		_.each(permissons, function (permission) {
			new Permission(permission).save(function (err, data) {
				if (err) {
					console.log(err);
				}
				else {
					console.log("permission:" + data.humanname + " Added.");
				}
			});
		});
	}
});

// Roles
// ==============================================================================
var roles = [
	{
		name: 'company_admin', 
		humanname: "公司管理员",
		description: ".",
		permissions:[
			"access_static_content", 
			"access_enterprice_list", 
			"edit_enterprice", 
			"add_enterprice",
			"user_is_logined",
			"access_content",
		]
	},
	{
		name: "company_op",
		humanname: "公司操作人员",
		permissions: [
			"access_static_content", 
			"access_enterprice_list", 
			"edit_enterprice", 
			"add_enterprice",
			"user_is_logined",
			"access_content"
		]
	},
	{
		name: 'anonymous',
		humanname: "匿名用户",
		permissions: [
			"access_login", 
			"access_content"
		]
	}
];

var Role = require('../model').load('Role');

Role.find().remove(function (err) {
	if (err) {
		console.log('Empty role error: '+err);
	}
	else {
		_.each(roles, function (role) {
			new Role(role).save(function (err, data) {
				if (err) {
					console.log(err);
				}
				else {
					console.log("Role: " + data.humanname + " Added.");
				}
			});
		});
	}
})


// Users
// ==============================================================================
var users = [
	{
		username: 'admin', 
		password: require('../lib/utility').md5('admin'), 
		roles: ['company_op', 'company_admin'],
		province_id: 1,
		city_id: 101
	}
];

var User = require('../model').load("User");

User.find().remove(function (err) {
	if (err) {
		console.log("Empty user error:" +err);
	}
	else {
		_.each(users, function (user) {
			new User(user).save(function (err, data) {
				if (err) {
					console.log(err);
				}
				else {
					console.log('User:' + data.username + " Added");
				}
			});
		})
	}
});



