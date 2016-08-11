var express = require("express");
var app = module.exports = express();
var path = require('path');
var routerManager = require("../api/routerManager")

// Set the CDN options
var _optionsCDN = {
    publicDir:path.join(__dirname, 'public'), 
    viewsDir:path.join(__dirname, 'views'),
    domain:'cdn.leadscollector.io',
    bucket:'leadscollector-cdn',
    key:'AKIAICF675HUFINO2YJA',
    secret:'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',
    hostname:'localhost',
    port:(false ? 443 : 1337),
    ssl:false,
    production : false
};
// Initialize the CDN magic
var CDN = require('express-cdn')(app, _optionsCDN);

var _moduleDirectory = __dirname+"/../../../"

app.set('views', [_moduleDirectory + 'views'])
app.set('view engine','jade')
app.set('view options', { layout: false, pretty: true });

app.locals = {
	environment:process.env.NODE_ENV.toLowerCase(),
	CDN: CDN()
};

app.get('/', routerManager.homeHandler);