var Schema = require('mongoose').Schema,
	_ = require('underscore'),
	utility = require('../lib/utility');
var ObjectId = Schema.objectId;

var Enterprice = new Schema({
	code: {
		type: String,
		require: true,
	},
	name: {
		type: String,
		require: true
	},
	email: {
		type: String,
		require: false,
		default: '',
	},
	phone: {
		type: String,
		require: false,
		default: ''
	},
	province: {
		type: Number,
		require: true,
	},
	city: {
		type: Number,
		require: true
	}
});

// Static and helpful function
Enterprice.statics.allEnterprices = function (cb) {
	this.find({}, cb)
}

Enterprice.statics.pagerEnterprices = function (page, rows, cb) {
	// Default num is 10.
	if (_.isFunction(rows)) {
		cb = rows;
		rows = 10;
	}
	this.find({}).skip(rows * (page - 1)).limit(rows).exec(cb);
}

Enterprice.statics.totalEnterprices = function (cb) {
	this.count(cb);
}

//生成一个合作厂商的唯一代码
Enterprice.statics.uuid = function (cb) {
	return utility.uuid();
}

module.exports = function (connect) {
	return require('mongoose').model('Enterprice', Enterprice);
}