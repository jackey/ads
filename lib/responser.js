var _ = require('underscore');

module.exports = {
	ajaxResponse: function (data) {
		return {rsp: 1, data: data};
	},
	ajaxError: function (data) {
		return {rsp: 0, data: data};
	},
	ajaxPagerResponse: function (data) {
		var defaults = {total: 0, rows: []};
		_.extend(defaults, data);
		return defaults;
	}
}