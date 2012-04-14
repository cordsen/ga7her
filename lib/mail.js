var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP", {
	service: "Gmail",
	auth: {
		user: "ga7her@gmail.com",
		pass: "Buddydog5%"
	}
});

exports.transport = smtpTransport;

// setup e-mail data with unicode symbols
exports.groupInvite = function (to, groupId) {
	this.from =  "GA7HER <ga7her@gmail.com>"; // sender address
	this.to = to; // list of receivers
	this.subject = "Join My Group" // Subject line
	this.text = "Join my group at http://mobvite.com:3000/group/" + groupId; // plaintext body
	this.html =  "<b>Join my group at http://mobvite.com:3000/group/" + groupId  +"</b>"; // html body
}

// send mail with defined
// transport object
exports.sendMail = function (mailOptions) {
	smtpTransport.sendMail(mailOptions, function(error, response) {
		if (error) {
		   console.log(error);
		} else {
		   console.log("Message sent: " + response.message);
		}
		smtpTransport.close();
	});
}
