var mongo_config = require('../config').mongo;
var mongoose = require('mongoose');
	mongoose.connect('mongodb://' + mongo_config.host + '/' + mongo_config.db);

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var User = new Schema({
	uid: ObjectId,
	name: {
		type: String,
		required: true
	},
	password: {
		type:String,
		required: true
	},
	province: {
		prv_id: {
			type: Number,
			required: true,	
		},
		name: String
	},
	City: {
		cty_id: {
			type: Number,
			required:true
		},
		name: {
			type: String,
			required: true,
		}
	},
});

mongoose.model('User', User);

module.exports.User = mongoose.model('User');
