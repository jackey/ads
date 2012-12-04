
/**
 * Module dependencies.
 */

var express = require('express')
  , MongoStore = require('express-session-mongo')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , config = require('./config')
  , middleware = require('./lib/middleware');

var app = express(); 

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('ad_xx_ad_xx_ad'));
  app.use(express.session({
    secret: "secret_session", 
    store: new MongoStore(config.session.db, config.session.ip, config.session.port)})
  );
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, '.')));
  app.use(middleware);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// Get.
for (var path in config.routes) {
  var controller = config.routes[path];
  var loaded_control = require("./routes/"+controller['handler']);
  app.get("/"+path, loaded_control);
}

// Post.
for (var path in config.post) {
  var controller = config.post[path];
  var loaded_control = require('./routes/' + controller['handler']);
  app.post("/" + path, loaded_control);
}


http.createServer(app).listen(config.port, function(){
  console.log("Express server listening on port " + config.port);
});

module.exports.app = app;
