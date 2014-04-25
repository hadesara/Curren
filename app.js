/** Module dependencies */
var express = require('express'),
  URL = require('url'),
  fs = require('fs'),
  mongoose =require('mongoose');

// Globals
GLOBAL._url = URL;
GLOBAL.mongoose = mongoose;
GLOBAL.Schema = mongoose.Schema;
GLOBAL.ObjectId = mongoose.Types.ObjectId;
GLOBAL.currentDir = __dirname;
var currencies = {};
var app = module.exports = express();

// Configurations
app.configure(function(){
  app.set('port', process.env.PORT || 3000)
  //app.set('views', __dirname + '/app/client/views');
  //app.set('view engine', 'jade');
  app.use(express.cookieParser('paypal'));
  app.use(express.session({secret: 'paypal'}));
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + "/app/client"));
  app.use(express.static(__dirname + '/bower_components'));
  app.use(app.router);
  app.use(function(req, res) { res.render(__dirname + '/app/client/index'); } );
});

app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  console.log('Mongoose: Connecting to Database');
  mongoose.connect('mongodb://localhost/paypal');
  db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Mongoose: Connection Error:'));
  db.once('open', function callback () {
    console.log('Mongoose: Successfully connected!');
  });
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

//Sniff HTTP
app.all('*', function(req, res, next) {
  //Only allow api requests to /api/auth (uncomment after testing)
  //Client folder is taken care of in configuration in the express.static 
  // if ((!(/^\/api/auth/g.test(req.url)))
  //   res.send(401);
  // else
     return next();
});

// Routes 
 var routes = require('./app/api/routes'),
   transaction = require('./app/api/routes/transaction'),
   converter = require('./app/api/routes/converter');

// app.get('/app/partials/:name', routes.partials);
// app.get('/app/partials/:folderName/:name', routes.partials);



// API: User routes
app.get('/api/transaction', transaction.findAll);
app.get('/api/transaction/:currency', transaction.getAllInCurrency);
// app.get('/api/transaction/:id', transaction.findById);
app.post('/api/transaction', transaction.addTransaction);
app.put('/api/transaction/:id', transaction.updateTransaction);
app.delete('/api/transaction/:id', transaction.deleteTransaction);

app.get('/api/convert/:from/:to/:value', converter.convert);


// View routes
//app.get('/', routes.index);

// Start server
app.listen(app.get('port'), function(){
  console.log('Express server listening at port %d in %s mode', this.address().port, app.settings.env);
  converter.updateConversion();
});
