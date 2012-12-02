(function ($) {
	$(document).ready(function () {

		// Login form.
		$('#login-form').form({
			url: '/user_login',
			onSubmit: function () {
				return $(this).form('validate');
			},
			success: function (data) {
				var data = $.parseJSON(data);
				if (data.rsp == 0) {
					$.messager.alert("Info", "用户名或密码错误", 'error');
				}
				else {
					$.messager.alert("Info", "登录成功", 'info');
				}
			}
		});

		// User add form.
		$('#add_user_form').form({
			url: '/add_user',
			onSubmit: function() {
				return $(this).form('validate');
			},
			success: function (data) {
				var data = $.parseJSON(data);
				if (data.rsp == 0) {
					$.messager.alert("Error", data.data, 'error');
				}
				else {
					$.messager.alert("Info", '添加用户成功', 'info');
					$('#add_user_form').form('clear');
				}
			}
		});

		// Load city from province
		function getCityFromProvince(province_no) {
			var cities = [];
			$('input[name="city_hidden"][province_no="'+province_no+'"]').each(function() {
				cities.push([$(this).attr('city_no'), $(this).attr('city_name')]);
			});
			return cities;
		}

		$.each(getCityFromProvince($('#province_option').val()), function (key, city) {
			$("#city_option").append("<option value='"+city[0]+"'>"+city[1]+"</option>");
		});
		

		$('#province_option').change(function () {
			$('#city_option').html('');
			var province_no = $(this).val();
			$.each(getCityFromProvince(province_no), function (key, city) {
				$("#city_option").append("<option value='"+city[0]+"'>"+city[1]+"</option>");
			});
		});

		//厂商添加表单 ajax处理
		$('#add_enterprice_form').form({
			success: function (data) {
				data = $.parseJSON(data);
				if (data.rsp == 1) {
					$.messager.alert('Info', data.data, 'info')
				}
				else {
					$.messager.alert('Info', data.data, 'error');
				}
			}
		});
	});
})(jQuery);