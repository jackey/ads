var _ = require('underscore');

exports.params = function (values) {
	var default_values = {error: "", title: "", version: ""};
	return _.extend(default_values, values);
}