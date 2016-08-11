var express = require('express');
var stylus = require('stylus')
var compress = require('compression');
var nib = require('nib')
// var bootstrap = require('bootstrap-styl')
var bodyParser = require('body-parser')
var logger = require('morgan');
var cookieParser = require('cookie-parser')
var path = require('path');
var favicon = require('serve-favicon')
var cors = require('cors')

var app = express()
// app.use(favicon(__dirname + '/public/images/favicons/favicon-96x96.png'));

function compile(str, path) {
	return stylus(str).set('filename',path).use(nib())/*.use(bootstrap())*/;
}

/*****************************************************************************
							CONTENT RESPONSE
*****************************************************************************/

app.use(compress({threshold: 0}));
app.use(express.static(__dirname+'/public',{maxage:14400000}))

app.use(logger('tiny'))
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json())
app.use(cookieParser())
app.use(stylus.middleware({
	src: __dirname + '/public',
	compile: compile
}))
app.use(cors());

app.use(require("./libs/v1/routing/router"));

var port = ((process.env.NODE_ENV.toLowerCase() == "development") ? 40000 : process.env.PORT);

app.set('port',port)
var server = app.listen(app.get('port'), function () {
	console.log('Molo17 Website server listening on port ' + app.get('port'));
});