'use strict';
const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
//Instantiate the SMTP server
const smtpTrans = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.USER_PASS
	},
	tls: {
		// do not fail on invalid certs
		rejectUnauthorized: false
	}
})

//Specify what the email will look like
const mailer = (reciverer) => {
	return {
		from: process.env.GMAIL_USER,
		to: reciverer,
		subject: `${req.body.subject}`,
		text: `
		Name: ${req.body.names}
	 	Email:${req.body.email}
	 	Phone: ${req.body.phone}
	  	Message: ${req.body.text}
	  	`
	};
};

//Attempt to send the mail

smtpTrans.sendMail(mailer, (err, res) => {
	err ? console.log(err) : console.log('success')
})

module.exports = mailer;