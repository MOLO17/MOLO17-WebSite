
molo.service('coordinatesService', function(projectConsts) {

	var self = this;
	self.coordinates = {};
	var moloPositionDecimal;


	var moloPositionDecimal = {
		'lat': projectConsts.molo_17Coords.latitude,
	 	'lon': projectConsts.molo_17Coords.longitude
	}


	self.getCoords = function() {
		return self.coordinates;
	}


	self.setCoords = function(_latitude, _longitude) {
		self.coordinates = {
			'latitude' : _latitude,
			'longitude' : _longitude
		}
	}


	//Convert decomal coords to degress, minutes and seconds
	self.decimalToDMS = function(decimalCoord) {
		
		var grades = Math.floor (decimalCoord);
		var minfloat = (decimalCoord - grades) * 60;
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


	//Distance from 2 coordinates
	self.distance = function(latitude2, longitude2) {

		var latitude1 = moloPositionDecimal.lat;
		var longitude1 = moloPositionDecimal.lon;

  		var p = 0.017453292519943295;
		var c = Math.cos;
  		var a = 0.5 - c((latitude2 - latitude1) * p)/2 + c(latitude1 * p) * c(latitude2 * p) * 
  			(1 - c((longitude2 - longitude1) * p))/2;

  		return 12742 * Math.asin(Math.sqrt(a));
	}

});