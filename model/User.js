// User Model

var mongoose = require('mongoose'),
	_ = require('underscore'),
	Step = require('step');

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var User = new Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type:String,
		required: true
	},
	created: {
		type: Date,
		required: true,
		default: Date.now
	},
	updated: {
		type: Date,
		required: true,
		default: Date.now
	},
	province_id: {
		type: Number,
		required: true,
	},
	city_id: {
		type: Number,
		required: true
	},
	roles: {
		type: Array,
		require: false,
	}
});

User.statics.getUserByName = function (name, cb) {
	if (_.isUndefined(name) || _.isFunction(name)) {
		throw "miss param";
	}
	else {
		this.find({username: name}, cb);
	}
}

User.statics.userPermissions = function (name, cb) {
	this.find({username: name}, function (err, data) {
		if (err) {
			// ignore
			throw err;
		}
		else {
			var roles = data.roles;
		}
	})
}

User.statics.userAccess = function (username, permissions, cb) {
	this.find({username: username}, function(err, data) {
		if (err){
			throw err;
		}
		else {
			var user = _.first(data);
			if (_.isUndefined(user)) {
				var roles = ["anonymous"];
			}
			else {
				var roles = user.roles;
			}
			Step(function() {
				var self = this;
				_.each(roles, function(role) {
					var role_permissions = require('../model').load('Role').getPermissions(role, self.parallel());
				});
			}, function (err, data) {
				var args = Array.prototype.slice.call(arguments);
				if (args[0]) {
					throw args[0];
				}
				else {
					var role_permissions = args.slice(1);
					var _role_permissions = [];
					_.each(role_permissions, function (role_permission) {
						_role_permissions = _.union(role_permission, _role_permissions);
					});
					role_permissions = _role_permissions;
					var diffence_permisssions = _.difference(role_permissions, permissions);
					if (diffence_permisssions.length == role_permissions.length && _.indexOf(permissions, "all_time") == -1) {
						cb(false);
					}
					else {
						cb(true);
					}
				}
			});
		}
	})
}

module.exports = function (connect) {
	return mongoose.model('User', User);
}
