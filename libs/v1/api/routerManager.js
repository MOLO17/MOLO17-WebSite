// var configManager = require('../../configManager')

module.exports = {
	signupHandler: function(req,res,next) {
		res.render('signup/signup',{
			copyright : ""
		})
	},
	homeHandler: function(req,res,next) {
		
		var _currCompany = undefined
		var _copyright = ""
		
		_copyright = "Copyright (c) 2015 "+(_currCompany || "LeadsCollector")+" - "+" All rights reserved."

		var _layoutRoute = "index"

		res.render(_layoutRoute,{
			// title : configManager.title,
			copyright : _copyright,
			authenticated : true
		})
	},
	loginHandler: function(req,res,next) {

		var _layoutRoute = "login/login"

		res.render(_layoutRoute,{
			copyright : "",
			authenticated : false
		})
	},
	indexHandler: function(req,res,next) {
		res.redirect(301,"/home")
	}
}