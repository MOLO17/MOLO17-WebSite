
molo.service('weatherService', function() {

	var self = this;
	var weather = {};

	self.getWeather = function() {
		return self.weather;
	}

	self.setWeather = function(_weather) {
		self.weather = _weather;
	}

});