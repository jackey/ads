var mongo_config = require('../config').mongo;
var mongoose = require('mongoose');


module.exports = function () {
	var connect = mongoose.connect('mongodb://' + mongo_config.host + '/' + mongo_config.db);
}