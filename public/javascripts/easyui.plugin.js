//给Easyui 写的扩展

$.extend($.fn.validatebox.defaults.rules, {
	passwordequals: {
		validator: function (value, param) {
			return value == $(param[0]).val();
		},
		message: "两次输入密码不一致"
	},
	phone: {
		validator: function (phone, param) {
			return true;
		},	
		message: "输入的不是有效的手机号码"
	}
});