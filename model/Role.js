var mongoose = require('mongoose'),
	_ = require('underscore');

var Schema = mongoose.Schema;

var Role = new Schema({
	name: {
		type: String,
		require: true,
	},
	//可读名称 用于前端显示
	humanname: {
		type: String,
		require: true,
	},
	description: {
		type: String,
		require: false,
		description: '.'
	},
	permissions: {
		type: Array,
		require: false,
		default: []
	}
});

//TODO:
Role.statics.getRole = function (role_name) {

}

Role.statics.getPermissions = function (role_name, cb) {
	this.find({name: role_name}, function (err, data) {
		if (err) {
			cb(err)
		}
		else {
			cb(null, _.first(data).permissions)
		}
	});
}

module.exports = function (connext) {
	return mongoose.model('Role', Role);
}