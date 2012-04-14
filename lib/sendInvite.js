var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP", {
	service: "Gmail",
	auth: {
		user: "ga7her@gmail.com",
		pass: "Buddydog5%"
	}
});

// setup e-mail data with unicode symbols
var mailOptions = {
	from: "GA7HER <ga7her@gmail.com>", //	sender address
	to: "cordsen@gmail.com", // list of	receivers
	subject: "Hello", // Subject line
	text: "Hello world", // plaintext	body
	html: "<b>Hello world</b>" //	html body
}

// send mail with defined
// transport object
smtpTransport.sendMail(mailOptions, function(error, response) {
	if (error) {
	   console.log(error);
	} else {
	   console.log("Message sent: " + response.message);
	}
	smtpTransport.close();
});
