var express  = require('express');
var app = express();

var sendmail = require('sendmail')({
  logger: {
    debug: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error
  },
  silent: false
});

app.get('/', function(req, res) {
	res.send("Hellow world");
});

app.post('/email/', function(req, res) {
	var recipient = req.query.to;
	var body = req.body;
	sendmail({
	    from: 'no-reply@pfff.com',
	    to: recipient,
	    subject: '',
	    html: '',
	  }, function(err, reply) {
	    console.log(err && err.stack);
	    console.dir(reply);
	});
});

app.listen(8080);
