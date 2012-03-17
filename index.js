/**
 * Module dependencies.
 */


var express = require('/usr/local/lib/node_modules/express');
var mongoose = require('/usr/local/lib/node_modules/mongoose');
var Gathering = require('./lib/Gathering').Gathering;

/**
 * Inits
 */

mongoose.connect('mongodb://localhost:27017/mobvite_dev');



/**
 * App.
 */

var app = express.createServer(
	express.bodyParser()
);

/**
 * App configuration.
 */

app.configure(function () {
  app.use(express.static(__dirname + '/public'));
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', { layout: false });
  
});

/**
 * App routes.
 */

app.get('/', function (req, res) {
  res.render('index', { layout: false });
});

app.get('/event', function (req, res) {
  console.log('get event: '+req);
  res.render('newEvent', { title: 'Create an Event' });
});
app.post('/event', function (req, res) {
  // check post data
  console.log('post event: '+req.body.name);
  // create gathering
	var g = new Gathering(req.body);//{name: req.body.name, date: req.body.date}

	console.log ('id: '+ g._id);
  // redirect to event/:id
  g.save(function (err) {
	  if (!err) {
	  	console.log('Success!');
	  	console.log ('id: '+ g._id);
	  	res.send({success:true,redirect:'/event/'+g._id})
	  	}
	});
 
});
// save for event with id
app.get('/event/:id', function (req, res) {
  //var g = new Gathering();
  
  Gathering.findById(req.params.id,function(e,g){ 
  	if(!e) {
			console.log('found '+g._id);
			res.render('event', g) 
			}
		else
			console.log('error '+e);	
  	});
});
// event using bootstrap
app.get('/eventbs/:id', function (req, res) {
  res.render('eventbs', { title: 'alpha launch' });
});

app.get('/person', function (req, res) {
  res.render('person', {  });
});

/**
 * App listen.
 */

app.listen(3000, function () {
  var addr = app.address();
  console.log('   app listening on http://' + addr.address + ':' + addr.port);
});

