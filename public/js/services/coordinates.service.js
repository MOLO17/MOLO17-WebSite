
molo.service('coordinatesService', function() {

	var self = this;
	self.coordinates = {};


	self.getCoords = function() {
		return self.coordinates;
	}


	self.setCoords = function(_latitude, _longitude) {

		var dmsLat = decimalToDMS(_latitude);
		var dmsLong = decimalToDMS(_longitude)

		/*self.coordinates = {
			'latitude' : dmsLat,
			'longitude' : dmsLong
		}*/

		self.coordinates = {
			'latitude' : _latitude,
			'longitude' : _longitude
		}
	}


	//Convert decomal coords to degress, minutes and seconds
	function decimalToDMS (deg) {
		
		var grades = Math.floor (deg);
		var minfloat = (deg - grades) * 60;
		var minutes = Math.floor(minfloat);
		var secfloat = (minfloat - minutes) * 60;
		var seconds = Math.round(secfloat);
		
		if (seconds === 60) {
	 		minutes++;
	 		seconds = 0;
		}

		if (minutes === 60) {
			grades++;
			minutes = 0;
		}

		return ("" + grades + ":" + minutes + ":" + seconds);
	}

});