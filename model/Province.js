var Schema = require('mongoose').Schema,
	_ = require('underscore');
var ObjectId = Schema.objectId;

var Province = new Schema({
	no: {
		type: Number,
		require: true,
	},
	name:  {
		type: String,
		require: true,
	},
	sar: {
		type: Boolean,
		require: true,
		default: false,
	},
	municipality: {
		type: Boolean,
		require: true,
		default: false,
	},
});

Province.statics.getProvinces = function (province_no, cb) {
	if (_.isFunction(province_no)) {
		cb = province_no;
		this.find({}, cb);
	}
	else if (_.isArray(province_no)) {
		this.where('no').in(province_no).exec(cb);
	}
	else {
		this.find({no: province_no}, cb);
	}
}

module.exports = function (connect) {
	return require('mongoose').model('Province', Province);
}