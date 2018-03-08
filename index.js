var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('views/images'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
  var context = {};
  context.time = (new Date(Date.now())).toLocaleTimeString('en-US');
  // var qParams = [];
  // // create object array of key-value pairs
  // for (var p in req.query) {
  //   qParams.push({'name': p, 'value': req.query[p]});
  // }
  // var context = {};
  // // put key-value pairs in dataList for home.handlebars
  // context.dataList = qParams;
  // context.type = 'GET';
  res.render('home', context);
});

app.get('/about-me', function(req, res) {
  res.render('about-me');
});

app.get('/adopt-dont-shop', function(req, res) {
  res.render('adopt-dont-shop');
});

app.get('/dont-hang-the-man', function(req, res) {
  res.render('dont-hang-the-man');
});

app.use(function(req, res) {
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function() {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
