
molo.service('coordinatesService', function() {

	var self = this;
	self.coordinates = {};


	self.getCoords = function() {
		return self.coordinates;
	}


	self.setCoords = function(_latitude, _longitude) {
		self.coordinates = {
			'latitude' : _latitude,
			'longitude' : _longitude
		}
	}

});