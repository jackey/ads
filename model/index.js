var mongo_config = require('../config').mongo,
	mongoose = require('mongoose'),
	_ = require('underscore');

function Model() {
	this.connect = mongoose.connect('mongodb://' + mongo_config.host + '/' + mongo_config.db);
}

// Model Loader.
_.extend(Model.prototype, {
	load: function (model_name) {
		return require("./" + model_name)(this.connect);
	}
});
var _model = new Model;
module.exports = _model;
