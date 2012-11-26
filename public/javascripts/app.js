(function ($) {
	$(document).ready(function () {
		$('form#loginform').validate({
			rules: {
				username: {
					required: true,
				},
				password: {
					required: true,
					minLength: 6,
				}
			},
			messages: {
				username: {
					required: "请输入用户名"
				},
				password: {
					required: "请输入密码",
					minLength: "密码字符至少6个"
				}
			}
		});
	});
})(jQuery);