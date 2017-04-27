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
	res.send("Hello world");
});

app.post('/email/', function(req, res) {
	var recipient = req.query.to || "";
	var body = JSON.parse(preq.body);
	var msg = "";
	if (body.hasOwnProperty('msg')) {
		msg = body.msg;
	}
	sendmail({
	    from: 'anaonymous@pfff.com',
	    to: recipient,
	    subject: "Concerned member",
	    html: msg,
	  }, function(err, reply) {
	    console.log(err && err.stack);
	    console.dir(reply);
	});
});

app.listen(8080, function() {
	console.log("Listening on port 8080");
});
