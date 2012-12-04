var mongoose = require('mongoose'),
	_ = require('underscore');

var Schema = mongoose.Schema;

var Permission = new Schema({
	name: {
		type: String,
		require: true
	},
	humanname: {
		type: String,
		require: true
	},
	description: {
		type: String,
		require: false
	}
});

module.exports = function (connect) {
	return mongoose.model('Permission', Permission);
}