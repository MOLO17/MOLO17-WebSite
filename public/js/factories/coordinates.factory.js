
molo.factory('coordinatesFactory', function() {

	var coordinatesFactory = {};
	var coordinates;

	coordinatesFactory.getCoords = function(completionHandler) {
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position){
				
				coordinates = {
					'latitude': position.coords.latitude,
					'longitude': position.coords.longitude
				}

				completionHandler(true, coordinates)
			})
		}
	};

	return coordinatesFactory;
});