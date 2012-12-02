// User Model.

//用户角色是固定的
global.ENTERPRISE_ROLE = 1; // 合作厂家
global.DEALER_ROLE = 2; //经销商 
global.SELF_COMPANY_ROLE = 3; //本公司
global.ADMINISTRATOR = 4; // 管理员
global.OP = 5; //操作员


var mongoose = require('mongoose'),
	_ = require('underscore');

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var User = new Schema({
	uid: ObjectId,
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
	type_role: {
		type: Number,
		required: true,
	},
	op_role: {
		type: Number,
		required: true,
	},
	province_id: {
		type: Number,
		required: true,
	},
	city_id: {
		type: Number,
		required: true
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

module.exports = function (connect) {
	return mongoose.model('User', User);
}
