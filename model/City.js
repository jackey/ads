var Schema = require('mongoose').Schema,
	_ = require('underscore');
var ObjectId = Schema.objectId;

var City = new Schema({
	no: {
		type: Number,
		require: true,
	},
	name:  {
		type: String,
		require: true,
	},
	province_no: {
		type: Number,
		require: true,
	},
});

// Static functions.
City.statics.getCityInProvince = function (province_no, cb) {
	if (_.isFunction(province_no)) {
		cb = province_no;
		this.find({}, cb);
	}
	else {
		this.find({province_no: province_no}, cb);
	}
}

City.statics.getCities = function (nos, cb) {
	if (_.isFunction(nos)) { 
		cb = nos;
		this.find({}, cb);
	}
	else if (_.isArray(nos)) {
		this.where('no').in(nos).exec(cb);
	}
	else {
		this.find({no: nos}, cb)
	}
}

module.exports = function (connect) {
	return require('mongoose').model('City', City);
}