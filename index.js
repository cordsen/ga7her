/*jslint  nomen: true */
/**
 * Module dependencies.
 */
"use strict";

var express = require('express'),
	mongoose = require('mongoose'),
	Group = require('./lib/group').Group,
	User = require('./lib/user').User,
	mongooseAuth = require('mongoose-auth'),
	RedisStore = require('connect-redis')(express),
	Step = require('step'),
	sender = require('./lib/mail');

/**
 * Inits
 */

mongoose.connect('mongodb://localhost:27017/mobvite_dev');



/**
 * App.
 */

var app = express.createServer(
	express.bodyParser(),
	express.static(__dirname + '/public'),
	express.cookieParser(),
	express.session({ secret: 'esoognom', store: new RedisStore}),
	//express.cookieSession()
	mongooseAuth.middleware()
);

/**
 * App configuration.
 */

app.configure(function () {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.set('view options', { layout: false });
});

/**
 * App routes.
 */

app.get('/', function (req, res) {
	console.log(req.loggedIn);
	console.log("session:"+req.session.store);
	console.log("session:"+req.session.memoryStore);

	if (req.loggedIn)
		res.redirect('/user');
	else
		res.render('index', { layout: false });
});

app.get('/group', function (req, res) {
	console.log('get group: ' + req);
	res.render('newGroup', { title: 'Create an Group' });
});
app.post('/group', function (req, res) {
	// check post data
	console.log('post group: ' + req.body.name);
	
	var user
	, group
	, email = req.body.email;
	Step(
		function getUser () {
			User.findOne({email: email}, this)
		},
		function checkUser (err, result) {
			if (err) {
				throw err;
			}
			if (result) {
				user = result;
				return user;
			}
			user = new User({email: email});
			user.save(this);
		},
		function createGroup (err, user) {
			debugger;
			if (err) {
				throw err
			}
			// create group
			group = new Group(
			{
				name: req.body.name
				, owner: user._id
				, meta: {
					date: req.body.date
					, place: req.body.place
				}
			});//{name: req.body.name, date: req.body.date}

			console.log('id: ' + group._id);
			// redirect to event/:id
			group.save(this)
		},
		function sendEmail (err) {
			sender.smtpTransport.sendMail(new sender.groupInvite(user.email, group._id)); // skip the callbacks for now
			return;
		},
		function sendResponse (err) {
			if (err) {
				console.log('sending err: ' + err);
				res.send({success: false, message: err});
			} else {
				console.log('Success!');
				console.log('id: ' + group._id);
				res.send({success: true, redirect: '/group/' + group._id});
			}
		}
	);
});

// save for event with id
app.get('/group/:id', function (req, res) {
	//var g = new Gathering();
	Group.findById(req.params.id, function (err, group) {
		if (!err) {
			console.log('found ' + group._id);
			res.render('group', group);
		} else {
			console.log('error ' + err);
		}
	});
});
// event using bootstrap
app.get('/eventbs/:id', function (req, res) {
	res.render('eventbs', { title: 'alpha launch' });
});


app.get('/user', function (req, res) {
	res.render('user');
	console.log(req.user);
	//console.log(everauth);
});

mongooseAuth.helpExpress(app);

/**
 * App listen.
 */

app.listen(3000, function () {
	var addr = app.address();
	console.log('   app listening on http://' + addr.address + ':' + addr.port);
});

