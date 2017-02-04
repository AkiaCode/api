const nodemailer = require('nodemailer'),
	fs = require('fs'),
	emails = {
		verify: fs.readFileSync(__dirname + '/../assets/verify.html').toString()
	},
	transport = nodemailer.createTransport({
		name: 'no-repy',
		tls: { rejectUnauthorized: false }
	});

var from;

function config(settings) {
	from = settings.from
}

function sendMail(options) {
	return new Promise((resolve, reject) => {
		options.from = options.from || `"Catgirls" <${from}>`;

		return transport.sendMail(options, (error, info) => {
			if (error)
				return reject(error);
			return resolve(info);
		});
	});
}

function sendHTMLMail(template, options, values) {
	return new Promise((resolve, reject) => {
		options.from = options.from || `"Catgirls" <${from}>`;
		options.html = emails[template].replace(/{{(\w+?)}}/g, (match, key) => values[key]);

		return transport.sendMail(options, (error, info) => {
			if (error)
				return reject(error);
			return resolve(info);
		});
	});
}

module.exports = { config, sendMail, sendHTMLMail };
